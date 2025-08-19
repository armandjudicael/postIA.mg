import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Music, 
  Mic,
  X,
  Play,
  Pause,
  Volume2,
  Download,
  Scissors,
  Palette,
  Wand2,
  Filter,
  RotateCcw,
  Crop,
  ZoomIn,
  FileAudio,
  FileImage
} from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  type: "image" | "video" | "audio" | "document";
  name: string;
  url: string;
  size: number;
}

interface MultimodalContentProps {
  onMediaUpdate: (media: MediaFile[]) => void;
}

const MultimodalContent = ({ onMediaUpdate }: MultimodalContentProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return;
    
    setIsProcessing(true);
    setUploadProgress(0);
    
    const newFiles: MediaFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let type: MediaFile["type"] = "document";
      
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.startsWith("video/")) type = "video";
      else if (file.type.startsWith("audio/")) type = "audio";
      
      const url = URL.createObjectURL(file);
      
      newFiles.push({
        id: `file_${Date.now()}_${i}`,
        type,
        name: file.name,
        url,
        size: file.size
      });
      
      setUploadProgress(((i + 1) / files.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    const updatedFiles = [...mediaFiles, ...newFiles];
    setMediaFiles(updatedFiles);
    onMediaUpdate(updatedFiles);
    
    setIsProcessing(false);
    setUploadProgress(0);
    toast.success(`Uploaded ${newFiles.length} file(s) successfully`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const removeFile = (id: string) => {
    const updatedFiles = mediaFiles.filter(file => file.id !== id);
    setMediaFiles(updatedFiles);
    onMediaUpdate(updatedFiles);
    toast.success("File removed");
  };

  const getFileIcon = (type: MediaFile["type"]) => {
    switch (type) {
      case "image": return <ImageIcon className="h-5 w-5" />;
      case "video": return <Video className="h-5 w-5" />;
      case "audio": return <FileAudio className="h-5 w-5" />;
      case "document": return <FileImage className="h-5 w-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="generate">AI Generate</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          {/* Upload Area */}
          <Card className="bg-gradient-subtle border-white/10">
            <CardContent className="p-6">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Upload Media Files</h3>
                <p className="text-muted-foreground mb-4">
                  Drag & drop files here or click to browse
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">Images</Badge>
                  <Badge variant="outline">Videos</Badge>
                  <Badge variant="outline">Audio</Badge>
                  <Badge variant="outline">Documents</Badge>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                className="hidden"
              />

              {isProcessing && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploading files...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {mediaFiles.length > 0 && (
            <Card className="bg-gradient-subtle border-white/10">
              <CardHeader>
                <CardTitle className="text-sm">Uploaded Files ({mediaFiles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {mediaFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded">
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-[150px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.type} • {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {file.type === "image" && (
                          <Button variant="ghost" size="sm">
                            <Palette className="h-3 w-3" />
                          </Button>
                        )}
                        {file.type === "video" && (
                          <Button variant="ghost" size="sm">
                            <Scissors className="h-3 w-3" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <Card className="bg-gradient-subtle border-white/10">
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Wand2 className="h-4 w-4 mr-2 text-primary" />
                AI Content Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <ImageIcon className="h-6 w-6 mb-2" />
                  <span className="text-sm">Generate Image</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Video className="h-6 w-6 mb-2" />
                  <span className="text-sm">Generate Video</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Music className="h-6 w-6 mb-2" />
                  <span className="text-sm">Generate Audio</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Mic className="h-6 w-6 mb-2" />
                  <span className="text-sm">Voice Clone</span>
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="prompt">AI Prompt</Label>
                <Input
                  id="prompt"
                  placeholder="Describe what you want to generate..."
                  className="h-9"
                />
              </div>
              
              <Button className="w-full">
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-4">
          <Card className="bg-gradient-subtle border-white/10">
            <CardHeader>
              <CardTitle className="text-sm">Media Editor</CardTitle>
            </CardHeader>
            <CardContent>
              {mediaFiles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No media files to edit</p>
                  <p className="text-sm text-muted-foreground mt-1">Upload files first</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm">
                    <Crop className="h-3 w-3 mr-2" />
                    Crop
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-3 w-3 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-3 w-3 mr-2" />
                    Rotate
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-3 w-3 mr-2" />
                    Resize
                  </Button>
                  <Button variant="outline" size="sm">
                    <Palette className="h-3 w-3 mr-2" />
                    Enhance
                  </Button>
                  <Button variant="outline" size="sm">
                    <Wand2 className="h-3 w-3 mr-2" />
                    AI Edit
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card className="bg-gradient-subtle border-white/10">
            <CardHeader>
              <CardTitle className="text-sm">Media Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your media library is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Upload files to build your library</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultimodalContent;