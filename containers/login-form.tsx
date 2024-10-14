'use client';

import { loginUser } from '@/actions/auth';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {}

const LoginForm: FC<Props> = () => {
  const [state, action] = useFormState(loginUser, null);
  const router = useRouter();

  console.log('state', state);

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      // console.log('state.user', state.data);
      toast.success('Login successful');
      router.replace('/profile');
    }
  }, [state]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5 mb-3">
        <FormInput
          label="Username or Email"
          placeholder="Enter your username or email"
          name="username"
          error={state?.errors?.username?.[0]}
        />

        <FormInput
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          addForgotPassword
          passwordResetInitiationHref="/auth/reset-password/initiate"
          error={state?.errors?.password?.[0]}
        />

        <div className="mt-5">
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default LoginForm;

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="w-full h-12 text-base" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
    </>
  );
};
