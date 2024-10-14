'use client';

import { logoutUser } from '@/actions/auth';
import FullScreenSpinner from '@/components/full-screen-spinner';
import ProfileAccountAvatar from '@/components/profile-account-avatar';
import ProfileAccountButton from '@/components/profile-account-button';
import ThemeSwitcher from '@/components/theme-switcher';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NAVIGATION_LINKS } from '@/constants';
import { cn } from '@/lib/helpers/cn';
import { LogOutIcon, User2, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';

interface Props {
  avatar: React.ReactNode;
}

const ProfileHeader: FC<Props> = ({ avatar }) => {
  const pathname = usePathname();

  return (
    <>
      <header className="border-b h-14 md:h-[70px] sticky top-0 z-20 bg-background">
        <div className="md:container px-3 h-full flex items-center gap-5">
          <div className="flex-1 flex items-center gap-4 md:gap-10">
            <Link
              href={'/'}
              className="text-lg md:text-xl font-semibold font-geistMono text-transparent text-gradient dark:bg-gradient bg-clip-text dark:bg-clip-text"
            >
              Enigma
            </Link>

            <ul className="flex items-center gap-2 md:gap-3">
              {NAVIGATION_LINKS.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors capitalize',
                      link.href === pathname && 'text-primary font-semibold'
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 md:gap-2">
            <ThemeSwitcher />

            <ProfileAccountButton avatar={avatar} />
          </div>
        </div>
      </header>
    </>
  );
};

export default ProfileHeader;
