import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Send,
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Settings,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Eye,
  Save,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Hash,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  X,
  Plus,
  RotateCcw,
  Copy,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface SmartPublishButtonProps {
  content: string;
  contentType: string;
  selectedMedia: string[];
  selectedPlatforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
  onPublish: (config: PublishConfig) => Promise<void>;
  onSchedule: (config: ScheduleConfig) => Promise<void>;
  onSaveDraft: () => void;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

interface PublishConfig {
  platforms: string[];
  scheduleDate?: Date;
  customizations: Record<string, {
    content: string;
    hashtags: string[];
    mentions: string[];
  }>;
  settings: {
    crossPost: boolean;
    autoOptimize: boolean;
    trackAnalytics: boolean;
  };
}

interface ScheduleConfig extends PublishConfig {
  scheduleDate: Date;
  timezone: string;
  recurring?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
  };
}

const platformLimits = {
  instagram: { text: 2200, hashtags: 30, images: 10 },
  twitter: { text: 280, hashtags: 3, images: 4 },
  facebook: { text: 63206, hashtags: 10, images: 20 },
  linkedin: { text: 3000, hashtags: 5, images: 9 },
  youtube: { text: 5000, hashtags: 15, images: 1 }
};

const platformIcons = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube
};

const SmartPublishButton = ({
  content,
  contentType,
  selectedMedia,
  selectedPlatforms,
  onPlatformsChange,
  onPublish,
  onSchedule,
  onSaveDraft,
  isAuthenticated,
  onAuthRequired
}: SmartPublishButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [publishMode, setPublishMode] = useState<'now' | 'schedule' | 'draft'>('now');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [platformCustomizations, setPlatformCustomizations] = useState<Record<string, any>>({});
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState("15:00");
  const [publishSettings, setPublishSettings] = useState({
    crossPost: true,
    autoOptimize: true,
    trackAnalytics: true,
    smartHashtags: true,
    autoMentions: false
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Validation logic
  const validateForPlatforms = useCallback(() => {
    const errors: string[] = [];
    
    if (!content.trim()) {
      errors.push("Content cannot be empty");
    }

    selectedPlatforms.forEach(platform => {
      const limits = platformLimits[platform as keyof typeof platformLimits];
      
      if (content.length > limits.text) {
        errors.push(`Content too long for ${platform} (${content.length}/${limits.text} characters)`);
      }
      
      if (platform === 'instagram' && selectedMedia.length === 0 && contentType === 'image') {
        errors.push("Instagram requires at least one image");
      }
      
      if (selectedMedia.length > limits.images) {
        errors.push(`Too many images for ${platform} (${selectedMedia.length}/${limits.images} max)`);
      }
    });

    if (publishMode === 'schedule' && !scheduleDate) {
      errors.push("Schedule date is required");
    }

    if (scheduleDate && scheduleDate <= new Date()) {
      errors.push("Schedule date must be in the future");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }, [content, selectedPlatforms, selectedMedia, contentType, publishMode, scheduleDate]);

  // Auto-optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = [];
    
    if (content.length < 50) {
      suggestions.push("Consider adding more detail for better engagement");
    }
    
    if (!content.includes('#') && publishSettings.smartHashtags) {
      suggestions.push("Add relevant hashtags to increase discoverability");
    }
    
    if (selectedPlatforms.includes('instagram') && selectedMedia.length === 0) {
      suggestions.push("Instagram posts perform better with images");
    }
    
    if (selectedPlatforms.includes('twitter') && content.length > 240) {
      suggestions.push("Consider splitting long content into a Twitter thread");
    }
    
    return suggestions;
  }, [content, selectedMedia, selectedPlatforms, publishSettings.smartHashtags]);

  // Platform-specific content optimization
  const optimizeForPlatform = useCallback((platform: string, originalContent: string) => {
    const limits = platformLimits[platform as keyof typeof platformLimits];
    let optimized = originalContent;
    
    // Auto-truncate if needed
    if (optimized.length > limits.text) {
      optimized = optimized.substring(0, limits.text - 3) + "...";
    }
    
    // Platform-specific optimizations
    switch (platform) {
      case 'twitter':
        // Add trending hashtags
        if (publishSettings.smartHashtags && !optimized.includes('#')) {
          optimized += " #SocialMedia #AI";
        }
        break;
      case 'linkedin':
        // Professional tone adjustments
        if (!optimized.includes('colleagues') && !optimized.includes('professional')) {
          optimized = optimized.replace(/Hey/g, 'Hello professionals');
        }
        break;
      case 'instagram':
        // Add emoji and hashtags
        if (publishSettings.smartHashtags) {
          optimized += "\n\n#content #creator #social #media";
        }
        break;
    }
    
    return optimized;
  }, [publishSettings.smartHashtags]);

  // Handle publish action
  const handlePublish = async () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (!validateForPlatforms()) {
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Prepare configurations
      const customizations: Record<string, any> = {};
      selectedPlatforms.forEach(platform => {
        customizations[platform] = {
          content: publishSettings.autoOptimize 
            ? optimizeForPlatform(platform, content)
            : platformCustomizations[platform]?.content || content,
          hashtags: platformCustomizations[platform]?.hashtags || [],
          mentions: platformCustomizations[platform]?.mentions || []
        };
      });

      const config: PublishConfig = {
        platforms: selectedPlatforms,
        customizations,
        settings: {
          crossPost: publishSettings.crossPost,
          autoOptimize: publishSettings.autoOptimize,
          trackAnalytics: publishSettings.trackAnalytics
        }
      };

      if (publishMode === 'schedule' && scheduleDate) {
        const scheduleConfig: ScheduleConfig = {
          ...config,
          scheduleDate,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        await onSchedule(scheduleConfig);
      } else {
        await onPublish(config);
      }

      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setIsOpen(false);
        
        const action = publishMode === 'schedule' ? 'scheduled' : 'published';
        toast.success(`Post ${action} successfully to ${selectedPlatforms.join(', ')}`);
      }, 1000);

    } catch (error) {
      setIsProcessing(false);
      setProgress(0);
      toast.error("Failed to publish. Please try again.");
    }
  };

  // Real-time validation
  useEffect(() => {
    validateForPlatforms();
  }, [validateForPlatforms]);

  const isValid = validationErrors.length === 0;
  const suggestions = getOptimizationSuggestions();

  return (
    <div className="space-y-4">
      {/* Main Publish Button */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={!content.trim() || selectedPlatforms.length === 0}
          className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-medium shadow-button"
          size="lg"
        >
          {publishMode === 'now' ? (
            <>
              <Send className="h-4 w-4 mr-2" />
              Publish Now
            </>
          ) : publishMode === 'schedule' ? (
            <>
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule Post
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => setPublishMode(publishMode === 'now' ? 'schedule' : 'now')}
        >
          {publishMode === 'now' ? <CalendarIcon className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>

      {/* Quick Status */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Badge variant={isValid ? "default" : "destructive"}>
            {isValid ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
            {isValid ? "Ready to publish" : `${validationErrors.length} issues`}
          </Badge>
          
          {selectedPlatforms.length > 0 && (
            <div className="flex items-center space-x-1">
              {selectedPlatforms.slice(0, 3).map(platform => {
                const Icon = platformIcons[platform as keyof typeof platformIcons];
                return <Icon key={platform} className="h-4 w-4 text-muted-foreground" />;
              })}
              {selectedPlatforms.length > 3 && (
                <Badge variant="secondary" className="text-xs">+{selectedPlatforms.length - 3}</Badge>
              )}
            </div>
          )}
        </div>
        
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Advanced Configuration Modal */}
      {isOpen && (
        <Card className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] overflow-auto z-50 shadow-modal bg-background border">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Smart Publish Configuration</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Publish Mode Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Publish Mode</Label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { mode: 'now', icon: Send, label: 'Publish Now', desc: 'Post immediately' },
                  { mode: 'schedule', icon: CalendarIcon, label: 'Schedule', desc: 'Set date & time' },
                  { mode: 'draft', icon: Save, label: 'Save Draft', desc: 'Save for later' }
                ].map(({ mode, icon: Icon, label, desc }) => (
                  <Card 
                    key={mode}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      publishMode === mode ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setPublishMode(mode as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-medium">{label}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Select Platforms</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(platformIcons).map(([platform, Icon]) => {
                  const isSelected = selectedPlatforms.includes(platform);
                  const limits = platformLimits[platform as keyof typeof platformLimits];
                  const isContentValid = content.length <= limits.text;
                  
                  return (
                    <TooltipProvider key={platform}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card 
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                            } ${!isContentValid ? 'border-destructive' : ''}`}
                            onClick={() => {
                              if (isSelected) {
                                onPlatformsChange(selectedPlatforms.filter(p => p !== platform));
                              } else {
                                onPlatformsChange([...selectedPlatforms, platform]);
                              }
                            }}
                          >
                            <CardContent className="p-4 text-center">
                              <Icon className={`h-6 w-6 mx-auto mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                              <div className="font-medium capitalize">{platform}</div>
                              <div className="text-xs text-muted-foreground">
                                {content.length}/{limits.text}
                              </div>
                              {!isContentValid && (
                                <AlertTriangle className="h-3 w-3 text-destructive mx-auto mt-1" />
                              )}
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <div>Max {limits.text} characters</div>
                            <div>Max {limits.hashtags} hashtags</div>
                            <div>Max {limits.images} images</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>

            {/* Schedule Configuration */}
            {publishMode === 'schedule' && (
              <div className="space-y-4">
                <Label className="text-base font-medium">Schedule Settings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Publishing Settings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Publishing Settings</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'crossPost', label: 'Cross-post to all platforms', desc: 'Publish to all selected platforms simultaneously' },
                  { key: 'autoOptimize', label: 'Auto-optimize content', desc: 'Automatically adjust content for each platform' },
                  { key: 'trackAnalytics', label: 'Track analytics', desc: 'Monitor performance and engagement' },
                  { key: 'smartHashtags', label: 'Smart hashtags', desc: 'Add relevant hashtags automatically' }
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={publishSettings[key as keyof typeof publishSettings]}
                      onCheckedChange={(checked) =>
                        setPublishSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                    <div className="space-y-1">
                      <div className="font-medium">{label}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {validationErrors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Optimization Suggestions */}
            {suggestions.length > 0 && validationErrors.length === 0 && (
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="font-medium">Suggestions to improve performance:</div>
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="text-sm">• {suggestion}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Processing Progress */}
            {isProcessing && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">
                    {publishMode === 'schedule' ? 'Scheduling...' : 'Publishing...'} ({progress}%)
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={onSaveDraft} disabled={isProcessing}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} disabled={isProcessing}>
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isProcessing}>
                  Cancel
                </Button>
                
                <Button
                  onClick={handlePublish}
                  disabled={!isValid || isProcessing || selectedPlatforms.length === 0}
                  className="bg-gradient-primary hover:opacity-90 text-white"
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : publishMode === 'schedule' ? (
                    <CalendarIcon className="h-4 w-4 mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {publishMode === 'now' ? 'Publish Now' : 
                   publishMode === 'schedule' ? 'Schedule Post' : 'Save Draft'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartPublishButton;