import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect to login if unauthenticated on protected routes
    // (Handled automatically by withAuth if not logged in at all, but we can add specific logic here)

    // Example RBAC Logic:
    
    // 1. Admin Routes
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // 2. Vendor Routes
    if (pathname.startsWith('/vendor') && token?.role !== 'VENDOR' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Allow everything else
    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true to allow the middleware function to run, false to redirect to signIn page
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        
        // Protect /admin and /vendor explicitly
        // Do NOT protect /my-account here because it acts as both the login page and the dashboard.
        // The /my-account page component will handle showing the login form vs dashboard.
        if (
          pathname.startsWith('/admin') ||
          pathname.startsWith('/vendor')
        ) {
          return !!token;
        }
        
        return true; // Allow access to public pages
      },
    },
    pages: {
      signIn: '/my-account', // Redirect unauthorized users here
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/vendor/:path*'
  ],
};
