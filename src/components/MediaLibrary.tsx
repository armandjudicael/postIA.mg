import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Image as ImageIcon,
  Video,
  Music,
  Folder,
  Star,
  Download,
  Trash2,
  Edit,
  Eye,
  Sparkles,
  Palette,
  Scissors,
  RotateCcw,
  Crop,
  Zap
} from "lucide-react";

interface MediaLibraryProps {
  contentType: string;
  onMediaSelect: (media: string[]) => void;
}

const MediaLibrary = ({ contentType, onMediaSelect }: MediaLibraryProps) => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const mockMedia = [
    { id: "1", type: "image", url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop", name: "AI Technology", size: "2.4 MB", date: "2024-01-15" },
    { id: "2", type: "video", url: "", name: "Product Demo", size: "12.8 MB", date: "2024-01-14" },
    { id: "3", type: "image", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=300&fit=crop", name: "Team Meeting", size: "1.8 MB", date: "2024-01-13" },
    { id: "4", type: "audio", url: "", name: "Podcast Intro", size: "3.2 MB", date: "2024-01-12" },
    { id: "5", type: "image", url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=300&fit=crop", name: "Office Space", size: "2.1 MB", date: "2024-01-11" },
    { id: "6", type: "video", url: "", name: "Tutorial", size: "8.7 MB", date: "2024-01-10" }
  ];

  const filteredMedia = mockMedia.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleItemSelect = (id: string) => {
    const newSelection = selectedItems.includes(id) 
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelection);
    onMediaSelect(newSelection);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image": return ImageIcon;
      case "video": return Video;
      case "audio": return Music;
      default: return Folder;
    }
  };

  return (
    <Card className="shadow-elegant bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-primary" />
            <span>Media Library</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="image" className="text-xs">Images</TabsTrigger>
            <TabsTrigger value="video" className="text-xs">Videos</TabsTrigger>
            <TabsTrigger value="audio" className="text-xs">Audio</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* AI Tools */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
            <Sparkles className="h-4 w-4 mb-1" />
            <span className="text-xs">AI Generate</span>
          </Button>
          <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
            <Palette className="h-4 w-4 mb-1" />
            <span className="text-xs">Enhance</span>
          </Button>
          <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
            <Zap className="h-4 w-4 mb-1" />
            <span className="text-xs">Auto-Edit</span>
          </Button>
        </div>

        {/* Media Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-3 gap-3" : "space-y-2"}>
          {filteredMedia.map((item) => {
            const MediaIcon = getMediaIcon(item.type);
            const isSelected = selectedItems.includes(item.id);
            
            return (
              <div
                key={item.id}
                className={`relative group cursor-pointer rounded-lg border-2 transition-all hover:border-primary/50 ${
                  isSelected ? "border-primary bg-primary/5" : "border-border"
                } ${viewMode === "grid" ? "aspect-square" : "p-3 flex items-center space-x-3"}`}
                onClick={() => handleItemSelect(item.id)}
              >
                {viewMode === "grid" ? (
                  <>
                    {item.type === "image" ? (
                      <img 
                        src={item.url} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                        <MediaIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    {/* Media Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
                      <p className="text-white text-xs font-medium truncate">{item.name}</p>
                      <p className="text-white/70 text-xs">{item.size}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {item.type === "image" ? (
                        <img 
                          src={item.url} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <MediaIcon className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size} • {item.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        {selectedItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} item(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Crop className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Upload for Content Type */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Upload className="h-6 w-6" />
              <span className="text-sm">Upload {contentType === "image" ? "Image" : contentType === "video" ? "Video" : "Media"}</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm">AI Generate</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaLibrary;