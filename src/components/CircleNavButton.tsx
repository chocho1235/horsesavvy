/**
 * CircleNavButton Component
 * 
 * A circular navigation button component that links to different routes.
 * Features different color schemes and responsive sizing.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.to - Route path to navigate to
 * @param {string} props.label - Text to display in the button
 * @param {'white' | 'yellow' | 'red' | 'blue' | 'green' | 'purple' | 'black-gold'} [props.color='white'] - Color scheme
 * @param {string} [props.className] - Additional CSS classes
 */

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface CircleNavButtonProps {
  /** Route path to navigate to */
  to: string;
  /** Text to display in the button */
  label: string;
  /** Color scheme */
  color: "white" | "yellow" | "red" | "blue" | "green" | "purple" | "black-gold";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Color scheme classes for different button styles
 */
const colorClasses = {
  white: "bg-white text-black hover:bg-gray-50 border-white",
  yellow: "bg-[#FFD700] text-black hover:bg-[#FFE44D]/90 border-[#FFD700]",
  red: "bg-[#FF0000] text-white hover:bg-[#FF3333]/90 border-[#FF0000]",
  blue: "bg-[#0066FF] text-white hover:bg-[#3385FF]/90 border-[#0066FF]",
  green: "bg-[#00B300] text-white hover:bg-[#00CC00]/90 border-[#00B300]",
  purple: "bg-[#8000FF] text-white hover:bg-[#944DFF]/90 border-[#8000FF]",
  "black-gold": "bg-black text-gold hover:bg-gray-900/95 border-gold/70",
} as const;

export const CircleNavButton = memo(({ 
  to, 
  label, 
  color = "white",
  className
}: CircleNavButtonProps) => {
  // Determine if we need to override the border color based on the color scheme
  const hasBorderOverride = color === "black-gold";
  
  return (
    <Link 
      to={to} 
      className={cn(
        // Base styles
        "flex items-center justify-center",
        // Size and shape
        "w-[140px] h-[140px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] rounded-full flex-shrink-0",
        // Typography and spacing
        "text-center font-bold p-4 md:p-6 text-base md:text-xl",
        // Animation and effects
        "transition-all duration-300 hover:scale-[1.02]",
        // GPU acceleration and anti-flicker
        "animate-gpu transform-gpu",
        // Border and shadow
        "border-2 md:border-4 shadow-lg",
        // Color scheme
        colorClasses[color],
        // Custom classes
        className
      )}
      aria-label={label}
      data-animate="true"
    >
      <div className="leading-tight max-w-[120px] md:max-w-[140px] lg:max-w-[160px] -webkit-font-smoothing-antialiased">
        {label}
      </div>
    </Link>
  );
});

// Add display name for React DevTools
CircleNavButton.displayName = 'CircleNavButton';
