/**
 * PhotoBubble Component
 * 
 * A circular image component that displays a photo with a white border.
 * Supports different sizes and custom styling.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.imageSrc - URL of the image to display
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Size of the bubble
 * @param {string} [props.className=''] - Additional CSS classes
 */

import { cn } from "@/lib/utils";

interface PhotoBubbleProps {
  /** URL of the image to display */
  imageSrc: string;
  /** Size of the bubble */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Size classes for different bubble dimensions
 */
const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32'
} as const;

export const PhotoBubble = ({ 
  imageSrc, 
  size = 'md', 
  className = '' 
}: PhotoBubbleProps) => {
  return (
    <div 
      className={cn(
        'rounded-full overflow-hidden border-4 border-white',
        sizeClasses[size],
        className
      )}
    >
      <img 
        src={imageSrc} 
        alt="Horse" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};
