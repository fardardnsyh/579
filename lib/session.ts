import 'server-only';
import connectToDatabase from '@/lib/connect-to-database';
import Session, { SessionInterface } from '@/models/session';
import { cookies } from 'next/headers';

export const getSession = async () => {
  const session_id = cookies().get('session_id')?.value;

  if (!session_id) return null;

  try {
    // console.log('connecting to database...');
    // await connectToDatabase();
    // console.log('connected to database!');

    const session = await Session.findOne<SessionInterface>({
      session_id,
    });

    if (!session) return null;

    return session;
  } catch (error: any) {
    console.log('[SESSION_VERIFICATION_ERROR]', error);
    throw Error('Session Verification Error');
  }
};

export const updateSession = async () => {
  const session_id = cookies().get('session_id')?.value;

  if (!session_id) return;

  try {
    const session = await Session.findOne<SessionInterface>({
      session_id,
    });

    if (!session) return;

    await Session.updateOne(
      { session_id: session.session_id },
      { expiresAt: new Date(Date.now() + 1000 * 60 * 60) }
    );

    cookies().set('session_id', session_id, {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
    });
  } catch (error: any) {
    console.log('[SESSION_UPDATE_ERROR]', error);
    throw Error('Session Update Error');
  }
};
