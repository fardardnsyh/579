import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgb(222, 168, 248) 0%, rgb(168, 222, 248) 21.8%, rgb(189, 250, 205) 35.6%, rgb(243, 250, 189) 52.9%, rgb(250, 227, 189) 66.8%, rgb(248, 172, 172) 90%, rgb(254, 211, 252) 99.7%)',
          fontSize: 100,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundImage:
              'radial-gradient( circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)',
            backgroundClip: 'text',
            '-webkit-background-clip': 'text',
            color: 'transparent',
          }}
        >
          Enigma
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

{
  /* <svg
  class="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
  width="100%"
  height="100%"
>
  <filter id="noise">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.80"
      numOctaves="4"
      stitchTiles="stitch"
    ></feTurbulence>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)"></rect>
</svg>; */
}
