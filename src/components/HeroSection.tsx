import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Globe, 
  BarChart3, 
  Users, 
  Clock,
  ArrowRight,
  Smartphone,
  Play,
  Star,
  TrendingUp,
  Shield,
  Rocket
} from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";
import AuthModal from "@/components/AuthModal";
import DemoModal from "@/components/DemoModal";

const HeroSection = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "50K+", label: "Posts Generated", icon: BarChart3 },
    { value: "2K+", label: "Happy Users", icon: Users },
    { value: "98%", label: "Engagement Boost", icon: TrendingUp },
  ];

  // Rotate stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartCreating = () => {
    setIsAuthModalOpen(true);
  };

  const handleWatchDemo = () => {
    setIsDemoModalOpen(true);
  };

  const features = [
    { icon: Zap, label: "AI Generation", color: "text-highlight" },
    { icon: Globe, label: "Multi-Platform", color: "text-info" },
    { icon: Shield, label: "Enterprise Security", color: "text-success" },
    { icon: Rocket, label: "Fast Publishing", color: "text-highlight" },
  ];

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab="signup"
      />
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)}
      />
      
      <section className="relative min-h-screen overflow-hidden bg-background">
        {/* Dark Background Elements with Yellow Accents */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-subtle" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-highlight/10 rounded-full blur-3xl animate-float opacity-60" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-40" 
               style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-highlight/5 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="container relative px-4 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-section animate-slide-up">
              <div className="space-component">
                {/* Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <Badge variant="highlight" size="lg" className="animate-bounce-in">
                    <Sparkles className="h-4 w-4 mr-2 animate-pulse-glow" />
                    AI-Powered Content Creation
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-highlight text-highlight animate-pulse" 
                            style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">4.9/5 from 2,000+ reviews</span>
                  </div>
                </div>
                
                {/* Main Headline */}
                <div className="space-element">
                  <h1 className="text-display leading-tight">
                    <span className="text-foreground block animate-slide-up" style={{ animationDelay: "0.1s" }}>
                      Create
                    </span>
                    <span className="text-gradient-yellow block animate-slide-up" style={{ animationDelay: "0.2s" }}>
                      Viral Content
                    </span>
                    <span className="text-foreground block animate-slide-up" style={{ animationDelay: "0.3s" }}>
                      with
                    </span>
                    <span className="text-gradient-secondary block animate-slide-up" style={{ animationDelay: "0.4s" }}>
                      AI Magic ✨
                    </span>
                  </h1>
                  
                  <p className="text-body text-muted-foreground max-w-xl animate-slide-up" 
                     style={{ animationDelay: "0.5s" }}>
                    Transform your social media presence with AI-generated content that drives engagement. 
                    Create, schedule, and optimize posts across all platforms in seconds.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.label} 
                           className="bg-card border border-border rounded-full px-4 py-2 flex items-center space-x-2 hover:border-highlight/30 hover:bg-highlight/5 hover:text-highlight transition-all duration-300 cursor-pointer animate-bounce-in shadow-card"
                           style={{ animationDelay: `${0.7 + index * 0.1}s` }}>
                        <Icon className={`h-4 w-4 ${feature.color}`} />
                        <span className="text-sm font-medium text-foreground">{feature.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <Button variant="hero" size="xl" className="group shadow-glow" onClick={handleStartCreating}>
                  <Rocket className="mr-3 h-5 w-5 group-hover:animate-bounce" />
                  Start Creating Free
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button variant="outline" size="xl" onClick={handleWatchDemo} className="group hover:border-highlight/30 hover:bg-highlight/5 hover:text-highlight">
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: "0.9s" }}>
                <Button variant="secondary" size="lg" className="bg-card text-foreground hover:bg-highlight/10 hover:text-highlight border border-border hover:border-highlight/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📱</span>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </div>
                </Button>
                
                <Button variant="secondary" size="lg" className="bg-card text-foreground hover:bg-highlight/10 hover:text-highlight border border-border hover:border-highlight/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">▶</span>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Get it on</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-slide-up" style={{ animationDelay: "1s" }}>
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const isActive = index === currentStat;
                  return (
                    <div key={stat.label} 
                         className={`text-center transition-all duration-500 ${
                           isActive ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
                         }`}>
                      <div className="bg-card border border-border rounded-xl p-4 hover:border-highlight/30 hover:bg-highlight/5 transition-all duration-300 shadow-card card-hover">
                        <Icon className={`h-6 w-6 mx-auto mb-2 ${isActive ? 'text-highlight animate-pulse-glow' : 'text-muted-foreground'}`} />
                        <div className={`text-2xl font-bold ${isActive ? 'text-highlight' : 'text-foreground'}`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-up" style={{ animationDelay: "0.5s" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-500 group border border-border">
                <img 
                  src={heroImage} 
                  alt="PostIA.mg Dashboard Preview" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="highlight" size="xl" className="animate-bounce-in shadow-glow">
                    <Play className="h-8 w-8 mr-3" />
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              {/* Floating Feature Cards */}
              <div className="absolute -top-6 -left-6 bg-card border border-border rounded-xl p-4 animate-float hover:border-highlight/30 hover:bg-highlight/5 transition-colors cursor-pointer shadow-elegant">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-highlight animate-pulse-glow" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">AI Generation</div>
                    <div className="text-xs text-muted-foreground">Lightning Fast</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 animate-float hover:border-highlight/30 hover:bg-highlight/5 transition-colors cursor-pointer shadow-elegant" 
                   style={{ animationDelay: "1s" }}>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6 text-info animate-pulse" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Analytics</div>
                    <div className="text-xs text-muted-foreground">Real-time Insights</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 bg-card border border-border rounded-xl p-3 animate-float hover:border-highlight/30 hover:bg-highlight/5 transition-colors cursor-pointer shadow-card" 
                   style={{ animationDelay: "2s" }}>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-foreground">Multi-Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-highlight/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-highlight rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;