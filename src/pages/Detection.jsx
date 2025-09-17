import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileVideo, FileAudio, Image, Shield, Eye, Brain, Zap, CheckCircle, XCircle, AlertTriangle, Globe, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "@/components/Footer";
import React from "react"; // Added missing import for React

const Detection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setResults(prev => prev.filter(r => r.fileId !== fileId));
  };

  const analyzeFiles = async () => {
  if (files.length === 0) return;
  setAnalyzing(true);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    setFiles(prev =>
      prev.map(f => (f.id === file.id ? { ...f, status: "analyzing" } : f))
    );

    try {
      const formData = new FormData();
      formData.append("file", file.file);

      // choose endpoint
      let endpoint = "";
      if (file.type.startsWith("image/")) {
        endpoint = "http://127.0.0.1:5002/predict/image";
      } else if (file.type.startsWith("video/")) {
        endpoint = "http://127.0.0.1:5002/predict/video";
      } else if (file.type.startsWith("audio/")) {
        endpoint = "http://127.0.0.1:5002/predict/audio";
      } else {
        setFiles(prev =>
          prev.map(f => (f.id === file.id ? { ...f, status: "error" } : f))
        );
        continue;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const result = {
        fileId: file.id,
        isDeepfake: data.label === "fake",
        confidence: Math.round(data.confidence * 100),
        analysis: {
          facialInconsistencies: data.label === "fake",
          lightingAnomalies: data.label === "fake",
          compressionArtifacts: data.label === "fake",
          metadataInconsistencies: data.label === "fake",
        },
      };

      setResults(prev => [...prev, result]);

      setFiles(prev =>
        prev.map(f => (f.id === file.id ? { ...f, status: "completed" } : f))
      );
    } catch (err) {
      console.error("Error analyzing file:", err);
      setFiles(prev =>
        prev.map(f => (f.id === file.id ? { ...f, status: "error" } : f))
      );
    }
  }

  setAnalyzing(false);
};


  const getFileIcon = (type) => {
    if (type.startsWith('video/')) return FileVideo;
    if (type.startsWith('audio/')) return FileAudio;
    if (type.startsWith('image/')) return Image;
    return Upload;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>;
      case 'analyzing':
        return <LoadingSpinner size="small" text="" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>;
    }
  };

  const getResultIcon = (isDeepfake) => {
    if (isDeepfake) {
      return <XCircle className="w-6 h-6 text-destructive" />;
    }
    return <CheckCircle className="w-6 h-6 text-success" />;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>

        {/* Enhanced background animations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-tech text-primary">AI-POWERED ANALYSIS</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-tech text-shadow-glow">
              <span className="text-primary">PRISMA</span>
              <br /> 
              <span className="text-accent">CHECK</span> 
              <br />
              <span className="text-foreground">ANALYSIS</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
              Upload your media files and let our advanced AI analyze them for signs of manipulation or synthetic generation with industry-leading accuracy.
            </p>
          </div>

          {/* Upload Area */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card/50 backdrop-blur-custom border-gradient shadow-elegant animate-scale-in">
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  dragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="video/*,audio/*,image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Upload className="h-16 w-16 text-primary animate-glow" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                        <Eye className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 font-tech">Drop files here or click to upload</h3>
                    <p className="text-muted-foreground mb-4 font-body">Supports video, audio, and image formats</p>
                    <div className="flex justify-center space-x-6 text-sm text-muted-foreground font-body">
                      <div className="flex items-center space-x-2">
                        <FileVideo className="h-5 w-5" />
                        <span>MP4, AVI, MOV</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileAudio className="h-5 w-5" />
                        <span>MP3, WAV, M4A</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image className="h-5 w-5" />
                        <span>JPG, PNG, GIF</span>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="gradient-primary border-0 shadow-glow font-tech">Choose Files</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* File List Section */}
      {files.length > 0 && (
        <section className="py-8 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-tech">Files to Analyze</h2>
              <Button 
                onClick={analyzeFiles} 
                disabled={analyzing || files.every(f => f.status === 'completed')}
                className="gradient-primary border-0 shadow-glow font-tech"
              >
                {analyzing ? 'Analyzing...' : 'Start Analysis'}
              </Button>
            </div>
            
            <div className="space-y-4">
              {files.map((file) => (
                <Card key={file.id} className="p-4 bg-card/50 backdrop-blur-custom border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg">
                        {React.createElement(getFileIcon(file.type), { className: "h-6 w-6 text-primary" })}
                      </div>
                      <div>
                        <h3 className="font-medium font-body">{file.name}</h3>
                        <p className="text-sm text-muted-foreground font-body">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(file.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <section className="py-8 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 font-tech">Analysis Results</h2>
            <div className="space-y-4">
              {results.map((result) => {
                const file = files.find(f => f.id === result.fileId);
                if (!file) return null;
                
                return (
                  <Card key={result.fileId} className="p-6 bg-card/50 backdrop-blur-custom border-gradient">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg">
                          {React.createElement(getFileIcon(file.type), { className: "h-6 w-6 text-primary" })}
                        </div>
                        <div>
                          <h3 className="font-medium font-body">{file.name}</h3>
                          <p className="text-sm text-muted-foreground font-body">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getResultIcon(result.isDeepfake)}
                        <span className={`text-lg font-bold font-tech ${
                          result.isDeepfake ? 'text-destructive' : 'text-success'
                        }`}>
                          {result.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium font-body">Confidence Score</span>
                        <span className="text-lg font-bold text-primary font-tech">{result.confidence}%</span>
                      </div>
                      <Progress value={result.confidence} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(result.analysis).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <span className="text-sm font-body capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <div className="flex items-center space-x-2">
                            {value ? (
                              <AlertTriangle className="h-4 w-4 text-warning" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-success" />
                            )}
                            <span className={`text-sm font-body ${
                              value ? 'text-warning' : 'text-success'
                            }`}>
                              {value ? 'Suspicious' : 'Normal'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 font-tech">
              How Our <span className="text-primary">Detection</span> Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-tech">Upload & Process</h3>
                <p className="text-muted-foreground font-body">
                  Upload your media files securely to our encrypted platform for analysis
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-tech">AI Analysis</h3>
                <p className="text-muted-foreground font-body">
                  Our advanced neural networks analyze the content for manipulation signs
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-tech">Get Results</h3>
                <p className="text-muted-foreground font-body">
                  Receive detailed reports with confidence scores and analysis breakdown
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <Footer />
    </div>
  );
};

export default Detection;
