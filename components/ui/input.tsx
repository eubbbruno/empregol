import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all",
        "focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:bg-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "hover:border-gray-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
