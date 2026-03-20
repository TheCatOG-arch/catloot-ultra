import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary/10 border-primary text-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]",
      secondary: "bg-secondary/10 border-secondary text-secondary hover:bg-secondary/20 hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]",
      outline: "bg-transparent border-muted-foreground/50 text-foreground hover:border-primary hover:text-primary",
      ghost: "border-transparent bg-transparent text-muted-foreground hover:text-primary"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        disabled={disabled || isLoading}
        className={cn(
          "relative flex items-center justify-center gap-2 overflow-hidden rounded-xl border px-6 py-3 font-display font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
        
        {/* Animated sheen */}
        {!disabled && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent hover:animate-[shimmer_1.5s_infinite]" />
        )}
      </motion.button>
    );
  }
);
CyberButton.displayName = "CyberButton";
