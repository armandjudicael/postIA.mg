import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Clock, 
  Send, 
  RefreshCw, 
  Eye, 
  ExternalLink,
  Save,
  Trash2,
  Copy,
  Share2
} from "lucide-react";
import { StudioState } from '@/hooks/useStudioState';

interface StudioToolbarProps {
  state: StudioState;
  onPublish: () => void;
  onSchedule: () => void;
  onClear: () => void;
  onTogglePreviewDetached: () => void;
  onSave?: () => void;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  state,
  onPublish,
  onSchedule,
  onClear,
  onTogglePreviewDetached,
  onSave,
}) => {
  const getCharacterCount = () => {
    const maxLength = state.platform === 'twitter' ? 280 : 2200;
    const isOverLimit = state.content.length > maxLength;
    
    return {
      count: state.content.length,
      max: maxLength,
      isOverLimit,
      percentage: (state.content.length / maxLength) * 100,
    };
  };

  const charInfo = getCharacterCount();

  return (
    <div className="p-4 border-t bg-gradient-subtle">
      {/* Character Count and Platform Warning */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
        <div className="flex items-center space-x-4">
          <span className={`font-medium ${charInfo.isOverLimit ? 'text-destructive' : 'text-foreground'}`}>
            {charInfo.count}/{charInfo.max} characters
          </span>
          
          {/* Platform-specific warnings */}
          {state.platform === 'twitter' && state.content.length > 280 && (
            <Badge variant="destructive" className="text-xs animate-pulse">
              Too long for Twitter
            </Badge>
          )}
          
          {state.platform === 'instagram' && state.content.length > 2200 && (
            <Badge variant="destructive" className="text-xs animate-pulse">
              Too long for Instagram
            </Badge>
          )}
          
          {state.platform === 'linkedin' && state.content.length > 3000 && (
            <Badge variant="destructive" className="text-xs animate-pulse">
              Too long for LinkedIn
            </Badge>
          )}
        </div>

        {/* Content Stats */}
        <div className="hidden sm:flex items-center space-x-4 text-xs">
          <span>Words: {state.content.split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>Lines: {state.content.split('\n').length}</span>
          <span>Hashtags: {(state.content.match(/#\w+/g) || []).length}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        {/* Left Actions */}
        <div className="flex items-center space-x-2">
          {/* Schedule Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onSchedule}
                  disabled={state.isPublishing || !state.scheduleDate || !state.content.trim()}
                  className="transition-all duration-200 hover:scale-105 hover:bg-primary/10"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Schedule</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Schedule post for later publication
                {!state.scheduleDate && <div className="text-xs text-muted-foreground mt-1">Set a date first</div>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Clear Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onClear}
                  disabled={!state.content.trim()}
                  className="transition-all duration-200 hover:scale-105 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Clear</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Clear all content and start fresh
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Save Draft Button */}
          {onSave && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={onSave}
                    disabled={!state.content.trim()}
                    className="transition-all duration-200 hover:scale-105 hover:bg-primary/10"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Save Draft</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Manually save current content as draft
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Preview Controls */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onTogglePreviewDetached}
                  className="transition-all duration-200 hover:scale-105 hover:bg-primary/10"
                >
                  {state.isPreviewDetached ? (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Dock Preview</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Detach Preview</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {state.isPreviewDetached ? 'Dock preview panel' : 'Open preview in floating window'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Publish Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onPublish}
                  disabled={state.isPublishing || !state.content.trim() || charInfo.isOverLimit}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-200 hover:scale-105 min-w-[100px]"
                >
                  {state.isPublishing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {state.editingPost ? 'Update' : 'Publish'}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {state.editingPost ? 'Update existing post' : 'Publish post immediately'}
                {charInfo.isOverLimit && (
                  <div className="text-xs text-destructive mt-1">
                    Content exceeds platform limit
                  </div>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile Stats Bar */}
      <div className="sm:hidden px-4 pb-3 pt-2 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Words: {state.content.split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>Lines: {state.content.split('\n').length}</span>
          <span>Tags: {(state.content.match(/#\w+/g) || []).length}</span>
        </div>
      </div>
    </div>
  );
};