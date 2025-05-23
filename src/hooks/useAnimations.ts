import { useState, useEffect, useMemo } from "react";
import { useIsMobile } from "./use-mobile";

export const useAnimations = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationProps = useMemo(() => {
    if (isMobile || prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      };
    }
    
    return {
      initial: "initial",
      whileInView: "whileInView",
      viewport: { once: true, margin: "-50px" },
      variants: {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 }
      },
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    };
  }, [isMobile, prefersReducedMotion]);

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 }
  };

  return {
    animationProps,
    fadeIn,
    prefersReducedMotion,
    isMobile
  };
}; 