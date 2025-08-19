import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow Inc",
    content: "PostIA.mg transformed our social media strategy. We've seen a 300% increase in engagement and save 15+ hours per week on content creation.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Marcus Chen",
    role: "Social Media Manager",
    company: "GrowthCo",
    content: "The AI-powered content generation is incredible. It understands our brand voice perfectly and creates posts that consistently perform well.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "StyleBrand",
    content: "From a single prompt to polished posts across all platforms - PostIA.mg made scaling our social presence effortless.",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "David Thompson",
    role: "Content Creator",
    company: "CreativeFlow",
    content: "The cross-platform previews and scheduling features are game-changers. I can plan weeks of content in just one afternoon.",
    rating: 5,
    avatar: "DT"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_50%)]" />
      
      <div className="container px-4 relative">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">5.0 Rating</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
            Loved by Content Creators
            <span className="text-gradient-primary block">
              Worldwide
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of marketers, creators, and businesses who've transformed 
            their social media presence with PostIA.mg.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="relative group hover-lift bg-gradient-card border-border/50"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-smooth">
                  <Quote className="h-6 w-6 text-primary" />
                </div>
                
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center space-x-3 pt-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">50M+</div>
              <div className="text-sm text-muted-foreground">Posts Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;