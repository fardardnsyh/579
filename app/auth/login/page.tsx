import FormInput from '@/components/form-input';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import LoginForm from '@/containers/login-form';
import getUser from '@/lib/get-user';
import { Loader2 } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import React, { FC } from 'react';

export const metadata: Metadata = {
  title: 'Login to your account',
  description: '', // remove root description (and OG description)
};

interface Props {}

const LoginPage: FC<Props> = async () => {
  // const user = await getUser();

  // if (user) {
  //   redirect('/profile', RedirectType.replace);
  // }

  return (
    <>
      <div className="px-4 sm:px-6 py-10 sm:py-12">
        {/* header */}
        <header className="flex flex-col items-center gap-5 mb-7">
          {/* <span className="text-xl font-semibold font-geistMono text-transparent text-gradient dark:bg-gradient bg-clip-text dark:bg-clip-text">
            Enigma
          </span> */}
          <Logo />

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-medium mb-1">
              Login to your account
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Enter your details to login
            </p>
          </div>
        </header>

        {/* form */}
        <LoginForm />

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="underline underline-offset-2 hover:text-primary transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
