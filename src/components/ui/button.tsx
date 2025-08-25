import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-button hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline: "border border-border bg-background hover:bg-muted hover:text-foreground hover:border-primary/50 transition-all duration-200",
        secondary: "bg-gradient-secondary text-secondary-foreground shadow-elegant hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-muted hover:text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        hero: "bg-gradient-hero text-white shadow-glow px-8 py-4 text-lg font-semibold hover:shadow-elegant hover:scale-[1.05] active:scale-[0.95] animate-pulse-glow relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        accent: "bg-gradient-accent text-accent-foreground shadow-elegant hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        glass: "glass-effect text-white border-white/20 hover:bg-white/20 backdrop-blur-md hover:border-primary/30 transition-all duration-300",
        warning: "bg-ai-warning text-black shadow-button hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        success: "bg-ai-success text-white shadow-button hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        premium: "bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient-x text-primary-foreground shadow-glow hover:shadow-elegant hover:scale-[1.02]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
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