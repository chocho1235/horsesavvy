import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle, 
}) => (
  <div className="group">
    <button
      onClick={onToggle}
      className="w-full text-left backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-xl font-semibold text-white group-hover:text-red-500 transition-colors pr-4">{question}</h3>
        <motion.span 
          className="text-2xl text-red-500 flex-shrink-0 w-8 h-8 flex items-center justify-center"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          +
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeInOut" }
            }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-white/20 text-white/80 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  </div>
);

export default React.memo(FaqItem); 