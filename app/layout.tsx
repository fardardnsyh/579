import React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/providers';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'Get Anonymous Feedback and Messages - Enigma',
    template: '%s - Enigma',
  },
  description:
    'Sign up to create your own profile and receive anonymous feedback or messages from friends. Share your link and get insights without revealing identities. Perfect for open conversations and fun interactions.',
  keywords:
    'anonymous feedback, anonymous messages, feedback tool, anonymous messaging, feedback link, share link, receive messages, anonymous questions, honesty tool, open communication',
  openGraph: {
    title: 'Receive Feedback and Messages Anonymously with Enigma',
    description:
      'Create a profile on Enigma and share your link to receive anonymous feedback from friends and followers.',
    // url: 'https://enigmaa.vercel.app',
    url: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="dark">
        {/* <html lang="en"> */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
