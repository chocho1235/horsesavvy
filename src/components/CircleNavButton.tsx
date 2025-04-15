
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CircleNavButtonProps {
  to: string;
  label: string;
  imageSrc: string;
}

export const CircleNavButton = ({ 
  to, 
  label,
  imageSrc
}: CircleNavButtonProps) => {
  
  return (
    <Link 
      to={to} 
      className="group relative w-28 h-28 flex-shrink-0"
    >
      <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-105">
        <img 
          src={imageSrc} 
          alt={label} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 text-sm font-bold leading-tight text-white p-2 text-center">
        {label}
      </div>
    </Link>
  );
};
