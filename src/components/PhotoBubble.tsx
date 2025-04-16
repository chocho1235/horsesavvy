import { cn } from "@/lib/utils";

interface PhotoBubbleProps {
  imageSrc: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PhotoBubble = ({ imageSrc, size = 'md', className = '' }: PhotoBubbleProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`rounded-full overflow-hidden border-4 border-white ${sizeClasses[size]} ${className}`}>
      <img 
        src={imageSrc} 
        alt="Horse" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
