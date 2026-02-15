import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-cta text-white glow-cta hover:bg-gradient-cta-hover hover:shadow-[0_0_40px_var(--accent-glow)]",
        primary:
          "bg-gradient-primary text-white glow-primary hover:shadow-[0_0_40px_var(--primary-glow)]",
        secondary:
          "glass glass-hover text-[var(--text-primary)] hover:border-[var(--primary-500)]",
        ghost:
          "bg-transparent hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]",
        outline:
          "border border-[var(--glass-border)] bg-transparent hover:bg-[var(--glass-bg)] hover:border-[var(--glass-border-hover)]",
        destructive:
          "bg-[var(--danger-500)] text-white hover:bg-[#DC2626] shadow-[0_0_20px_rgba(239,68,68,0.3)]",
        link: "text-[var(--primary-500)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animated?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animated = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    if (animated && !asChild) {
      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          variants={buttonHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          {...props}
        />
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
