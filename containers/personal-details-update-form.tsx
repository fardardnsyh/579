'use client';

import { updateProfile } from '@/actions/profile';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  username: string;
  email: string | null;
}

const PersonalDetailsUpdateForm: FC<Props> = ({ username, email }) => {
  const [formChanged, setFormChanged] = useState(false);
  const [usernameState, setUsernameState] = useState(username);
  const [emailState, setEmailState] = useState(email || '');

  const router = useRouter();

  const [state, action] = useFormState(updateProfile, null);

  //   const usernameRef = useRef<HTMLInputElement>(null);
  //   const emailRef = useRef<HTMLInputElement>(null);

  //   console.log('usernameRef.current?.value', usernameRef.current?.value);
  //   console.log('emailRef.current?.value', emailRef.current?.value);
  //   console.log('formChanged', formChanged);

  useEffect(() => {
    setFormChanged(false);

    if (usernameState !== username) {
      console.log('formChanged in username', { username, usernameState });
      setFormChanged(true);
    }

    if (email && emailState !== email) {
      console.log('formChanged in email', { email, emailState });
      setFormChanged(true);
    }

    if (!email && emailState !== '') {
      console.log('formChanged in email', { email, emailState });
      setFormChanged(true);
    }
  }, [usernameState, emailState]);

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success('Update successful');
      // reset form state
      setFormChanged(false);
      setUsernameState(username);
      setEmailState(email || '');
    }
  }, [state]);

  return (
    <>
      <form
        action={(formData) => {
          if (!formChanged) return;
          action(formData);
        }}
        className="w-[min(546px,_100%)]"
      >
        <div className="pb-9 flex flex-col gap-5">
          <FormInput
            label="Username"
            id="username"
            placeholder="Enter your username"
            name="username"
            // defaultValue={username}
            error={state?.errors?.username?.[0]}
            value={usernameState}
            onChange={(e) => setUsernameState(e.target.value)}
          />
          <FormInput
            label="Email Address"
            placeholder="Enter your email address"
            id="email"
            name="email"
            // defaultValue={email || ''}
            error={state?.errors?.email?.[0]}
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
          />
        </div>

        <SubmitButton disabled={!formChanged} />
      </form>
    </>
  );
};

export default PersonalDetailsUpdateForm;

const SubmitButton: FC<{ disabled: boolean }> = ({ disabled }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="self-start" disabled={pending || disabled}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </>
  );
};
