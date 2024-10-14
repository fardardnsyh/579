import connectToDatabase from '@/lib/connect-to-database';
import User, { UserInterface } from '@/models/user';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

interface GenerateMetadataProps {
  params: { username: string };
}

export async function generateMetadata(
  { params: { username } }: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  await connectToDatabase();
  const user = await User.findOne<UserInterface>({
    username: username.toLowerCase().trim(),
  });

  if (!user) notFound();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Leave an Anonymous Feedback or Message for ${user?.username}`,
    description: `Share your thoughts anonymously with ${user?.username} on Enigma. Send messages or give feedback without revealing your identity`,
    // keywords: "${user?.username}, anonymous feedback, anonymous messages, leave feedback, Enigma, feedback link, send message, honest feedback",
    openGraph: {
      // images: [imageURL, ...previousImages],
      title: `Send an Anonymous Feedback or Message to ${user?.username}`,
      description: `Connect with ${user?.username} and share your thoughts anonymously through Enigma. A safe space for open, anonymous feedback.`,
      // url: 'https://enigmaa.vercel.app',
      url: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}`,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${username}`,
    },
  };
}

interface Props {
  children: React.ReactNode;
}

const SendMessageLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default SendMessageLayout;
