import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "glass";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-lg",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "outline" && "border border-border bg-transparent hover:bg-secondary/50 hover:text-secondary-foreground",
          variant === "ghost" && "hover:bg-secondary/50 hover:text-secondary-foreground",
          variant === "destructive" && "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          variant === "glass" && "glass-panel text-foreground hover:bg-primary/10 hover:border-primary/20",
          // Sizes
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3 text-xs",
          size === "lg" && "h-11 rounded-md px-8 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
