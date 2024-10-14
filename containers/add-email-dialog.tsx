'use client';

import { completeOnboarding, updateProfile } from '@/actions/profile';
import FormInput from '@/components/form-input';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  showDialog: boolean;
}

const AddEmailDialog: FC<Props> = ({ showDialog }) => {
  const [dialogOpen, setDialogOpen] = useState(showDialog);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | undefined>(undefined);

  //   const [state, action] = useFormState(updateProfile, null);

  //   useEffect(() => {
  //     if (state?.error) {
  //       // console.log('state.error', state.error);
  //       toast.error(state.error);
  //     }

  //     if (state?.success) {
  //       toast.success('Email added successfully');
  //       setDialogOpen(false);
  //     }
  //   }, [state]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {/* <AlertDialogContent> */}
        <AlertDialogContent className="rounded-[16px] w-[min(480px,_90%)]">
          {/* <form action={action}> */}
          <AlertDialogHeader className="!text-center mb-7">
            <AlertDialogTitle>Add Email</AlertDialogTitle>
            <AlertDialogDescription>
              Add an email address to your profile to help you reset your
              password if needed. You can add en email later in your profile
              settings.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <FormInput
            label="Email Address"
            placeholder="Enter your email address"
            id="email"
            name="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // error={state?.errors?.email?.[0]}
            error={inputError}
          />

          <AlertDialogFooter className="mt-5">
            <Button
              variant={'outline'}
              type="button"
              className="w-full h-12 text-base bg-accent"
              onClick={async () => {
                const response = await completeOnboarding();

                if (response?.inputError) {
                  setInputError(response.inputError);
                }

                if (response?.error) {
                  toast.error(response.error);
                }

                if (response?.success) {
                  setDialogOpen(false);
                }
              }}
            >
              Later
            </Button>

            <form
              className="w-full"
              action={async () => {
                const response = await completeOnboarding(inputValue);

                if (response?.inputError) {
                  setInputError(response.inputError);
                }

                if (response?.error) {
                  toast.error(response.error);
                }

                if (response?.success) {
                  toast.success('Email added successfully');
                  setDialogOpen(false);
                }
              }}
            >
              <SubmitButton />
            </form>
          </AlertDialogFooter>
          {/* </form> */}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddEmailDialog;

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button className="w-full h-12 text-base" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add Email
      </Button>
    </>
  );
};
