'use client';

import { registerUser } from '@/actions/auth';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {}

const RegistrationForm: FC<Props> = () => {
  const [state, action] = useFormState(registerUser, null);
  const router = useRouter();

  console.log('state', state);

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      // console.log('state.user', state.data);
      toast.success('Account created successfully');
      router.replace('/profile');
    }
  }, [state]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5 mb-3">
        <FormInput
          label="Username"
          name="username"
          placeholder="e.g johndoe"
          error={state?.errors?.username?.[0]}
        />

        <FormInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          error={state?.errors?.password?.[0]}
        />

        <FormInput
          label="Confirm password"
          name="confirm_password"
          placeholder="Confirm your password"
          type="password"
          error={state?.errors?.confirm_password?.[0]}
        />

        <div className="mt-5">
          <SubmutButton />
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;

const SubmutButton: FC<{}> = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full h-12 text-base" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create account
    </Button>
  );
};
