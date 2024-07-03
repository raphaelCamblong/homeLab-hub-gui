import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDev() {
  return process.env.NODE_ENV === "development"
}

export function isProd() {
  return process.env.NODE_ENV === "production"
}

export function getIconSvg(name: string, wordmark = false) {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original${wordmark ? '-wordmark': ''}.svg`
}
