import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "border-transparent bg-primary text-primary-foreground shadow",
        variant === "secondary" && "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "outline" && "text-foreground border-border",
        variant === "destructive" && "border-transparent bg-destructive/20 text-red-400 border border-red-500/20",
        variant === "success" && "border-transparent bg-green-500/10 text-green-400 border border-green-500/20",
        variant === "warning" && "border-transparent bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        variant === "info" && "border-transparent bg-blue-500/10 text-blue-400 border border-blue-500/20",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
