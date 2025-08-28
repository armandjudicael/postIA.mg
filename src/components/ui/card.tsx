import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "elevated" | "glass" | "gradient" | "outline" | "premium" | "highlight"
    hover?: boolean
  }
>(({ className, variant = "default", hover = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground transition-all duration-300",
      {
        // Default dark card
        "shadow-card hover:shadow-elegant border-border/50": variant === "default",
        
        // Elevated card with enhanced shadows
        "shadow-elegant hover:shadow-glow border-border/30 bg-gradient-card": variant === "elevated",
        
        // Glass effect for dark theme
        "glass-effect border-highlight/10 backdrop-blur-md": variant === "glass",
        
        // Gradient card with dark theme
        "bg-gradient-primary text-foreground border-0 shadow-glow": variant === "gradient",
        
        // Outline with yellow highlights
        "border-2 border-border hover:border-highlight/40 bg-card hover:bg-highlight/5": variant === "outline",
        
        // Premium card with yellow accents
        "bg-gradient-hero text-foreground border-0 shadow-glow animate-pulse-glow": variant === "premium",
        
        // Highlight card with yellow theme
        "bg-highlight/10 border-highlight/30 text-foreground hover:bg-highlight/20 hover:border-highlight": variant === "highlight",
      },
      hover && "hover:scale-[1.02] hover:-translate-y-1 cursor-pointer",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    gradient?: boolean
  }
>(({ className, gradient = false, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-card-foreground",
      gradient && "text-gradient-yellow",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }