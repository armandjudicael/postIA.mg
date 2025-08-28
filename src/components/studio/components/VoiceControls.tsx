import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  Waveform,
  Settings,
  Play,
  Pause,
  Square
} from "lucide-react";

interface VoiceControlsProps {
  isRecording: boolean;
  isVoiceAssistantActive: boolean;
  voiceEnabled: boolean;
  onToggleRecording: () => void;
  onToggleVoiceAssistant: () => void;
  onToggleVoiceEnabled: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isRecording,
  isVoiceAssistantActive,
  voiceEnabled,
  onToggleRecording,
  onToggleVoiceAssistant,
  onToggleVoiceEnabled,
}) => {
  return (
    <div className="space-y-4">
      {/* Voice Features Toggle */}
      <div className="p-3 bg-gradient-subtle rounded-lg border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Voice Features</span>
          </div>
          <Switch 
            checked={voiceEnabled} 
            onCheckedChange={onToggleVoiceEnabled}
            className="data-[state=checked]:bg-primary"
          />
        </div>
        
        {voiceEnabled && (
          <div className="text-xs text-muted-foreground">
            Enable voice recording and AI assistant features
          </div>
        )}
      </div>

      {/* Voice Recording Section */}
      {voiceEnabled && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Voice Recording</h4>
            <Badge 
              variant={isRecording ? "destructive" : "outline"}
              className="text-xs"
            >
              {isRecording ? 'Recording' : 'Ready'}
            </Badge>
          </div>

          {/* Recording Controls */}
          <div className="p-3 bg-background rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-muted'}`} />
                <span className="text-sm">
                  {isRecording ? 'Recording in progress...' : 'Ready to record'}
                </span>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      size="sm"
                      onClick={onToggleRecording}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      {isRecording ? (
                        <>
                          <Square className="h-4 w-4 mr-1" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-1" />
                          Record
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isRecording ? 'Stop voice recording' : 'Start voice recording'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Audio Visualizer */}
            {isRecording && (
              <div className="flex items-center justify-center space-x-1 py-2">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 8}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Recording Tips */}
            <div className="text-xs text-muted-foreground mt-2">
              {isRecording ? (
                <p>🎤 Speak clearly and naturally. Your voice will be transcribed automatically.</p>
              ) : (
                <p>💡 Click record to start voice input. Perfect for hands-free content creation.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Voice Assistant Section */}
      {voiceEnabled && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">AI Voice Assistant</h4>
            </div>
            <Switch 
              checked={isVoiceAssistantActive} 
              onCheckedChange={onToggleVoiceAssistant}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {isVoiceAssistantActive && (
            <div className="p-3 bg-gradient-subtle rounded-lg border border-border/50">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-600">AI Assistant Active</span>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Voice commands available:</p>
                <ul className="ml-4 space-y-0.5">
                  <li>• "Generate content" - Create AI content</li>
                  <li>• "Publish now" - Publish immediately</li>
                  <li>• "Schedule post" - Schedule for later</li>
                  <li>• "Clear content" - Clear the editor</li>
                  <li>• "Change tone to [tone]" - Adjust content tone</li>
                </ul>
              </div>

              {/* Voice Assistant Controls */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                <div className="flex items-center space-x-2">
                  <Waveform className="h-3 w-3 text-primary" />
                  <span className="text-xs">Listening for commands</span>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Settings
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Configure voice assistant settings
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Voice Quality Settings */}
      {voiceEnabled && (
        <div className="p-3 bg-background rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Audio Quality</span>
            <Badge variant="outline" className="text-xs">High</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Sample Rate</span>
              <span>44.1 kHz</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Bit Depth</span>
              <span>16-bit</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Format</span>
              <span>WAV</span>
            </div>
          </div>
        </div>
      )}

      {/* Voice Features Disabled State */}
      {!voiceEnabled && (
        <div className="p-4 bg-muted/50 rounded-lg border border-border/50 text-center">
          <VolumeX className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">Voice features are disabled</p>
          <p className="text-xs text-muted-foreground">
            Enable voice features to use recording and AI assistant
          </p>
        </div>
      )}
    </div>
  );
};