import FormInput from '@/components/form-input';
import SessionUpdater from '@/components/session-updater';
import { Button } from '@/components/ui/button';
import PasswordUpdateForm from '@/containers/password-update-form';
import PersonalDetailsUpdateForm from '@/containers/personal-details-update-form';
import getUser from '@/lib/get-user';
import { cn } from '@/lib/helpers/cn';
import { updateSession } from '@/lib/session';
import updateSessionViaAPI from '@/lib/update-session-via-api';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

export const metadata: Metadata = {
  title: 'Profile settings',
  description: '', // remove root description (and OG description)
};

export const dynamic = 'force-dynamic';

interface Props {}

const SettingsPage: FC<Props> = async () => {
  const user = await getUser();

  // console.log('revalidated!!');

  if (!user) {
    redirect('/auth/login');
  }

  // await updateSessionViaAPI();

  return (
    <>
      <SessionUpdater />
      <div className="py-5 md:py-7 flex flex-col min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-70px)]">
        <div className="pb-4 md:pb-5">
          {/* <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
            Hello, Chidera
          </span> */}

          <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
            {/* Settings */}
            Manage profile
          </h1>
        </div>

        <div className="flex-1 flex flex-col gap-12 bg-secondary dark:bg-slate-900 px-5 md:px-8 py-9 rounded-[16px] border">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-14">
            <div className="flex flex-col gap-[6px] min-w-[305px]">
              <h3 className="font-bold text-base">Personal Information</h3>
              <p className="text-muted-foreground text-sm max-w-[auto] md:max-w-[200px]">
                Update your personal details here
              </p>
            </div>

            <PersonalDetailsUpdateForm
              username={user.username}
              email={user.email}
            />
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-14">
            <div className="flex flex-col gap-[6px] min-w-[305px]">
              <h3 className="font-bold text-base">Account Password</h3>
              <p className="text-muted-foreground text-sm max-w-[auto] md:max-w-[200px]">
                Update your account password here
              </p>
            </div>

            {/* <div> */}
            <div className="w-[min(546px,_100%)]">
              <div className="flex flex-col gap-12">
                <div>
                  <h4 className="mb-4 font-bold text-[20px] leading-[140%] tracking-[-1.44%] hidden md:block">
                    Create a new password
                  </h4>

                  <PasswordUpdateForm />
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
