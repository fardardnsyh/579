import SessionUpdater from '@/components/session-updater';
import { Button } from '@/components/ui/button';
import AddEmailDialog from '@/containers/add-email-dialog';
import getUser from '@/lib/get-user';
import { updateSession } from '@/lib/session';
import updateSessionViaAPI from '@/lib/update-session-via-api';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';
import Link from 'next/link';
import SocialShare from '@/containers/social-share';

export const dynamic = 'force-dynamic';

interface Props {}

const ProfilePage: FC<Props> = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // await updateSessionViaAPI();

  return (
    <>
      <SessionUpdater />
      <AddEmailDialog showDialog={!user.completed_onboarding} />

      <div className="py-5 md:py-7 flex flex-col min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-70px)]">
        <div className="pb-4 md:pb-5">
          <span className="inline-block pb-1 md:pb-2 font-bold text-xl sm:text-2xl md:text-3xl">
            {/* Welcome, Chidera. 👋🏾 */}
            Welcome, {user.username}. 👋🏾
          </span>

          <h1 className="text-muted-foreground font-medium text-sm sm:text-base">
            Your profile
          </h1>
        </div>

        <div className="flex-1 bg-secondary dark:bg-slate-900 px-5 md:px-8 py-9 rounded-[16px] border">
          <p className="text-sm sm:text-base md:text-lg text-center text-muted-foreground mb-10 md:mb-20">
            Share your profile link to get anonymous feedback or messages from
            your friends! You can view responses by clicking on the{' '}
            <span className="font-semibold">'View messages'</span> button below,
            or the <span className="font-semibold">'Messages'</span> link on the
            navigation bar.
          </p>

          <SocialShare username={user.username} />

          <Button className="h-16 md:h-20 w-full" asChild>
            <Link href={'/profile/messages'}>View Messages</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
