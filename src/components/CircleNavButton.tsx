import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CircleNavButtonProps {
  to: string;
  label: string;
  color: "white" | "yellow" | "red" | "blue";
  className?: string;
}

export const CircleNavButton = ({ 
  to, 
  label, 
  color = "white",
  className
}: CircleNavButtonProps) => {
  
  const colorClasses = {
    white: "bg-white text-black hover:bg-gray-100",
    yellow: "bg-yellow-400 text-black hover:bg-yellow-300",
    red: "bg-red-600 text-white hover:bg-red-500",
    blue: "bg-blue-600 text-white hover:bg-blue-500",
  };
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center justify-center",
        "w-[130px] aspect-square rounded-full flex-shrink-0",
        "text-center font-bold p-4 transition-transform duration-200 hover:scale-105",
        "border-2 border-white shadow-md text-lg",
        colorClasses[color],
        className
      )}
    >
      <div className="leading-tight max-w-[110px]">{label}</div>
    </Link>
  );
};
