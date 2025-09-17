import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileAudio,
  Video,
  Image,
  Play,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Lock,
  Eye,
  Brain,
  Globe,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: Video,
      title: "Video Detection",
      description:
        "Advanced AI algorithms to detect deepfake videos with 94.7% accuracy",
    },
    {
      icon: FileAudio,
      title: "Audio Analysis",
      description:
        "Sophisticated voice cloning detection using spectral analysis",
    },
    {
      icon: Image,
      title: "Image Verification",
      description:
        "Real-time image manipulation detection and authenticity verification",
    },
  ];

  const stats = [
    { number: "88.7%", label: "Detection Accuracy", icon: Shield },
    { number: "1M+", label: "Files Analyzed", icon: Eye },
    { number: "1", label: "Countries Served", icon: Globe },
    { number: "24/7", label: "Real-time Protection", icon: Clock },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your files are encrypted and never stored permanently",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "State-of-the-art machine learning models for detection",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* === Hero Section === */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>

        {/* Background animations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="text-center lg:text-left animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-tech text-primary">
                  AI-POWERED SECURITY
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-foreground animate-fade-in">
                <span className="text-primary">DEEPFAKE</span> <br />
                <span className="text-accent">DETECTION</span> <br />
                <span className="text-foreground">REVOLUTION</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed font-medium animate-fade-in">
                Protect yourself from AI-generated deception with our
                cutting-edge deepfake detection technology. Verify audio, video,
                and images in real-time with industry-leading accuracy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-scale-in">
                <Link to="/detection">
                  <Button
                    size="lg"
                    className="gradient-primary border-0 shadow-glow group transition-transform duration-300 hover:scale-105 font-tech"
                  >
                    Start Detection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="group transition-transform duration-300 hover:scale-105 border-primary/30 hover:border-primary/60"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* === Right side glowing pulsing box with shimmer + blink === */}
            <div className="relative transition-transform duration-500 hover:scale-105 animate-slide-in-left">
              <Card
                className="relative bg-card/60 backdrop-blur-custom border border-blue-500 p-7 rounded-xl
                shadow-[0_0_20px_rgba(0,123,255,0.8)]
                animate-[glowBlink_2s_ease-in-out_infinite] overflow-hidden"
              >
                {/* Shimmer layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[shimmer_3s_infinite]"></div>

                <div className="relative space-y-5">
                  {/* Card Header */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-3">
                      <Shield className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-tech text-primary">
                      Security Status
                    </h3>
                  </div>

                  {/* Features */}
                  {[
                    "Real-time Analysis",
                    "88.7% Accuracy Rate",
                    "Multi-format Support",
                    "Privacy Protected",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 animate-fade-in"
                    >
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span className="text-sm font-medium font-body">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* === Security Features Section === */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-background"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wider uppercase text-foreground animate-slide-in-left">
              Why Choose Our Platform
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in">
              Built with cutting-edge technology and security-first principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-custom border border-transparent hover:border-primary transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,123,255,0.8)] hover:scale-105 animate-scale-in group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground animate-slide-in-left font-tech">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium animate-fade-in font-body">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-background"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wider uppercase text-foreground animate-slide-in-left">
              Comprehensive Detection
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in">
              Our AI-powered platform detects deepfakes across all media formats
              with unparalleled precision and speed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-custom border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-scale-in group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-foreground animate-slide-in-left font-tech">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium animate-fade-in font-body">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Stats Section === */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide text-foreground animate-slide-in-left">
              Trusted by Millions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in">
              Our platform has been protecting users worldwide with proven
              results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transition-transform duration-300 hover:scale-105 animate-scale-in"
              >
                <div className="relative bg-card/50 border border-border/50 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center mb-3 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="relative text-3xl md:text-4xl font-bold text-primary font-tech">
                    {stat.number}
                  </span>
                </div>
                <div className="text-muted-foreground font-medium tracking-wide text-sm font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* === CTA Section === */}
      <section className="py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide text-foreground animate-slide-in-left font-tech">
            Ready to Protect Against{" "}
            <span className="text-primary">Deepfakes</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-medium animate-fade-in font-body">
            Join thousands of users who trust our platform to verify media
            authenticity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/detection">
              <Button
                size="lg"
                className="gradient-primary border-0 shadow-glow transition-transform duration-300 hover:scale-105 font-tech"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="transition-transform duration-300 hover:scale-105 border-primary/30 hover:border-primary/60"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <Footer />
    </div>
  );
};

export default Home;
