import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

export interface PostData {
  id: string;
  content: string;
  contentType: 'text' | 'image' | 'video' | 'voice';
  platform: string[];
  status: 'draft' | 'published' | 'scheduled' | 'failed';
  createdAt: string;
  publishedAt?: string;
  scheduledFor?: string;
  media?: string[];
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    reach?: number;
  };
  tone?: string;
  tags?: string[];
}

export interface MediaFile {
  id: string;
  type: "image" | "video" | "audio" | "document";
  name: string;
  url: string;
  size: number;
}

export interface StudioState {
  // Content state
  content: string;
  contentType: 'text' | 'image' | 'video' | 'voice';
  tone: string;
  platform: string;
  scheduleDate: string;
  selectedMedia: string[];
  mediaFiles: MediaFile[];
  topicIdea: string;
  
  // UI state
  isGenerating: boolean;
  isPublishing: boolean;
  aiProgress: number;
  lastSaved: Date | null;
  darkMode: boolean;
  isRecording: boolean;
  voiceText: string;
  isVoiceAssistantActive: boolean;
  voiceEnabled: boolean;
  enhancedPreview: boolean;
  
  // Panel state
  isLeftPanelCollapsed: boolean;
  isRightPanelCollapsed: boolean;
  isFullscreen: boolean;
  activePanel: 'editor' | 'media' | 'ai';
  isPreviewDetached: boolean;
  isPreviewFullscreen: boolean;
  
  // Post management
  currentView: 'studio' | 'history';
  editingPost: PostData | null;
}

export const useStudioState = () => {
  const [state, setState] = useState<StudioState>({
    // Content state
    content: "",
    contentType: 'text',
    tone: "professional",
    platform: "multi",
    scheduleDate: "",
    selectedMedia: [],
    mediaFiles: [],
    topicIdea: "",
    
    // UI state
    isGenerating: false,
    isPublishing: false,
    aiProgress: 0,
    lastSaved: null,
    darkMode: false,
    isRecording: false,
    voiceText: "",
    isVoiceAssistantActive: false,
    voiceEnabled: true,
    enhancedPreview: false,
    
    // Panel state
    isLeftPanelCollapsed: false,
    isRightPanelCollapsed: false,
    isFullscreen: false,
    activePanel: 'editor',
    isPreviewDetached: false,
    isPreviewFullscreen: false,
    
    // Post management
    currentView: 'studio',
    editingPost: null,
  });

  // Auto-save functionality
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  const updateState = useCallback((updates: Partial<StudioState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const autoSave = useCallback(() => {
    if (state.content.trim()) {
      updateState({ lastSaved: new Date() });
      localStorage.setItem('postStudio_draft', JSON.stringify({
        content: state.content,
        platform: state.platform,
        tone: state.tone,
        contentType: state.contentType,
        timestamp: new Date().toISOString()
      }));
    }
  }, [state.content, state.platform, state.tone, state.contentType, updateState]);

  // Auto-save with debounce
  useEffect(() => {
    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current);
    }
    
    autoSaveRef.current = setTimeout(() => {
      autoSave();
    }, 3000);

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [autoSave]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('postStudio_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        updateState({
          content: draft.content || "",
          platform: draft.platform || "multi",
          tone: draft.tone || "professional",
          contentType: draft.contentType || "text",
        });
      } catch (error) {
        console.warn('Failed to load draft:', error);
      }
    }
  }, [updateState]);

  const togglePanel = useCallback((panel: 'left' | 'right' | 'fullscreen') => {
    switch (panel) {
      case 'left':
        updateState({ isLeftPanelCollapsed: !state.isLeftPanelCollapsed });
        break;
      case 'right':
        updateState({ isRightPanelCollapsed: !state.isRightPanelCollapsed });
        break;
      case 'fullscreen':
        updateState({ isFullscreen: !state.isFullscreen });
        break;
    }
  }, [state.isLeftPanelCollapsed, state.isRightPanelCollapsed, state.isFullscreen, updateState]);

  const togglePreview = useCallback((action: 'detach' | 'fullscreen') => {
    if (action === 'detach') {
      updateState({ 
        isPreviewDetached: !state.isPreviewDetached,
        isPreviewFullscreen: state.isPreviewDetached ? false : state.isPreviewFullscreen
      });
    } else {
      updateState({ isPreviewFullscreen: !state.isPreviewFullscreen });
    }
  }, [state.isPreviewDetached, state.isPreviewFullscreen, updateState]);

  const handleNewPost = useCallback(() => {
    updateState({
      editingPost: null,
      content: "",
      platform: "multi",
      tone: "professional",
      contentType: "text",
      scheduleDate: "",
      selectedMedia: [],
      currentView: 'studio',
    });
  }, [updateState]);

  const handleEditPost = useCallback((post: PostData) => {
    updateState({
      editingPost: post,
      content: post.content,
      platform: post.platform[0] || 'multi',
      tone: post.tone || 'professional',
      contentType: post.contentType || 'text',
      selectedMedia: post.media || [],
      currentView: 'studio',
    });
    toast.success("Post loaded for editing");
  }, [updateState]);

  const handleDuplicatePost = useCallback((post: PostData) => {
    updateState({
      editingPost: null,
      content: `${post.content} (Copy)`,
      platform: post.platform[0] || 'multi',
      tone: post.tone || 'professional',
      contentType: post.contentType || 'text',
      selectedMedia: post.media || [],
      currentView: 'studio',
    });
    toast.success("Post duplicated and ready for editing");
  }, [updateState]);

  return {
    state,
    updateState,
    togglePanel,
    togglePreview,
    handleNewPost,
    handleEditPost,
    handleDuplicatePost,
  };
};