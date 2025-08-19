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
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Sparkles, 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Send,
  Image as ImageIcon,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Eye,
  Wand2,
  Video,
  FileText,
  Mic,
  MicOff,
  Play,
  Pause,
  Volume2,
  Download,
  Share2,
  Settings,
  Palette,
  Globe,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  Moon,
  Sun,
  Upload,
  Scissors,
  Filter,
  Menu,
  X,
  Maximize2,
  Minimize2,
  PanelLeftClose,
  PanelRightClose,
  Save,
  History,
  Zap
} from "lucide-react";
import { toast } from "sonner";

import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import VoiceRecorder from "@/components/VoiceRecorder";
import MediaLibrary from "@/components/MediaLibrary";
import EnhancedPreviewPanel from "@/components/EnhancedPreviewPanel";
import MultimodalContent from "@/components/MultimodalContent";
import VoiceInteraction from "@/components/VoiceInteraction";
import SmartPublishButton from "@/components/SmartPublishButton";

const PostStudio = () => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("multi");
  const [contentType, setContentType] = useState("text");
  const [aiProgress, setAiProgress] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  
  // Studio-specific state
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeToolPanel, setActiveToolPanel] = useState("ai-tools");
  
  // Enhanced publish state
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'draft' | 'published' | 'scheduled' | 'error'>('draft');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram']);
  const [publishError, setPublishError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Undo/Redo functionality
  const [contentHistory, setContentHistory] = useState<string[]>([""])
  const [historyIndex, setHistoryIndex] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Auto-save functionality
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const isDragOverRef = useRef(false);

  // Auto-save content
  const autoSave = useCallback(() => {
    if (content.trim()) {
      setLastSaved(new Date());
      localStorage.setItem('postStudio_draft', JSON.stringify({
        content,
        contentType,
        selectedMedia,
        platform,
        tone,
        timestamp: new Date().toISOString()
      }));
    }
  }, [content, contentType, selectedMedia, platform, tone]);

  // Content history management
  const addToHistory = useCallback((newContent: string) => {
    const newHistory = [...contentHistory.slice(0, historyIndex + 1), newContent];
    setContentHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [contentHistory, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(contentHistory[historyIndex - 1]);
    }
  }, [historyIndex, contentHistory]);

  const redo = useCallback(() => {
    if (historyIndex < contentHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(contentHistory[historyIndex + 1]);
    }
  }, [historyIndex, contentHistory]);

  // Validation logic
  const validatePost = useCallback(() => {
    const errors: string[] = [];
    
    if (!content.trim()) {
      errors.push("Content is required");
    }
    
    if (content.length > 2200) {
      errors.push("Content exceeds maximum length for selected platforms");
    }
    
    if (selectedPlatforms.includes('twitter') && content.length > 280) {
      errors.push("Content too long for Twitter (280 characters max)");
    }
    
    if (selectedPlatforms.includes('instagram') && selectedMedia.length === 0 && contentType === 'image') {
      errors.push("Instagram posts require media");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  }, [content, selectedPlatforms, selectedMedia, contentType]);

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
      addToHistory(newContent);
      setIsGenerating(false);
      setAiProgress(0);
    }, 2500);
  };

  const handlePublishNow = async () => {
    if (!validatePost()) {
      return;
    }

    setIsPublishing(true);
    setPublishError("");
    
    try {
      // Simulate publishing to selected platforms
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPublishStatus('published');
      toast.success(`Published to ${selectedPlatforms.join(', ')} successfully!`);
      
      // Clear form after successful publish
      setTimeout(() => {
        setContent("");
        setSelectedMedia([]);
        setPublishStatus('draft');
      }, 2000);
      
    } catch (error) {
      setPublishStatus('error');
      setPublishError("Failed to publish. Please try again.");
      toast.error("Publishing failed");
    } finally {
      setIsPublishing(false);
    }
  };

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('postStudio_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setContent(draft.content || "");
        setContentType(draft.contentType || "text");
        setSelectedMedia(draft.selectedMedia || []);
        setPlatform(draft.platform || "multi");
        setTone(draft.tone || "professional");
        addToHistory(draft.content || "");
      } catch (error) {
        console.warn('Failed to load draft:', error);
      }
    }
  }, [addToHistory]);

  // Auto-save with debounce
  useEffect(() => {
    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current);
    }
    
    autoSaveRef.current = setTimeout(() => {
      autoSave();
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current);
      }
    };
  }, [autoSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              redo();
            } else {
              e.preventDefault();
              undo();
            }
            break;
          case 's':
            e.preventDefault();
            autoSave();
            break;
          case 'Enter':
            if (e.shiftKey) {
              e.preventDefault();
              handlePublishNow();
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, autoSave, handlePublishNow]);

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setVoiceText("This is a sample voice-to-text conversion. The AI has transcribed your voice input automatically.");
        setIsRecording(false);
      }, 3000);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      
      <div className="h-screen flex flex-col bg-gradient-subtle overflow-hidden">
        {/* Minimal Top Bar */}
        <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 flex-shrink-0 z-50">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-60" />
                  <div className="relative bg-background/90 backdrop-blur-sm rounded-lg p-1.5 border border-primary/20">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-gradient-primary">Post Studio</h1>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Studio
              </Badge>
            </div>

            {/* Progress Steps - Compact */}
            <div className="hidden lg:flex items-center space-x-2">
              {['Create', 'Media', 'Preview', 'Schedule', 'Publish'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index <= 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 4 && <div className="w-4 h-px bg-border ml-2" />}
                </div>
              ))}
            </div>

            {/* Top Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setLeftPanelOpen(!leftPanelOpen)}>
                <PanelLeftClose className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setRightPanelOpen(!rightPanelOpen)}>
                <PanelRightClose className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <div className="flex items-center space-x-1">
                <Sun className="h-3 w-3" />
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-primary scale-75"
                />
                <Moon className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Studio Workspace */}
        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Tool Panel */}
            {leftPanelOpen && (
              <>
                <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
                  <div className="h-full bg-background/60 backdrop-blur-sm border-r border-border/50 flex flex-col">
                    {/* Tool Panel Header */}
                    <div className="p-4 border-b border-border/50">
                      <Tabs value={activeToolPanel} onValueChange={setActiveToolPanel}>
                        <TabsList className="grid w-full grid-cols-4 h-8">
                          <TabsTrigger value="ai-tools" className="text-xs">AI</TabsTrigger>
                          <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
                          <TabsTrigger value="voice" className="text-xs">Voice</TabsTrigger>
                          <TabsTrigger value="multimodal" className="text-xs">Multi</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Tool Panel Content */}
                    <div className="flex-1 overflow-auto p-4">
                      <Tabs value={activeToolPanel} onValueChange={setActiveToolPanel}>
                        {/* AI Tools Panel */}
                        <TabsContent value="ai-tools" className="space-y-4 mt-0">
                          {/* Content Type Selection */}
                          <Card className="shadow-elegant bg-gradient-card">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm">Content Type</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-2">
                                {[
                                  { type: 'text', icon: FileText, label: 'Text' },
                                  { type: 'image', icon: ImageIcon, label: 'Image' },
                                  { type: 'video', icon: Video, label: 'Video' },
                                  { type: 'voice', icon: Mic, label: 'Voice' }
                                ].map(({ type, icon: Icon, label }) => (
                                  <Button
                                    key={type}
                                    variant={contentType === type ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setContentType(type)}
                                    className="h-auto p-2 flex flex-col items-center"
                                  >
                                    <Icon className="h-4 w-4 mb-1" />
                                    <span className="text-xs">{label}</span>
                                  </Button>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* AI Tools Grid */}
                          <Card className="shadow-elegant bg-gradient-card">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm flex items-center">
                                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                                AI Enhancement
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-2 mb-4">
                                {[
                                  { icon: Wand2, label: 'Text AI', action: handleGenerate },
                                  { icon: Palette, label: 'Image AI' },
                                  { icon: Globe, label: 'Translate' },
                                  { icon: Volume2, label: 'Voice-over' },
                                  { icon: Scissors, label: 'Edit' },
                                  { icon: Filter, label: 'Enhance' }
                                ].map(({ icon: Icon, label, action }) => (
                                  <Button
                                    key={label}
                                    variant="outline"
                                    size="sm"
                                    onClick={action}
                                    className="h-auto p-2 flex flex-col items-center hover:bg-primary/10"
                                  >
                                    <Icon className="h-3 w-3 mb-1" />
                                    <span className="text-xs">{label}</span>
                                  </Button>
                                ))}
                              </div>

                              {/* AI Settings */}
                              <div className="space-y-3">
                                <div>
                                  <Label className="text-xs">Tone</Label>
                                  <Select value={tone} onValueChange={setTone}>
                                    <SelectTrigger className="h-7 text-xs">
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
                                  <Label className="text-xs">Platform</Label>
                                  <Select value={platform} onValueChange={setPlatform}>
                                    <SelectTrigger className="h-7 text-xs">
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
                            </CardContent>
                          </Card>

                          {/* Quick Actions */}
                          <Card className="shadow-elegant bg-gradient-card">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Save className="h-3 w-3 mr-2" />
                                  <span className="text-xs">Save Draft</span>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <History className="h-3 w-3 mr-2" />
                                  <span className="text-xs">Version History</span>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Users className="h-3 w-3 mr-2" />
                                  <span className="text-xs">Collaborate</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Media Panel */}
                        <TabsContent value="media" className="mt-0">
                          <MediaLibrary 
                            contentType={contentType}
                            onMediaSelect={setSelectedMedia}
                          />
                        </TabsContent>

                        {/* Voice Panel */}
                        <TabsContent value="voice" className="mt-0">
                          <VoiceInteraction 
                            onContentUpdate={setContent}
                            onActionExecuted={(action, data) => {
                              if (action === 'schedule') {
                                // Handle scheduling
                                toast.success("Post scheduled via voice command");
                              } else if (action === 'publish') {
                                // Handle publishing
                                toast.success("Post published via voice command");
                              }
                            }}
                          />
                        </TabsContent>

                        {/* Multimodal Panel */}
                        <TabsContent value="multimodal" className="mt-0">
                          <MultimodalContent 
                            onMediaUpdate={(media) => {
                              setSelectedMedia(media.map(m => m.id));
                              toast.success(`Updated with ${media.length} media files`);
                            }}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}

            {/* Central Canvas */}
            <ResizablePanel defaultSize={leftPanelOpen && rightPanelOpen ? 50 : 70} minSize={30}>
              <div className="h-full flex flex-col">
                {/* Canvas Header */}
                <div className="bg-background/40 backdrop-blur-sm border-b border-border/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="font-medium">Creative Canvas</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Auto-saved
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {content.length}/2200 characters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Editor Area */}
                <div className="flex-1 p-6 overflow-auto">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Prompt Input */}
                    <Card className="shadow-elegant bg-gradient-card">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <Label className="text-sm">What do you want to create?</Label>
                          <Input 
                            placeholder="Describe your content idea, topic, or message..."
                            className="bg-background/50 h-10"
                          />
                          <Button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full btn-gradient btn-glow h-10"
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
                                Processing with AI intelligence...
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Content Editor */}
                    <Card className="shadow-elegant bg-gradient-card">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Content Editor</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <strong>B</strong>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <em>I</em>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              #
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              @
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Textarea 
                          value={content || voiceText}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Start typing your content here or use AI to generate..."
                          className="min-h-[300px] bg-background/30 border-border/30 resize-none text-base leading-relaxed"
                        />
                      </CardContent>
                    </Card>

                    {/* Publishing Actions */}
                    <Card className="shadow-elegant bg-gradient-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="datetime-local"
                              value={scheduleDate}
                              onChange={(e) => setScheduleDate(e.target.value)}
                              className="w-auto bg-background/50"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline">
                              <Clock className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                            <Button className="btn-gradient">
                              <Send className="h-4 w-4 mr-2" />
                              Publish Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </ResizablePanel>

            {/* Right Preview Panel */}
            {rightPanelOpen && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
                  <div className="h-full bg-background/60 backdrop-blur-sm border-l border-border/50">
                    <div className="p-4 border-b border-border/50">
                      <h3 className="font-medium text-sm flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-primary" />
                        Live Preview
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <EnhancedPreviewPanel 
                        content={content || voiceText}
                        contentType={contentType}
                        selectedMedia={selectedMedia}
                        platform={platform}
                      />
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};

export default PostStudio;