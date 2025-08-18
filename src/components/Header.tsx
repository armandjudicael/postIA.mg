import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Menu, User, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-sm opacity-50" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PostIA.mg
              </h1>
              <Badge variant="secondary" className="text-xs">
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            Dashboard
          </a>
          <a href="#templates" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            Templates
          </a>
          <a href="#analytics" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            Analytics
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-smooth">
            Pricing
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>

          <Button variant="hero" className="hidden sm:flex">
            Get Started
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;