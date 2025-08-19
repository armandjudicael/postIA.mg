import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square,
  Wand2,
  MessageSquare,
  Settings,
  Languages,
  Brain,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  timestamp: Date;
}

interface VoiceInteractionProps {
  onContentUpdate: (content: string) => void;
  onActionExecuted: (action: string, data?: any) => void;
}

const VoiceInteraction = ({ onContentUpdate, onActionExecuted }: VoiceInteractionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState<VoiceCommand | null>(null);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast.success("Voice recognition started");
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence * 100);
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error("Voice recognition error");
      };
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    
    const newCommand: VoiceCommand = {
      id: `cmd_${Date.now()}`,
      command: command.toLowerCase(),
      action: '',
      timestamp: new Date()
    };

    // AI-powered intent recognition (simplified simulation)
    let action = '';
    let response = '';
    
    if (command.toLowerCase().includes('create') || command.toLowerCase().includes('write')) {
      action = 'create_post';
      const content = command.replace(/create|write|post|about/gi, '').trim();
      onContentUpdate(`Creating content about: ${content}`);
      response = "I'm creating a post about that topic for you.";
    } else if (command.toLowerCase().includes('schedule')) {
      action = 'schedule_post';
      onActionExecuted('schedule', { command });
      response = "I'll help you schedule that post.";
    } else if (command.toLowerCase().includes('publish')) {
      action = 'publish_post';
      onActionExecuted('publish', { command });
      response = "Publishing your post now.";
    } else if (command.toLowerCase().includes('translate')) {
      action = 'translate_content';
      response = "I can translate your content to different languages.";
    } else if (command.toLowerCase().includes('improve') || command.toLowerCase().includes('enhance')) {
      action = 'enhance_content';
      response = "I'll enhance your content with AI improvements.";
    } else {
      action = 'general_query';
      response = "I understand your request. How can I help you with your content?";
    }

    newCommand.action = action;
    setLastCommand(newCommand);
    setCommands(prev => [newCommand, ...prev.slice(0, 4)]);

    // Provide voice feedback
    if (voiceEnabled) {
      speak(response);
    }

    setIsProcessing(false);
    toast.success("Voice command processed");
  };

  const speak = (text: string) => {
    if (synthRef.current && voiceEnabled) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Voice Control Panel */}
      <Card className="bg-gradient-subtle border-white/10">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Brain className="h-4 w-4 mr-2 text-primary" />
            Voice AI Assistant
            <Badge variant="secondary" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              Smart
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Voice Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              onClick={toggleListening}
              className={`h-16 w-16 rounded-full ${
                isListening ? 'animate-pulse shadow-glow' : ''
              }`}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              
              {isSpeaking && (
                <Button variant="outline" size="sm" onClick={stopSpeaking}>
                  <Square className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Status Display */}
          <div className="text-center space-y-2">
            {isListening && (
              <div className="space-y-2">
                <Badge variant="secondary" className="animate-pulse">
                  <Mic className="h-3 w-3 mr-1" />
                  Listening...
                </Badge>
                {confidence > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      Confidence: {confidence.toFixed(0)}%
                    </div>
                    <Progress value={confidence} className="h-1" />
                  </div>
                )}
              </div>
            )}
            
            {isProcessing && (
              <Badge variant="secondary" className="animate-pulse">
                <Brain className="h-3 w-3 mr-1" />
                Processing...
              </Badge>
            )}
            
            {isSpeaking && (
              <Badge variant="secondary" className="animate-pulse">
                <Volume2 className="h-3 w-3 mr-1" />
                Speaking...
              </Badge>
            )}
          </div>

          {/* Live Transcript */}
          {transcript && (
            <div className="p-3 bg-background/50 rounded-lg border border-white/10">
              <div className="text-xs text-muted-foreground mb-1">Live Transcript:</div>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Commands */}
      <Card className="bg-gradient-subtle border-white/10">
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Voice Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-background/30 rounded border border-white/5">
              <strong>"Create a post about..."</strong>
              <br />
              <span className="text-muted-foreground">Generate content</span>
            </div>
            <div className="p-2 bg-background/30 rounded border border-white/5">
              <strong>"Schedule this post"</strong>
              <br />
              <span className="text-muted-foreground">Schedule publishing</span>
            </div>
            <div className="p-2 bg-background/30 rounded border border-white/5">
              <strong>"Publish now"</strong>
              <br />
              <span className="text-muted-foreground">Publish immediately</span>
            </div>
            <div className="p-2 bg-background/30 rounded border border-white/5">
              <strong>"Improve this text"</strong>
              <br />
              <span className="text-muted-foreground">AI enhancement</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Commands */}
      {commands.length > 0 && (
        <Card className="bg-gradient-subtle border-white/10">
          <CardHeader>
            <CardTitle className="text-sm">Recent Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {commands.map((cmd) => (
                <div key={cmd.id} className="flex items-center justify-between p-2 bg-background/30 rounded text-xs">
                  <span className="truncate flex-1">{cmd.command}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {cmd.action.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-gradient-subtle border-white/10">
        <CardHeader>
          <CardTitle className="text-sm">Quick Voice Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => speak("How can I help you create amazing content today?")}
            >
              <Volume2 className="h-3 w-3 mr-2" />
              Test Voice
            </Button>
            <Button variant="outline" size="sm">
              <Languages className="h-3 w-3 mr-2" />
              Language
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-3 w-3 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Wand2 className="h-3 w-3 mr-2" />
              AI Train
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInteraction;