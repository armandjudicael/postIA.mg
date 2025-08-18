import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Sparkles, 
  Brain, 
  Image, 
  Calendar, 
  BarChart3,
  X
} from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "AI Content Generation",
      description: "Watch how our AI creates engaging social media content from just a simple topic",
      icon: Brain,
      color: "text-primary"
    },
    {
      title: "Image Creation",
      description: "See AI-generated images that perfectly match your content and brand",
      icon: Image,
      color: "text-accent"
    },
    {
      title: "Multi-Platform Preview",
      description: "Preview how your content looks across Instagram, Twitter, Facebook, and LinkedIn",
      icon: Calendar,
      color: "text-secondary"
    },
    {
      title: "Analytics & Optimization",
      description: "Track performance and get AI recommendations for better engagement",
      icon: BarChart3,
      color: "text-primary"
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const currentDemo = demoSteps[currentStep];
  const Icon = currentDemo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
              <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PostIA.mg Demo
              </DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            See how PostIA.mg transforms your social media workflow
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Demo Content */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <Icon className={`h-8 w-8 text-white`} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                {currentDemo.title}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {currentDemo.description}
              </p>
            </div>

            {/* Demo Video Placeholder */}
            <div className="relative mx-auto w-full max-w-lg h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <Play className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Interactive demo video would play here
                </p>
                <Badge variant="secondary">
                  Step {currentStep + 1} of {demoSteps.length}
                </Badge>
              </div>
            </div>

            {/* Demo Features for Current Step */}
            <div className="text-left space-y-2 bg-muted/50 rounded-lg p-4">
              {currentStep === 0 && (
                <div className="space-y-2">
                  <p className="text-sm"><strong>Input:</strong> "AI tools for productivity"</p>
                  <p className="text-sm"><strong>AI Output:</strong> "🚀 Boost your productivity with these game-changing AI tools..."</p>
                  <p className="text-sm text-muted-foreground">Generated in 2.3 seconds</p>
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-2">
                  <p className="text-sm"><strong>Style:</strong> Modern, Professional, Brand Colors</p>
                  <p className="text-sm"><strong>Elements:</strong> AI brain, productivity icons, gradients</p>
                  <p className="text-sm text-muted-foreground">3 image variations generated</p>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <p className="text-sm"><strong>Instagram:</strong> Square format with hashtags</p>
                  <p className="text-sm"><strong>Twitter:</strong> Optimized for 280 characters</p>
                  <p className="text-sm"><strong>LinkedIn:</strong> Professional tone enhanced</p>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-2">
                  <p className="text-sm"><strong>Engagement:</strong> +85% increase predicted</p>
                  <p className="text-sm"><strong>Best Time:</strong> 2:00 PM EST (Tuesday)</p>
                  <p className="text-sm"><strong>Hashtag Score:</strong> 9.2/10</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="default"
                onClick={nextStep}
              >
                {currentStep === demoSteps.length - 1 ? 'Start Over' : 'Next'}
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Ready to create your first AI-powered post?
          </p>
          <Button variant="hero" onClick={onClose}>
            Start Creating Free
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;