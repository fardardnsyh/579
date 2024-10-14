import Link from 'next/link';
import React, { FC } from 'react';

interface Props {}

const Logo: FC<Props> = () => {
  return (
    <>
      <Link
        href={'/'}
        className="text-xl font-semibold font-geistMono text-transparent text-gradient dark:bg-gradient bg-clip-text dark:bg-clip-text"
      >
        Enigma
      </Link>
    </>
  );
};

export default Logo;
