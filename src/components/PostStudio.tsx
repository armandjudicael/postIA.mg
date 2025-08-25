import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
  Plus
} from "lucide-react";
import { toast } from "sonner";

import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import PreviewPanel from "@/components/PreviewPanel";
import PostHistory from "@/components/PostHistory";

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

const PostStudio = () => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("multi");
  const [aiProgress, setAiProgress] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [currentView, setCurrentView] = useState<'studio' | 'history'>('studio');
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
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
        timestamp: new Date().toISOString()
      }));
    }
  }, [content, platform, tone]);

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

    setTimeout(() => {
      const newContent = "🚀 Exciting news! We're revolutionizing social media content creation with AI-powered tools that help you craft engaging posts in seconds. \n\n✨ Key benefits:\n• Save 5+ hours per week\n• Increase engagement by 95%\n• Multi-platform optimization\n• Brand consistency guaranteed\n\nReady to transform your social media game? 💪\n\n#SocialMedia #AI #ContentCreation #Marketing #Innovation";
      setContent(newContent);
      setIsGenerating(false);
      setAiProgress(0);
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
        contentType: 'text' as const,
        tone,
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
      }, 2000);
      
    } catch (error) {
      toast.error("❌ Publishing failed");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleEditPost = (post: PostData) => {
    setEditingPost(post);
    setContent(post.content);
    setPlatform(post.platform[0] || 'multi');
    setTone(post.tone || 'professional');
    setCurrentView('studio');
    toast.success("Post loaded for editing");
  };

  const handleDuplicatePost = (post: PostData) => {
    setEditingPost(null);
    setContent(`${post.content} (Copy)`);
    setPlatform(post.platform[0] || 'multi');
    setTone(post.tone || 'professional');
    setCurrentView('studio');
    toast.success("Post duplicated and ready for editing");
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setContent("");
    setPlatform("multi");
    setTone("professional");
    setScheduleDate("");
    setCurrentView('studio');
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
      
      <div className="min-h-screen bg-gradient-subtle">
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
            </div>

            <div className="flex items-center space-x-2">
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

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-2 gap-6 h-full">
            {/* Editor Section */}
            <div className="space-y-6 flex-1">
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
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Topic or Idea</Label>
                    <Input 
                      placeholder="Describe what you want to create..."
                      className="mt-1"
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

              {/* Content Editor */}
              <Card variant="elevated" className="flex-1">
                <CardHeader>
                  <CardTitle className="text-lg">Content Editor</CardTitle>
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
                      <Button variant="outline" className="flex-1 sm:flex-none">
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
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <PreviewPanel 
                content={content}
                platform={platform}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostStudio;