import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl glass border border-[var(--glass-border)] bg-transparent px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all",
          "focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-glow)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:border-[var(--glass-border-hover)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
