import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  Zap,
  Maximize2,
  Minimize2,
  RotateCcw,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Percent,
  TrendingUp,
  MousePointer2,
  Palette,
  Settings,
  Copy,
  Contrast,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface EnhancedPreviewPanelProps {
  content: string;
  contentType: string;
  selectedMedia: string[];
  platform: string;
  isResizable?: boolean;
  onError?: (error: string) => void;
  onSuccess?: (message: string) => void;
}

const EnhancedPreviewPanel = ({ 
  content, 
  contentType, 
  selectedMedia, 
  platform,
  isResizable = true,
  onError,
  onSuccess 
}: EnhancedPreviewPanelProps) => {
  const [deviceView, setDeviceView] = useState("mobile");
  const [previewPlatform, setPreviewPlatform] = useState("instagram");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "twitter"]);
  const [interactionMode, setInteractionMode] = useState(false);
  const [mockInteractions, setMockInteractions] = useState({
    likes: 0,
    comments: 0,
    shares: 0,
    views: 0
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const mockEngagement = {
    instagram: { 
      likes: "2.4K", 
      comments: "156", 
      shares: "89", 
      saves: "345",
      reach: "12.3K",
      impressions: "18.7K",
      profileVisits: "234"
    },
    twitter: { 
      likes: "1.8K", 
      retweets: "423", 
      replies: "234", 
      bookmarks: "156",
      impressions: "15.2K",
      profileClicks: "167",
      linkClicks: "89"
    },
    facebook: { 
      likes: "3.2K", 
      comments: "289", 
      shares: "167", 
      reactions: "456",
      reach: "23.1K",
      pageViews: "345",
      linkClicks: "123"
    },
    linkedin: { 
      likes: "892", 
      comments: "67", 
      shares: "134", 
      reposts: "89",
      impressions: "5.4K",
      clicks: "234",
      followers: "+45"
    },
    youtube: { 
      views: "12.5K", 
      likes: "1.2K", 
      comments: "89", 
      subscribers: "+45",
      watchTime: "2.3K hrs",
      shares: "156",
      clickthrough: "4.2%"
    }
  };

  const platformFeatures = {
    instagram: {
      maxLength: 2200,
      supportsCarousel: true,
      supportsStories: true,
      supportsReels: true,
      aspectRatios: ["1:1", "4:5", "16:9"],
      hashtagLimit: 30
    },
    twitter: {
      maxLength: 280,
      supportsThreads: true,
      supportsPolls: true,
      supportsSpaces: true,
      aspectRatios: ["16:9", "1:1"],
      hashtagLimit: 3
    },
    facebook: {
      maxLength: 63206,
      supportsLivestream: true,
      supportsEvents: true,
      supportsPolls: true,
      aspectRatios: ["16:9", "1:1", "9:16"],
      hashtagLimit: 10
    },
    linkedin: {
      maxLength: 3000,
      supportsArticles: true,
      supportsPolls: true,
      supportsEvents: true,
      aspectRatios: ["16:9", "1:1"],
      hashtagLimit: 5
    },
    youtube: {
      maxLength: 5000,
      supportsLivestream: true,
      supportsShorts: true,
      supportsPremiere: true,
      aspectRatios: ["16:9", "9:16"],
      hashtagLimit: 15
    }
  };

  const getDeviceClass = useCallback(() => {
    const zoomFactor = zoom / 100;
    switch (deviceView) {
      case "mobile": 
        return `max-w-sm mx-auto transform scale-${Math.round(zoomFactor * 100)}`;
      case "tablet": 
        return `max-w-md mx-auto transform scale-${Math.round(zoomFactor * 100)}`;
      case "desktop": 
        return `max-w-2xl mx-auto transform scale-${Math.round(zoomFactor * 100)}`;
      default: 
        return `max-w-sm mx-auto transform scale-${Math.round(zoomFactor * 100)}`;
    }
  }, [deviceView, zoom]);

  const validateContent = useCallback(() => {
    const platformConfig = platformFeatures[previewPlatform as keyof typeof platformFeatures];
    const errors: string[] = [];

    if (content.length > platformConfig.maxLength) {
      errors.push(`Content exceeds ${previewPlatform} limit of ${platformConfig.maxLength} characters`);
    }

    if (contentType === "image" && selectedMedia.length === 0 && previewPlatform === "instagram") {
      errors.push("Instagram posts require at least one image");
    }

    if (errors.length > 0) {
      onError?.(errors.join(", "));
    } else {
      onSuccess?.("Content is valid for this platform");
    }

    return errors.length === 0;
  }, [content, contentType, selectedMedia, previewPlatform, onError, onSuccess]);

  const simulateInteraction = useCallback((type: 'like' | 'comment' | 'share' | 'view') => {
    if (!interactionMode) return;

    setMockInteractions(prev => ({
      ...prev,
      [type === 'like' ? 'likes' : type === 'comment' ? 'comments' : type === 'share' ? 'shares' : 'views']: 
        prev[type === 'like' ? 'likes' : type === 'comment' ? 'comments' : type === 'share' ? 'shares' : 'views'] + 1
    }));
  }, [interactionMode]);

  const renderAdvancedPlatformPreview = useCallback((platformName: string) => {
    const engagement = mockEngagement[platformName as keyof typeof mockEngagement];
    const features = platformFeatures[platformName as keyof typeof platformFeatures];
    
    switch (platformName) {
      case "instagram":
        return (
          <div className={`bg-background border rounded-lg overflow-hidden transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
            {/* Enhanced Header */}
            <div className="flex items-center p-3 border-b bg-gradient-subtle">
              <div className="w-8 h-8 bg-gradient-primary rounded-full mr-3 animate-pulse-glow"></div>
              <div className="flex-1">
                <div className="font-semibold text-sm flex items-center">
                  your_brand 
                  <Badge variant="secondary" className="ml-2 text-xs">Verified</Badge>
                </div>
                <div className="text-xs text-muted-foreground">Sponsored • 2m</div>
              </div>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
            
            {/* Enhanced Content */}
            {contentType === "image" && (
              <div className="aspect-square bg-muted flex items-center justify-center relative group">
                <img 
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop" 
                  alt="Post content"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                {interactionMode && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0"
                      onClick={() => simulateInteraction('like')}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {contentType === "video" && (
              <div className="aspect-square bg-muted flex items-center justify-center relative group">
                <Play className="h-12 w-12 text-white z-10 cursor-pointer hover:scale-110 transition-transform" 
                     onClick={() => simulateInteraction('view')} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  0:15
                </div>
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  LIVE
                </div>
              </div>
            )}
            
            {contentType === "voice" && (
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <Volume2 className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-sm text-muted-foreground">Audio Post</p>
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex space-x-1">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-primary rounded-full animate-pulse" 
                          style={{ 
                            height: `${Math.random() * 20 + 10}px`,
                            animationDelay: `${i * 0.1}s`
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">2:34</div>
                </div>
              </div>
            )}
            
            {/* Enhanced Actions */}
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Heart 
                    className={`h-6 w-6 cursor-pointer transition-colors ${mockInteractions.likes > 0 ? 'text-red-500 fill-red-500' : 'hover:text-red-500'}`}
                    onClick={() => simulateInteraction('like')}
                  />
                  <MessageCircle 
                    className="h-6 w-6 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => simulateInteraction('comment')}
                  />
                  <Send 
                    className="h-6 w-6 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => simulateInteraction('share')}
                  />
                </div>
                <Bookmark className="h-6 w-6 cursor-pointer hover:text-primary transition-colors" />
              </div>
              
              {/* Enhanced Engagement */}
              <div className="space-y-1">
                <div className="text-sm font-semibold">
                  {parseInt(engagement.likes.replace('K', '000')) + mockInteractions.likes} likes
                </div>
                <div className="text-sm">
                  <span className="font-semibold mr-2">your_brand</span>
                  {content || "Your content will appear here..."}
                </div>
                <div className="text-xs text-muted-foreground">
                  View all {(engagement as any).comments || '0'} comments
                </div>
                <div className="text-xs text-muted-foreground">
                  {(engagement as any).reach && `${(engagement as any).reach} accounts reached`}
                  {(engagement as any).reach && (engagement as any).impressions && ' • '}
                  {(engagement as any).impressions && `${(engagement as any).impressions} impressions`}
                </div>
              </div>
            </div>
          </div>
        );
        
      case "twitter":
        return (
          <div className={`bg-background border rounded-lg p-4 transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex-shrink-0 animate-pulse-glow"></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-sm">Your Brand</span>
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                  <span className="text-muted-foreground text-sm">@yourbrand</span>
                  <span className="text-muted-foreground text-sm">·</span>
                  <span className="text-muted-foreground text-sm">2m</span>
                </div>
                
                <div className="text-sm leading-relaxed mb-3">
                  {content || "Your content will appear here..."}
                </div>
                
                {contentType === "image" && (
                  <div className="rounded-lg overflow-hidden mb-3 border group">
                    <img 
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop" 
                      alt="Post content"
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                
                {/* Enhanced Engagement Bar */}
                <div className="flex items-center justify-between text-muted-foreground max-w-md">
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition-colors group">
                    <MessageCircle className="h-4 w-4 group-hover:bg-blue-50 group-hover:text-blue-500 rounded-full p-1 transition-all" 
                                   onClick={() => simulateInteraction('comment')} />
                    <span className="text-xs">{parseInt((engagement as any).replies || '0') + mockInteractions.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-green-500 transition-colors group">
                    <Repeat2 className="h-4 w-4 group-hover:bg-green-50 group-hover:text-green-500 rounded-full p-1 transition-all"
                             onClick={() => simulateInteraction('share')} />
                    <span className="text-xs">{parseInt((engagement as any).retweets || '0') + mockInteractions.shares}</span>
                  </div>
                  <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition-colors group">
                    <Heart className={`h-4 w-4 rounded-full p-1 transition-all ${mockInteractions.likes > 0 ? 'text-red-500 bg-red-50' : 'group-hover:bg-red-50 group-hover:text-red-500'}`}
                           onClick={() => simulateInteraction('like')} />
                    <span className="text-xs">{parseInt(engagement.likes.replace('K', '000')) + mockInteractions.likes}</span>
                  </div>
                   <div className="flex items-center space-x-1 cursor-pointer hover:text-primary transition-colors">
                     <BarChart3 className="h-4 w-4" />
                     <span className="text-xs">{(engagement as any).impressions || '0'}</span>
                   </div>
                </div>
                
                {/* Platform-specific metrics */}
                <div className="mt-2 text-xs text-muted-foreground">
                  {(engagement as any).impressions && `${(engagement as any).impressions} impressions`}
                  {(engagement as any).impressions && (engagement as any).profileClicks && ' • '}
                  {(engagement as any).profileClicks && `${(engagement as any).profileClicks} profile clicks`}
                </div>
              </div>
            </div>
          </div>
        );
        
      case "facebook":
        return (
          <div className={`bg-background border rounded-lg overflow-hidden transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full animate-pulse-glow"></div>
                <div>
                  <div className="font-semibold text-sm flex items-center">
                    Your Brand Page
                    <Badge variant="secondary" className="ml-2 text-xs">✓</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center">
                    2 min • 🌐 Public
                  </div>
                </div>
              </div>
              
              <div className="text-sm leading-relaxed mb-3">
                {content || "Your content will appear here..."}
              </div>
              
              {contentType === "image" && (
                <div className="rounded-lg overflow-hidden mb-3 group">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop" 
                    alt="Post content"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              
              {/* Enhanced engagement display */}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                      <ThumbsUp className="h-2 w-2 text-white" />
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full border border-white flex items-center justify-center">
                      <Heart className="h-2 w-2 text-white" />
                    </div>
                  </div>
                  <span>{parseInt(engagement.likes.replace('K', '000')) + mockInteractions.likes} people</span>
                </div>
                <div className="flex space-x-4">
                  <span>{parseInt((engagement as any).comments || '0') + mockInteractions.comments} comments</span>
                  <span>{parseInt((engagement as any).shares || '0') + mockInteractions.shares} shares</span>
                </div>
              </div>
            </div>
            
            <div className="border-t p-2 bg-gradient-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10" onClick={() => simulateInteraction('like')}>
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10" onClick={() => simulateInteraction('comment')}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10" onClick={() => simulateInteraction('share')}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "linkedin":
        return (
          <div className={`bg-background border rounded-lg overflow-hidden transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full animate-pulse-glow"></div>
                <div>
                  <div className="font-semibold text-sm">Your Professional Brand</div>
                  <div className="text-xs text-muted-foreground">CEO at Your Company • 1st</div>
                  <div className="text-xs text-muted-foreground">2m • 🌐</div>
                </div>
              </div>
              
              <div className="text-sm leading-relaxed mb-3">
                {content || "Your content will appear here..."}
              </div>
              
              {contentType === "image" && (
                <div className="rounded-lg overflow-hidden mb-3 group">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop" 
                    alt="Post content"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              
              {/* Professional engagement metrics */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{(engagement as any).impressions || '0'} impressions</span>
                <span>{(engagement as any).clicks || '0'} clicks</span>
                <span>{(engagement as any).followers || '0'} new followers</span>
              </div>
            </div>
            
            <div className="border-t p-2 bg-gradient-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10" onClick={() => simulateInteraction('like')}>
                    <ThumbsUp className={`h-4 w-4 mr-1 ${mockInteractions.likes > 0 ? 'text-blue-600' : ''}`} />
                    <span className="text-xs">{parseInt(engagement.likes) + mockInteractions.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10" onClick={() => simulateInteraction('comment')}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">{parseInt((engagement as any).comments || '0') + mockInteractions.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10" onClick={() => simulateInteraction('share')}>
                    <Repeat2 className="h-4 w-4 mr-1" />
                    <span className="text-xs">{parseInt((engagement as any).shares || '0') + mockInteractions.shares}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "youtube":
        return (
          <div className={`bg-background border rounded-lg overflow-hidden transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
            <div className="aspect-video bg-muted flex items-center justify-center relative group">
              <Play className="h-16 w-16 text-white z-10 cursor-pointer hover:scale-110 transition-transform"
                   onClick={() => simulateInteraction('view')} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                8:42
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                HD
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">
                    {content.slice(0, 100) || "Your video title will appear here..."}
                  </h3>
                  <div className="text-xs text-muted-foreground mb-2">
                    Your Channel • {parseInt(((engagement as any).views || '0').replace('K', '000')) + mockInteractions.views} views • 2 hours ago
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-primary" onClick={() => simulateInteraction('like')}>
                      <ThumbsUp className={`h-4 w-4 ${mockInteractions.likes > 0 ? 'text-primary' : ''}`} />
                      <span className="text-xs">{parseInt(engagement.likes.replace('K', '000')) + mockInteractions.likes}</span>
                    </div>
                     <div className="flex items-center space-x-1">
                       <MessageCircle className="h-4 w-4" />
                       <span className="text-xs">{parseInt((engagement as any).comments || '0') + mockInteractions.comments}</span>
                     </div>
                     <div className="flex items-center space-x-1">
                       <Share2 className="h-4 w-4" />
                       <span className="text-xs">{(engagement as any).shares || '0'}</span>
                     </div>
                  </div>
                  
                   <div className="mt-2 text-xs text-muted-foreground">
                     {(engagement as any).watchTime || '0'} total watch time • {(engagement as any).clickthrough || '0%'} CTR
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="bg-muted border rounded-lg p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Platform preview not available</p>
          </div>
        );
    }
  }, [isDarkMode, contentType, content, mockInteractions, interactionMode, simulateInteraction]);

  // Real-time content validation
  useEffect(() => {
    const timer = setTimeout(() => {
      validateContent();
    }, 500);

    return () => clearTimeout(timer);
  }, [validateContent]);

  const PreviewControls = () => (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center space-x-4">
        {/* Device Selection */}
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={deviceView === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDeviceView("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile View (320-480px)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={deviceView === "tablet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDeviceView("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablet View (768-1024px)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={deviceView === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDeviceView("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Desktop View (1200px+)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Preview Mode Toggles */}
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isDarkMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Dark Mode</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showComparison ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Platform Comparison</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={interactionMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInteractionMode(!interactionMode)}
                >
                  <MousePointer2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Interactive Mode</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(50, zoom - 25))}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[50px] text-center">{zoom}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 25))}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
        </Button>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Export</span>
        </Button>
        
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );

  const mainContent = (
    <div className="space-y-6">
      <PreviewControls />

      {/* Validation Alerts */}
      {content && (
        <div className="space-y-2">
          {content.length > (platformFeatures[previewPlatform as keyof typeof platformFeatures]?.maxLength || 5000) && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Content exceeds {previewPlatform} character limit of {platformFeatures[previewPlatform as keyof typeof platformFeatures]?.maxLength}
              </AlertDescription>
            </Alert>
          )}
          
          {content.length > 0 && content.length <= (platformFeatures[previewPlatform as keyof typeof platformFeatures]?.maxLength || 5000) && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Content is optimized for {previewPlatform}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Platform Previews */}
      <div className={getDeviceClass()}>
        {showComparison ? (
          <div className="space-y-6">
            {selectedPlatforms.map(platform => (
              <div key={platform} className="space-y-2">
                <Badge variant="outline" className="mb-2">{platform.charAt(0).toUpperCase() + platform.slice(1)}</Badge>
                {renderAdvancedPlatformPreview(platform)}
              </div>
            ))}
          </div>
        ) : (
          <Tabs value={previewPlatform} onValueChange={setPreviewPlatform} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
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

            <div className="space-y-6">
              {["instagram", "twitter", "facebook", "linkedin", "youtube"].map(platform => (
                <TabsContent key={platform} value={platform} className="mt-0">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    renderAdvancedPlatformPreview(platform)
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        )}
      </div>

      {/* Enhanced Analytics & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="shadow-elegant bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(mockEngagement[previewPlatform as keyof typeof mockEngagement]).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
                  <div className="text-lg font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-elegant bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Engagement Prediction</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This content is predicted to perform 23% above average for {previewPlatform}.
                </p>
              </div>
              
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Optimal Timing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Best posting time: Today at 3:00 PM (+18% engagement boost)
                </p>
              </div>
              
              <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Audience Match</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  92% audience compatibility with your brand voice and target demographics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="shadow-elegant bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-primary" />
            <span>Export & Review</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
              <Download className="h-6 w-6" />
              <span className="text-sm">Export PDF</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
              <Share2 className="h-6 w-6" />
              <span className="text-sm">Share Link</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
              <Eye className="h-6 w-6" />
              <span className="text-sm">Client Review</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isResizable) {
    return <div ref={previewRef}>{mainContent}</div>;
  }

  return (
    <div ref={previewRef} className={isFullscreen ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : ""}>
      {mainContent}
    </div>
  );
};

export default EnhancedPreviewPanel;