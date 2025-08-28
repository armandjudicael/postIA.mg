import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
  Users
} from "lucide-react";

interface PlatformSelectorProps {
  value: string;
  onChange: (platform: string) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  value,
  onChange,
}) => {
  const platforms = [
    {
      value: 'multi',
      label: 'All Platforms',
      icon: Globe,
      description: 'Optimize for all social media platforms',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      charLimit: 2200,
      features: ['Cross-platform optimization', 'Universal formatting'],
    },
    {
      value: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      description: 'Perfect for visual storytelling',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      charLimit: 2200,
      features: ['Stories', 'Reels', 'Carousel posts', 'Hashtags (30 max)'],
    },
    {
      value: 'twitter',
      label: 'Twitter/X',
      icon: Twitter,
      description: 'Short-form content and conversations',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      charLimit: 280,
      features: ['Threads', 'Polls', 'Spaces', 'Hashtags (3 recommended)'],
    },
    {
      value: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      description: 'Community engagement and sharing',
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      charLimit: 63206,
      features: ['Live streaming', 'Events', 'Groups', 'Long-form content'],
    },
    {
      value: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional networking and content',
      color: 'text-blue-700',
      bgColor: 'bg-blue-700/10',
      charLimit: 3000,
      features: ['Articles', 'Professional updates', 'Industry insights'],
    },
  ];

  const selectedPlatform = platforms.find(p => p.value === value);

  return (
    <div className="space-y-3">
      {/* Platform Selector */}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary">
          <SelectValue>
            {selectedPlatform && (
              <div className="flex items-center space-x-2">
                <selectedPlatform.icon className={`h-4 w-4 ${selectedPlatform.color}`} />
                <span>{selectedPlatform.label}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-w-sm">
          {platforms.map((platform) => (
            <SelectItem 
              key={platform.value} 
              value={platform.value}
              className="cursor-pointer transition-all duration-200 hover:bg-primary/10"
            >
              <div className="flex items-center space-x-3 py-2">
                <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                  <platform.icon className={`h-4 w-4 ${platform.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{platform.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {platform.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Limit: {platform.charLimit.toLocaleString()} chars
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Platform Info */}
      {selectedPlatform && (
        <div className={`p-3 rounded-lg border transition-all duration-200 ${selectedPlatform.bgColor} border-border/50`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-background/50`}>
              <selectedPlatform.icon className={`h-5 w-5 ${selectedPlatform.color}`} />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-medium text-sm">{selectedPlatform.label}</h4>
                <p className="text-xs text-muted-foreground">
                  {selectedPlatform.description}
                </p>
              </div>
              
              {/* Character Limit */}
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {selectedPlatform.charLimit.toLocaleString()} chars max
                </Badge>
                {selectedPlatform.value === 'twitter' && (
                  <Badge variant="outline" className="text-xs text-orange-600">
                    Short form
                  </Badge>
                )}
                {selectedPlatform.value === 'multi' && (
                  <Badge variant="outline" className="text-xs text-primary">
                    Universal
                  </Badge>
                )}
              </div>

              {/* Platform Features */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedPlatform.features.map((feature, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-background/50 hover:bg-background/70 transition-colors"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Tips */}
      {selectedPlatform && (
        <div className="text-xs text-muted-foreground space-y-1">
          {selectedPlatform.value === 'instagram' && (
            <p>💡 Use high-quality visuals and relevant hashtags for better reach</p>
          )}
          {selectedPlatform.value === 'twitter' && (
            <p>💡 Keep it concise and engaging. Use threads for longer content</p>
          )}
          {selectedPlatform.value === 'facebook' && (
            <p>💡 Encourage engagement with questions and community-focused content</p>
          )}
          {selectedPlatform.value === 'linkedin' && (
            <p>💡 Share professional insights and industry-relevant content</p>
          )}
          {selectedPlatform.value === 'multi' && (
            <p>💡 Content will be optimized for the most restrictive platform limits</p>
          )}
        </div>
      )}
    </div>
  );
};