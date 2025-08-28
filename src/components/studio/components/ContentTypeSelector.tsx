import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Mic,
  MicOff
} from "lucide-react";

interface ContentTypeSelectorProps {
  value: 'text' | 'image' | 'video' | 'voice';
  onChange: (type: 'text' | 'image' | 'video' | 'voice') => void;
  isRecording?: boolean;
  onToggleRecording?: () => void;
}

export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  value,
  onChange,
  isRecording = false,
  onToggleRecording,
}) => {
  const contentTypes = [
    {
      type: 'text' as const,
      icon: FileText,
      label: 'Text',
      description: 'Create text-based content',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 hover:bg-blue-500/20',
      borderColor: 'border-blue-500/20',
    },
    {
      type: 'image' as const,
      icon: ImageIcon,
      label: 'Image',
      description: 'Add images to your post',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 hover:bg-green-500/20',
      borderColor: 'border-green-500/20',
    },
    {
      type: 'video' as const,
      icon: Video,
      label: 'Video',
      description: 'Include video content',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 hover:bg-purple-500/20',
      borderColor: 'border-purple-500/20',
    },
    {
      type: 'voice' as const,
      icon: Mic,
      label: 'Voice',
      description: 'Record voice content',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 hover:bg-orange-500/20',
      borderColor: 'border-orange-500/20',
    },
  ];

  return (
    <div className="space-y-3">
      {/* Content Type Grid */}
      <div className="grid grid-cols-2 gap-2">
        {contentTypes.map(({ type, icon: Icon, label, description, color, bgColor, borderColor }) => (
          <TooltipProvider key={type}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={value === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange(type)}
                  className={`
                    h-12 flex flex-col items-center justify-center space-y-1 transition-all duration-200
                    ${value === type 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : `${bgColor} ${borderColor} hover:scale-105`
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 ${value === type ? 'text-primary-foreground' : color}`} />
                  <span className="text-xs font-medium">{label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {/* Voice Recording Controls */}
      {value === 'voice' && onToggleRecording && (
        <div className="mt-4 p-3 bg-gradient-subtle rounded-lg border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-muted'}`} />
              <span className="text-sm font-medium">
                {isRecording ? 'Recording...' : 'Ready to record'}
              </span>
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    onClick={onToggleRecording}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="h-4 w-4 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-1" />
                        Record
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRecording ? 'Stop voice recording' : 'Start voice recording'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {isRecording && (
            <div className="mt-2">
              <div className="flex items-center space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 16 + 8}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Type Info */}
      <div className="text-xs text-muted-foreground">
        {value === 'text' && 'Perfect for captions, quotes, and text-based posts'}
        {value === 'image' && 'Upload photos, graphics, and visual content'}
        {value === 'video' && 'Share video content and multimedia posts'}
        {value === 'voice' && 'Record voice notes and audio content'}
      </div>
    </div>
  );
};