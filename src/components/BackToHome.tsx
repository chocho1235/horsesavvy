import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface BackToHomeProps {
  className?: string;
}

export function BackToHome({ className = "" }: BackToHomeProps) {
  return (
    <div className={`absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px] ${className}`}>
      <Link to="/courses">
        <Button 
          variant="outline" 
          className="bg-blue-900/80 hover:bg-blue-800 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="font-medium">Back to Courses</span>
        </Button>
      </Link>
    </div>
  );
} 