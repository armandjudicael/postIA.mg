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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="container px-4 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
            Everything You Need for
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Social Media Success
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered content creation to advanced analytics, PostIA.mg provides 
            all the tools you need to dominate social media.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:shadow-elegant transition-smooth hover:-translate-y-1"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-smooth" />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-smooth">
                      {feature.title}
                    </h3>
                    <div className="inline-block px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md">
                      {feature.highlight}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Image Feature */}
        <div className="relative mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden shadow-elegant">
            <img 
              src={aiContentImage} 
              alt="AI Content Creation"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-accent/20" />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <h3 className="text-3xl font-bold">
                  AI-Powered Content Engine
                </h3>
                <p className="text-lg opacity-90 max-w-md">
                  Watch your ideas transform into viral content with our advanced AI algorithms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;