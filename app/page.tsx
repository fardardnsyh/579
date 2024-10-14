import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gradient">
      {/* <div className="absolute inset-0 opacity-10">
        <Image
          src={bg2.src}
          alt="#"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div> */}
      <div
        // style={{ background: `url(${bg.src}) no-repeat center center/cover` }}
        className="min-h-screen relative z-[5]"
        // className="min-h-screen relative z-[5]"
      >
        <div className="sm:container px-4 mx-auto pt-4 md:pt-6 flex flex-col min-h-screen">
          <div className="flex justify-between items-center">
            {/* <Logo /> */}
            {/* <span className="text-xl font-semibold font-geistMono text-[hsl(224,_71.4%,_4.1%)]"> */}
            <span className="text-xl font-semibold font-geistMono text-transparent text-gradient bg-clip-text">
              Enigma
            </span>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant={'ghost'}
                className="text-[hsl(224,_71.4%,_4.1%)] hover:text-[hsl(224,_71.4%,_4.1%)] border border-transparent hover:border-primary hover:bg-transparent transition-colors"
              >
                <Link href={'/auth/login'}>Login</Link>
              </Button>

              <Button asChild>
                <Link href={'/auth/register'}>Register</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center">
            {/* <h1 className="text-4xl sm:text-5xl md:text-6xl text-[hsl(224,_71.4%,_4.1%)]"> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-transparent text-gradient bg-clip-text font-semibold">
              Get Honest Feedback, Anonymously
            </h1>

            <p className="text-[hsl(220,_8.9%,_46.1%)] text-sm sm:text-base md:text-lg md:w-[80%] font-medium">
              Create your profile, share your link, and receive anonymous
              feedback or messages from friends and followers. See what they
              have to say – all in good fun and completely anonymous!
            </p>

            <Button asChild>
              <Link href={'/auth/register'}>Try now</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
