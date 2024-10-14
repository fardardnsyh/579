'use client';

import { sendMessage } from '@/actions/message';
import TextareaInput from '@/components/textarea-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ObjectId } from 'mongoose';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  userId: any;
}

const MessageForm: FC<Props> = ({ userId }) => {
  const sendMessageWithID = sendMessage.bind(null, userId);
  const [state, action] = useFormState(sendMessageWithID, null);

  const router = useRouter();

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success(`Message sent successfully! Now it's your turn`);
      if (ref.current?.value) {
        ref.current.value = '';
      }

      setTimeout(() => {
        console.log('redirect now!');
        router.replace('/auth/register');
      }, 3000);
    }
  }, [state]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5">
        <TextareaInput
          className="resize-none h-40 px-4 py-4 rounded-xl bg-accent dark:bg-slate-800"
          placeholder="Type your message here"
          name="message"
          error={state?.errors?.[0]}
          ref={ref}
          maxLength={250}
        />

        <SubmitButton />
      </form>
    </>
  );
};

export default MessageForm;

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="w-full h-12 text-base" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send
      </Button>
    </>
  );
};
