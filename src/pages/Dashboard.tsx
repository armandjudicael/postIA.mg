import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import PlatformConnections from "@/components/PlatformConnections";
import PostStudio from "@/components/PostStudio";
import ScheduleManager from "@/components/ScheduleManager";
import PublishManager from "@/components/PublishManager";
import BillingDashboard from "@/components/BillingDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Heart, 
  MessageCircle, 
  Share, 
  Plus,
  Calendar,
  BarChart3,
  Sparkles,
  Zap,
  Clock,
  Target,
  Globe,
  ArrowUpRight,
  Activity
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <PostStudio />;
      case "schedule":
        return <ScheduleManager />;
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold text-gradient-primary mb-2">
                Analytics Dashboard
              </h2>
              <p className="text-muted-foreground mb-6">
                Track your content performance and engagement metrics with our comprehensive analytics.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                      <p className="text-3xl font-bold text-foreground">24.5K</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-ai-success" />
                        <span className="text-xs text-ai-success font-medium">+12.5%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                      <p className="text-3xl font-bold text-foreground">12.8%</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-ai-success" />
                        <span className="text-xs text-ai-success font-medium">+2.1%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                      <p className="text-3xl font-bold text-foreground">+28%</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-ai-success" />
                        <span className="text-xs text-ai-success font-medium">+5.2%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-ai-success/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-ai-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "billing":
        return <BillingDashboard />;
      case "settings":
        return (
          <div className="space-y-6">
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold text-gradient-primary mb-2">
                Platform Connections
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect your social media accounts to start publishing AI-generated content across all platforms.
              </p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <PlatformConnections />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card variant="gradient" className="bg-gradient-primary text-primary-foreground overflow-hidden relative animate-slide-up">
              <div className="absolute inset-0 bg-light-black/10" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-primary-foreground">
                      Welcome back! 👋
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Ready to create amazing content with AI? Let's boost your social media presence.
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Sparkles className="h-8 w-8 text-primary-foreground animate-pulse-glow" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    variant="secondary" 
                    onClick={() => setActiveTab("posts")}
                    className="bg-white text-light-black hover:bg-white/90 shadow-button"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-primary-foreground hover:bg-white/10" 
                    onClick={() => setActiveTab("schedule")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Posts
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-primary-foreground hover:bg-white/10"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    AI Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-ai-success" />
                    <span className="text-xs text-ai-success font-medium">+12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Reach</CardTitle>
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Users className="h-4 w-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">12.4K</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-ai-success" />
                    <span className="text-xs text-ai-success font-medium">+8.2% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Engagement</CardTitle>
                  <div className="w-8 h-8 bg-ai-success/10 rounded-lg flex items-center justify-center group-hover:bg-ai-success/20 transition-colors">
                    <Heart className="h-4 w-4 text-ai-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">8.9%</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-ai-success" />
                    <span className="text-xs text-ai-success font-medium">+2.1% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">AI Credits</CardTitle>
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-4 w-4 text-primary animate-pulse-glow" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">342</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Activity className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">158 used this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Recent Posts Performance
                  </CardTitle>
                  <CardDescription>
                    Your top performing posts from this week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { platform: "Instagram", engagement: "12.4%", reach: "2.1K", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
                    { platform: "Twitter", engagement: "8.7%", reach: "1.8K", color: "bg-blue-500" },
                    { platform: "Facebook", engagement: "6.2%", reach: "3.2K", color: "bg-blue-600" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-subtle border border-border hover:border-primary/30 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${post.color}`} />
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{post.platform}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3 text-accent" />
                          <span className="text-foreground">{post.engagement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-primary" />
                          <span className="text-foreground">{post.reach}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card variant="elevated" className="hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Upcoming Scheduled Posts
                  </CardTitle>
                  <CardDescription>
                    Posts scheduled for the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "AI Marketing Tips", platform: "LinkedIn", time: "Today, 2:00 PM", status: "ready" },
                    { title: "Product Update", platform: "Twitter", time: "Tomorrow, 10:00 AM", status: "pending" },
                    { title: "Behind the Scenes", platform: "Instagram", time: "Dec 20, 3:00 PM", status: "draft" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-subtle border border-border hover:border-primary/30 transition-all duration-300 group">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground group-hover:text-primary transition-colors">{post.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <Globe className="h-3 w-3" />
                          <span>{post.platform}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge 
                          variant={post.status === 'ready' ? 'success' : post.status === 'pending' ? 'warning' : 'outline'} 
                          size="sm"
                          className="text-xs"
                        >
                          {post.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card variant="outline" className="border-primary/20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Streamline your workflow with these shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Plus, label: "New Post", action: () => setActiveTab("posts") },
                    { icon: Calendar, label: "Schedule", action: () => setActiveTab("schedule") },
                    { icon: BarChart3, label: "Analytics", action: () => setActiveTab("analytics") },
                    { icon: Zap, label: "AI Generate", action: () => {} },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col space-y-2 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                        onClick={item.action}
                      >
                        <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;