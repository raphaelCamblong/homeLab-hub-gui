import { Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
      <Shield className="w-16 h-16 text-red-500" />
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-muted-foreground text-center max-w-md">
        You don't have permission to access this page. Please contact your
        administrator if you think this is a mistake.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
