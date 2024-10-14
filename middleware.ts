import { cookies } from 'next/headers';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import connectToDatabase from './lib/connect-to-database';

const protectedRoutes = ['/profile', '/profile/messages', '/profile/settings'];
const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/reset-password/initiate',
  '/auth/reset-password',
];

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const session_id = cookies().get('session_id')?.value;

  if (isProtectedRoute && !session_id) {
    // redirect to login page
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  if (isAuthRoute && session_id) {
    // redirect to profile page
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
