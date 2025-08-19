import { useState } from "react";
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
  Calendar, 
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
  Filter
} from "lucide-react";

import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import VoiceRecorder from "@/components/VoiceRecorder";
import MediaLibrary from "@/components/MediaLibrary";
import PreviewPanel from "@/components/PreviewPanel";

const PostBuilder = () => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("multi");
  const [contentType, setContentType] = useState("text");
  const [aiProgress, setAiProgress] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
  const [darkMode, setDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);

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
      setContent("🚀 Exciting news! We're revolutionizing social media content creation with AI-powered tools that help you craft engaging posts in seconds. \n\n✨ Key benefits:\n• Save 5+ hours per week\n• Increase engagement by 95%\n• Multi-platform optimization\n• Brand consistency guaranteed\n\nReady to transform your social media game? 💪\n\n#SocialMedia #AI #ContentCreation #Marketing #Innovation");
      setIsGenerating(false);
      setAiProgress(0);
    }, 2500);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setVoiceText("This is a sample voice-to-text conversion. The AI has transcribed your voice input automatically.");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      
      <div className="min-h-screen bg-gradient-subtle">
        {/* Header */}
        <div className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-60" />
                    <div className="relative bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-primary/20">
                      <Wand2 className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-gradient-primary">Post Builder</h1>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Enhanced
                </Badge>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon className="h-4 w-4" />
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-4">
                {['Create', 'Media', 'Preview', 'Schedule', 'Publish'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      index <= 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="ml-2 text-sm font-medium">{step}</span>
                    {index < 4 && <div className="w-8 h-px bg-border ml-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
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
            <TabsContent value="create" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Content Type Selection */}
                <Card className="shadow-elegant bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Content Type</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={contentType} onValueChange={setContentType} className="w-full">
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

                {/* AI Tools */}
                <Card className="shadow-elegant bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span>AI Tools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
                        <Wand2 className="h-4 w-4 mb-1" />
                        <span className="text-xs">Text Generator</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
                        <Palette className="h-4 w-4 mb-1" />
                        <span className="text-xs">Image AI</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
                        <Globe className="h-4 w-4 mb-1" />
                        <span className="text-xs">Translate</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
                        <Volume2 className="h-4 w-4 mb-1" />
                        <span className="text-xs">Voice-over</span>
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Tone</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger className="h-8 text-xs">
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
                        
                        <div className="space-y-1">
                          <Label className="text-xs">Platform</Label>
                          <Select value={platform} onValueChange={setPlatform}>
                            <SelectTrigger className="h-8 text-xs">
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
                    </div>
                  </CardContent>
                </Card>

                {/* Collaboration */}
                <Card className="shadow-elegant bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Collaboration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Team Members</Label>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background" />
                        ))}
                        <Button size="sm" className="w-8 h-8 rounded-full p-0 ml-2">
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs">Auto-save</Label>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-muted-foreground">Saved 2 seconds ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Editor */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Content Editor */}
                <Card className="shadow-elegant bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wand2 className="h-5 w-5 text-primary" />
                        <span>Content Editor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant={isRecording ? "destructive" : "outline"} 
                          size="sm"
                          onClick={handleVoiceRecord}
                        >
                          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Voice Input */}
                    {contentType === "voice" && (
                      <VoiceRecorder 
                        isRecording={isRecording}
                        onToggleRecording={handleVoiceRecord}
                        onTextGenerated={setVoiceText}
                      />
                    )}

                    {/* Prompt Input */}
                    <div className="space-y-2">
                      <Label>Topic or Prompt</Label>
                      <Input 
                        placeholder="Describe what you want to create..."
                        className="bg-background/50"
                      />
                    </div>

                    {/* AI Generation */}
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full btn-gradient btn-glow"
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

                    {/* Text Editor */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Content</Label>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">Bold</Button>
                          <Button variant="ghost" size="sm">Italic</Button>
                          <Button variant="ghost" size="sm">#</Button>
                          <Button variant="ghost" size="sm">@</Button>
                        </div>
                      </div>
                      <Textarea 
                        value={content || voiceText}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start typing or use AI to generate content..."
                        className="min-h-[200px] resize-none bg-background/50"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{(content || voiceText).length}/2200 characters</span>
                        <span>Grammar check: ✓</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Media & Tools */}
                <div className="space-y-6">
                  {/* Media Library */}
                  <MediaLibrary 
                    contentType={contentType}
                    onMediaSelect={setSelectedMedia}
                  />

                  {/* Publishing Options */}
                  <Card className="shadow-elegant bg-gradient-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>Publishing</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Schedule Date</Label>
                        <Input 
                          type="datetime-local"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="default" size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Publish Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-6">
              <PreviewPanel 
                content={content || voiceText}
                contentType={contentType}
                selectedMedia={selectedMedia}
                platform={platform}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PostBuilder;