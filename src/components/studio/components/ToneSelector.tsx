import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase,
  Heart,
  Smile,
  Zap,
  Target,
  Users
} from "lucide-react";

interface ToneSelectorProps {
  value: string;
  onChange: (tone: string) => void;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  value,
  onChange,
}) => {
  const tones = [
    {
      value: 'professional',
      label: 'Professional',
      icon: Briefcase,
      description: 'Formal, business-appropriate tone',
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      examples: ['Industry insights', 'Company updates', 'Thought leadership'],
      characteristics: ['Formal language', 'Industry terminology', 'Credible sources'],
    },
    {
      value: 'friendly',
      label: 'Friendly',
      icon: Heart,
      description: 'Warm, approachable, and conversational',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      examples: ['Community posts', 'Behind-the-scenes', 'Personal stories'],
      characteristics: ['Casual language', 'Emojis', 'Personal touch'],
    },
    {
      value: 'humorous',
      label: 'Humorous',
      icon: Smile,
      description: 'Light-hearted, entertaining, and fun',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      examples: ['Memes', 'Funny observations', 'Playful content'],
      characteristics: ['Witty remarks', 'Pop culture refs', 'Light sarcasm'],
    },
    {
      value: 'inspiring',
      label: 'Inspiring',
      icon: Zap,
      description: 'Motivational and uplifting content',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      examples: ['Success stories', 'Motivational quotes', 'Achievement posts'],
      characteristics: ['Positive language', 'Action-oriented', 'Empowering'],
    },
    {
      value: 'educational',
      label: 'Educational',
      icon: Target,
      description: 'Informative and knowledge-sharing',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      examples: ['How-to guides', 'Tips & tricks', 'Industry knowledge'],
      characteristics: ['Clear explanations', 'Step-by-step', 'Factual'],
    },
    {
      value: 'conversational',
      label: 'Conversational',
      icon: Users,
      description: 'Engaging and discussion-focused',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      examples: ['Questions to audience', 'Polls', 'Discussion starters'],
      characteristics: ['Direct questions', 'Call-to-action', 'Interactive'],
    },
  ];

  const selectedTone = tones.find(t => t.value === value);

  return (
    <div className="space-y-3">
      {/* Tone Selector */}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary">
          <SelectValue>
            {selectedTone && (
              <div className="flex items-center space-x-2">
                <selectedTone.icon className={`h-4 w-4 ${selectedTone.color}`} />
                <span>{selectedTone.label}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-w-sm">
          {tones.map((tone) => (
            <SelectItem 
              key={tone.value} 
              value={tone.value}
              className="cursor-pointer transition-all duration-200 hover:bg-primary/10"
            >
              <div className="flex items-center space-x-3 py-2">
                <div className={`p-2 rounded-lg ${tone.bgColor}`}>
                  <tone.icon className={`h-4 w-4 ${tone.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{tone.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {tone.description}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Tone Details */}
      {selectedTone && (
        <div className={`p-3 rounded-lg border transition-all duration-200 ${selectedTone.bgColor} border-border/50`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-background/50`}>
              <selectedTone.icon className={`h-5 w-5 ${selectedTone.color}`} />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-medium text-sm">{selectedTone.label} Tone</h4>
                <p className="text-xs text-muted-foreground">
                  {selectedTone.description}
                </p>
              </div>
              
              {/* Characteristics */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">Characteristics:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedTone.characteristics.map((char, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-background/50 hover:bg-background/70 transition-colors"
                    >
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">Best for:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedTone.examples.map((example, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs border-current/20"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tone Preview */}
      {selectedTone && (
        <div className="p-3 bg-gradient-subtle rounded-lg border border-border/50">
          <div className="text-xs font-medium text-muted-foreground mb-2">Sample content:</div>
          <div className="text-sm italic text-foreground">
            {selectedTone.value === 'professional' && 
              "We're excited to announce our latest industry insights that will help drive your business forward. Our comprehensive analysis reveals..."
            }
            {selectedTone.value === 'friendly' && 
              "Hey everyone! 👋 We've got some amazing news to share with you today! Can't wait to tell you all about our latest adventure..."
            }
            {selectedTone.value === 'humorous' && 
              "Breaking news: Local team discovers that coffee actually DOES solve everything! ☕ In other shocking revelations..."
            }
            {selectedTone.value === 'inspiring' && 
              "Every great achievement starts with a single step. Today, we're taking that step toward a brighter future, and we invite you to join us..."
            }
            {selectedTone.value === 'educational' && 
              "Here's a step-by-step guide to mastering this essential skill. First, let's understand the fundamentals..."
            }
            {selectedTone.value === 'conversational' && 
              "What's your take on this? We've been thinking about this topic a lot lately, and we'd love to hear your thoughts..."
            }
          </div>
        </div>
      )}
    </div>
  );
};