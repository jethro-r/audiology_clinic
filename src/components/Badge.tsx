"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "outline-primary";
}

const Badge = ({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    default: "bg-muted/10 text-muted border border-muted/20",
    primary: "bg-primary/10 text-primary border border-primary/30",
    secondary: "bg-secondary/10 text-secondary border border-secondary/30",
    "outline-primary": "text-secondary-light border border-secondary/40",
    outline: "border border-border text-foreground",
  };

  return (
    <span
      className={cn(
        "inline-block px-4 py-1.5 rounded-full text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
