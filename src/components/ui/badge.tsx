import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default dark badge
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        
        // Yellow highlight badge
        highlight: "border-transparent bg-highlight text-highlight-foreground hover:bg-highlight-hover shadow-button",
        
        // Secondary with dark theme
        secondary: "border-transparent bg-muted text-muted-foreground hover:bg-highlight/20 hover:text-highlight",
        
        // Destructive
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        
        // Success
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
        
        // Warning (yellow)
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        
        // Info
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        
        // Outline with yellow highlights
        outline: "text-foreground border-border hover:bg-highlight/10 hover:text-highlight hover:border-highlight",
        
        // Premium with gradient
        premium: "border-transparent bg-gradient-secondary text-highlight-foreground shadow-glow hover:shadow-elegant animate-pulse-glow",
        
        // Glass effect
        glass: "glass-effect border-highlight/20 text-foreground hover:bg-highlight/20",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }