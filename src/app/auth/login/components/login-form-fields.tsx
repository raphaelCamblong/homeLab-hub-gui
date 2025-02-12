"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

interface LoginFormFieldsProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isLoading: boolean;
}

export function LoginFormFields({ onSubmit, isLoading }: LoginFormFieldsProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    autoComplete="name"
                    autoFocus
                    disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    disabled={isLoading}
                />
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader size={16} className="mr-2" />
                        Logging in...
                    </>
                ) : (
                    'Login'
                )}
            </Button>
        </form>
    );
} 