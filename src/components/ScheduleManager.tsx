import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Edit3, 
  Trash2, 
  Plus,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  MoreHorizontal
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  platform: string;
  scheduledDate: Date;
  status: 'scheduled' | 'published' | 'failed';
}

const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);

  // Mock data - in real app this would come from your backend
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      title: "AI Marketing Tips",
      content: "Discover how AI is revolutionizing social media marketing...",
      platform: "linkedin",
      scheduledDate: new Date("2024-12-20T14:00:00"),
      status: 'scheduled'
    },
    {
      id: "2", 
      title: "Product Update",
      content: "We're excited to announce new features in PostIA.mg...",
      platform: "twitter",
      scheduledDate: new Date("2024-12-21T10:00:00"),
      status: 'scheduled'
    },
    {
      id: "3",
      title: "Behind the Scenes",
      content: "Take a look at how our AI creates amazing content...",
      platform: "instagram",
      scheduledDate: new Date("2024-12-19T15:30:00"),
      status: 'published'
    }
  ]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      default: return <MoreHorizontal className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-ai-info border-ai-info/20 bg-ai-info/10';
      case 'published': return 'text-ai-success border-ai-success/20 bg-ai-success/10';
      case 'failed': return 'text-ai-error border-ai-error/20 bg-ai-error/10';
      default: return 'text-muted-foreground border-border';
    }
  };

  const handleDeletePost = (postId: string) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== postId));
    toast.success("Post deleted successfully");
  };

  const handleReschedulePost = (post: ScheduledPost) => {
    setEditingPost(post);
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Schedule Manager
          </h2>
          <p className="text-muted-foreground">
            Manage your scheduled posts and plan your content calendar
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Reschedule Post' : 'Schedule New Post'}</DialogTitle>
              <DialogDescription>
                {editingPost ? 'Update your scheduled post details' : 'Create and schedule a new post for publishing'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  defaultValue={editingPost?.title}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content..."
                  rows={4}
                  defaultValue={editingPost?.content}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select defaultValue={editingPost?.platform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Schedule Date & Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP p") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsCreateDialogOpen(false);
                  toast.success(editingPost ? "Post rescheduled successfully" : "Post scheduled successfully");
                }}>
                  {editingPost ? 'Update Schedule' : 'Schedule Post'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar View */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-gradient-subtle border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Scheduled Posts List */}
        <Card className="lg:col-span-2 bg-gradient-subtle border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Scheduled Posts
            </CardTitle>
            <CardDescription>
              {scheduledPosts.length} posts scheduled across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-white/10 hover:bg-background/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getPlatformIcon(post.platform)}
                    <span className="font-medium capitalize">{post.platform}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {post.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(post.scheduledDate, "PPP 'at' p")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(post.status)}
                  >
                    {post.status}
                  </Badge>
                  
                  {post.status === 'scheduled' && (
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleReschedulePost(post)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-subtle border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-subtle border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <Clock className="h-8 w-8 text-ai-info" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-subtle border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-ai-success/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-ai-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleManager;