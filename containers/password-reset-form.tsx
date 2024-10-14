'use client';

import { resetPassword } from '@/actions/auth';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  //   searchParams: {
  //     [key: string]: string | string[];
  //   };
  email: string;
  reset_string: string;
}

const PasswordResetForm: FC<Props> = ({ email, reset_string }) => {
  const resetPasswordWithCredentials = resetPassword.bind(null, {
    email,
    reset_string,
  });
  const [state, action] = useFormState(resetPasswordWithCredentials, null);

  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success('Password reset successfully');
      router.replace('/auth/login');
    }
  }, [state]);

  return (
    <>
      <form action={action} className="flex flex-col gap-5 mb-3">
        <FormInput
          label="New password"
          placeholder="Enter your new password"
          type="password"
          name="password"
          error={state?.errors?.password?.[0]}
        />

        <FormInput
          label="Confirm new password"
          placeholder="Confirm your new password"
          type="password"
          name="confirm_password"
          error={state?.errors?.confirm_password?.[0]}
        />

        <div className="mt-5">
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

export default PasswordResetForm;

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="w-full h-12 text-base" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Reset password
      </Button>
    </>
  );
};
