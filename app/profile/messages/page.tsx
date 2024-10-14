import SessionUpdater from '@/components/session-updater';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { messagesFetchLimit } from '@/constants';
import LoadMoreMessages from '@/containers/load-more-messages';
import getUser from '@/lib/get-user';
import { updateSession } from '@/lib/session';
import updateSessionViaAPI from '@/lib/update-session-via-api';
import Message, { MessageInterface } from '@/models/message';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React, { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your messages',
  description: '', // remove root description (and OG description)
};

export const dynamic = 'force-dynamic';

interface Props {}

const MessagesPage: FC<Props> = async () => {
  const user = await getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // await updateSessionViaAPI();

  const messages = await Message.find<MessageInterface>({ user_id: user._id })
    // .skip((1 - 1) * 2)
    .limit(messagesFetchLimit)
    .sort({ createdAt: -1 })
    .exec();

  // console.log('messagesss', messages);

  // total_records
  const total_records = await Message.countDocuments({
    user_id: user._id,
  });
  // total_pages
  const total_pages = Math.ceil(total_records / messagesFetchLimit);
  // next_page
  const next_page = total_pages === 0 || 1 === total_pages ? null : 1 + 1;

  console.log('neeeexxt page', next_page);

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  return (
    <>
      <SessionUpdater />
      <div className="py-5 md:py-7 flex flex-col min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-70px)]">
        <div className="pb-4 md:pb-5">
          <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
            {/* Hello, Chidera */}
            Hello, {user.username}
          </span>

          <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
            Your messages
          </h1>
        </div>

        <div className="flex-1 flex flex-col bg-secondary dark:bg-slate-900 px-5 md:px-8 py-9 rounded-[16px] border">
          <p className="text-sm sm:text-base md:text-lg text-center text-muted-foreground mb-7 md:mb-12">
            Please note that messages will be deleted automatically in 48 hours
            after they were sent.
          </p>

          {messages.length === 0 ? (
            <div className="flex-1 w-full h-full flex items-center justify-center">
              <p>You do not have any messages</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-3">
                {messages.map((message) => (
                  <Card
                    key={message._id as string}
                    className="flex flex-col justify-between min-h-[170px] md:min-h-[200px]"
                  >
                    <CardHeader className="p-4 md:p-6">
                      {/* <CardTitle className="text-lg md:text-xl">
                        Message:
                      </CardTitle>
                      <CardDescription className="text-base whitespace-pre-line">
                        {message.message}
                      </CardDescription> */}
                      <CardDescription className="text-base whitespace-pre-line">
                        Message:
                      </CardDescription>
                      <CardTitle className="text-lg md:text-xl">
                        {message.message}
                      </CardTitle>
                    </CardHeader>

                    <CardFooter className="p-4 md:p-6">
                      <span className="text-sm font-medium text-muted-foreground">
                        {/* 27 September, 2024 at 2:17 PM */}
                        {/* {message.createdAt.toLocaleString()} */}
                        {dateFormatter.format(message.createdAt)}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <LoadMoreMessages nextPage={next_page} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagesPage;

// function DisplayText({ text }) {
//   return <div style={{ whiteSpace: 'pre-line' }}>{text}</div>;
// }

// function DisplayText({ text }) {
//   return (
//     <div>
//       {text.split('\n').map((line, index) => (
//         <React.Fragment key={index}>
//           {line}
//           <br />
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
