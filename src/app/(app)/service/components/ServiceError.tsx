"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ServiceErrorProps {
    error: Error;
    reset?: () => void;
}

export const ServiceError: React.FC<ServiceErrorProps> = ({ error, reset }) => {
    const router = useRouter();

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading services</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                <p>{error.message}</p>
                <div className="flex gap-2">
                    {reset && (
                        <Button variant="outline" onClick={reset}>
                            Try again
                        </Button>
                    )}
                    <Button variant="outline" onClick={() => router.refresh()}>
                        Refresh page
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
    );
}; 