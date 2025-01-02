import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

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
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key'
      );

      const { payload } = await jose.jwtVerify(token, secret);
      const decoded = payload as unknown as JWTPayload;
      console.log("Token decoded:", decoded);

      // Add role to headers
      requestHeaders.set('x-user-role', decoded.role);

      // If on auth pages with valid token, redirect to appropriate dashboard
      if (isAuthPage) {
        const redirectUrl = decoded.role === 'ADMIN' ? '/admin' : '/dashboard';
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }

      // Handle admin routes - ensure only admins can access
      if (isAdminPage && decoded.role !== 'ADMIN') {
        console.log("Non-admin attempting to access admin route");
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Allow access to dashboard routes with headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
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
