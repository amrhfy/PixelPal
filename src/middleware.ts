import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

interface JWTPayload {
  userId: string;
  role: string;
}

export async function middleware(request: NextRequest) {
  console.log("Middleware running for path:", request.nextUrl.pathname);

  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  // Add pathname to headers for use in layouts
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  if (!token && (isDashboardPage || isAdminPage)) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token) {
    const payload = await verifyJWT(token);
    
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    const decoded = payload as { userId: string; role: string };
    requestHeaders.set('x-user-role', decoded.role);

    if (isAuthPage) {
      const redirectUrl = decoded.role === 'ADMIN' ? '/admin' : '/dashboard';
      console.log("Redirecting from auth page to:", redirectUrl);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    if (isAdminPage && decoded.role !== 'ADMIN') {
      console.log("Non-admin attempting to access admin route");
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/admin/:path*',
    '/dashboard/:path*'
  ]
}; 
