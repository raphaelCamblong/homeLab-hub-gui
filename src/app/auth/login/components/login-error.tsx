"use client";

interface LoginErrorProps {
    message: string;
}

export function LoginError({ message }: LoginErrorProps) {
    return (
        <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">
            {message}
        </div>
    );
} 