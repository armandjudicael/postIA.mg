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
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const DashboardLayout = ({ children, activeTab = "dashboard", onTabChange }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleSidebar}
              className="hover:bg-primary/10"
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
                <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-white rounded-lg p-2 border border-primary/20 group-hover:border-primary/40 transition-all">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
                </div>
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-gradient-primary group-hover:scale-105 transition-transform">
                  PostIA.mg
                </h1>
                <Badge variant="outline" size="sm" className="text-[10px] border-primary/20 text-primary">
                  <Sparkles className="h-2.5 w-2.5 mr-1" />
                  AI-Powered
                </Badge>
              </div>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            {/* Credits Card */}
            <Card variant="outline" className="hidden sm:block border-primary/20 hover:border-primary/30 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-primary animate-pulse-glow" />
                    <span className="text-sm font-medium text-foreground">Credits: 250</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <Button variant="default" size="sm" className="bg-gradient-primary">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              className="relative hover:bg-primary/10 focus-ring"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-primary rounded-full animate-pulse-glow">
                <span className="sr-only">New notifications</span>
              </span>
            </Button>
            
            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="icon-sm"
              className="hover:bg-primary/10 focus-ring"
              aria-label="User profile"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* Logout */}
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={handleLogout}
              className="hover:bg-destructive/10 hover:text-destructive focus-ring"
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
            bg-white border-r border-border shadow-sm flex flex-col
            ${isMobile ? 'w-64' : ''}
          `}
        >
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-3 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`
                      w-full transition-all duration-200 
                      ${sidebarCollapsed && !isMobile ? 'justify-center px-2' : 'justify-start'}
                      ${isActive 
                        ? "bg-gradient-primary text-primary-foreground shadow-button" 
                        : "hover:bg-primary/10 hover:text-primary"
                      }
                    `}
                    onClick={() => handleNavigation(item.id)}
                    title={sidebarCollapsed && !isMobile ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : ""} ${
                      sidebarCollapsed && !isMobile ? '' : 'mr-3'
                    }`} />
                    {(!sidebarCollapsed || isMobile) && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Quick Stats - Only show when not collapsed */}
            {(!sidebarCollapsed || isMobile) && (
              <div className="px-3 mt-6">
                <Card variant="outline" className="border-primary/20">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm text-foreground mb-3 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                      Quick Stats
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: "Posts this month", value: "24", trend: "+12%" },
                        { label: "Engagement rate", value: "12.5%", trend: "+2.1%" },
                        { label: "AI Credits used", value: "158/500", trend: "68%" },
                      ].map((stat, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{stat.label}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" size="sm" className="text-xs">
                              {stat.value}
                            </Badge>
                            <Badge 
                              variant="success" 
                              size="sm" 
                              className="text-xs bg-ai-success/10 text-ai-success border-ai-success/20"
                            >
                              {stat.trend}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Upgrade Prompt - Only show when not collapsed */}
            {(!sidebarCollapsed || isMobile) && (
              <div className="px-3 mt-6">
                <Card variant="gradient" className="bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-4 text-center space-y-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                      <Sparkles className="h-6 w-6 text-primary-foreground animate-pulse-glow" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Upgrade to Pro</div>
                      <div className="text-xs opacity-90">Unlock unlimited AI credits</div>
                    </div>
                    <Button variant="secondary" size="sm" className="w-full bg-white text-light-black hover:bg-white/90">
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
            className="fixed inset-0 z-30 bg-light-black/20 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;