import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
  Download,
  BarChart3,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  Play,
  Volume2,
  Eye,
  ThumbsUp,
  Send,
  Zap
} from "lucide-react";

interface PreviewPanelProps {
  content: string;
  contentType: string;
  selectedMedia: string[];
  platform: string;
}

const PreviewPanel = ({ content, contentType, selectedMedia, platform }: PreviewPanelProps) => {
  const [deviceView, setDeviceView] = useState("mobile");
  const [previewPlatform, setPreviewPlatform] = useState("instagram");

  const mockEngagement = {
    instagram: { likes: "2.4K", comments: "156", shares: "89", saves: "345" },
    twitter: { likes: "1.8K", retweets: "423", replies: "234", bookmarks: "156" },
    facebook: { likes: "3.2K", comments: "289", shares: "167", reactions: "456" },
    linkedin: { likes: "892", comments: "67", shares: "134", reposts: "89" },
    youtube: { views: "12.5K", likes: "1.2K", comments: "89", subscribers: "+45" }
  };

  const getDeviceClass = () => {
    switch (deviceView) {
      case "mobile": return "max-w-sm mx-auto";
      case "tablet": return "max-w-md mx-auto";
      case "desktop": return "max-w-2xl mx-auto";
      default: return "max-w-sm mx-auto";
    }
  };

  const renderPlatformPreview = (platformName: string) => {
    const engagement = mockEngagement[platformName as keyof typeof mockEngagement];
    
    switch (platformName) {
      case "instagram":
        return (
          <div className="bg-background border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center p-3 border-b">
              <div className="w-8 h-8 bg-gradient-primary rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="font-semibold text-sm">your_brand</div>
                <div className="text-xs text-muted-foreground">Sponsored</div>
              </div>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </div>
            
            {/* Content */}
            {contentType === "image" && (
              <div className="aspect-square bg-muted flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop" 
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {contentType === "video" && (
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                <Play className="h-12 w-12 text-white" />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  0:15
                </div>
              </div>
            )}
            
            {contentType === "voice" && (
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <Volume2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Audio Post</p>
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1 bg-primary rounded-full" style={{ height: `${Math.random() * 20 + 10}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Heart className="h-6 w-6" />
                  <MessageCircle className="h-6 w-6" />
                  <Send className="h-6 w-6" />
                </div>
                <Bookmark className="h-6 w-6" />
              </div>
              
              {/* Engagement */}
              <div className="text-sm font-semibold mb-2">
                {engagement.likes} likes
              </div>
              
              {/* Caption */}
              <div className="text-sm">
                <span className="font-semibold mr-2">your_brand</span>
                {content || "Your content will appear here..."}
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                View all {(engagement as any).comments || (engagement as any).replies || '0'} comments
              </div>
            </div>
          </div>
        );
        
      case "twitter":
        return (
          <div className="bg-background border rounded-lg p-4">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-sm">Your Brand</span>
                  <span className="text-muted-foreground text-sm">@yourbrand</span>
                  <span className="text-muted-foreground text-sm">·</span>
                  <span className="text-muted-foreground text-sm">2m</span>
                </div>
                
                <div className="text-sm leading-relaxed mb-3">
                  {content || "Your content will appear here..."}
                </div>
                
                {contentType === "image" && (
                  <div className="rounded-lg overflow-hidden mb-3 border">
                    <img 
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop" 
                      alt="Post content"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-muted-foreground max-w-md">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{(engagement as any).replies || (engagement as any).comments || '0'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-xs">{(engagement as any).retweets || (engagement as any).shares || '0'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{engagement.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-xs">Views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "linkedin":
        return (
          <div className="bg-background border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
                <div>
                  <div className="font-semibold text-sm">Your Brand</div>
                  <div className="text-xs text-muted-foreground">CEO at Your Company • 1st</div>
                  <div className="text-xs text-muted-foreground">2m • 🌐</div>
                </div>
              </div>
              
              <div className="text-sm leading-relaxed mb-3">
                {content || "Your content will appear here..."}
              </div>
              
              {contentType === "image" && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop" 
                    alt="Post content"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="border-t p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-xs">{engagement.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{(engagement as any).comments || '0'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-xs">{(engagement as any).shares || (engagement as any).reposts || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Platform preview not available</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={deviceView === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceView === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={deviceView === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {deviceView.charAt(0).toUpperCase() + deviceView.slice(1)} Preview
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Platform Previews */}
      <div className={getDeviceClass()}>
        <Tabs value={previewPlatform} onValueChange={setPreviewPlatform} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="instagram" className="flex items-center gap-1">
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">IG</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-1">
              <Twitter className="h-4 w-4" />
              <span className="hidden sm:inline">X</span>
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-1">
              <Facebook className="h-4 w-4" />
              <span className="hidden sm:inline">FB</span>
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LI</span>
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center gap-1">
              <Youtube className="h-4 w-4" />
              <span className="hidden sm:inline">YT</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="instagram">
              {renderPlatformPreview("instagram")}
            </TabsContent>
            <TabsContent value="twitter">
              {renderPlatformPreview("twitter")}
            </TabsContent>
            <TabsContent value="facebook">
              {renderPlatformPreview("facebook")}
            </TabsContent>
            <TabsContent value="linkedin">
              {renderPlatformPreview("linkedin")}
            </TabsContent>
            <TabsContent value="youtube">
              <div className="bg-background border rounded-lg p-4 text-center">
                <Youtube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">YouTube preview coming soon</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Engagement Simulation */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span>Engagement Simulation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(mockEngagement[previewPlatform as keyof typeof mockEngagement]).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-background/50 rounded-lg">
                <div className="text-lg font-bold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">{key}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Insight</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              This content is optimized for {previewPlatform} and is predicted to perform 23% above average engagement rates.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-primary" />
            <span>Export & Share</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Download className="h-6 w-6" />
              <span className="text-sm">Export as PDF</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Share2 className="h-6 w-6" />
              <span className="text-sm">Share Preview</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Eye className="h-6 w-6" />
              <span className="text-sm">Client Review</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Performance Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewPanel;