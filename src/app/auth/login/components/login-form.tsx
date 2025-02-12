"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { LoginError } from "./login-error";
import { LoginFormFields } from "./login-form-fields";

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn("credentials", {
                username: name,
                password,
                redirect: false,
                callbackUrl,
            });

            if (!result?.error) {
                router.push(callbackUrl);
                router.refresh();
            } else {
                setError("Invalid name or password");
            }
        } catch (err) {
            setError("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="mx-auto max-w-sm shadow-lg">
            <CardHeader className="flex space-y-1 justify-center">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <LoginError message={error} />}
                <LoginFormFields
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
} 