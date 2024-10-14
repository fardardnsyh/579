import connectToDatabase from '@/lib/connect-to-database';
import Session, { SessionInterface } from '@/models/session';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (request: NextRequest) => {
  const session_id = cookies().get('session_id')?.value;

  if (!session_id) {
    return NextResponse.json({ error: 'No active session to update' });
  }

  try {
    await connectToDatabase();

    const session = await Session.findOne<SessionInterface>({
      session_id,
    });

    if (!session) {
      return NextResponse.json({ error: 'No active session to update' });
    }

    await Session.updateOne(
      { session_id: session.session_id },
      { expiresAt: new Date(Date.now() + 1000 * 60 * 60) }
    );

    cookies().set('session_id', session_id, {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
    });

    // const response = NextResponse.json({
    //   message: 'Session updated successfully',
    // });

    // response.cookies.set('session_id', session_id, {
    //   maxAge: 60 * 60, // 1 hour
    //   httpOnly: true,
    // });

    return NextResponse.json({
      message: 'Session updated successfully',
    });
    // return response;
  } catch (error: any) {
    console.log('[SESSION_UPDATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
