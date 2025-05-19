"use client";
import { AlertCircle, RefreshCcw, RotateCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ErrorAlert({
  error,
  onRetry,
}: {
  error: Error;
  onRetry?: () => void;
}) {
  const router = useRouter();

  return (
    <Alert variant="destructive" className="mt-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <div className="space-y-3">
          <div>
            {error.message || "An error occurred while loading services"}
          </div>
          <div className="flex gap-2">
            {onRetry && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onRetry}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.refresh()}
              className="gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
