import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Globe, 
  BarChart3, 
  Users, 
  Clock,
  ArrowRight 
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container relative px-4 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="glass-effect">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Content Creation
              </Badge>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Create</span>{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent">
                  Viral
                </span>{" "}
                <br />
                <span className="text-white">Social Posts</span>{" "}
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-xl leading-relaxed">
                Transform your social media presence with AI-generated content that drives engagement. 
                Create, schedule, and optimize posts across all platforms with PostIA.mg.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
              
              <Button variant="glass" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/60">Posts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-white/60">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-white/60">Engagement Boost</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="PostIA.mg Dashboard Preview" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Feature Cards */}
            <div className="absolute -top-4 -left-4 glass-effect rounded-xl p-4 animate-float">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-white">AI Generation</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 glass-effect rounded-xl p-4 animate-float" style={{ animationDelay: "1s" }}>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-white">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;