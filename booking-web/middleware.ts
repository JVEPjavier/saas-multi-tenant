import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const session = await auth();

    // Protected routes
    const protectedRoutes = ['/dashboard', '/appointments', '/profile'];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth pages with active session
    const authRoutes = ['/auth/login', '/auth/register'];
    const isAuthRoute = authRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/appointments/:path*',
        '/profile/:path*',
        '/auth/:path*',
    ],
};
