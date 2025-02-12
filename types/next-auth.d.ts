import 'next-auth';

declare module 'next-auth' {
    interface User {
        accessToken?: string;
        role?: string;
    }

    interface Session {
        accessToken?: string;
        user: {
            role?: string;
        } & DefaultSession['user'];
    }

    interface JWT {
        accessToken?: string;
        role?: string;
    }
} 