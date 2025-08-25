import { Sparkles, Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Templates", href: "#templates" },
        { name: "API Documentation", href: "#api" },
        { name: "Integrations", href: "#integrations" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Careers", href: "#careers" },
        { name: "Press Kit", href: "#press" },
        { name: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Community", href: "#community" },
        { name: "Tutorials", href: "#tutorials" },
        { name: "Webinars", href: "#webinars" },
        { name: "Status Page", href: "#status" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
        { name: "Cookie Policy", href: "#cookies" },
        { name: "GDPR", href: "#gdpr" },
        { name: "Security", href: "#security" },
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#twitter", color: "hover:text-blue-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "#instagram", color: "hover:text-pink-500" },
    { name: "GitHub", icon: Github, href: "#github", color: "hover:text-light-black" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@postia.mg", href: "mailto:hello@postia.mg" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#location" },
  ];

  return (
    <footer className="bg-white border-t border-border">
      <div className="container px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative bg-white rounded-lg p-2 border border-primary/20 group-hover:border-primary/40 transition-all">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse-glow" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gradient-primary">
                  PostIA.mg
                </h3>
                <Badge variant="outline" size="sm" className="border-primary/20 text-primary">
                  <Sparkles className="h-2.5 w-2.5 mr-1" />
                  AI-Powered
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              AI-powered social media content creation platform for modern brands. 
              Create, schedule, and optimize your social media presence with our 
              light black, yellow, and white design system.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span>{contact.text}</span>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon-sm"
                    className={`border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 ${social.color}`}
                    asChild
                  >
                    <a href={social.href} aria-label={social.name}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-subtle border border-border rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              Stay Updated with PostIA.mg
            </h3>
            <p className="text-muted-foreground">
              Get the latest updates, tips, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              />
              <Button variant="default" className="bg-gradient-primary">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
              <p>&copy; {currentYear} PostIA.mg. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
                <span>•</span>
                <a href="#terms" className="hover:text-primary transition-colors">Terms</a>
                <span>•</span>
                <a href="#cookies" className="hover:text-primary transition-colors">Cookies</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-primary/20 text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Built with AI
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span>for creators</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary opacity-20" />
      </div>
    </footer>
  );
};

export default Footer;