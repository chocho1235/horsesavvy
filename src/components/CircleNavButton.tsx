import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CircleNavButtonProps {
  to: string;
  label: string;
  color: "white" | "yellow" | "red" | "blue" | "green" | "purple" | "black-gold";
  className?: string;
}

export const CircleNavButton = ({ 
  to, 
  label, 
  color = "white",
  className
}: CircleNavButtonProps) => {
  
  const colorClasses = {
    white: "bg-white text-black hover:bg-gray-50",
    yellow: "bg-[#FFD700] text-black hover:bg-[#FFE44D]/90",
    red: "bg-[#FF0000] text-white hover:bg-[#FF3333]/90",
    blue: "bg-[#0066FF] text-white hover:bg-[#3385FF]/90",
    green: "bg-[#00B300] text-white hover:bg-[#00CC00]/90",
    purple: "bg-[#8000FF] text-white hover:bg-[#944DFF]/90",
    "black-gold": "bg-black text-[#FFD700] hover:bg-gray-900/90",
  };
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center justify-center",
        "w-[140px] h-[140px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] rounded-full flex-shrink-0",
        "text-center font-bold p-4 md:p-6 transition-all duration-300 hover:scale-[1.02]",
        "border-2 md:border-4 border-white shadow-lg text-base md:text-xl",
        colorClasses[color],
        className
      )}
    >
      <div className="leading-tight max-w-[120px] md:max-w-[140px] lg:max-w-[160px]">{label}</div>
    </Link>
  );
};
