import ProfileAccountAvatar from '@/components/profile-account-avatar';
import { Skeleton } from '@/components/ui/skeleton';
import ProfileHeader from '@/containers/profile-header';
import { getSession } from '@/lib/session';
import connectToDatabase from '@/lib/connect-to-database';
import { redirect, RedirectType } from 'next/navigation';
import React, { FC, Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Your profile',
    template: '%s - Enigma',
  },
  description: '', // remove root description (and OG description)
};

interface Props {
  children: React.ReactNode;
}

const ProfileLayout: FC<Props> = async ({ children }) => {
  // await connectToDatabase();
  // const session = await getSession();

  // console.log('sessionnnn', session);

  // if (!session) {
  //   console.log('redirectttttttttt');
  //   redirect('/auth/login', RedirectType.replace);
  // }

  return (
    <>
      <ProfileHeader
        avatar={
          <Suspense
            fallback={
              <Skeleton className="rounded-full h-8 md:h-10 w-8 md:w-10" />
            }
          >
            <ProfileAccountAvatar />
          </Suspense>
        }
      />
      <div className="md:container px-4">{children}</div>
    </>
  );
};

export default ProfileLayout;
