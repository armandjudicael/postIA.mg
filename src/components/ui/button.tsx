import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        // Primary dark button with yellow highlights
        default: "bg-card text-card-foreground border border-border hover:bg-highlight hover:text-highlight-foreground hover:border-highlight shadow-card hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        
        // Yellow highlight button (main CTA)
        highlight: "bg-highlight text-highlight-foreground shadow-button hover:bg-highlight-hover hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        
        // Destructive with proper dark theme
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card hover:shadow-md border border-destructive/20",
        
        // Outline with yellow highlights on hover
        outline: "border border-border bg-transparent hover:bg-highlight/10 hover:text-highlight hover:border-highlight transition-all duration-200",
        
        // Secondary with dark theme
        secondary: "bg-muted text-muted-foreground hover:bg-highlight/20 hover:text-highlight shadow-card hover:shadow-md transition-all duration-200",
        
        // Ghost with yellow highlights
        ghost: "hover:bg-highlight/10 hover:text-highlight hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        
        // Link with yellow color
        link: "text-highlight underline-offset-4 hover:underline hover:text-highlight-hover transition-colors duration-200",
        
        // Hero button with gradient and glow
        hero: "bg-gradient-hero text-foreground shadow-glow px-8 py-4 text-lg font-semibold hover:shadow-elegant hover:scale-[1.05] active:scale-[0.95] animate-pulse-glow relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-highlight/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        
        // Accent with yellow theme
        accent: "bg-accent text-accent-foreground border border-accent/20 hover:bg-highlight hover:text-highlight-foreground hover:border-highlight shadow-card hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        
        // Glass effect for dark theme
        glass: "glass-effect text-foreground border-highlight/20 hover:bg-highlight/20 hover:border-highlight/40 backdrop-blur-md transition-all duration-300",
        
        // Success variant
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-card hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        
        // Warning variant (yellow)
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-card hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        
        // Info variant
        info: "bg-info text-info-foreground hover:bg-info/90 shadow-card hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        
        // Premium gradient with yellow accents
        premium: "bg-gradient-to-r from-primary via-highlight to-primary bg-size-200 animate-gradient-x text-foreground shadow-glow hover:shadow-elegant hover:scale-[1.02]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        "2xl": "h-16 rounded-xl px-10 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        "icon-xl": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    // When using asChild, we can't add loading state as it would create multiple children
    // So we disable loading when asChild is true
    const shouldShowLoading = loading && !asChild;
    
    const Comp = asChild ? Slot : "button"
    
    const buttonContent = (
      <>
        {shouldShowLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn("flex items-center gap-2", shouldShowLoading && "opacity-0")}>
          {children}
        </span>
      </>
    );

    if (asChild) {
      // When asChild is true, we need to ensure we only pass a single child to Slot
      // We'll clone the child and merge the props
      const child = React.Children.only(children as React.ReactElement);
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          aria-busy={loading}
          {...props}
        >
          {child}
        </Slot>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {buttonContent}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }