import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Database, Shield, Target, Users, Globe, PlayCircle } from "lucide-react";
import Footer from "@/components/Footer";

const About = () => {
  const technologies = [
    {
      icon: Brain,
      title: "Advanced Neural Networks",
      description:
        "State-of-the-art deep learning models trained on millions of authentic and synthetic media samples.",
    },
    {
      icon: Database,
      title: "Massive Training Dataset",
      description:
        "Our models are trained on diverse, high-quality datasets spanning multiple languages and demographics.",
    },
    {
      icon: Shield,
      title: "Real-time Processing",
      description:
        "Lightning-fast analysis that provides instant results without compromising accuracy.",
    },
    {
      icon: Target,
      title: "Multi-Modal Detection",
      description:
        "Comprehensive analysis across video, audio, and image formats with specialized algorithms.",
    },
  ];

  const capabilities = [
    "Facial reenactment detection",
    "Voice synthesis identification",
    "Image manipulation detection",
    "Temporal inconsistency analysis",
    "Biometric verification",
    "Cross-platform compatibility",
  ];

  const stats = [
    { number: "88.7%", label: "Average Accuracy", description: "Across all media types" },
    { number: "50M+", label: "Training Samples", description: "Diverse global dataset" },
    { number: "<2s", label: "Processing Time", description: "Real-time analysis" },
    { number: "15+", label: "Detection Methods", description: "Multi-layered approach" },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>

        {/* Background animations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-primary">DeepFake Detection</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            We're pioneering the future of media authenticity with cutting-edge AI technology
            that protects individuals and organizations from the growing threat of deepfake content.
          </p>
        </div>
      </section>

      

      {/* Technology Section */}
      <section className="py-20 relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              How Our <span className="text-primary">Technology</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our multi-layered approach combines advanced machine learning with proprietary algorithms
              to deliver unparalleled detection accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <tech.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 h-10 w-10 bg-primary/20 rounded-full blur-md"></div>
                </div>
                <h3 className="text-lg font-bold mb-3">{tech.title}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>

          {/* Video Example */}
          <div className="text-center animate-fade-in">
            <Card className="inline-block p-12 bg-card/50 backdrop-blur-sm border-primary/20 shadow-elegant hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <PlayCircle className="h-20 w-20 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2">See It In Action</h3>
              <p className="text-muted-foreground max-w-md">
                Watch our technology detect deepfakes in real-time across different media formats.
              </p>
              <Button className="mt-4 gradient-primary border-0">Play Demo Video</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold mb-6">
              Detection <span className="text-primary">Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our system identifies manipulation techniques used in modern deepfake creation.
            </p>
            <div className="grid gap-3">
              {capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full shadow-glow"></div>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6 animate-scale-in">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="relative p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div>
                    <div className="font-semibold">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the <span className="text-primary">Future</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the fight against misinformation with our advanced deepfake detection technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary border-0 shadow-glow">
              Try Detection Now
            </Button>
            <Button size="lg" variant="outline">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
