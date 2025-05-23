import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showEnrollButton?: boolean;
  onEnrollClick?: () => void;
  bgColor?: string;
}

export const PageHeader = ({
  title,
  subtitle,
  backgroundImage,
  showEnrollButton = false,
  onEnrollClick,
  bgColor = "bg-blue-950"
}: PageHeaderProps) => {
  return (
    <section className={`relative ${bgColor} py-16 sm:py-24 md:py-32 overflow-hidden`}>
      {backgroundImage && (
        <>
          <div className={`absolute inset-0 bg-[url('${backgroundImage}')] bg-cover bg-center opacity-15`} />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/80 to-blue-950/95" />
        </>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                {subtitle}
              </motion.p>
            )}
            {showEnrollButton && onEnrollClick && (
              <motion.div className="flex justify-center gap-4">
                <Button 
                  onClick={onEnrollClick}
                  className="bg-red-600 text-white hover:bg-red-700 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px]"
                >
                  Enroll Now
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 