'use client';

import { updateProfile } from '@/actions/profile';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/helpers/cn';
import { Loader2 } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

type Requirement =
  | 'Min. 8 characters'
  // | 'Capital'
  // | 'Lowercase'
  | 'Number'
  | 'Symbol';

const passwordRequirements = [
  'Min. 8 characters',
  // 'Capital',
  // 'Lowercase',
  'Number',
  'Symbol',
];

interface Props {}

const PasswordUpdateForm: FC<Props> = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, action] = useFormState(updateProfile, null);

  // const validate = (requirement: Requirement) => {
  //   if (requirement === 'Min. 8 characters') {
  //     if (watchedPasswordChange.password?.length > 7) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   // if (requirement === 'Capital') {
  //   //   if (/[A-Z]/.test(watchedPasswordChange.password)) {
  //   //     return true;
  //   //   } else {
  //   //     return false;
  //   //   }
  //   // }
  //   // if (requirement === 'Lowercase') {
  //   //   if (
  //   //     /[a-z]/.test(watchedPasswordChange.password) &&
  //   //     watchedPasswordChange.password?.length > 0
  //   //   ) {
  //   //     return true;
  //   //   } else {
  //   //     return false;
  //   //   }
  //   // }
  //   if (requirement === 'Number') {
  //     if (/[0-9]/.test(watchedPasswordChange.password)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  //   if (requirement === 'Symbol') {
  //     if (/[$-/:-?{-~!"^_`\[\]]/.test(watchedPasswordChange.password)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  useEffect(() => {
    if (state?.error) {
      // console.log('state.error', state.error);
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success('Password updated successful');
      //  reset form state
      setPassword('');
      setConfirmPassword('');
    }
  }, [state]);

  return (
    <>
      <form action={action}>
        <div className="pb-9 flex flex-col gap-5">
          <FormInput
            label="New password"
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={state?.errors?.password?.[0]}
          />

          <FormInput
            label="Repeat new password"
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={state?.errors?.confirm_password?.[0]}
          />

          <div className="flex flex-wrap items-center gap-2 pt-6">
            {passwordRequirements.map((requirement) => (
              <span
                key={requirement}
                className={cn(
                  'bg-muted text-muted-foreground inline-block py-2 px-4 text-sm leading-[140%] tracking-[-1.44%] text-center rounded'
                  //   validate(requirement as Requirement)
                  //     ? 'bg-[#ECFDF3] text-[#027A48]'
                  //     : 'bg-[#F2F4F7] text-gray-400'
                )}
              >
                {requirement}
              </span>
            ))}
          </div>
        </div>

        <SubmitButton />
      </form>
    </>
  );
};

export default PasswordUpdateForm;

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="self-start" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create new password
      </Button>
    </>
  );
};
