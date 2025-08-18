import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Facebook, Twitter, Instagram, Linkedin, Check, Plus, Settings } from "lucide-react";
import { toast } from "sonner";

interface PlatformConnectionsProps {
  className?: string;
}

const PlatformConnections = ({ className }: PlatformConnectionsProps) => {
  const [connections, setConnections] = useState({
    facebook: { connected: false, enabled: true },
    twitter: { connected: false, enabled: true },
    instagram: { connected: false, enabled: true },
    linkedin: { connected: false, enabled: false }
  });

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      description: 'Share posts to your Facebook profile and pages'
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'text-foreground',
      bgColor: 'bg-muted/50',
      borderColor: 'border-border',
      description: 'Post tweets and threads to your X account'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      description: 'Share photos and stories to your Instagram'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      description: 'Share professional content to LinkedIn'
    }
  ];

  const handleConnect = async (platformId: string) => {
    toast.info(`Connecting to ${platforms.find(p => p.id === platformId)?.name}...`);
    
    // Simulate connection process
    setTimeout(() => {
      setConnections(prev => ({
        ...prev,
        [platformId]: { ...prev[platformId as keyof typeof prev], connected: true }
      }));
      toast.success(`Successfully connected to ${platforms.find(p => p.id === platformId)?.name}!`);
    }, 2000);
  };

  const handleDisconnect = (platformId: string) => {
    setConnections(prev => ({
      ...prev,
      [platformId]: { ...prev[platformId as keyof typeof prev], connected: false }
    }));
    toast.info(`Disconnected from ${platforms.find(p => p.id === platformId)?.name}`);
  };

  const toggleEnabled = (platformId: string) => {
    setConnections(prev => ({
      ...prev,
      [platformId]: { 
        ...prev[platformId as keyof typeof prev], 
        enabled: !prev[platformId as keyof typeof prev].enabled 
      }
    }));
  };

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-2">
        {platforms.map((platform) => {
          const connection = connections[platform.id as keyof typeof connections];
          const Icon = platform.icon;
          
          return (
            <Card 
              key={platform.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-platform ${
                connection.connected ? platform.borderColor : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${platform.bgColor}`}>
                      <Icon className={`h-5 w-5 ${platform.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{platform.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {platform.description}
                      </CardDescription>
                    </div>
                  </div>
                  {connection.connected && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {connection.connected ? (
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={connection.enabled}
                          onCheckedChange={() => toggleEnabled(platform.id)}
                        />
                        <span className="text-xs text-muted-foreground">
                          {connection.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {connection.connected && (
                      <Button variant="ghost" size="sm" onClick={() => {}}>
                        <Settings className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant={connection.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => connection.connected ? handleDisconnect(platform.id) : handleConnect(platform.id)}
                      className="relative"
                    >
                      {connection.connected ? (
                        "Disconnect"
                      ) : (
                        <>
                          <Plus className="h-3 w-3 mr-1" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformConnections;