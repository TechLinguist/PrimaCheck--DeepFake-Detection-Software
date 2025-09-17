import { Brain, Eye, Zap, Upload, Layers, Activity, ShieldCheck, BarChart3, FileText, Video } from "lucide-react";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Secure Upload",
      description: "Client-side validation and encrypted upload",
      details: "Media never stored permanently; processed in a secure sandbox",
    },
    {
      icon: Layers,
      title: "Preprocessing",
      description: "Frame extraction, face tracking, voice isolation",
      details: "Normalize resolution, FPS, and audio sample rate for consistent analysis",
    },
    {
      icon: Eye,
      title: "Feature Analysis",
      description: "Spatial, temporal, and audio biometrics",
      details: "BLUR/edges, eye-blink cadence, lip-sync drift, spectral artifacts",
    },
    {
      icon: Brain,
      title: "Model Inference",
      description: "Ensemble of CNN + Transformer models",
      details: "Cross-modal fusion improves robustness to compression and noise",
    },
    {
      icon: BarChart3,
      title: "Confidence Scoring",
      description: "Calibrated score with thresholds",
      details: "Green (<40%), Amber (40–70%), Red (>70%) deepfake likelihood",
    },
    {
      icon: ShieldCheck,
      title: "Explainability Report",
      description: "Key signals and heatmaps",
      details: "Highlight frames/segments that drove the decision for transparency",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              How <span className="text-primary">PrismaCheck</span> Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A transparent, step‑by‑step pipeline for detecting synthetic media.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {steps.map((step, index) => (
              <div key={index} className="group animate-scale-in text-center md:text-left">
                <step.icon className="h-12 w-12 text-primary mb-4 mx-auto md:mx-0 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-2">{step.description}</p>
                <p className="text-sm text-muted-foreground">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Video Section */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Sample Video</h2>
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Video className="h-5 w-5" />
              <span className="text-sm">Demo analysis preview</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-custom">
              <video
                controls
                className="w-full h-64 object-cover"
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <h3 className="text-xl font-semibold mb-3">What you’ll see</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Frame-by-frame highlights for potential manipulation</li>
                <li>• Lip‑sync drift and eye‑blink irregularities</li>
                <li>• Temporal consistency and compression artifacts</li>
                <li>• A final confidence score with a simple traffic‑light label</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
