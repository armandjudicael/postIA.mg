import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { 
  Sparkles, 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Send,
  History,
  Wand2,
  Clock,
  Save,
  ArrowLeft,
  Plus,
  Image as ImageIcon,
  Video,
  FileText,
  Mic,
  MicOff,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Eye,
  Settings,
  Palette,
  Globe,
  Users,
  CheckCircle,
  Moon,
  Sun,
  Upload,
  BarChart3,
  Zap,
  MessageSquare,
  Brain,
  Volume2,
  VolumeX,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  GripVertical,
  ExternalLink,
  X
} from "lucide-react";
import { toast } from "sonner";

import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import PreviewPanel from "@/components/PreviewPanel";
import PostHistory from "@/components/PostHistory";
import VoiceInteraction from "@/components/VoiceInteraction";
import MultimodalContent from "@/components/MultimodalContent";
import EnhancedPreviewPanel from "@/components/EnhancedPreviewPanel";

interface PostData {
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

interface MediaFile {
  id: string;
  type: "image" | "video" | "audio" | "document";
  name: string;
  url: string;
  size: number;
}

const PostStudio = () => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("multi");
  const [contentType, setContentType] = useState<'text' | 'image' | 'video' | 'voice'>('text');
  const [aiProgress, setAiProgress] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [currentView, setCurrentView] = useState<'studio' | 'history'>('studio');
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [topicIdea, setTopicIdea] = useState("");
  const [enhancedPreview, setEnhancedPreview] = useState(false);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePanel, setActivePanel] = useState<'editor' | 'media' | 'ai'>('editor');
  const [isPreviewDetached, setIsPreviewDetached] = useState(false);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  
  // Auto-save functionality
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save content
  const autoSave = useCallback(() => {
    if (content.trim()) {
      setLastSaved(new Date());
      localStorage.setItem('postStudio_draft', JSON.stringify({
        content,
        platform,
        tone,
        contentType,
        timestamp: new Date().toISOString()
      }));
    }
  }, [content, platform, tone, contentType]);

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setAiProgress(0);
    
    const progressInterval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate AI generation with different content based on tone and platform
    setTimeout(() => {
      let newContent = "";
      
      if (tone === "professional") {
        newContent = "🚀 Exciting news! We're revolutionizing social media content creation with AI-powered tools that help you craft engaging posts in seconds. \n\n✨ Key benefits:\n• Save 5+ hours per week\n• Increase engagement by 95%\n• Multi-platform optimization\n• Brand consistency guaranteed\n\nReady to transform your social media game? 💪\n\n#SocialMedia #AI #ContentCreation #Marketing #Innovation";
      } else if (tone === "friendly") {
        newContent = "Hey everyone! 👋 Super excited to share our new AI tools for social media! They're seriously game-changing! 😍\n\nWith our platform, you can:\n• Create awesome content in seconds ⚡\n• Get way more likes and shares 📈\n• Post everywhere with one click 🔄\n• Keep your brand looking amazing 💯\n\nCan't wait to see what you create! 🙌\n\n#SocialMediaMagic #ContentCreation #AITools";
      } else if (tone === "humorous") {
        newContent = "BREAKING: Local social media manager found dancing on desk after discovering our AI content tools! 🕺💃\n\nWhy the celebration?\n• No more staring at blank screens until your eyes bleed 👀\n• Content so good your competitors will need therapy 🧠\n• Multi-platform posting faster than you can say \"engagement metrics\" 🚀\n• Your brand voice stays consistent (even after that third coffee) ☕\n\n#AIContentTools #SocialMediaSanity #NoMoreWritersBlock";
      } else if (tone === "inspiring") {
        newContent = "✨ Every great brand begins with a single post. Today, we're empowering creators to find their voice and amplify their message through revolutionary AI-powered tools. ✨\n\nImagine a world where:\n• Your creativity flows unhindered by technical limitations\n• Your message resonates across all platforms with authentic clarity\n• Your time is invested in strategy, not repetitive tasks\n• Your brand story unfolds with consistent brilliance\n\nThe future of content creation is here. Will you embrace it?\n\n#DigitalTransformation #CreatorEconomy #AIInnovation";
      }
      
      // Adjust for platform if needed
      if (platform === "twitter") {
        newContent = newContent.split('\n\n')[0] + "\n\n" + "#AI #SocialMedia #ContentCreation";
      }
      
      setContent(newContent);
      setIsGenerating(false);
      setAiProgress(0);
      
      toast.success("AI content generated successfully!", {
        description: "Content has been optimized for " + platform
      });
    }, 2500);
  };

  const handlePublishNow = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!content.trim()) {
      toast.error("Please add some content before publishing");
      return;
    }

    setIsPublishing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const publishData = {
        id: Date.now().toString(),
        content,
        platform: [platform],
        timestamp: new Date().toISOString(),
        status: 'published',
        contentType,
        tone,
        media: selectedMedia,
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
      
      toast.success("🎉 Post published successfully!", {
        duration: 4000,
        action: {
          label: "View History",
          onClick: () => setCurrentView('history')
        }
      });
      
      setTimeout(() => {
        setContent("");
        setScheduleDate("");
        setSelectedMedia([]);
      }, 2000);
      
    } catch (error) {
      toast.error("❌ Publishing failed");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSchedulePost = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!content.trim()) {
      toast.error("Please add some content before scheduling");
      return;
    }

    if (!scheduleDate) {
      toast.error("Please select a date and time for scheduling");
      return;
    }

    setIsPublishing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const scheduleData = {
        id: Date.now().toString(),
        content,
        platform: [platform],
        timestamp: new Date().toISOString(),
        status: 'scheduled',
        contentType,
        tone,
        media: selectedMedia,
        scheduledFor: scheduleDate
      };
      
      const existingPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
      existingPosts.unshift(scheduleData);
      localStorage.setItem('publishedPosts', JSON.stringify(existingPosts.slice(0, 50)));
      
      toast.success("📅 Post scheduled successfully!", {
        duration: 4000,
        description: `Your post will be published on ${new Date(scheduleDate).toLocaleString()}`,
        action: {
          label: "View History",
          onClick: () => setCurrentView('history')
        }
      });
      
      setTimeout(() => {
        setContent("");
        setScheduleDate("");
        setSelectedMedia([]);
      }, 2000);
      
    } catch (error) {
      toast.error("❌ Scheduling failed");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleEditPost = (post: PostData) => {
    setEditingPost(post);
    setContent(post.content);
    setPlatform(post.platform[0] || 'multi');
    setTone(post.tone || 'professional');
    setContentType(post.contentType || 'text');
    setSelectedMedia(post.media || []);
    setCurrentView('studio');
    toast.success("Post loaded for editing");
  };

  const handleDuplicatePost = (post: PostData) => {
    setEditingPost(null);
    setContent(`${post.content} (Copy)`);
    setPlatform(post.platform[0] || 'multi');
    setTone(post.tone || 'professional');
    setContentType(post.contentType || 'text');
    setSelectedMedia(post.media || []);
    setCurrentView('studio');
    toast.success("Post duplicated and ready for editing");
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setContent("");
    setPlatform("multi");
    setTone("professional");
    setContentType("text");
    setScheduleDate("");
    setSelectedMedia([]);
    setCurrentView('studio');
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setVoiceText("This is a sample voice-to-text conversion. The AI has transcribed your voice input automatically.");
        setIsRecording(false);
        
        // Add the voice text to the content
        setContent(prev => prev ? `${prev}\n\n${voiceText}` : voiceText);
        
        toast.success("Voice transcription complete", {
          description: "Your speech has been converted to text"
        });
      }, 3000);
    }
  };

  const handleMediaUpdate = (media: MediaFile[]) => {
    setMediaFiles(media);
    setSelectedMedia(media.map(file => file.url));
    
    if (media.length > 0) {
      // Set content type based on the first media file
      if (media[0].type === "image") {
        setContentType("image");
      } else if (media[0].type === "video") {
        setContentType("video");
      } else if (media[0].type === "audio") {
        setContentType("voice");
      }
    }
  };

  const handleVoiceContentUpdate = (newContent: string) => {
    setContent(prev => prev ? `${prev}\n${newContent}` : newContent);
  };

  const handleVoiceAction = (action: string, data?: any) => {
    switch (action) {
      case 'publish':
        handlePublishNow();
        break;
      case 'schedule':
        if (scheduleDate) {
          handleSchedulePost();
        } else {
          toast.error("Please set a schedule date first");
        }
        break;
      case 'generate':
        handleGenerate();
        break;
      default:
        toast.info(`Voice command received: ${action}`);
    }
  };

  const toggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed);
  };

  const toggleRightPanel = () => {
    setIsRightPanelCollapsed(!isRightPanelCollapsed);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const togglePreviewDetached = () => {
    setIsPreviewDetached(!isPreviewDetached);
    if (isPreviewFullscreen) {
      setIsPreviewFullscreen(false);
    }
  };

  const togglePreviewFullscreen = () => {
    setIsPreviewFullscreen(!isPreviewFullscreen);
  };

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('postStudio_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setContent(draft.content || "");
        setPlatform(draft.platform || "multi");
        setTone(draft.tone || "professional");
        setContentType(draft.contentType || "text");
      } catch (error) {
        console.warn('Failed to load draft:', error);
      }
    }
  }, []);

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

  // Render Post History View
  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        {/* History Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentView('studio')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Studio
              </Button>
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold text-gradient-primary">Post History</h1>
              </div>
            </div>
            <Button
              variant="default"
              onClick={handleNewPost}
              className="bg-gradient-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>

        {/* History Content */}
        <div className="container mx-auto px-4 py-6">
          <PostHistory 
            onEditPost={handleEditPost}
            onDuplicatePost={handleDuplicatePost}
          />
        </div>
      </div>
    );
  }

  // Render Detached Preview
  const PreviewWindow = () => (
    <div className={`${isPreviewFullscreen ? 'fixed inset-0 z-50 bg-background' : 'fixed right-4 bottom-4 w-[400px] h-[600px] z-40 shadow-xl rounded-lg border border-border bg-card overflow-hidden'}`}>
      <div className="h-full flex flex-col">
        <div className="p-3 border-b flex items-center justify-between bg-muted/30">
          <h2 className="text-base font-medium flex items-center">
            <Eye className="h-4 w-4 mr-2 text-primary" />
            Preview
          </h2>
          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={togglePreviewFullscreen}
                  >
                    {isPreviewFullscreen ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPreviewFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-7 w-7"
                    onClick={togglePreviewDetached}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Close
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="flex-1 p-3 overflow-auto">
          {enhancedPreview ? (
            <EnhancedPreviewPanel 
              content={content}
              contentType={contentType}
              selectedMedia={selectedMedia}
              platform={platform}
              isResizable={false}
              onError={(error) => toast.error(error)}
              onSuccess={(message) => toast.success(message)}
            />
          ) : (
            <PreviewPanel 
              content={content}
              platform={platform}
            />
          )}
        </div>
      </div>
    </div>
  );

  // Render Studio View with 3-panel layout
  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      
      <div className={`h-full min-h-screen flex flex-col bg-gradient-subtle ${darkMode ? 'dark' : ''}`}>
        {/* Studio Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-60" />
                  <div className="relative bg-white rounded-lg p-2 border border-primary/20">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-gradient-primary">Post Studio</h1>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                {editingPost ? 'Editing' : 'Creating'}
              </Badge>
              <Badge variant={contentType === 'text' ? 'default' : 'outline'} className="hidden sm:flex">
                <FileText className="h-3 w-3 mr-1" />
                Text
              </Badge>
              <Badge variant={contentType === 'image' ? 'default' : 'outline'} className="hidden sm:flex">
                <ImageIcon className="h-3 w-3 mr-1" />
                Image
              </Badge>
              <Badge variant={contentType === 'video' ? 'default' : 'outline'} className="hidden sm:flex">
                <Video className="h-3 w-3 mr-1" />
                Video
              </Badge>
              <Badge variant={contentType === 'voice' ? 'default' : 'outline'} className="hidden sm:flex">
                <Mic className="h-3 w-3 mr-1" />
                Voice
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 mr-2">
                <Sun className="h-4 w-4" />
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="h-4 w-4" />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('history')}
                className="hover:bg-primary/10"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {lastSaved && (
                <Badge variant="outline" className="text-xs hidden sm:flex">
                  <Save className="h-3 w-3 mr-1" />
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - 3-Panel Layout */}
        <div className={`container mx-auto px-4 py-6 flex-1 flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
          <ResizablePanelGroup direction="horizontal" className="h-full min-h-[calc(100vh-12rem)] rounded-lg border">
            {/* Left Panel - Content Creation */}
            <ResizablePanel 
              defaultSize={25} 
              minSize={15}
              maxSize={40}
              collapsible={true}
              collapsedSize={0}
              onCollapse={() => setIsLeftPanelCollapsed(true)}
              onExpand={() => setIsLeftPanelCollapsed(false)}
              className="bg-card"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Content Tools</h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={toggleLeftPanel}
                        >
                          <PanelLeft className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isLeftPanelCollapsed ? 'Expand Panel' : 'Collapse Panel'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Tabs value={activePanel} onValueChange={(value) => setActivePanel(value as 'editor' | 'media' | 'ai')} className="flex-1">
                  <div className="px-4 pt-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="editor" className="text-xs">
                        <FileText className="h-4 w-4 mr-1" />
                        Editor
                      </TabsTrigger>
                      <TabsTrigger value="media" className="text-xs">
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Media
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="text-xs">
                        <Sparkles className="h-4 w-4 mr-1" />
                        AI
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="editor" className="flex-1 p-4 overflow-auto">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Content Type</Label>
                          <div className="flex">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant={isRecording ? "destructive" : "outline"} 
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={handleVoiceRecord}
                                  >
                                    {isRecording ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {isRecording ? 'Stop Recording' : 'Start Voice Recording'}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <Button 
                            variant={contentType === 'text' ? "default" : "outline"} 
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setContentType('text')}
                          >
                            <FileText className="h-3 w-3 mr-1" />
                            Text
                          </Button>
                          <Button 
                            variant={contentType === 'image' ? "default" : "outline"} 
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setContentType('image')}
                          >
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Image
                          </Button>
                          <Button 
                            variant={contentType === 'video' ? "default" : "outline"} 
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setContentType('video')}
                          >
                            <Video className="h-3 w-3 mr-1" />
                            Video
                          </Button>
                          <Button 
                            variant={contentType === 'voice' ? "default" : "outline"} 
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => setContentType('voice')}
                          >
                            <Mic className="h-3 w-3 mr-1" />
                            Voice
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Platform</Label>
                        <Select value={platform} onValueChange={setPlatform}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multi">All Platforms</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter/X</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select value={tone} onValueChange={setTone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="humorous">Humorous</SelectItem>
                            <SelectItem value="inspiring">Inspiring</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Schedule</Label>
                        <Input 
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          className="w-full bg-gradient-primary"
                          onClick={handleGenerate}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 mr-2" />
                              Generate with AI
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="media" className="flex-1 p-4 overflow-auto">
                    <MultimodalContent onMediaUpdate={handleMediaUpdate} />
                  </TabsContent>
                  
                  <TabsContent value="ai" className="flex-1 p-4 overflow-auto">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>AI Topic or Idea</Label>
                        <Input 
                          placeholder="Describe what you want to create..."
                          value={topicIdea}
                          onChange={(e) => setTopicIdea(e.target.value)}
                        />
                      </div>
                      
                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-gradient-primary"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            AI Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate with AI
                          </>
                        )}
                      </Button>
                      
                      {isGenerating && (
                        <div className="space-y-2">
                          <Progress value={aiProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground text-center">
                            Creating amazing content...
                          </p>
                        </div>
                      )}
                      
                      <div className="pt-4">
                        <Label className="mb-2 block">Voice Assistant</Label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Enable Voice AI</span>
                          <Switch 
                            checked={isVoiceAssistantActive} 
                            onCheckedChange={setIsVoiceAssistantActive}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </div>
                      
                      {isVoiceAssistantActive && (
                        <div className="pt-2">
                          <VoiceInteraction 
                            onContentUpdate={handleVoiceContentUpdate}
                            onActionExecuted={handleVoiceAction}
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Middle Panel - Content Editor */}
            <ResizablePanel defaultSize={isPreviewDetached ? 75 : 50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Content Editor</h2>
                  <div className="flex items-center space-x-2">
                    {lastSaved && (
                      <Badge variant="outline" className="text-xs">
                        <Save className="h-3 w-3 mr-1" />
                        Saved {lastSaved.toLocaleTimeString()}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 p-4 overflow-auto">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{content.length}/2200 characters</span>
                    <span className="text-xs">
                      {platform === 'twitter' && content.length > 280 && (
                        <span className="text-destructive">Too long for Twitter</span>
                      )}
                    </span>
                  </div>
                  
                  <Textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start typing your content here or use AI to generate..."
                    className="min-h-[calc(100vh-20rem)] resize-none text-base leading-relaxed"
                  />
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        className="text-xs h-9"
                        onClick={handleSchedulePost}
                        disabled={isPublishing || !scheduleDate}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                      <Button 
                        variant="outline"
                        className="text-xs h-9"
                        onClick={() => setContent("")}
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isPreviewDetached ? (
                        <Button 
                          variant="outline"
                          className="text-xs h-9"
                          onClick={togglePreviewDetached}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Dock Preview
                        </Button>
                      ) : (
                        <Button 
                          variant="outline"
                          className="text-xs h-9"
                          onClick={togglePreviewDetached}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Detach Preview
                        </Button>
                      )}
                      <Button 
                        className="bg-gradient-primary"
                        onClick={handlePublishNow}
                        disabled={isPublishing}
                      >
                        {isPublishing ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 mr-2" />
                        )}
                        {editingPost ? 'Update' : 'Publish'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            
            {!isPreviewDetached && (
              <>
                <ResizableHandle withHandle />
                
                {/* Right Panel - Preview */}
                <ResizablePanel 
                  defaultSize={25} 
                  minSize={15}
                  maxSize={40}
                  collapsible={true}
                  collapsedSize={0}
                  onCollapse={() => setIsRightPanelCollapsed(true)}
                  onExpand={() => setIsRightPanelCollapsed(false)}
                  className="bg-card"
                >
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Preview</h2>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs">Enhanced</span>
                          <Switch 
                            checked={enhancedPreview} 
                            onCheckedChange={setEnhancedPreview}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={togglePreviewDetached}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Detach Preview
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={toggleRightPanel}
                              >
                                <PanelRight className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {isRightPanelCollapsed ? 'Expand Panel' : 'Collapse Panel'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-auto">
                      {enhancedPreview ? (
                        <EnhancedPreviewPanel 
                          content={content}
                          contentType={contentType}
                          selectedMedia={selectedMedia}
                          platform={platform}
                          isResizable={false}
                          onError={(error) => toast.error(error)}
                          onSuccess={(message) => toast.success(message)}
                        />
                      ) : (
                        <PreviewPanel 
                          content={content}
                          platform={platform}
                        />
                      )}
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>

      {/* Detached Preview Window */}
      {isPreviewDetached && <PreviewWindow />}
    </>
  );
};

export default PostStudio;