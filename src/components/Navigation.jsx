import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Eye } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Detection", path: "/detection" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-custom border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ✅ Enhanced Logo + Website Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="relative z-10">
                <Shield className="h-8 w-8 text-primary animate-glow" />
                <Eye className="h-4 w-4 text-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md group-hover:bg-primary/40 transition-colors"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-primary tracking-wider font-tech">
                PRISMACHECK
              </span>
              <span className="text-xs text-accent tracking-widest font-body -mt-1">
                AI DETECTION
              </span>
            </div>
          </Link>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary font-body ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow"></div>
                )}
              </Link>
            ))}
            <Link to="/login">
              <Button variant="outline" className="mr-2 font-tech border-primary/30 hover:border-primary/60">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="gradient-primary border-0 shadow-glow font-tech">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* ✅ Enhanced Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-custom border-b border-border/50 animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary font-body ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-3 pt-3">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="font-tech border-primary/30 hover:border-primary/60">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="gradient-primary border-0 shadow-glow font-tech">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
