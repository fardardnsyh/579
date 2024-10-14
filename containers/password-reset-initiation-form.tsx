'use client';

import { initiatePasswordReset } from '@/actions/auth';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {}

const PasswordResetInitiationForm: FC<Props> = () => {
  const [state, action] = useFormState(initiatePasswordReset, null);

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      //   toast.success('Mail sent successfully');
      toast.success(state?.success);
      //   router.replace('/profile');
    }
  }, [state]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5 mb-3">
        <FormInput
          label="Username or Email"
          placeholder="Enter your username or email"
          name="username"
          error={state?.inputError}
        />

        <div className="mt-5">
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default PasswordResetInitiationForm;

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="w-full h-12 text-base" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send reset email
      </Button>
    </>
  );
};
