import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Eye,
  Calendar,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface PublishSettings {
  platform: string;
  enabled: boolean;
  autoPublish: boolean;
  optimalTiming: boolean;
}

const PublishManager = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSettings, setPublishSettings] = useState<PublishSettings[]>([
    { platform: 'instagram', enabled: true, autoPublish: false, optimalTiming: true },
    { platform: 'twitter', enabled: true, autoPublish: true, optimalTiming: true },
    { platform: 'facebook', enabled: false, autoPublish: false, optimalTiming: false },
    { platform: 'linkedin', enabled: true, autoPublish: false, optimalTiming: true },
  ]);

  const [publishHistory] = useState([
    {
      id: "1",
      title: "AI Marketing Revolution",
      platforms: ["instagram", "twitter"],
      publishedAt: new Date("2024-12-18T10:30:00"),
      status: "success",
      engagement: { likes: 124, shares: 23, comments: 45 }
    },
    {
      id: "2", 
      title: "Product Update Launch",
      platforms: ["linkedin", "twitter"],
      publishedAt: new Date("2024-12-17T14:15:00"),
      status: "success",
      engagement: { likes: 89, shares: 12, comments: 28 }
    },
    {
      id: "3",
      title: "Behind the Scenes Content",
      platforms: ["instagram"],
      publishedAt: new Date("2024-12-16T16:45:00"),
      status: "failed",
      engagement: { likes: 0, shares: 0, comments: 0 }
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    const iconClass = "h-4 w-4";
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className={iconClass} />;
      case 'twitter': return <Twitter className={iconClass} />;
      case 'facebook': return <Facebook className={iconClass} />;
      case 'linkedin': return <Linkedin className={iconClass} />;
      default: return null;
    }
  };

  const handlePublishNow = async () => {
    setIsPublishing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPublishing(false);
    toast.success("Post published successfully across selected platforms!");
  };

  const handleSchedulePublish = () => {
    toast.success("Post scheduled for optimal publishing time!");
  };

  const togglePlatform = (platform: string, field: keyof Omit<PublishSettings, 'platform'>) => {
    setPublishSettings(prev => 
      prev.map(setting => 
        setting.platform === platform 
          ? { ...setting, [field]: !setting[field] }
          : setting
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Publish Manager
        </h2>
        <p className="text-muted-foreground">
          Control where and when your content gets published
        </p>
      </div>

      {/* Quick Publish Actions */}
      <Card className="bg-gradient-subtle border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="h-5 w-5 mr-2 text-primary" />
            Quick Publish
          </CardTitle>
          <CardDescription>
            Publish your current draft immediately or schedule for later
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handlePublishNow}
              disabled={isPublishing}
              className="flex-1"
            >
              {isPublishing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleSchedulePublish}
              className="flex-1"
            >
              <Clock className="h-4 w-4 mr-2" />
              Schedule for Later
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Post Preview</DialogTitle>
                  <DialogDescription>
                    See how your post will appear on different platforms
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-4">
                  {publishSettings.filter(p => p.enabled).map(setting => (
                    <Card key={setting.platform} className="bg-background">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-sm capitalize">
                          {getPlatformIcon(setting.platform)}
                          <span className="ml-2">{setting.platform}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="aspect-square bg-gradient-subtle rounded-lg flex items-center justify-center">
                            <span className="text-muted-foreground">Preview Image</span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Your amazing post content will appear here...</p>
                            <p className="text-xs text-muted-foreground">#AI #SocialMedia #PostIA</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-sm text-muted-foreground">
            {publishSettings.filter(p => p.enabled).length} platforms selected for publishing
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card className="bg-gradient-subtle border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Platform Settings
          </CardTitle>
          <CardDescription>
            Configure publishing preferences for each platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {publishSettings.map((setting, index) => (
            <div key={setting.platform}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(setting.platform)}
                  <div>
                    <Label className="text-base capitalize font-medium">
                      {setting.platform}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.enabled ? 'Connected and ready' : 'Not connected'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`${setting.platform}-auto`}
                      checked={setting.autoPublish}
                      onCheckedChange={() => togglePlatform(setting.platform, 'autoPublish')}
                      disabled={!setting.enabled}
                    />
                    <Label htmlFor={`${setting.platform}-auto`} className="text-sm">
                      Auto-publish
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`${setting.platform}-timing`}
                      checked={setting.optimalTiming}
                      onCheckedChange={() => togglePlatform(setting.platform, 'optimalTiming')}
                      disabled={!setting.enabled}
                    />
                    <Label htmlFor={`${setting.platform}-timing`} className="text-sm">
                      Optimal timing
                    </Label>
                  </div>
                  
                  <Switch
                    id={`${setting.platform}-enabled`}
                    checked={setting.enabled}
                    onCheckedChange={() => togglePlatform(setting.platform, 'enabled')}
                  />
                </div>
              </div>
              {index < publishSettings.length - 1 && <Separator className="mt-6" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Publish History */}
      <Card className="bg-gradient-subtle border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Recent Publications
          </CardTitle>
          <CardDescription>
            Track your published content and engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {publishHistory.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-white/10"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{post.title}</h4>
                  <div className="flex items-center space-x-1">
                    {post.platforms.map(platform => (
                      <div key={platform} className="p-1 rounded bg-muted">
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Published {post.publishedAt.toLocaleDateString()} at {post.publishedAt.toLocaleTimeString()}
                </p>
                {post.status === 'success' && (
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>❤️ {post.engagement.likes}</span>
                    <span>🔄 {post.engagement.shares}</span>
                    <span>💬 {post.engagement.comments}</span>
                  </div>
                )}
              </div>
              
              <Badge
                variant="outline"
                className={
                  post.status === 'success'
                    ? 'text-ai-success border-ai-success/20 bg-ai-success/10'
                    : 'text-ai-error border-ai-error/20 bg-ai-error/10'
                }
              >
                {post.status === 'success' ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Published
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Failed
                  </>
                )}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishManager;