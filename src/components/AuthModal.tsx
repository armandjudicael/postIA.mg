import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Lock, 
  User, 
  Facebook, 
  Twitter, 
  Eye, 
  EyeOff,
  Sparkles,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: ""
  });

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await login(provider);
      onClose();
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (isSignup: boolean) => {
    setIsLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (isSignup) {
      if (!formData.fullName) {
        toast.error("Please enter your full name");
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match");
        setIsLoading(false);
        return;
      }
    }

    try {
      await login("Email");
      onClose();
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-background/95 border border-white/10 shadow-modal">
        <DialogHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-60" />
              <div className="relative bg-background/80 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome to PostIA.mg
            </DialogTitle>
            <DialogDescription className="text-muted-foreground/80">
              Join thousands of creators using AI to grow their social media presence
            </DialogDescription>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
              <Zap className="h-3 w-3" />
              <span>AI-Powered Content Creation</span>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <div className="space-y-4">
              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="relative">Continue with Facebook</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group border-foreground/20 hover:border-foreground/40 transition-all duration-300"
                  onClick={() => handleSocialLogin("Twitter/X")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Twitter className="h-4 w-4 mr-2" />
                  <span className="relative">Continue with X (Twitter)</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                  onClick={() => handleSocialLogin("Instagram")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-4 w-4 mr-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-sm flex items-center justify-center">
                    <div className="h-2 w-2 bg-background rounded-full" />
                  </div>
                  <span className="relative">Continue with Instagram</span>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email Login */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Forgot password?
                  </Button>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handleEmailAuth(false)}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <div className="space-y-4">
              {/* Social Signup */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                  onClick={() => handleSocialLogin("Facebook")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="relative">Sign up with Facebook</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group border-foreground/20 hover:border-foreground/40 transition-all duration-300"
                  onClick={() => handleSocialLogin("Twitter/X")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Twitter className="h-4 w-4 mr-2" />
                  <span className="relative">Sign up with X (Twitter)</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                  onClick={() => handleSocialLogin("Instagram")}
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-4 w-4 mr-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-sm flex items-center justify-center">
                    <div className="h-2 w-2 bg-background rounded-full" />
                  </div>
                  <span className="relative">Sign up with Instagram</span>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or create account with email
                  </span>
                </div>
              </div>

              {/* Email Signup */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handleEmailAuth(true)}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Button variant="link" className="p-0 h-auto text-xs">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-xs">
            Privacy Policy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;