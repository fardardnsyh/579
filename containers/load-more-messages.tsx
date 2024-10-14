'use client';

import { getMessages } from '@/actions/message';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageInterface } from '@/models/message';
import { Loader2 } from 'lucide-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  nextPage: number | null;
}

let page = 2;

const LoadMoreMessages: FC<Props> = ({ nextPage }) => {
  const getMessagesWithPage = getMessages.bind(null, page);
  const [state, action] = useFormState(getMessagesWithPage, null);

  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [loadMoreButton, setLoadMoreButton] = useState(nextPage ? true : false);

  const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   formRef.current?.requestSubmit();
  //   console.log('requested submit');
  // }, []);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    if (state?.success) {
      console.log('state?.pagination?.next_page', state?.pagination?.next_page);
      // if (page > 1) {
      setMessages(state.data);
      // }

      if (!state.pagination.next_page) {
        setLoadMoreButton(false);
      }
      page++;
    }
  }, [state]);

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
  return (
    <>
      {nextPage && (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(370px,_1fr))] gap-3 mb-5 mt-3">
            {messages.map((message) => (
              <Card
                key={message._id as string}
                className="flex flex-col justify-between min-h-[170px] md:min-h-[200px]"
              >
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl">Message:</CardTitle>
                  <CardDescription className="text-base">
                    {message.message}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="p-4 md:p-6">
                  <span className="text-sm font-medium">
                    {dateFormatter.format(message.createdAt)}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {loadMoreButton && (
            <form ref={formRef} action={action}>
              <LoadMoreButton />
            </form>
          )}
        </>
      )}
    </>
  );
};

export default LoadMoreMessages;

const LoadMoreButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="w-full h-12 text-base" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Load more
      </Button>
    </>
  );
};
