
import { cn } from "@/lib/utils";

interface PhotoBubbleProps {
  imageSrc: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const PhotoBubble = ({ 
  imageSrc, 
  size = "md", 
  className 
}: PhotoBubbleProps) => {

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-28 h-28"
  };
  
  return (
    <div className={cn(
      "rounded-full overflow-hidden border-2 border-white shadow-lg",
      sizeClasses[size],
      className
    )}>
      <img 
        src={imageSrc} 
        alt="Horse training" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
