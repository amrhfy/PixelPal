import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // Add pathname to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Redirect authenticated users from auth pages
  if (isAuthPage && token) {
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
        headers: { Cookie: `token=${token}` }
      });
      
      if (!res.ok) {
        throw new Error('Invalid token');
      }
      
      const { user } = await res.json();
      return NextResponse.redirect(new URL(
        user?.role === 'ADMIN' ? '/admin' : '/dashboard',
        request.url
      ));
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Check authentication for protected routes
  if ((isAdminPage || isDashboardPage) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated, check user role for admin routes
  if (token && (isAdminPage || isDashboardPage)) {
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/auth/me`, {
        headers: { Cookie: `token=${token}` }
      });
      
      if (!res.ok) {
        throw new Error('Invalid token');
      }
      
      const { user } = await res.json();

      // Redirect non-admin users away from admin routes
      if (isAdminPage && user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Redirect admin users to admin dashboard
      if (isDashboardPage && user?.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders }
  });
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/admin/:path*',
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}; 
