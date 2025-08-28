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
          <div className="space-section">
            <div className="animate-slide-up">
              <h2 className="text-headline text-gradient-yellow mb-2">
                Analytics Dashboard
              </h2>
              <p className="text-body text-muted-foreground mb-6">
                Track your content performance and engagement metrics with our comprehensive analytics.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Card variant="elevated" className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-element">
                      <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                      <p className="text-3xl font-bold text-foreground">24.5K</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-success" />
                        <span className="text-xs text-success font-medium">+12.5%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-highlight/10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-highlight" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-element">
                      <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                      <p className="text-3xl font-bold text-foreground">12.8%</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-success" />
                        <span className="text-xs text-success font-medium">+2.1%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-info" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-element">
                      <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                      <p className="text-3xl font-bold text-foreground">+28%</p>
                      <div className="flex items-center space-x-1">
                        <ArrowUpRight className="h-3 w-3 text-success" />
                        <span className="text-xs text-success font-medium">+5.2%</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-success" />
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
          <div className="space-section">
            <div className="animate-slide-up">
              <h2 className="text-headline text-gradient-yellow mb-2">
                Platform Connections
              </h2>
              <p className="text-body text-muted-foreground mb-6">
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
          <div className="space-section">
            {/* Welcome Section */}
            <Card variant="premium" className="overflow-hidden relative animate-slide-up">
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div className="space-element">
                    <CardTitle className="text-title text-foreground">
                      Welcome back! 👋
                    </CardTitle>
                    <CardDescription className="text-foreground/80">
                      Ready to create amazing content with AI? Let's boost your social media presence.
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-16 bg-highlight/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Sparkles className="h-8 w-8 text-highlight animate-pulse-glow" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button 
                    variant="highlight" 
                    onClick={() => setActiveTab("posts")}
                    className="shadow-button"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-foreground/20 text-foreground hover:bg-highlight/10 hover:text-highlight hover:border-highlight/30" 
                    onClick={() => setActiveTab("schedule")}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Posts
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-foreground/20 text-foreground hover:bg-highlight/10 hover:text-highlight hover:border-highlight/30"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    AI Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Card variant="elevated" className="card-hover group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
                  <div className="w-8 h-8 bg-highlight/10 rounded-lg flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
                    <BarChart3 className="h-4 w-4 text-highlight" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-success" />
                    <span className="text-xs text-success font-medium">+12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="card-hover group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Reach</CardTitle>
                  <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center group-hover:bg-info/20 transition-colors">
                    <Users className="h-4 w-4 text-info" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">12.4K</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-success" />
                    <span className="text-xs text-success font-medium">+8.2% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="card-hover group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Engagement</CardTitle>
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success/20 transition-colors">
                    <Heart className="h-4 w-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">8.9%</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-success" />
                    <span className="text-xs text-success font-medium">+2.1% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated" className="card-hover group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">AI Credits</CardTitle>
                  <div className="w-8 h-8 bg-highlight/10 rounded-lg flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
                    <Zap className="h-4 w-4 text-highlight animate-pulse-glow" />
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
              <Card variant="elevated" className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <TrendingUp className="h-5 w-5 mr-2 text-highlight" />
                    Recent Posts Performance
                  </CardTitle>
                  <CardDescription>
                    Your top performing posts from this week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-component">
                  {[
                    { platform: "Instagram", engagement: "12.4%", reach: "2.1K", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
                    { platform: "Twitter", engagement: "8.7%", reach: "1.8K", color: "bg-blue-500" },
                    { platform: "Facebook", engagement: "6.2%", reach: "3.2K", color: "bg-blue-600" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-card border border-border hover:border-highlight/30 hover:bg-highlight/5 transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${post.color}`} />
                        <span className="font-medium text-foreground group-hover:text-highlight transition-colors">{post.platform}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3 text-info" />
                          <span className="text-foreground">{post.engagement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-highlight" />
                          <span className="text-foreground">{post.reach}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card variant="elevated" className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Calendar className="h-5 w-5 mr-2 text-highlight" />
                    Upcoming Scheduled Posts
                  </CardTitle>
                  <CardDescription>
                    Posts scheduled for the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-component">
                  {[
                    { title: "AI Marketing Tips", platform: "LinkedIn", time: "Today, 2:00 PM", status: "ready" },
                    { title: "Product Update", platform: "Twitter", time: "Tomorrow, 10:00 AM", status: "pending" },
                    { title: "Behind the Scenes", platform: "Instagram", time: "Dec 20, 3:00 PM", status: "draft" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-card border border-border hover:border-highlight/30 hover:bg-highlight/5 transition-all duration-300 group">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground group-hover:text-highlight transition-colors">{post.title}</div>
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