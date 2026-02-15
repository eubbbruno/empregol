import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonHover } from "@/lib/animations";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-cta text-white shadow-md hover:shadow-lg hover:opacity-90",
        primary:
          "bg-gradient-primary text-white shadow-md hover:shadow-lg hover:opacity-90",
        secondary:
          "bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 shadow-sm",
        ghost:
          "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900",
        outline:
          "border-2 border-gray-200 bg-transparent text-gray-900 hover:bg-gray-50 hover:border-gray-300",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-md",
        link: "text-purple-600 underline-offset-4 hover:underline",
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
        <motion.div
          variants={buttonHover}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="inline-block"
        >
          <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </motion.div>
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
