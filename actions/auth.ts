'use server';

import { z } from 'zod';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../constants';
import { getSession } from '@/lib/session';
import User, { UserInterface, UserSchemaInterface } from '@/models/user';
import connectToDatabase from '@/lib/connect-to-database';
import { nanoid } from 'nanoid';
import Session from '@/models/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import PasswordReset, { PasswordResetInterface } from '@/models/password-reset';
import sendEmail from '@/lib/send-email';

export const registerUser = async (previousState: any, formData: FormData) => {
  try {
    console.log('previousState', previousState);
    // verify session..?
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const session = await getSession();

    console.log('session', session);

    if (session) {
      return {
        error: 'An active session was found. Logout to create a new account.',
      };
    }

    const formDataObject = Object.fromEntries(formData);

    const schema = z
      .object({
        username: z
          .string()
          .min(1, 'Username is required')
          //   .min(3, 'Username is too short')
          //   .max(15, 'Username is too long')
          .toLowerCase()
          .trim()
          .refine(
            (value) => USERNAME_REGEX.test(value),
            'Username must be between 3-15 characters, and can only contain letters and numbers'
          ),
        password: z
          .string()
          .min(1, 'Password is required')
          .refine(
            (value) => PASSWORD_REGEX.test(value),
            'Password must be 8-16 characters long, and contain at least one numeric digit, and special character'
          ),
        confirm_password: z.string().min(1, 'Please confirm your password'),
      })
      .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
      });

    const { success, error, data } = schema.safeParse(formDataObject);

    if (!success) {
      console.log('errors', error.flatten().fieldErrors);
      return { errors: error.flatten().fieldErrors };
    }

    const { username, password } = data;

    // check if username is taken
    const usernameTaken = await User.findOne({ username });

    if (usernameTaken) {
      // console.log('username is already taken');
      return {
        error: 'Username is already taken.',
      };
    }

    // register user and create session
    // const user: UserSchemaInterface = new User({
    //   username,
    //   password,
    // });

    // await user.save();

    const user: UserSchemaInterface = await User.create({
      username,
      password,
    });

    console.log('user', user);

    const new_session_id = nanoid();

    // ! wrap in trycatch and redirect to login page in catch block..?
    await Session.create({
      user_id: user._id,
      session_id: new_session_id,
    });

    cookies().set('session_id', new_session_id, {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
    });

    // redirect('/profile');
    // return { success: true, data: user.toObject() };
    return { success: true, data: user.toJSON() };
  } catch (error: any) {
    console.log('[SERVER_ACTION_ERROR]', error);
    return {
      error: 'Something went wrong.',
    };
  }
};

export const loginUser = async (previousState: any, formData: FormData) => {
  try {
    console.log('previousState', previousState);
    // verify session..?
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const session = await getSession();

    console.log('session', session);

    if (session) {
      return {
        error: 'An active session was found. A user is already logged in.',
      };
    }

    const formDataObject = Object.fromEntries(formData);

    const schema = z.object({
      username: z
        .string()
        .min(1, 'Please enter your username or email')
        .toLowerCase()
        .trim(),
      password: z.string().min(1, 'Please enter your password'),
    });

    const { success, error, data } = schema.safeParse(formDataObject);

    if (!success) {
      return { errors: error.flatten().fieldErrors };
    }

    const { username, password } = data;

    const user = await User.findOne<UserInterface>({
      $or: [{ username }, { email: username }],
    }).select('+password');

    if (!user) {
      return { error: 'No user with the supplied username or email' };
    }

    // console.log('userrrr', user);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return { error: 'Incorrect password' };
    }

    const new_session_id = nanoid();

    await Session.create({
      user_id: user._id,
      session_id: new_session_id,
    });

    cookies().set('session_id', new_session_id, {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
    });

    // revalidatePath('/auth/login');
    // revalidatePath('/profile');
    // redirect('/profile');
    return { success: true };
  } catch (error: any) {
    console.log('[SERVER_ACTION_ERROR]', error);
    return {
      error: 'Something went wrong.',
    };
  }
};

export const logoutUser = async (previousState: any) => {
  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const session = await getSession();

    console.log('session', session);

    if (!session) {
      return {
        error: 'No active session was found. No user is logged in.',
      };
    }

    await Session.deleteOne({ session_id: session.session_id });

    cookies().delete('session_id');

    //  revalidatePath('/auth/login');
    // revalidatePath('/profile');
    return { success: true };
  } catch (error: any) {
    console.log('[LOGOUT_ERROR]', error);
    return { error: 'An error occured while logging out' };
  }
};

export const initiatePasswordReset = async (
  previousState: any,
  formData: FormData
) => {
  try {
    console.log('previousState', previousState);
    // verify session..?
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const session = await getSession();

    console.log('session', session);

    if (session) {
      return {
        error: 'An active session was found. A user is already logged in.',
      };
    }

    const username = formData.get('username');

    const { success, error, data } = z
      .string()
      .min(1, 'Please enter your username or email')
      .toLowerCase()
      .trim()
      .safeParse(username);

    if (!success) {
      return { inputError: error.format()._errors[0] };
    }

    const user = await User.findOne<UserInterface>({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return { error: 'No user with the supplied username or email' };
    }

    if (user && !user.email) {
      return { error: 'No email address was added to your profile' };
    }

    // CHECK IF PASSWORD RESET RECORD EXISTS. DELETE, IF ANY!
    const passwordResetRecord = await PasswordReset.findOne({
      user_id: user._id,
    });

    if (passwordResetRecord) {
      await PasswordReset.deleteOne({ user_id: user._id });
    }

    const reset_string = nanoid();

    // CREATE NEW PASSWORD RESET RECORD
    const newPasswordResetRecord = await PasswordReset.create({
      user_id: user._id,
      reset_string,
    });

    // SEND EMAIL!
    await sendEmail({
      receipent: user.email as string,
      subject: 'Password Reset',
      html: `Click <a href={http://locahost:3000/auth/reset-password?email=${encodeURIComponent(
        user.email as string
      )}&reset_string=${reset_string}}></a>`,
    });

    return { success: `Reset mail has been sent to ${user.email}` };
  } catch (error: any) {
    console.log('[PASSWORD_RESET_INITIATION_ERROR]', error);
    return { error: 'Something went wrong' };
  }
};

interface PasswordResetCredentials {
  email: string;
  reset_string: string;
}

export const resetPassword = async (
  credentials: PasswordResetCredentials,
  previousState: any,
  formData: FormData
) => {
  const { email, reset_string } = credentials;

  try {
    console.log('previousState', previousState);
    // verify session..?
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const session = await getSession();

    console.log('session', session);

    if (session) {
      return {
        error: 'An active session was found. A user is already logged in.',
      };
    }

    // receives email and reset_string; verify email
    const user = await User.findOne<UserSchemaInterface>({ email }).select(
      '+password'
    );

    if (!user) {
      return { error: 'No user with the supplied email address' };
    }

    // check if password reset record (still) exists (will be checked on page load too. this is just in case)
    const passwordResetRecord =
      await PasswordReset.findOne<PasswordResetInterface>({
        user_id: user._id,
      });

    if (!passwordResetRecord) {
      return {
        error:
          'Password reset record does not exist or has expired. Please request a new password reset email',
      };
    }

    // compare reset strings
    const resetStringsMatch = await bcrypt.compare(
      reset_string,
      passwordResetRecord.reset_string
    );

    if (!resetStringsMatch) {
      return { error: 'Invalid reset string' };
    }

    // validate formData (new password)
    const formDataObject = Object.fromEntries(formData);

    const schema = z
      .object({
        password: z
          .string()
          .min(1, 'Password is required')
          .refine(
            (value) => PASSWORD_REGEX.test(value),
            'Password must be 8-16 characters long, and contain at least one numeric digit, and special character'
          ),
        confirm_password: z.string().min(1, 'Please confirm your password'),
      })
      .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
      });

    const { success, error, data } = schema.safeParse(formDataObject);

    if (!success) {
      console.log('errors', error.flatten().fieldErrors);
      return { errors: error.flatten().fieldErrors };
    }

    // reset password
    const { password } = data;

    const passwordIsSame = await bcrypt.compare(password, user.password);

    console.log('password', password);
    console.log('user.password', user.password);
    console.log('passwordIsSame', passwordIsSame);

    if (passwordIsSame) {
      return { error: 'Password is the same as previous' };
    }

    await user.save();

    return { success: true };
  } catch (error: any) {
    console.log('[PASSWORD_RESET_INITIATION_ERROR]', error);
    return { error: 'Something went wrong' };
  }
};
