'use client';

import { logoutUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { LogOutIcon, User2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import FullScreenSpinner from './full-screen-spinner';

interface Props {
  avatar: React.ReactNode;
}

const ProfileAccountButton: FC<Props> = ({ avatar }) => {
  const [state, action] = useFormState(logoutUser, null);

  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }

    if (state?.success) {
      toast.success('Logout successful');
      // router.replace('/auth/login');
    }
  }, [state]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
          {avatar} {/* server component */}
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[242px] flex flex-col gap-2 rounded-[8px] p-2"
          align="end"
        >
          {/* <CurrentAccount account={account} /> */}

          <DropdownMenuItem asChild>
            <Link
              href={`/profile/settings`}
              className="flex items-center gap-2 p-4 rounded-[8px]"
            >
              <User2Icon className="h-4 w-4" />
              <span>Manage profile</span>
            </Link>
          </DropdownMenuItem>

          {/* <form action={action}> */}

          <LogoutButton action={action} />
          {/* </form> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileAccountButton;

const LogoutButton: FC<{ action: () => void }> = ({ action }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending && <FullScreenSpinner />}
      <DropdownMenuItem
        asChild
        className="text-[#EB5757] focus:text-[#EB5757] focus:bg-[rgba(235,_87,_87,_0.3)]"
      >
        <button
          className="flex items-center gap-2 p-4 rounded-[8px]"
          onClick={() => action()}
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </DropdownMenuItem>
    </>
  );
};
