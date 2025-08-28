import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Wand2, 
  Sparkles, 
  History, 
  Maximize, 
  Minimize, 
  Save,
  Sun,
  Moon,
  FileText,
  Image as ImageIcon,
  Video,
  Mic
} from "lucide-react";
import { useStudioTheme } from './StudioThemeProvider';
import { StudioState } from '@/hooks/useStudioState';

interface StudioHeaderProps {
  state: StudioState;
  onViewChange: (view: 'studio' | 'history') => void;
  onToggleFullscreen: () => void;
  onToggleTheme: () => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({
  state,
  onViewChange,
  onToggleFullscreen,
  onToggleTheme,
}) => {
  const { theme } = useStudioTheme();

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-3 w-3" />;
      case 'image': return <ImageIcon className="h-3 w-3" />;
      case 'video': return <Video className="h-3 w-3" />;
      case 'voice': return <Mic className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="bg-card border-b border-border sticky top-0 z-10 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section - Branding and Status */}
        <div className="flex items-center space-x-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-60" />
              <div className="relative bg-card rounded-lg p-2 border border-primary/20 shadow-glow">
                <Wand2 className="h-5 w-5 text-primary animate-pulse" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-gradient-primary">Post Studio</h1>
          </div>

          {/* Status Badge */}
          <Badge 
            variant="secondary" 
            className="bg-primary/10 text-primary border-primary/20 shadow-sm animate-fade-in"
          >
            <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
            {state.editingPost ? 'Editing' : 'Creating'}
          </Badge>

          {/* Content Type Indicators */}
          <div className="hidden sm:flex items-center space-x-2">
            <Badge 
              variant={state.contentType === 'text' ? 'default' : 'outline'} 
              className="transition-all duration-200 hover:scale-105"
            >
              <FileText className="h-3 w-3 mr-1" />
              Text
            </Badge>
            <Badge 
              variant={state.contentType === 'image' ? 'default' : 'outline'}
              className="transition-all duration-200 hover:scale-105"
            >
              <ImageIcon className="h-3 w-3 mr-1" />
              Image
            </Badge>
            <Badge 
              variant={state.contentType === 'video' ? 'default' : 'outline'}
              className="transition-all duration-200 hover:scale-105"
            >
              <Video className="h-3 w-3 mr-1" />
              Video
            </Badge>
            <Badge 
              variant={state.contentType === 'voice' ? 'default' : 'outline'}
              className="transition-all duration-200 hover:scale-105"
            >
              <Mic className="h-3 w-3 mr-1" />
              Voice
            </Badge>
          </div>

          {/* Mobile Content Type Indicator */}
          <div className="sm:hidden">
            <Badge 
              variant="default"
              className="transition-all duration-200"
            >
              {getContentTypeIcon(state.contentType)}
              <span className="ml-1 capitalize">{state.contentType}</span>
            </Badge>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <div className="flex items-center space-x-2 mr-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch 
              checked={theme.isDark} 
              onCheckedChange={onToggleTheme}
              className="data-[state=checked]:bg-primary transition-all duration-200"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* History Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={() => onViewChange('history')}
                  className="hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                >
                  <History className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">History</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                View post history and manage published content
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Fullscreen Toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={onToggleFullscreen}
                  className="hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                >
                  {state.isFullscreen ? 
                    <Minimize className="h-4 w-4" /> : 
                    <Maximize className="h-4 w-4" />
                  }
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {state.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Auto-save Indicator */}
          {state.lastSaved && (
            <Badge 
              variant="outline" 
              className="text-xs hidden md:flex items-center animate-fade-in"
            >
              <Save className="h-3 w-3 mr-1 text-green-500" />
              Saved {state.lastSaved.toLocaleTimeString()}
            </Badge>
          )}
        </div>
      </div>

      {/* Mobile Content Type Selector */}
      <div className="sm:hidden px-4 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {['text', 'image', 'video', 'voice'].map((type) => (
            <Badge 
              key={type}
              variant={state.contentType === type ? 'default' : 'outline'}
              className="whitespace-nowrap transition-all duration-200 hover:scale-105"
            >
              {getContentTypeIcon(type)}
              <span className="ml-1 capitalize">{type}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};