import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PlatformConnections from "@/components/PlatformConnections";
import PostEditor from "@/components/PostEditor";
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
  Zap
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <PostEditor />;
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Platform Connections
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect your social media accounts to start publishing AI-generated content.
              </p>
            </div>
            <PlatformConnections />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-primary border-0 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-black/20" />
              <CardHeader className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white">
                      Welcome back! 👋
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Ready to create amazing content with AI?
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-8 w-8 text-white/80 animate-pulse-glow" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center space-x-4">
                  <Button variant="secondary" onClick={() => setActiveTab("posts")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Posts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-ai-success">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.4K</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-ai-success">+8.2%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.9%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-ai-success">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
                  <Zap className="h-4 w-4 text-ai-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">
                    158 used this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Recent Posts Performance
                  </CardTitle>
                  <CardDescription>
                    Your top performing posts from this week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { platform: "Instagram", engagement: "12.4%", reach: "2.1K" },
                    { platform: "Twitter", engagement: "8.7%", reach: "1.8K" },
                    { platform: "Facebook", engagement: "6.2%", reach: "3.2K" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium">{post.platform}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{post.engagement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{post.reach}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-subtle border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Upcoming Scheduled Posts
                  </CardTitle>
                  <CardDescription>
                    Posts scheduled for the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "AI Marketing Tips", platform: "LinkedIn", time: "Today, 2:00 PM" },
                    { title: "Product Update", platform: "Twitter", time: "Tomorrow, 10:00 AM" },
                    { title: "Behind the Scenes", platform: "Instagram", time: "Dec 20, 3:00 PM" },
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/10">
                      <div>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-muted-foreground">{post.platform}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.time}
                      </Badge>
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
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;