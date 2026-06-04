"use client";

import { useInView } from "@/hooks/useInView";
import { type ReactNode } from "react";

type AnimationType = "fade-up" | "fade-left" | "fade-right";

interface AnimateInViewProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const animationClass: Record<AnimationType, string> = {
  "fade-up": "animate-fade-in",
  "fade-left": "animate-slide-in-left",
  "fade-right": "animate-slide-in-right",
};

export default function AnimateInView({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: AnimateInViewProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? animationClass[animation] : "opacity-0"}`}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
