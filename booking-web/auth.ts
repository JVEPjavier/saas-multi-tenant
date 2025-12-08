/**
 * Auth.js Configuration
 * Custom credentials provider for Laravel backend
 */

import NextAuth from 'next-auth';
import type { User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import { login as apiLogin } from './lib/auth-api';
import type { Customer } from '@/types';

// Extend the built-in session type
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            phone: string;
            tenantId: number;
        };
        accessToken: string;
        customer: Customer;
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        phone: string;
        tenantId: number;
        token: string;
        customer: Customer;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        phone?: string;
        tenantId?: number;
        accessToken?: string;
        customer?: Customer;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                tenant_slug: { label: 'Tenant', type: 'text' },
                phone: { label: 'Phone', type: 'text' },
            },
            async authorize(credentials): Promise<User | null> {
                try {
                    if (!credentials?.tenant_slug || !credentials?.phone) {
                        return null;
                    }

                    // Call Laravel API
                    const response = await apiLogin({
                        tenant_slug: credentials.tenant_slug as string,
                        phone: credentials.phone as string,
                    });

                    if (response.customer && response.token) {
                        // Return user object with token
                        return {
                            id: response.customer.id.toString(),
                            name: response.customer.name,
                            email: response.customer.email || '',
                            phone: response.customer.phone,
                            tenantId: response.customer.tenant_id,
                            token: response.token,
                            customer: response.customer,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User | null }): Promise<JWT> {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.phone = user.phone;
                token.tenantId = user.tenantId;
                token.accessToken = user.token;
                token.customer = user.customer;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            // Add custom fields to session
            if (token && token.id) {
                session.user.id = token.id;
                session.user.phone = token.phone ?? '';
                session.user.tenantId = token.tenantId ?? 0;
                session.accessToken = token.accessToken ?? '';
                session.customer = token.customer ?? {} as Customer;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    secret: process.env.AUTH_SECRET,
});

