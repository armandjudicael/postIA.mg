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
  BarChart3,
  CheckCircle,
  Palette,
  Target,
  Globe,
  Camera
} from "lucide-react";

import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";

const PostBuilder = () => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [platform, setPlatform] = useState("multi");
  const [contentType, setContentType] = useState("post");
  const [aiProgress, setAiProgress] = useState(0);
  const [generatedImage, setGeneratedImage] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);
    setAiProgress(0);
    
    // Simulate AI generation with progress
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

  const handleGenerateImage = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    // Simulate AI image generation
    setGeneratedImage("https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop");
  };

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-60" />
                <div className="relative bg-background/80 backdrop-blur-sm rounded-full p-3 border border-white/20">
                  <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gradient-primary mb-4">
              AI-Powered Post Builder
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build engaging content with advanced AI tools. Generate text, create images, preview across platforms, and schedule with analytics insights.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Editor Panel */}
              <Card className="shadow-elegant bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wand2 className="h-5 w-5 text-primary" />
                      <span>Post Builder</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Enhanced
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Content Type Selection */}
                  <div className="space-y-2">
                    <Label>Content Type</Label>
                    <Tabs value={contentType} onValueChange={setContentType} className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="post" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Post
                        </TabsTrigger>
                        <TabsTrigger value="story" className="text-xs">
                          <Camera className="h-3 w-3 mr-1" />
                          Story
                        </TabsTrigger>
                        <TabsTrigger value="video" className="text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </TabsTrigger>
                        <TabsTrigger value="article" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          Article
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Enhanced AI Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone & Style</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                          <SelectItem value="inspiring">Inspiring</SelectItem>
                          <SelectItem value="educational">Educational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="platform">Target Platform</Label>
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

                  {/* Topic Input */}
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic, Keywords, or Prompt</Label>
                    <Input 
                      id="topic"
                      placeholder="e.g. Launch new AI product, celebrate team milestone, share productivity tips"
                      defaultValue="AI-powered social media automation tools"
                      className="bg-background/50"
                    />
                  </div>

                  {/* AI Generation */}
                  <div className="space-y-3">
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full btn-gradient btn-glow"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          AI is Writing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate AI Content
                        </>
                      )}
                    </Button>
                    
                    {isGenerating && (
                      <div className="space-y-2">
                        <Progress value={aiProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground text-center">
                          AI is analyzing tone, platform requirements, and generating content...
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content Editor */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Generated Content</Label>
                    <Textarea 
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Your AI-generated content will appear here..."
                      className="min-h-[200px] resize-none"
                    />
                    <div className="text-sm text-muted-foreground">
                      {content.length}/2200 characters
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" onClick={handleGenerateImage} className="hover-lift">
                      <Palette className="h-4 w-4 mr-2" />
                      AI Image
                    </Button>
                    <Button variant="outline" className="hover-lift">
                      <Video className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                    <Button variant="outline" className="hover-lift">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="default" className="hover-lift">
                      <Send className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Preview Panel */}
              <Card className="shadow-elegant bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <span>Cross-Platform Preview</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Optimized
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="instagram" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="instagram" className="flex items-center gap-1">
                        <Instagram className="h-3 w-3" />
                        <span className="hidden sm:inline">IG</span>
                      </TabsTrigger>
                      <TabsTrigger value="twitter" className="flex items-center gap-1">
                        <Twitter className="h-3 w-3" />
                        <span className="hidden sm:inline">X</span>
                      </TabsTrigger>
                      <TabsTrigger value="facebook" className="flex items-center gap-1">
                        <Facebook className="h-3 w-3" />
                        <span className="hidden sm:inline">FB</span>
                      </TabsTrigger>
                      <TabsTrigger value="linkedin" className="flex items-center gap-1">
                        <Linkedin className="h-3 w-3" />
                        <span className="hidden sm:inline">LI</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Platform Previews */}
                    <TabsContent value="instagram" className="mt-4">
                      <div className="border rounded-lg p-4 bg-background">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
                          <div>
                            <div className="font-semibold text-sm">your_brand</div>
                            <div className="text-xs text-muted-foreground">Sponsored</div>
                          </div>
                        </div>
                        <div className="w-full h-48 bg-muted rounded-lg mb-3 flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="text-sm leading-relaxed">
                          {content || "Your generated content will appear here..."}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="twitter" className="mt-4">
                      <div className="border rounded-lg p-4 bg-background">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">Your Brand</span>
                              <span className="text-muted-foreground text-sm">@yourbrand</span>
                              <span className="text-muted-foreground text-sm">·</span>
                              <span className="text-muted-foreground text-sm">2m</span>
                            </div>
                            <div className="text-sm leading-relaxed">
                              {content || "Your generated content will appear here..."}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="facebook" className="mt-4">
                      <div className="border rounded-lg p-4 bg-background">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full"></div>
                          <div>
                            <div className="font-semibold text-sm">Your Brand</div>
                            <div className="text-xs text-muted-foreground">2 minutes ago</div>
                          </div>
                        </div>
                        <div className="text-sm leading-relaxed mb-3">
                          {content || "Your generated content will appear here..."}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="linkedin" className="mt-4">
                      <div className="border rounded-lg p-4 bg-background">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
                          <div>
                            <div className="font-semibold text-sm">Your Brand</div>
                            <div className="text-xs text-muted-foreground">CEO at Your Company • 1st</div>
                            <div className="text-xs text-muted-foreground">2m • 🌐</div>
                          </div>
                        </div>
                        <div className="text-sm leading-relaxed">
                          {content || "Your generated content will appear here..."}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostBuilder;