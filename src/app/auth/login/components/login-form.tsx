"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginError } from "./login-error";
import { LoginFormFields } from "./login-form-fields";
import { signIn } from "next-auth/react";

const errorToMessage = new Map<string, string>([
  ["CredentialsSignin", "Invalid username or password"],
  ["SessionRequired", "Please sign in to continue"],
  ["AuthorizeError", "Authentication failed"],
  ["AccessDenied", "Access denied"],
  ["OAuthSignin", "Error in the OAuth sign-in process"],
  ["OAuthCallback", "Error in the OAuth callback process"],
  ["OAuthCreateAccount", "Could not create OAuth account"],
  ["EmailCreateAccount", "Could not create email account"],
  ["Callback", "Error in the authentication callback"],
  ["OAuthAccountNotLinked", "Email already in use with different provider"],
  ["EmailSignin", "Check your email inbox"],
  ["CredentialsSignup", "Could not sign up"],
  ["Verification", "The verification token expired or was invalid"],
]);

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
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setError("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
        return;
      }

      if (result?.error) {
        const errorMessage = errorToMessage.get(result.error) || result.error;
        console.error("Authentication error:", result.error);
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Exception during sign in:", err);
      setError(
        "An error occurred while connecting to the authentication service. Please try again later."
      );
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
        <LoginFormFields onSubmit={handleSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
