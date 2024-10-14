import { getSession } from '@/lib/session';
import User, { UserInterface, UserSchemaInterface } from '@/models/user';
import { cache } from 'react';
import connectToDatabase from './connect-to-database';
import { ObjectId } from 'mongoose';

const getUser = cache(async () => {
  try {
    await connectToDatabase();
    const session = await getSession();

    if (!session) return null;

    const user = await User.findById<UserSchemaInterface>(session.user_id);

    if (!user) return null; // TODO: delete cookie..?

    // return {
    //   _id: user._id as ObjectId,
    //   username: user.username,
    //   email: user.email,
    //   completed_onboarding: user.completed_onboarding,
    // };

    return user;
  } catch (error: any) {
    console.log('[USER_FETCH_ERROR]', error);

    throw Error('Failed to fetch user');
    // return null;
  }
});

export default getUser;
