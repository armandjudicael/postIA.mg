import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, 
  Search, 
  Filter, 
  Edit3, 
  Copy, 
  Trash2, 
  Eye, 
  Calendar, 
  BarChart3,
  Heart,
  MessageCircle,
  Share2,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  MoreHorizontal,
  FileText,
  Image as ImageIcon,
  Video,
  Mic,
  Sparkles,
  TrendingUp,
  Users,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

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

interface PostHistoryProps {
  onEditPost?: (post: PostData) => void;
  onDuplicatePost?: (post: PostData) => void;
}

const PostHistory = ({ onEditPost, onDuplicatePost }: PostHistoryProps) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load posts from localStorage and simulate some data
  useEffect(() => {
    const loadPosts = () => {
      setIsLoading(true);
      
      // Load from localStorage
      const publishedPosts = JSON.parse(localStorage.getItem('publishedPosts') || '[]');
      const draftPosts = JSON.parse(localStorage.getItem('postStudio_drafts') || '[]');
      
      // Generate some sample data if none exists
      const samplePosts: PostData[] = publishedPosts.length === 0 ? [
        {
          id: '1',
          content: '🚀 Exciting news! We\'re revolutionizing social media content creation with AI-powered tools that help you craft engaging posts in seconds. ✨ Key benefits: • Save 5+ hours per week • Increase engagement by 95% • Multi-platform optimization #SocialMedia #AI',
          contentType: 'text',
          platform: ['instagram', 'twitter', 'linkedin'],
          status: 'published',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          publishedAt: new Date(Date.now() - 86400000 + 3600000).toISOString(),
          engagement: { likes: 124, shares: 23, comments: 18, reach: 2400 },
          tone: 'professional',
          tags: ['AI', 'SocialMedia', 'Marketing']
        },
        {
          id: '2',
          content: 'Behind the scenes at PostIA.mg! Our AI is working hard to make your content creation effortless. What type of content would you like to see more of? 🤔',
          contentType: 'image',
          platform: ['instagram', 'facebook'],
          status: 'published',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          publishedAt: new Date(Date.now() - 172800000 + 7200000).toISOString(),
          media: ['behind-scenes.jpg'],
          engagement: { likes: 89, shares: 12, comments: 34, reach: 1800 },
          tone: 'friendly',
          tags: ['BehindTheScenes', 'AI', 'Community']
        },
        {
          id: '3',
          content: 'Quick tip: Use our AI tone adjustment feature to match your brand voice perfectly across all platforms. Professional, friendly, or humorous - we\'ve got you covered! 💡',
          contentType: 'text',
          platform: ['twitter', 'linkedin'],
          status: 'scheduled',
          createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          scheduledFor: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
          tone: 'helpful',
          tags: ['Tips', 'AI', 'BrandVoice']
        },
        {
          id: '4',
          content: 'Draft: Exploring the future of AI in content creation...',
          contentType: 'text',
          platform: ['linkedin'],
          status: 'draft',
          createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
          tone: 'professional',
          tags: ['AI', 'Future', 'ContentCreation']
        },
        {
          id: '5',
          content: 'Failed to publish: Network error occurred during publishing process.',
          contentType: 'video',
          platform: ['instagram', 'facebook'],
          status: 'failed',
          createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          media: ['promo-video.mp4'],
          tone: 'professional'
        }
      ] : publishedPosts.map((post: any) => ({
        ...post,
        id: post.id?.toString() || Math.random().toString(),
        platform: Array.isArray(post.platform) ? post.platform : [post.platform],
        createdAt: post.timestamp || post.createdAt || new Date().toISOString(),
        publishedAt: post.publishedAt || post.timestamp,
        contentType: post.contentType || 'text',
        status: post.status || 'published'
      }));

      // Add draft posts
      const allPosts = [
        ...samplePosts,
        ...draftPosts.map((draft: any) => ({
          ...draft,
          id: draft.id?.toString() || Math.random().toString(),
          platform: Array.isArray(draft.platform) ? [draft.platform] : [draft.platform || 'multi'],
          createdAt: draft.timestamp || new Date().toISOString(),
          status: draft.status || 'draft',
          contentType: draft.contentType || 'text'
        }))
      ];

      setPosts(allPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    // Filter by platform
    if (platformFilter !== 'all') {
      filtered = filtered.filter(post => post.platform.includes(platformFilter));
    }

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(post => post.status === activeTab);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'engagement':
          const aEngagement = (a.engagement?.likes || 0) + (a.engagement?.shares || 0) + (a.engagement?.comments || 0);
          const bEngagement = (b.engagement?.likes || 0) + (b.engagement?.shares || 0) + (b.engagement?.comments || 0);
          return bEngagement - aEngagement;
        case 'platform':
          return a.platform[0].localeCompare(b.platform[0]);
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchQuery, statusFilter, platformFilter, sortBy, activeTab]);

  const handleEditPost = (post: PostData) => {
    onEditPost?.(post);
    toast.success(`Opening "${post.content.substring(0, 30)}..." for editing`);
  };

  const handleDuplicatePost = (post: PostData) => {
    const duplicatedPost = {
      ...post,
      id: Date.now().toString(),
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      content: `${post.content} (Copy)`,
      publishedAt: undefined,
      scheduledFor: undefined
    };
    
    onDuplicatePost?.(duplicatedPost);
    toast.success("Post duplicated and ready for editing");
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.success("Post deleted successfully");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4 text-ai-success" />;
      case 'scheduled': return <Clock className="h-4 w-4 text-primary" />;
      case 'draft': return <Edit3 className="h-4 w-4 text-muted-foreground" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'voice': return <Mic className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getTabCounts = () => {
    return {
      all: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      scheduled: posts.filter(p => p.status === 'scheduled').length,
      draft: posts.filter(p => p.status === 'draft').length,
      failed: posts.filter(p => p.status === 'failed').length
    };
  };

  const tabCounts = getTabCounts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading post history...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gradient-primary flex items-center">
            <History className="h-8 w-8 mr-3" />
            Post History
          </h2>
          <p className="text-muted-foreground">
            Manage, edit, and republish your content across all platforms
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            {posts.length} Total Posts
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <Card variant="elevated" className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Platform"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-background/60 backdrop-blur-sm">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <span>All</span>
            <Badge variant="secondary" size="sm">{tabCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center space-x-2">
            <span>Published</span>
            <Badge variant="success" size="sm">{tabCounts.published}</Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center space-x-2">
            <span>Scheduled</span>
            <Badge variant="warning" size="sm">{tabCounts.scheduled}</Badge>
          </TabsTrigger>
          <TabsTrigger value="draft" className="flex items-center space-x-2">
            <span>Drafts</span>
            <Badge variant="outline" size="sm">{tabCounts.draft}</Badge>
          </TabsTrigger>
          <TabsTrigger value="failed" className="flex items-center space-x-2">
            <span>Failed</span>
            <Badge variant="destructive" size="sm">{tabCounts.failed}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredPosts.length === 0 ? (
            <Card variant="elevated" className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <History className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">No posts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || statusFilter !== 'all' || platformFilter !== 'all' 
                      ? "Try adjusting your filters or search query"
                      : "Start creating content to see your post history here"
                    }
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} variant="elevated" className="hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between space-x-4">
                      {/* Post Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(post.status)}
                          <Badge 
                            variant={
                              post.status === 'published' ? 'success' :
                              post.status === 'scheduled' ? 'warning' :
                              post.status === 'failed' ? 'destructive' : 'outline'
                            }
                            size="sm"
                          >
                            {post.status}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {getContentTypeIcon(post.contentType)}
                            <span className="text-xs text-muted-foreground capitalize">{post.contentType}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {post.platform.map((platform, index) => (
                              <div key={platform} className="flex items-center">
                                {getPlatformIcon(platform)}
                                {index < post.platform.length - 1 && <span className="mx-1 text-muted-foreground">•</span>}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-foreground line-clamp-3 leading-relaxed">
                            {post.content}
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" size="sm" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.createdAt)}</span>
                            </span>
                            {post.publishedAt && (
                              <span className="flex items-center space-x-1">
                                <CheckCircle className="h-3 w-3 text-ai-success" />
                                <span>Published {formatDate(post.publishedAt)}</span>
                              </span>
                            )}
                            {post.scheduledFor && (
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-primary" />
                                <span>Scheduled for {new Date(post.scheduledFor).toLocaleString()}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Engagement Metrics */}
                        {post.engagement && (
                          <div className="flex items-center space-x-4 pt-2 border-t border-border/50">
                            <div className="flex items-center space-x-1 text-sm">
                              <Heart className="h-3 w-3 text-red-500" />
                              <span>{post.engagement.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Share2 className="h-3 w-3 text-blue-500" />
                              <span>{post.engagement.shares}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <MessageCircle className="h-3 w-3 text-green-500" />
                              <span>{post.engagement.comments}</span>
                            </div>
                            {post.engagement.reach && (
                              <div className="flex items-center space-x-1 text-sm">
                                <Users className="h-3 w-3 text-purple-500" />
                                <span>{post.engagement.reach.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                          className="hover:bg-primary/10 hover:border-primary/30"
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDuplicatePost(post)}
                          className="hover:bg-accent/10 hover:border-accent/30"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Duplicate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostHistory;