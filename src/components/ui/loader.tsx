import { Loader2, LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoaderProps extends Omit<LucideProps, "ref"> {
  size?: number
}

export function Loader({ size = 24, className, ...props }: LoaderProps) {
  return (
    <Loader2
      className={cn("animate-spin", className)}
      size={size}
      {...props}
    />
  )
}
