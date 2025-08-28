import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  PanelLeft, 
  FileText, 
  Image as ImageIcon, 
  Sparkles,
  Settings
} from "lucide-react";
import { ContentTypeSelector } from '../components/ContentTypeSelector';
import { PlatformSelector } from '../components/PlatformSelector';
import { ToneSelector } from '../components/ToneSelector';
import { ScheduleInput } from '../components/ScheduleInput';
import { VoiceControls } from '../components/VoiceControls';
import { StudioState } from '@/hooks/useStudioState';
import MultimodalContent from '@/components/MultimodalContent';
import { MediaFile } from '@/hooks/useStudioState';

interface SidebarPanelProps {
  state: StudioState;
  updateState: (updates: Partial<StudioState>) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  state,
  updateState,
  isCollapsed,
  onToggleCollapse,
}) => {
  const handleMediaUpdate = (media: MediaFile[]) => {
    updateState({
      mediaFiles: media,
      selectedMedia: media.map(file => file.url),
      contentType: media.length > 0 ? 
        (media[0].type === "image" ? "image" : 
         media[0].type === "video" ? "video" : 
         media[0].type === "audio" ? "voice" : "text") : "text"
    });
  };

  if (isCollapsed) {
    return (
      <div className="h-full flex flex-col items-center justify-start p-2 bg-gradient-card border-r border-border">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onToggleCollapse}
                className="hover:bg-primary/10 transition-all duration-200"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Expand Content Tools
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-card border-r border-border">
      {/* Panel Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-subtle">
        <h2 className="text-lg font-semibold text-gradient-primary">Content Tools</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onToggleCollapse}
                className="hover:bg-primary/10 transition-all duration-200"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Collapse Panel
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Tabbed Content */}
      <Tabs 
        value={state.activePanel} 
        onValueChange={(value) => updateState({ activePanel: value as 'editor' | 'media' | 'ai' })} 
        className="flex-1 flex flex-col"
      >
        {/* Tab Navigation */}
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger 
              value="editor" 
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <FileText className="h-4 w-4 mr-1" />
              Editor
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <ImageIcon className="h-4 w-4 mr-1" />
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              AI
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Editor Tab Content */}
        <TabsContent value="editor" className="flex-1 p-4 overflow-auto space-y-6">
          {/* Content Type Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Content Type</h3>
            <ContentTypeSelector
              value={state.contentType}
              onChange={(type) => updateState({ contentType: type })}
              isRecording={state.isRecording}
              onToggleRecording={() => updateState({ isRecording: !state.isRecording })}
            />
          </div>
          
          {/* Platform Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Target Platform</h3>
            <PlatformSelector
              value={state.platform}
              onChange={(platform) => updateState({ platform })}
            />
          </div>
          
          {/* Tone Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Content Tone</h3>
            <ToneSelector
              value={state.tone}
              onChange={(tone) => updateState({ tone })}
            />
          </div>
          
          {/* Schedule Input */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Schedule</h3>
            <ScheduleInput
              value={state.scheduleDate}
              onChange={(date) => updateState({ scheduleDate: date })}
            />
          </div>

          {/* Voice Controls */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Voice Features</h3>
            <VoiceControls
              isRecording={state.isRecording}
              isVoiceAssistantActive={state.isVoiceAssistantActive}
              voiceEnabled={state.voiceEnabled}
              onToggleRecording={() => updateState({ isRecording: !state.isRecording })}
              onToggleVoiceAssistant={() => updateState({ isVoiceAssistantActive: !state.isVoiceAssistantActive })}
              onToggleVoiceEnabled={() => updateState({ voiceEnabled: !state.voiceEnabled })}
            />
          </div>
        </TabsContent>
        
        {/* Media Tab Content */}
        <TabsContent value="media" className="flex-1 p-4 overflow-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground">Media Library</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-primary/10 transition-all duration-200"
              >
                <ImageIcon className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
            
            <MultimodalContent onMediaUpdate={handleMediaUpdate} />
            
            {/* Selected Media Count */}
            {state.selectedMedia.length > 0 && (
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-primary font-medium">
                  {state.selectedMedia.length} media file{state.selectedMedia.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* AI Tab Content */}
        <TabsContent value="ai" className="flex-1 p-4 overflow-auto space-y-6">
          {/* AI Topic Input */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">AI Content Generation</h3>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Topic or Idea</label>
              <textarea
                placeholder="Describe what you want to create..."
                value={state.topicIdea}
                onChange={(e) => updateState({ topicIdea: e.target.value })}
                className="w-full p-3 text-sm bg-background border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                rows={3}
              />
            </div>
          </div>
          
          {/* AI Generation Progress */}
          {state.isGenerating && (
            <div className="space-y-3 p-4 bg-gradient-subtle rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">AI Generating Content...</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${state.aiProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Creating amazing content for {state.platform}...
              </p>
            </div>
          )}

          {/* Voice Assistant Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Voice Assistant</h3>
            <VoiceControls
              isRecording={state.isRecording}
              isVoiceAssistantActive={state.isVoiceAssistantActive}
              voiceEnabled={state.voiceEnabled}
              onToggleRecording={() => updateState({ isRecording: !state.isRecording })}
              onToggleVoiceAssistant={() => updateState({ isVoiceAssistantActive: !state.isVoiceAssistantActive })}
              onToggleVoiceEnabled={() => updateState({ voiceEnabled: !state.voiceEnabled })}
            />
          </div>

          {/* AI Settings */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">AI Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Creative Mode</span>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};