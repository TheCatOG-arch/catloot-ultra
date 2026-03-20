import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "cyan" | "magenta";
  animate?: boolean;
}

export const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ className, children, glowColor = "cyan", animate = true, ...props }, ref) => {
    const Component = animate ? motion.div : "div";
    
    const glowClass = glowColor === "cyan" 
      ? "border-primary/50 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]" 
      : "border-secondary/50 shadow-[0_0_15px_rgba(188,19,254,0.1)] hover:border-secondary hover:shadow-[0_0_20px_rgba(188,19,254,0.2)]";

    return (
      <Component
        ref={ref as any}
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={animate ? { duration: 0.5 } : undefined}
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-md p-6 transition-all duration-300",
          glowClass,
          className
        )}
        {...props}
      >
        {/* Subtle top-left glare */}
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
        
        <div className="relative z-10">
          {children}
        </div>
      </Component>
    );
  }
);
CyberCard.displayName = "CyberCard";
