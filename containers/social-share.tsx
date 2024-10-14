'use client';

import React, { FC } from 'react';
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'next-share';
import WhatsAppIcon from '@/icons/whatsapp';
import FacebookIcon from '@/icons/facebook';
import XIcon from '@/icons/x';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  username: string;
}

const SocialShare: FC<Props> = ({ username }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-7">
        <div className="flex items-center justify-between gap-5 p-3 md:p-5 h-16 md:h-20 border border-primary rounded-full">
          <span className="w-[80%] truncate text-sm md:text-base">
            {/* https://enigma.vercel.app/chidera */}
            {/* https://enigma.vercel.app/{user.username} */}
            {process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/{username}
          </span>
          <Button
            className="px-3 md:px-3"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${username}`
              );
              toast.success('Link copied');
            }}
          >
            Copy link
          </Button>
        </div>

        <WhatsappShareButton
          url={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${username}`}
          title="Send an anonymous message to me on Enigma. 🤭😏👀"
        >
          <Button className="flex items-center gap-3 w-full h-16 md:h-20 bg-[#40c351] hover:bg-[#40c351] hover:bg-opacity-90">
            <WhatsAppIcon size={32} />
            <span>Share on WhatsApp</span>
          </Button>
        </WhatsappShareButton>

        <FacebookShareButton
          url={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${username}`}
          title="Send an anonymous message to me on Enigma. 🤭😏👀"
        >
          <Button className="flex items-center gap-3 w-full h-16 md:h-20 bg-[rgba(3,154,229,0.9)] hover:bg-[rgba(3,154,229,0.8)]">
            <FacebookIcon size={32} />
            <span>Share on Facebook</span>
          </Button>
        </FacebookShareButton>

        <TwitterShareButton
          url={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${username}`}
          title="Send an anonymous message to me on Enigma. 🤭😏👀"
        >
          <Button className="flex items-center gap-3 w-full h-16 md:h-20 bg-white text-black hover:bg-white/90">
            <XIcon size={32} />
            <span>Share on X</span>
          </Button>
        </TwitterShareButton>
      </div>
    </>
  );
};

export default SocialShare;
