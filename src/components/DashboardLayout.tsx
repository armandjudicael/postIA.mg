import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Zap
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
  };

  const handleNavigation = (tabId: string) => {
    onTabChange?.(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
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

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <Card className="hidden sm:block bg-gradient-subtle border-white/10">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-ai-accent" />
                    <span className="text-sm font-medium">Credits: 250</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <Button variant="hero" size="sm">
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-ai-accent rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-background/95 backdrop-blur border-r border-border/40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 space-y-6">
              {/* Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start transition-all duration-200 ${
                        isActive 
                          ? "bg-gradient-subtle border border-white/10 shadow-card" 
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleNavigation(item.id)}
                    >
                      <Icon className={`h-4 w-4 mr-3 ${isActive ? "text-primary" : ""}`} />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Posts this month</span>
                    <Badge variant="outline">24</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Engagement rate</span>
                    <Badge variant="outline" className="text-ai-success border-ai-success/20">
                      +12.5%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">AI Credits used</span>
                    <Badge variant="outline">158/500</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 lg:px-6 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;