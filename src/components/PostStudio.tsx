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
  VolumeX
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
  const [activeTab, setActiveTab] = useState("create");
  const [darkMode, setDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [topicIdea, setTopicIdea] = useState("");
  const [enhancedPreview, setEnhancedPreview] = useState(false);
  
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

  // Render Studio View
  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      
      <div className={`min-h-screen bg-gradient-subtle ${darkMode ? 'dark' : ''}`}>
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
              {lastSaved && (
                <Badge variant="outline" className="text-xs hidden sm:flex">
                  <Save className="h-3 w-3 mr-1" />
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center space-x-4">
              {['Create', 'Media', 'Preview', 'Schedule', 'Publish'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index <= (activeTab === 'create' ? 0 : activeTab === 'preview' ? 2 : 0) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="ml-2 text-xs font-medium hidden sm:inline">{step}</span>
                  {index < 4 && <div className="w-8 h-px bg-border ml-4 hidden sm:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-background/60 backdrop-blur-sm">
                <TabsTrigger value="create" className="flex items-center space-x-2">
                  <Wand2 className="h-4 w-4" />
                  <span>Create Post</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Visualize & Preview</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Create Post Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Content Type Selection */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Content Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={contentType} onValueChange={(value) => setContentType(value as 'text' | 'image' | 'video' | 'voice')} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 gap-2">
                        <TabsTrigger value="text" className="flex flex-col items-center p-3">
                          <FileText className="h-5 w-5 mb-1" />
                          <span className="text-xs">Text Post</span>
                        </TabsTrigger>
                        <TabsTrigger value="image" className="flex flex-col items-center p-3">
                          <ImageIcon className="h-5 w-5 mb-1" />
                          <span className="text-xs">Image Post</span>
                        </TabsTrigger>
                        <TabsTrigger value="video" className="flex flex-col items-center p-3">
                          <Video className="h-5 w-5 mb-1" />
                          <span className="text-xs">Video Post</span>
                        </TabsTrigger>
                        <TabsTrigger value="voice" className="flex flex-col items-center p-3">
                          <Mic className="h-5 w-5 mb-1" />
                          <span className="text-xs">Voice Post</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* AI Generation */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Sparkles className="h-5 w-5 mr-2 text-primary" />
                      AI Content Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Tone</Label>
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
                      
                      <div>
                        <Label className="text-sm font-medium">Platform</Label>
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
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Topic or Idea</Label>
                      <Input 
                        placeholder="Describe what you want to create..."
                        className="mt-1"
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
                  </CardContent>
                </Card>

                {/* Voice Assistant */}
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-primary" />
                        Voice Assistant
                      </div>
                      <Switch 
                        checked={isVoiceAssistantActive} 
                        onCheckedChange={setIsVoiceAssistantActive}
                        className="data-[state=checked]:bg-primary"
                      />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isVoiceAssistantActive ? (
                      <VoiceInteraction 
                        onContentUpdate={handleVoiceContentUpdate}
                        onActionExecuted={handleVoiceAction}
                      />
                    ) : (
                      <div className="text-center py-6 space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mic className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Voice Assistant</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Enable voice commands to control the Post Studio with your voice
                          </p>
                          <Button 
                            onClick={() => setIsVoiceAssistantActive(true)}
                            className="bg-gradient-primary"
                          >
                            <Mic className="h-4 w-4 mr-2" />
                            Enable Voice Assistant
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Content Editor */}
                <div className="space-y-6">
                  <Card variant="elevated" className="flex-1">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span>Content Editor</span>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant={isRecording ? "destructive" : "outline"} 
                            size="sm"
                            onClick={handleVoiceRecord}
                          >
                            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </Button>
                        </div>
                      </CardTitle>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{content.length}/2200 characters</span>
                        <span className="text-xs">
                          {platform === 'twitter' && content.length > 280 && (
                            <span className="text-destructive">Too long for Twitter</span>
                          )}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start typing your content here or use AI to generate..."
                        className="min-h-[300px] resize-none text-base leading-relaxed"
                      />
                    </CardContent>
                  </Card>

                  {/* Media Content */}
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                        Media Content
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MultimodalContent onMediaUpdate={handleMediaUpdate} />
                    </CardContent>
                  </Card>

                  {/* Publishing Actions */}
                  <Card variant="elevated">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="datetime-local"
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-auto"
                          />
                        </div>
                        <div className="flex items-center space-x-2 w-full sm:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 sm:flex-none"
                            onClick={handleSchedulePost}
                            disabled={isPublishing || !scheduleDate}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                          <Button 
                            className="bg-gradient-primary flex-1 sm:flex-none"
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
                    </CardContent>
                  </Card>
                </div>

                {/* Preview Section */}
                <div className="lg:sticky lg:top-24 lg:h-fit space-y-6">
                  <Card variant="elevated">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span>Preview</span>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={enhancedPreview} 
                            onCheckedChange={setEnhancedPreview}
                            className="data-[state=checked]:bg-primary"
                          />
                          <span className="text-sm">Enhanced</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>

                  {/* Analytics Insights */}
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Zap className="h-5 w-5 mr-2 text-primary" />
                        AI Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">Engagement Prediction</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This content is predicted to perform 23% above average for {platform}.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Optimal Timing</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Best posting time: Today at 3:00 PM (+18% engagement boost)
                        </p>
                      </div>
                      
                      <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Audience Match</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          92% audience compatibility with your brand voice and target demographics.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EnhancedPreviewPanel 
                    content={content}
                    contentType={contentType}
                    selectedMedia={selectedMedia}
                    platform={platform}
                    onError={(error) => toast.error(error)}
                    onSuccess={(message) => toast.success(message)}
                  />
                </div>
                
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                          <MessageSquare className="h-6 w-6" />
                          <span className="text-sm">Request Review</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                          <Palette className="h-6 w-6" />
                          <span className="text-sm">Enhance</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                          <Globe className="h-6 w-6" />
                          <span className="text-sm">Translate</span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                          <Settings className="h-6 w-6" />
                          <span className="text-sm">Settings</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Publishing Options */}
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle className="text-lg">Publishing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Schedule Date</Label>
                        <Input 
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          onClick={handleSchedulePost}
                          disabled={isPublishing || !scheduleDate}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button 
                          variant="default"
                          onClick={handlePublishNow}
                          disabled={isPublishing}
                        >
                          {isPublishing ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4 mr-2" />
                          )}
                          Publish Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PostStudio;