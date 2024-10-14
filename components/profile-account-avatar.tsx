import React, { FC } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import connectToDatabase from '@/lib/connect-to-database';
import getUser from '@/lib/get-user';

interface Props {}

const ProfileAccountAvatar: FC<Props> = async () => {
  const user = await getUser();

  return (
    <>
      <Avatar className="h-8 md:h-10 w-8 md:w-10">
        <AvatarFallback className="text-sm md:text-base">
          {user?.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </>
  );
};

export default ProfileAccountAvatar;
