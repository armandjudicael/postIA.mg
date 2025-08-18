import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Wand2
} from "lucide-react";

import AuthModal from "@/components/AuthModal";

const PostEditor = () => {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tone, setTone] = useState("professional");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGenerate = async () => {
    // Check if user is authenticated (simulate)
    const isAuthenticated = false; // This would come from your auth state
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setContent("🚀 Exciting news! We're revolutionizing social media content creation with AI-powered tools that help you craft engaging posts in seconds. \n\n✨ Key benefits:\n• Save 5+ hours per week\n• Increase engagement by 95%\n• Multi-platform optimization\n• Brand consistency guaranteed\n\nReady to transform your social media game? 💪\n\n#SocialMedia #AI #ContentCreation #Marketing #Innovation");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Wand2 className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Live Demo</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
              Try the
              <span className="bg-gradient-primary bg-clip-text text-transparent"> AI Editor </span>
              Now
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Editor Panel */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Content Editor</span>
                    <Badge variant="secondary">AI-Powered</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* AI Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone</Label>
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
                      <Label htmlFor="platform">Platform</Label>
                      <Select defaultValue="multi">
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
                    <Label htmlFor="topic">Topic or Keywords</Label>
                    <Input 
                      id="topic"
                      placeholder="e.g. AI tools, social media marketing, productivity"
                      defaultValue="AI-powered social media tools"
                    />
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full"
                    variant="default"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate AI Content
                      </>
                    )}
                  </Button>

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

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="secondary" className="flex-1">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add AI Image
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="accent" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Live Preview</span>
                    <Eye className="h-4 w-4" />
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

export default PostEditor;