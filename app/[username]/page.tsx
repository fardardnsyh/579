import Logo from '@/components/logo';
import TextareaInput from '@/components/textarea-input';
import { Button } from '@/components/ui/button';
import MessageForm from '@/containers/message-form';
import connectToDatabase from '@/lib/connect-to-database';
import User, { UserInterface, UserSchemaInterface } from '@/models/user';
import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  params: { username: string };
}

const SendMessagePage: FC<Props> = async ({ params: { username } }) => {
  await connectToDatabase();
  const user = await User.findOne<UserSchemaInterface>({
    username: username.toLowerCase().trim(),
  });

  if (!user) notFound();

  return (
    <>
      <div className="flex items-center justify-center bg-gradient px-4 py-14 min-h-screen">
        <div className="w-[min(700px,_100%)] bg-background rounded-3xl">
          <div className="px-4 sm:px-6 py-10 sm:py-12">
            {/* header */}
            <header className="flex flex-col items-center gap-5 mb-7">
              {/* <span className="text-xl font-semibold font-geistMono">
                Enigma
              </span> */}
              <Logo />

              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-medium mb-1">
                  Say something
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {/* Leave a message for chideraemmanuel here! */}
                  Leave a message for {user.username.toUpperCase()} here!
                </p>
              </div>
            </header>

            {/* form */}
            <MessageForm userId={user.toJSON()._id.toString()} />

            {/* <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                Register
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessagePage;
