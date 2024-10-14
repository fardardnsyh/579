import FormInput from '@/components/form-input';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import PasswordResetForm from '@/containers/password-reset-form';
import getUser from '@/lib/get-user';
import PasswordReset from '@/models/password-reset';
import User, { UserInterface } from '@/models/user';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect, RedirectType } from 'next/navigation';
import React, { FC } from 'react';

export const metadata: Metadata = {
  title: `Reset your account's password`,
  description: '', // remove root description (and OG description)
};

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const PassowordResetCompletionPage: FC<Props> = async ({ searchParams }) => {
  // const user = await getUser();

  // if (user) {
  //   redirect('/profile', RedirectType.replace);
  // }

  // get email and reset string from search params.  either is not present
  const email_param = searchParams.email;
  const reset_string_param = searchParams.reset_string;

  console.log('email_param', email_param);
  console.log('reset_string_param', reset_string_param);

  // if (!email_param || !reset_string_param) {
  //   notFound();
  // }

  const email = Array.isArray(email_param)
    ? decodeURIComponent(email_param[0] || '')
    : decodeURIComponent(email_param || '');

  const reset_string = Array.isArray(reset_string_param)
    ? reset_string_param[0]
    : reset_string_param;

  if (!email || !reset_string) {
    notFound();
  }

  // check if email in search params has a password reset record. invoke notFound if record does not exist
  const user = await User.findOne<UserInterface>({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    notFound();
  }

  const passwordResetRecord = await PasswordReset.findOne({
    user_id: user._id,
  });

  if (!passwordResetRecord) {
    notFound();
  }

  return (
    <>
      <div className="px-4 sm:px-6 py-10 sm:py-12">
        {/* header */}
        <header className="flex flex-col items-center gap-5 mb-7">
          {/* <span className="text-xl font-semibold font-geistMono">Enigma</span> */}
          <Logo />

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-medium mb-1">
              Reset your password
            </h1>
            {/* <p className="text-muted-foreground text-sm sm:text-base">
              Fill in the details to create an account
            </p> */}
          </div>
        </header>

        {/* form */}
        <PasswordResetForm email={email} reset_string={reset_string} />

        <Button variant={'outline'} asChild className="w-full h-12 text-base">
          <Link href={'/auth/login'}>Go to login page</Link>
        </Button>
      </div>
    </>
  );
};

export default PassowordResetCompletionPage;
