'use client';

import { useAuth } from "@/lib/hooks/useAuth";

export function WelcomeMessage() {
    const { user } = useAuth();

    return (
        <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
    );
} 