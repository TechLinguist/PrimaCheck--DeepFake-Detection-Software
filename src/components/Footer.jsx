import { Shield, Globe, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-custom mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-8">
        {/* Left Column - Logo & Tagline */}
        <div className="animate-slide-in-left">
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative">
              <Shield className="h-6 w-6 text-primary animate-glow" />
              <div className="absolute inset-0 h-6 w-6 bg-primary/20 rounded-full blur-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-primary tracking-wider font-tech">
                PRISMACHECK
              </span>
              <span className="text-[10px] text-accent tracking-widest font-body -mt-0.5">
                AI DETECTION
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-xs mb-3 font-body leading-relaxed">
            Protecting digital integrity with advanced AI-powered deepfake detection technology. 
            Building a safer, more trustworthy digital world for everyone.
          </p>
          <div className="flex items-center space-x-2 text-muted-foreground text-xs font-body">
            <Globe className="h-3.5 w-3.5" />
            <span>Serving 150+ countries worldwide</span>
          </div>
        </div>

        {/* Right Column - Contact Us */}
        <div className="animate-fade-in">
          <h4 className="text-base font-bold text-foreground mb-3 font-tech">Contact Us</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-muted-foreground font-body text-sm">
              <Mail className="h-4 w-4" />
              <span>support@prismacheck.com</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground font-body text-sm">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground font-body text-sm">
              <MapPin className="h-4 w-4" />
              <span>123 Security Street, Tech City, TC 12345</span>
            </div>
            
            {/* Contact Form */}
            <div className="mt-4">
              <h5 className="text-xs font-semibold text-foreground mb-2 font-tech">Send us a message</h5>
              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:border-primary bg-card/50 font-body text-sm"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:border-primary bg-card/50 font-body text-sm"
                />
                <textarea
                  placeholder="Your message"
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-border focus:outline-none focus:border-primary bg-card/50 font-body text-sm resize-none"
                ></textarea>
                <Button className="w-full h-9 text-sm gradient-primary border-0 shadow-glow font-tech">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright + Social Links */}
      <div className="border-t border-border/40 py-4 text-center">
        <p className="text-xs text-muted-foreground mb-3 font-body">
          © {new Date().getFullYear()} PrismaCheck. Made for digital safety.
        </p>
        <div className="flex justify-center space-x-5">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-600 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-gray-400 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="mailto:support@prismacheck.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
