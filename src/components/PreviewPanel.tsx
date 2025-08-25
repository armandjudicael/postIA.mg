import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Bookmark
} from "lucide-react";

interface PreviewPanelProps {
  content: string;
  platform: string;
}

const PreviewPanel = ({ content, platform }: PreviewPanelProps) => {
  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getPlatformName = (platformName: string) => {
    switch (platformName) {
      case 'instagram': return 'Instagram';
      case 'twitter': return 'Twitter/X';
      case 'facebook': return 'Facebook';
      case 'linkedin': return 'LinkedIn';
      case 'multi': return 'All Platforms';
      default: return 'Social Media';
    }
  };

  const getPlatformColor = (platformName: string) => {
    switch (platformName) {
      case 'instagram': return 'from-pink-500 to-purple-600';
      case 'twitter': return 'from-blue-400 to-blue-600';
      case 'facebook': return 'from-blue-600 to-blue-800';
      case 'linkedin': return 'from-blue-700 to-blue-900';
      default: return 'from-primary to-accent';
    }
  };

  const formatContent = (text: string) => {
    if (!text) return '';
    
    // Split by lines and process each line
    return text.split('\n').map((line, index) => {
      // Handle hashtags
      const hashtagRegex = /#(\w+)/g;
      const parts = line.split(hashtagRegex);
      
      return (
        <span key={index}>
          {parts.map((part, partIndex) => {
            if (partIndex % 2 === 1) {
              // This is a hashtag
              return (
                <span key={partIndex} className="text-primary font-medium">
                  #{part}
                </span>
              );
            }
            return part;
          })}
          {index < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  const getCharacterLimit = (platformName: string) => {
    switch (platformName) {
      case 'twitter': return 280;
      case 'instagram': return 2200;
      case 'facebook': return 63206;
      case 'linkedin': return 3000;
      default: return 2200;
    }
  };

  const isOverLimit = (platformName: string, contentLength: number) => {
    return contentLength > getCharacterLimit(platformName);
  };

  const renderPlatformPreview = (platformName: string) => {
    const characterLimit = getCharacterLimit(platformName);
    const isContentOverLimit = isOverLimit(platformName, content.length);
    
    return (
      <div key={platformName} className="space-y-3">
        {/* Platform Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getPlatformIcon(platformName)}
            <span className="font-medium text-sm">{getPlatformName(platformName)}</span>
          </div>
          <Badge 
            variant={isContentOverLimit ? "destructive" : "outline"} 
            size="sm"
            className="text-xs"
          >
            {content.length}/{characterLimit}
          </Badge>
        </div>

        {/* Mock Post Preview */}
        <div className="bg-white border border-border rounded-lg p-4 space-y-3">
          {/* Mock User Info */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getPlatformColor(platformName)} flex items-center justify-center`}>
              <span className="text-white font-semibold text-sm">PA</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground">PostIA.mg</div>
              <div className="text-xs text-muted-foreground">2 minutes ago</div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="space-y-2">
            {content ? (
              <div className={`text-sm leading-relaxed ${isContentOverLimit ? 'text-destructive' : 'text-foreground'}`}>
                {formatContent(content)}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground italic">
                Your content will appear here...
              </div>
            )}
            
            {isContentOverLimit && (
              <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                Content exceeds {getPlatformName(platformName)} character limit
              </div>
            )}
          </div>

          {/* Mock Engagement */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
                <span className="text-xs">24</span>
              </button>
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">5</span>
              </button>
              <button className="flex items-center space-x-1 text-muted-foreground hover:text-green-500 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="text-xs">12</span>
              </button>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const platformsToShow = platform === 'multi' 
    ? ['instagram', 'twitter', 'facebook', 'linkedin']
    : [platform];

  return (
    <Card variant="elevated" className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Eye className="h-5 w-5 mr-2 text-primary" />
          Live Preview
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how your content will look on social media
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {platformsToShow.map(renderPlatformPreview)}
        
        {/* Content Stats */}
        {content && (
          <div className="bg-gradient-subtle rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm text-foreground">Content Analysis</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Words:</span>
                <span className="ml-1 font-medium">{content.split(/\s+/).filter(word => word.length > 0).length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Characters:</span>
                <span className="ml-1 font-medium">{content.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Hashtags:</span>
                <span className="ml-1 font-medium">{(content.match(/#\w+/g) || []).length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Lines:</span>
                <span className="ml-1 font-medium">{content.split('\n').length}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;