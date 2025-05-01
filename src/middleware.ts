import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/studentSignin', '/studentRegister', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/studentSignin') ||
      url.pathname.startsWith('/studentRegister') ||
      url.pathname.startsWith('/verify/:path*') ||
      url.pathname.startsWith('/dashboard/:path*') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard' )|| url.pathname.startsWith('/verify/:path*')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}