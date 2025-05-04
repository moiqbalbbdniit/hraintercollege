import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/sign-in',
    '/studentRegister',
    '/teacherRegister',
    '/',
    '/verify/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Redirect logged-in users away from login/register/home
  if (
    token &&
    (pathname === '/' ||
      pathname.startsWith('/sign-in') ||
      pathname.startsWith('/studentRegister') ||
      pathname.startsWith('/teacherRegister') ||
      pathname.startsWith('/verify'))
  ) {
    const target =
      token.role === 'Teacher' ? '/dashboard/teacher' : '/dashboard/student';
    return NextResponse.redirect(new URL(target, request.url));
  }

  // Redirect not logged-in users away from protected routes
  if (
    !token &&
    (pathname.startsWith('/dashboard'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Role-based access control
  if (token && pathname.startsWith('/dashboard')) {
    if (
      pathname.startsWith('/dashboard/teacher') &&
      token.role !== 'Teacher'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (
      pathname.startsWith('/dashboard/student') &&
      token.role !== 'Student'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
