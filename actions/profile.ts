'use server';

import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '@/constants';
import { getSession, updateSession } from '@/lib/session';
import connectToDatabase from '@/lib/connect-to-database';
import getUser from '@/lib/get-user';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import User, { UserSchemaInterface } from '@/models/user';
import { revalidatePath } from 'next/cache';

export const updateProfile = async (previousState: any, formData: FormData) => {
  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const currentUser = await getUser();

    // console.log('currentUser', currentUser);

    if (!currentUser) {
      return {
        error: 'Unauthorized',
      };
    }

    await updateSession();

    const formDataObject = Object.fromEntries(formData);

    const schema = z
      .object({
        username: z
          .string()
          .min(1, 'Please enter a username')
          .toLowerCase()
          .trim()
          .refine(
            (value) => USERNAME_REGEX.test(value),
            'Username must be between 3-15 characters, and can only contain letters and numbers'
          )
          .optional(),
        email: z
          .string()
          // .min(1, 'Please enter an email address')
          // .email('Invalid email')
          // .refine(
          //   (value) => value !== '' && EMAIL_REGEX.test(value),
          //   'Inalid email'
          // )
          .toLowerCase()
          .trim()
          .refine(
            (value) => value === '' || EMAIL_REGEX.test(value),
            'Invalid email'
          )
          .optional(),
        password: z
          .string()
          .min(1, 'Please enter a password')
          .refine(
            (value) => PASSWORD_REGEX.test(value),
            'Password must be 8-16 characters long, and contain at least one numeric digit, and special character'
          )
          .optional(),
        confirm_password: z
          .string()
          //   .min(1, 'Please confirm your password')
          .optional(),
      })
      .refine(
        (data) => !data.password || data.confirm_password, // If password is present, confirm_password must be present
        {
          path: ['confirm_password'],
          message: 'Please confirm your password',
        }
      )
      .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Passwords do not match',
      });

    const { success, error, data } = schema.safeParse(formDataObject);

    if (!success) {
      console.log('error.flatten().fieldErrors', error.flatten().fieldErrors);

      return { errors: error.flatten().fieldErrors };
    }

    if (Object.keys(data).length === 0) {
      console.log('no data to update');
    }

    const { username, email, password } = data;

    console.log('emailll', email);
    console.log('username', username);

    // const updates: z.infer<typeof schema> = {}
    const user = await User.findById<UserSchemaInterface>(
      currentUser._id
    ).select('+password');

    if (!user) {
      return {
        error: 'Unauthorized',
      };
    }

    if (username) {
      if (currentUser.username !== username) {
        // check if username is taken
        const usernameTaken = await User.findOne({ username });

        if (usernameTaken) {
          // console.log('username is already taken');
          return {
            error: 'Username is already taken.',
          };
        }
        // updates.username = username
        user.username = username;
      }
    }

    if (email || email === '') {
      // updates.email = email
      user.email = email;
    }

    if (password) {
      // const salt = await bcrypt.genSalt()
      // const hashed_password = await bcrypt.hash(password, salt)
      // updates.password = hashed_password
      const passwordIsSame = await bcrypt.compare(password, user.password);

      console.log('password', password);
      console.log('user.password', user.password);
      console.log('passwordIsSame', passwordIsSame);

      if (passwordIsSame) {
        return { error: 'Password is the same as previous' };
      }

      user.password = password;
    }

    await user.save();
    revalidatePath('/profile/settings');

    return { success: true };
  } catch (error: any) {
    console.log('[PROFILE_UPDATE_ERROR]', error);
    return { error: 'Something went wrong' };
  }
};

export const completeOnboarding = async (email?: string) => {
  try {
    console.log('connecting to database...');
    await connectToDatabase();
    console.log('connected to database!');
    const currentUser = await getUser();

    // console.log('currentUser', currentUser);

    if (!currentUser) {
      return {
        error: 'Unauthorized',
      };
    }

    await updateSession();

    const { success, data, error } = z
      .string()
      .toLowerCase()
      .trim()
      .email('Please enter a valid email address')
      .optional()
      .safeParse(email);

    if (!success) {
      return { inputError: error.format()._errors[0] };
    }

    await User.findByIdAndUpdate(
      currentUser._id,
      data
        ? {
            completed_onboarding: true,
            email: data,
          }
        : {
            completed_onboarding: true,
          }
    );

    return { success: true };
  } catch (error: any) {
    return {
      error: 'Something went wrong',
    };
  }
};
