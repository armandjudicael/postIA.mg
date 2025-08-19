import { Smartphone, Download, QrCode, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MobileAppSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="container px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Smartphone className="h-4 w-4 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Mobile App</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
                Get the Full Experience
                <span className="text-gradient-accent block">
                  On Mobile
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Create, edit, and publish content on the go. Our mobile app brings 
                all the power of PostIA.mg to your fingertips with an intuitive 
                touch-first interface.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">Offline content editing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">Real-time notifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">Camera integration for instant posts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-foreground">Voice-to-text content creation</span>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" className="group bg-black text-white hover:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-white rounded text-black flex items-center justify-center text-xs font-bold">
                    📱
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="default" size="lg" className="group bg-black text-white hover:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded text-white flex items-center justify-center text-xs font-bold">
                    ▶
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9/5 from 2,000+ reviews
              </span>
            </div>
          </div>

          {/* QR Code and Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* Phone Mockup */}
              <div className="relative bg-gradient-card rounded-[2.5rem] p-2 shadow-elegant">
                <div className="bg-background rounded-[2rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-foreground/5 px-6 py-2 flex justify-between items-center text-xs">
                    <span>9:41</span>
                    <span>📶 📶 📶 🔋</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-6 space-y-6 h-[500px]">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground">PostIA.mg</h3>
                      <p className="text-xs text-muted-foreground">AI Content Creator</p>
                    </div>
                    
                    {/* Mock Interface */}
                    <div className="space-y-3">
                      <div className="h-3 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-24 bg-gradient-primary/10 rounded-lg" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 bg-muted rounded" />
                        <div className="h-16 bg-muted rounded" />
                        <div className="h-16 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <Card className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block hover-lift">
                <CardContent className="p-4 text-center space-y-3">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground">Scan to Download</p>
                    <p className="text-xs text-muted-foreground">Quick access</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;