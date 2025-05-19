import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIconSvg(name: string, wordmark = false) {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original${wordmark ? "-wordmark" : ""}.svg`;
}

export const getDuration = (
  startDate: Date | string | null,
  endDate?: Date | string | null,
) => {
  if (typeof startDate === "string") {
    startDate = new Date(startDate);
  }
  if (typeof endDate === "string") {
    endDate = new Date(endDate);
  }

  if (!startDate) return "";
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diff = Math.floor((end.getTime() - start.getTime()) / 1000);

  if (diff < 60) {
    return `${diff}s`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  } else {
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateShort = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function getElapsedTime(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}
