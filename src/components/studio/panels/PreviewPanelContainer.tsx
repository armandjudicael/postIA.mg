import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  PanelRight, 
  ExternalLink, 
  Eye,
  Maximize,
  Minimize
} from "lucide-react";
import { StudioState } from '@/hooks/useStudioState';
import PreviewPanel from '@/components/PreviewPanel';
import EnhancedPreviewPanel from '@/components/EnhancedPreviewPanel';
import { toast } from "sonner";

interface PreviewPanelContainerProps {
  state: StudioState;
  updateState: (updates: Partial<StudioState>) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleDetached: () => void;
}

export const PreviewPanelContainer: React.FC<PreviewPanelContainerProps> = ({
  state,
  updateState,
  isCollapsed,
  onToggleCollapse,
  onToggleDetached,
}) => {
  const handleToggleEnhancedPreview = () => {
    updateState({ enhancedPreview: !state.enhancedPreview });
  };

  const handleTogglePreviewFullscreen = () => {
    updateState({ isPreviewFullscreen: !state.isPreviewFullscreen });
  };

  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col items-center justify-start p-2 bg-gradient-card border-l border-border">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onToggleCollapse}
                className="hover:bg-primary/10 transition-all duration-200"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              Expand Preview Panel
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col bg-gradient-card border-l border-border transition-all duration-300 ${state.isPreviewFullscreen ? 'fixed inset-0 z-50 border-0' : ''}`}>
      {/* Panel Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-subtle">
        <h2 className="text-lg font-semibold text-gradient-primary">Live Preview</h2>
        
        <div className="flex items-center space-x-2">
          {/* Enhanced Preview Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Enhanced</span>
            <Switch 
              checked={state.enhancedPreview} 
              onCheckedChange={handleToggleEnhancedPreview}
              className="data-[state=checked]:bg-primary transition-all duration-200"
            />
          </div>

          {/* Preview Controls */}
          <div className="flex items-center space-x-1">
            {/* Fullscreen Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleTogglePreviewFullscreen}
                    className="hover:bg-primary/10 transition-all duration-200"
                  >
                    {state.isPreviewFullscreen ? 
                      <Minimize className="h-4 w-4" /> : 
                      <Maximize className="h-4 w-4" />
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {state.isPreviewFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Detach Preview */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onToggleDetached}
                    className="hover:bg-primary/10 transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Detach Preview Window
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Collapse Panel */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={onToggleCollapse}
                    className="hover:bg-primary/10 transition-all duration-200"
                  >
                    <PanelRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Collapse Preview Panel
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto bg-background">
        {state.enhancedPreview ? (
          <EnhancedPreviewPanel 
            content={state.content}
            contentType={state.contentType}
            selectedMedia={state.selectedMedia}
            platform={state.platform}
            isResizable={false}
            onError={(error) => toast.error(error)}
            onSuccess={(message) => toast.success(message)}
          />
        ) : (
          <PreviewPanel 
            content={state.content}
            platform={state.platform}
          />
        )}
      </div>

      {/* Preview Footer */}
      <div className="p-3 border-t border-border/50 bg-gradient-subtle">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {state.enhancedPreview ? 'Enhanced Preview' : 'Standard Preview'}
          </span>
          <span>
            Platform: {state.platform === 'multi' ? 'All' : state.platform}
          </span>
        </div>
      </div>
    </div>
  );
};