import { Shield, Eye } from "lucide-react";

const LoadingSpinner = ({ size = "default", text = "Analyzing..." }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-16 h-16",
    large: "w-24 h-24"
  };

  const textSizes = {
    small: "text-sm",
    default: "text-base",
    large: "text-lg"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-primary/20 rounded-full animate-spin`}></div>
        
        {/* Inner ring */}
        <div className={`${sizeClasses[size]} border-4 border-transparent border-t-primary rounded-full animate-spin absolute top-0 left-0`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Shield className={`${size === 'large' ? 'h-8 w-8' : size === 'default' ? 'h-6 w-6' : 'h-4 w-4'} text-primary animate-pulse`} />
            <Eye className={`${size === 'large' ? 'h-3 w-3' : size === 'default' ? 'h-2 w-2' : 'h-1.5 w-1.5'} text-accent absolute -bottom-0.5 -right-0.5 animate-pulse`} style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
      
      {text && (
        <div className="text-center">
          <p className={`text-muted-foreground font-body ${textSizes[size]} animate-pulse`}>
            {text}
          </p>
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
