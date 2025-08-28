import { useState, ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  BarChart3, 
  Settings, 
  CreditCard,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Zap,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardLayout = ({ children, activeTab = "dashboard", onTabChange }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "posts", label: "Post Studio", icon: FileText },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const handleNavigation = (tabId: string) => {
    onTabChange?.(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md shadow-elegant">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleSidebar}
              className="hover:bg-highlight/10 hover:text-highlight focus-ring"
              aria-label="Toggle sidebar"
            >
              {isMobile ? (
                sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />
              ) : (
                sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
              )}
            </Button>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-secondary rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-card rounded-lg p-2 border border-highlight/20 group-hover:border-highlight/40 transition-all">
                  <Sparkles className="h-6 w-6 text-highlight animate-pulse-glow" />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-gradient-yellow group-hover:scale-105 transition-transform">
                  PostIA.mg
                </h1>
                <Badge variant="highlight" size="sm" className="text-[10px]">
                  <Sparkles className="h-2.5 w-2.5 mr-1" />
                  AI-Powered
                </Badge>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {/* Credits Card */}
            <Card variant="outline" className="hidden sm:block hover:border-highlight/40 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-highlight animate-pulse-glow" />
                    <span className="text-sm font-medium text-foreground">Credits: 250</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <Button variant="highlight" size="sm">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>

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
            
            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="hover:bg-highlight/10 hover:text-highlight transition-colors focus-ring"
              aria-label="User profile"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={handleLogout}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors focus-ring"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            ${isMobile 
              ? `fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : `relative transition-all duration-300 ease-in-out ${
                  sidebarCollapsed ? 'w-16' : 'w-64'
                }`
            }
            bg-card border-r border-border shadow-elegant flex flex-col
            ${isMobile ? 'w-64' : ''}
          `}
        >
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-6 scrollbar-thin">
            <nav className="px-3 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "highlight" : "ghost"}
                    className={`
                      w-full transition-all duration-200 
                      ${sidebarCollapsed && !isMobile ? 'justify-center px-2' : 'justify-start'}
                      ${isActive 
                        ? "shadow-button" 
                        : "hover:bg-highlight/10 hover:text-highlight"
                      }
                    `}
                    onClick={() => handleNavigation(item.id)}
                    title={sidebarCollapsed && !isMobile ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 ${
                      sidebarCollapsed && !isMobile ? '' : 'mr-3'
                    }`} />
                    {(!sidebarCollapsed || isMobile) && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Upgrade Prompt - Only show when not collapsed */}
            {(!sidebarCollapsed || isMobile) && (
              <div className="px-3 mt-6">
                <Card variant="highlight" className="text-center">
                  <CardContent className="p-4 space-y-3">
                    <div className="w-12 h-12 bg-highlight/20 rounded-xl flex items-center justify-center mx-auto">
                      <Sparkles className="h-6 w-6 text-highlight animate-pulse-glow" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">Upgrade to Pro</div>
                      <div className="text-xs text-muted-foreground">Unlock unlimited AI credits</div>
                    </div>
                    <Button variant="highlight" size="sm" className="w-full">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="padding-responsive">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;