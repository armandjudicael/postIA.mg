import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  Activity,
  Download,
  RotateCcw,
  Sparkles
} from "lucide-react";

interface VoiceRecorderProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  onTextGenerated: (text: string) => void;
}

const VoiceRecorder = ({ isRecording, onToggleRecording, onTextGenerated }: VoiceRecorderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioWave, setAudioWave] = useState<number[]>([]);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        // Simulate audio waveform
        setAudioWave(prev => [...prev.slice(-20), Math.random() * 100]);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopAndTranscribe = () => {
    onToggleRecording();
    setIsTranscribing(true);
    setTranscriptionProgress(0);

    // Simulate transcription progress
    const progressInterval = setInterval(() => {
      setTranscriptionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsTranscribing(false);
          onTextGenerated("🎙️ Voice-to-text: Just finished recording an amazing voice note about our latest AI features. The speech recognition is incredibly accurate and supports multiple languages. Perfect for creating authentic social media content on the go!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(progressInterval);
      setIsTranscribing(false);
    }, 2500);
  };

  const resetRecording = () => {
    setRecordingTime(0);
    setAudioWave([]);
    onTextGenerated("");
  };

  return (
    <Card className="shadow-elegant bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Voice Recorder</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Transcription
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            onClick={onToggleRecording}
            className="w-16 h-16 rounded-full btn-gradient btn-glow"
          >
            {isRecording ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </Button>
          
          {recordingTime > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleStopAndTranscribe}
              className="rounded-full"
            >
              <Square className="h-6 w-6" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="lg"
            onClick={resetRecording}
            className="rounded-full"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>

        {/* Recording Status */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-mono font-bold text-primary">
            {formatTime(Math.floor(recordingTime / 10))}
          </div>
          {isRecording && (
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Recording...</span>
            </div>
          )}
        </div>

        {/* Audio Waveform Visualization */}
        <div className="h-20 bg-background/50 rounded-lg p-4 flex items-end justify-center space-x-1">
          {audioWave.length > 0 ? (
            audioWave.map((height, index) => (
              <div
                key={index}
                className="w-2 bg-gradient-primary rounded-t"
                style={{ height: `${Math.max(height * 0.6, 4)}px` }}
              />
            ))
          ) : (
            <div className="text-muted-foreground text-sm">Audio waveform will appear here</div>
          )}
        </div>

        {/* Transcription Progress */}
        {isTranscribing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AI Transcribing...</span>
              <span className="text-sm text-muted-foreground">{transcriptionProgress}%</span>
            </div>
            <Progress value={transcriptionProgress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              Converting speech to text with AI accuracy
            </p>
          </div>
        )}

        {/* Playback Controls */}
        {recordingTime > 0 && !isRecording && (
          <div className="flex items-center justify-center space-x-3">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Voice Features */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
            <Volume2 className="h-4 w-4 mb-1" />
            <span className="text-xs">Add Voice-over</span>
          </Button>
          <Button variant="outline" size="sm" className="h-auto p-3 flex flex-col items-center">
            <Activity className="h-4 w-4 mb-1" />
            <span className="text-xs">Audio Post</span>
          </Button>
        </div>

        {/* Language & Quality Settings */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <div>🎤 High Quality Recording • 🌍 Multi-language Support</div>
          <div>🤖 AI Transcription • 🔊 Voice Enhancement</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;