"use client";

import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { runPipeline, stopPipeline } from "./run";
import React, { useState } from "react";
import { DialogTrigger } from "@/components/ui/dialog";

interface CreateJobButtonProps {
  pipelineId: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const CreateJobButton = React.forwardRef<
  HTMLButtonElement,
  CreateJobButtonProps
>(({ pipelineId, disabled, className, children, ...rest }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.defaultPrevented) return;

    setIsLoading(true);
    await runPipeline(pipelineId);
    setIsLoading(false);
  };

  return (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      className={cn(
        "gap-2 bg-white hover:bg-indigo-dye hover:text-white transition-colors",
        className
      )}
      disabled={disabled || isLoading}
      onClick={handleClick}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <PlayCircle className="h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
});

CreateJobButton.displayName = "CreateJobButton";

export function StopJobButton({
  pipelineId,
  disabled,
  className,
  children,
}: {
  pipelineId: string;
  disabled: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await stopPipeline(pipelineId);
    setIsLoading(false);
  };
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "gap-2 bg-white hover:bg-indigo-dye hover:text-white transition-colors",
        className
      )}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <StopCircle className="h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
}
