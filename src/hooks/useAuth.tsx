import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  connectedPlatforms: {
    facebook: boolean;
    twitter: boolean;
    instagram: boolean;
    google: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (provider: string) => Promise<void>;
  logout: () => void;
  connectPlatform: (platform: string) => Promise<void>;
  disconnectPlatform: (platform: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("postia_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  // Auto-redirect authenticated users from landing page
  useEffect(() => {
    if (isAuthenticated && window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const login = async (provider: string): Promise<void> => {
    return new Promise((resolve) => {
      toast.info(`Connecting to ${provider}...`);
      
      setTimeout(() => {
        const newUser: User = {
          id: "user123",
          name: "John Doe",
          email: "john@example.com",
          avatar: "",
          connectedPlatforms: {
            facebook: provider === "Facebook",
            twitter: provider === "Twitter/X",
            instagram: provider === "Instagram",
            google: provider === "Google"
          }
        };

        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem("postia_user", JSON.stringify(newUser));
        
        toast.success(`Successfully logged in with ${provider}!`);
        navigate("/dashboard");
        resolve();
      }, 2000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("postia_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const connectPlatform = async (platform: string): Promise<void> => {
    return new Promise((resolve) => {
      toast.info(`Connecting to ${platform}...`);
      
      setTimeout(() => {
        if (user) {
          const updatedUser = {
            ...user,
            connectedPlatforms: {
              ...user.connectedPlatforms,
              [platform.toLowerCase()]: true
            }
          };
          setUser(updatedUser);
          localStorage.setItem("postia_user", JSON.stringify(updatedUser));
          toast.success(`Successfully connected to ${platform}!`);
        }
        resolve();
      }, 2000);
    });
  };

  const disconnectPlatform = (platform: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        connectedPlatforms: {
          ...user.connectedPlatforms,
          [platform.toLowerCase()]: false
        }
      };
      setUser(updatedUser);
      localStorage.setItem("postia_user", JSON.stringify(updatedUser));
      toast.info(`Disconnected from ${platform}`);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      connectPlatform,
      disconnectPlatform
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};