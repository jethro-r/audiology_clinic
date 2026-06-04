import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
      secondary:
        "bg-[var(--secondary)] text-white hover:bg-[var(--secondary-dark)] focus-visible:ring-[var(--secondary)]",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary",
      ghost:
        "text-foreground hover:bg-gray-100 focus-visible:ring-gray-500",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm min-h-[36px]",
      md: "px-5 py-2.5 text-base min-h-[44px]",
      lg: "px-7 py-3 text-lg min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
