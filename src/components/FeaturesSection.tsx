import { 
  Sparkles, 
  Brain, 
  Image, 
  Calendar, 
  BarChart3, 
  Globe,
  Zap,
  Shield
} from "lucide-react";
import aiContentImage from "@/assets/ai-content.jpg";

const features = [
  {
    icon: Brain,
    title: "AI Text Generation",
    description: "Advanced GPT-powered content creation with multi-step generation: outline, draft, and optimization.",
    highlight: "Multi-language Support"
  },
  {
    icon: Image,
    title: "AI Image Creation", 
    description: "Generate stunning visuals with Stable Diffusion integration. Brand-consistent images that match your style.",
    highlight: "Brand Consistency"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Optimal posting times across platforms with timezone support and automated retries.",
    highlight: "Cross-Platform"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track engagement metrics, visualize trends, and get AI-powered recommendations for better performance.",
    highlight: "Performance Insights"
  },
  {
    icon: Globe,
    title: "Multi-Platform Publishing",
    description: "Seamless integration with Facebook, Instagram, Twitter/X, and LinkedIn APIs.",
    highlight: "All Major Platforms"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "GDPR compliant, encrypted storage, and enterprise-grade security following OWASP best practices.",
    highlight: "Bank-Level Security"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-30" />
      
      <div className="container px-4 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary mr-2 animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
            Everything You Need for
            <span className="text-gradient-primary block mt-2">
              Social Media Success
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From AI-powered content creation to advanced analytics, PostIA.mg provides 
            all the tools you need to dominate social media with our light black, yellow, and white design.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl border border-border bg-white hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-300" />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 border border-primary/10 group-hover:border-primary/20">
                    <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <div className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                      {feature.highlight}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Image Feature */}
        <div className="relative mx-auto max-w-4xl animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-500 group border border-border">
            <img 
              src={aiContentImage} 
              alt="AI Content Creation"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-light-black/60 via-transparent to-primary/20" />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4 p-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                  <Sparkles className="h-4 w-4 mr-2 text-primary animate-pulse-glow" />
                  <span className="text-sm font-medium">AI-Powered Engine</span>
                </div>
                <h3 className="text-3xl font-bold">
                  Transform Ideas into Viral Content
                </h3>
                <p className="text-lg opacity-90 max-w-md mx-auto leading-relaxed">
                  Watch your ideas transform into engaging content with our advanced AI algorithms, 
                  designed with clean light black, yellow, and white aesthetics.
                </p>
                <div className="flex justify-center space-x-4 pt-4">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm">Smart AI</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm">Lightning Fast</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Secure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-light-black/20">
              <div className="bg-white rounded-full p-4 shadow-glow animate-bounce-in">
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="absolute -top-4 -left-4 bg-white border border-border rounded-xl p-4 shadow-elegant animate-float">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
              <div>
                <div className="text-sm font-semibold text-foreground">50K+ Posts</div>
                <div className="text-xs text-muted-foreground">Generated Daily</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-white border border-border rounded-xl p-4 shadow-elegant animate-float" 
               style={{ animationDelay: "1s" }}>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <div>
                <div className="text-sm font-semibold text-foreground">98% Success</div>
                <div className="text-xs text-muted-foreground">Engagement Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <div className="inline-flex items-center space-x-4 bg-white border border-border rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary-foreground animate-pulse-glow" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-foreground">Ready to get started?</div>
                <div className="text-sm text-muted-foreground">Join thousands of creators using PostIA.mg</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;