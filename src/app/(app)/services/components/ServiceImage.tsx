"use client";

import Image from "next/image";
import { Settings } from "lucide-react";
import { useState } from "react";

interface ServiceImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "small" | "large";
}

export function ServiceImage({
  src,
  alt,
  className = "",
  size = "small",
}: ServiceImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded bg-muted">
        <Settings className={size === "small" ? "h-4 w-4" : "h-8 w-8"} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-contain ${className}`}
      onError={() => setError(true)}
      unoptimized
    />
  );
}
