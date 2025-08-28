import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Menu, User, Bell, X, ChevronDown, Sun, Moon } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Don't render header on dashboard - handled by DashboardLayout
  if (isAuthenticated) {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleGetStarted = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
  };

  const handleUserLogin = () => {
    setAuthModalTab("login");
    setIsAuthModalOpen(true);
  };

  const navigationItems = [
    { label: "Features", href: "#features", hasDropdown: false },
    { label: "Templates", href: "#templates", hasDropdown: true },
    { label: "Analytics", href: "#analytics", hasDropdown: false },
    { label: "Pricing", href: "#pricing", hasDropdown: false },
  ];

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
      
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-elegant' 
          : 'bg-background/80 backdrop-blur-sm border-b border-border/20'
      }`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-secondary rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-card backdrop-blur-sm rounded-lg p-2 border border-highlight/20 group-hover:border-highlight/40 transition-all">
                  <Sparkles className="h-6 w-6 text-highlight animate-pulse-glow" />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-gradient-yellow group-hover:scale-105 transition-transform">
                  PostIA.mg
                </h1>
                <Badge variant="highlight" size="sm" className="text-[10px] px-2 py-0.5">
                  <Sparkles className="h-2.5 w-2.5 mr-1" />
                  AI-Powered
                </Badge>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                <a 
                  href={item.href} 
                  className="flex items-center text-sm font-medium text-foreground/80 hover:text-highlight transition-all duration-200 hover:scale-105 focus-ring rounded-md px-3 py-2"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="h-3 w-3 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </a>
                
                {/* Dropdown indicator */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-secondary group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={toggleTheme}
              className="hover:bg-highlight/10 hover:text-highlight transition-colors focus-ring"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="relative hover:bg-highlight/10 hover:text-highlight transition-colors focus-ring"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-secondary rounded-full animate-pulse-glow">
                <span className="sr-only">New notifications</span>
              </span>
            </Button>
            
            {/* User Account */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={handleUserLogin}
              className="hover:bg-highlight/10 hover:text-highlight transition-colors focus-ring"
              aria-label="User account"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* CTA Button */}
            <Button 
              variant="highlight" 
              size="lg"
              className="hidden sm:flex animate-bounce-in"
              onClick={handleGetStarted}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Get Started Free
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="lg:hidden hover:bg-highlight/10 hover:text-highlight transition-colors focus-ring"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4 space-y-3">
              {navigationItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-highlight/10 hover:text-highlight transition-colors focus-ring animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </a>
              ))}
              
              <div className="pt-4 border-t border-border/20">
                <Button 
                  variant="highlight" 
                  size="lg"
                  className="w-full animate-slide-up"
                  style={{ animationDelay: '0.4s' }}
                  onClick={handleGetStarted}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Started Free
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;