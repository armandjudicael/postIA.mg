import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { StudioToolbar } from '../StudioToolbar';
import { StudioState } from '@/hooks/useStudioState';

interface EditorPanelProps {
  state: StudioState;
  updateState: (updates: Partial<StudioState>) => void;
  onTogglePreviewDetached: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  state,
  updateState,
  onTogglePreviewDetached,
}) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateState({ content: e.target.value });
  };

  const handleClear = () => {
    updateState({ content: "" });
  };

  const handlePublish = async () => {
    if (!state.content.trim()) {
      return;
    }

    updateState({ isPublishing: true });
    
    try {
      // Simulate publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const publishData = {
        id: Date.now().toString(),
        content: state.content,
        platform: [state.platform],
        timestamp: new Date().toISOString(),
        status: 'published' as const,
        contentType: state.contentType,
        tone: state.tone,
        media: state.selectedMedia,
        engagement: {
          likes: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 30),
          reach: Math.floor(Math.random() * 1000) + 500
        }
      };
      
      const existingPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
      existingPosts.unshift(publishData);
      localStorage.setItem('publishedPosts', JSON.stringify(existingPosts.slice(0, 50)));
      
      // Reset form after successful publish
      setTimeout(() => {
        updateState({
          content: "",
          scheduleDate: "",
          selectedMedia: [],
        });
      }, 2000);
      
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      updateState({ isPublishing: false });
    }
  };

  const handleSchedule = async () => {
    if (!state.content.trim() || !state.scheduleDate) {
      return;
    }

    updateState({ isPublishing: true });
    
    try {
      // Simulate scheduling
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const scheduleData = {
        id: Date.now().toString(),
        content: state.content,
        platform: [state.platform],
        timestamp: new Date().toISOString(),
        status: 'scheduled' as const,
        contentType: state.contentType,
        tone: state.tone,
        media: state.selectedMedia,
        scheduledFor: state.scheduleDate
      };
      
      const existingPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
      existingPosts.unshift(scheduleData);
      localStorage.setItem('publishedPosts', JSON.stringify(existingPosts.slice(0, 50)));
      
      // Reset form after successful schedule
      setTimeout(() => {
        updateState({
          content: "",
          scheduleDate: "",
          selectedMedia: [],
        });
      }, 2000);
      
    } catch (error) {
      console.error('Scheduling failed:', error);
    } finally {
      updateState({ isPublishing: false });
    }
  };

  const getCharacterLimit = () => {
    switch (state.platform) {
      case 'twitter': return 280;
      case 'instagram': return 2200;
      case 'facebook': return 63206;
      case 'linkedin': return 3000;
      default: return 2200;
    }
  };

  const characterLimit = getCharacterLimit();
  const isOverLimit = state.content.length > characterLimit;

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Panel Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-subtle">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gradient-primary">Content Editor</h2>
          {state.editingPost && (
            <span className="text-sm text-muted-foreground">
              Editing: {state.editingPost.id}
            </span>
          )}
        </div>
        
        {/* Character Counter */}
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
            {state.content.length}/{characterLimit}
          </span>
          {state.lastSaved && (
            <span className="text-xs text-green-500 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
              Auto-saved
            </span>
          )}
        </div>
      </div>
      
      {/* Editor Content */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        {/* Platform Warning */}
        {isOverLimit && (
          <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              Content exceeds {state.platform} character limit ({characterLimit} characters)
            </p>
          </div>
        )}

        {/* Content Textarea */}
        <div className="flex-1 relative">
          <Textarea 
            value={state.content}
            onChange={handleContentChange}
            placeholder="Start typing your content here or use AI to generate..."
            className={`
              w-full h-full resize-none text-base leading-relaxed 
              bg-background border-border 
              focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-200
              ${isOverLimit ? 'border-destructive focus:ring-destructive' : ''}
            `}
            style={{ minHeight: 'calc(100vh - 24rem)' }}
          />
          
          {/* Floating Word Count */}
          <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-2 py-1">
            <span className="text-xs text-muted-foreground">
              {state.content.split(/\s+/).filter(word => word.length > 0).length} words
            </span>
          </div>
        </div>

        {/* Content Insights */}
        {state.content && (
          <div className="mt-3 p-3 bg-gradient-subtle rounded-lg border border-border/50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="text-center">
                <div className="font-medium text-foreground">
                  {state.content.split(/\s+/).filter(word => word.length > 0).length}
                </div>
                <div className="text-muted-foreground">Words</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground">
                  {state.content.length}
                </div>
                <div className="text-muted-foreground">Characters</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground">
                  {(state.content.match(/#\w+/g) || []).length}
                </div>
                <div className="text-muted-foreground">Hashtags</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground">
                  {state.content.split('\n').length}
                </div>
                <div className="text-muted-foreground">Lines</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Toolbar */}
      <StudioToolbar
        state={state}
        onPublish={handlePublish}
        onSchedule={handleSchedule}
        onClear={handleClear}
        onTogglePreviewDetached={onTogglePreviewDetached}
      />
    </div>
  );
};