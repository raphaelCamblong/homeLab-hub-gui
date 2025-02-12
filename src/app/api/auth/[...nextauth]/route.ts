import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import type { LoginResponse } from '@/types/api/Auth'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log(credentials);
                    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            username: credentials?.username,
                            password: credentials?.password,
                        }),
                    });

                    const data = await res.json() as LoginResponse;
                    const authToken = data['x-auth-token'];

                    if (!res.ok || !authToken) {
                        throw new Error('Authentication failed');
                    }

                    return {
                        id: "1",
                        name: credentials?.username || '',
                        email: '',
                        accessToken: authToken,
                        role: 'admin'
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    accessToken: user.accessToken,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role as string,
                },
                accessToken: token.accessToken as string,
            };
        },
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
        signOut: '/auth/logout',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
