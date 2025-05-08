import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle, ArrowLeft, Sparkles, GraduationCap, Heart, Clock } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function BeHorseSavvy() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Simple animation props with subtle scroll trigger
  const getAnimationProps = () => {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';
    
    // Disable animations on mobile devices or if reduced motion is preferred
    if ((isBrowser && window.innerWidth < 768) || prefersReducedMotion) {
      return { initial: "initial", whileInView: "whileInView", variants: fadeIn };
    }
    
    return {
      initial: "initial",
      whileInView: "whileInView",
      viewport: { once: true, margin: "-50px" },
      variants: fadeIn,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    };
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-black to-black text-white">
      <ContactHeader bgColor="bg-black" />
      
      {/* Back Home Button */}
      <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
        <Link to="/">
          <Button 
            variant="outline" 
            className="bg-black/80 hover:bg-black text-gold border-gold/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span className="font-medium">Back Home</span>
          </Button>
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-black py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-gold/40">
                <img 
                  src="/home ed.png" 
                  alt="Home Education Equestrians" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.div {...getAnimationProps()} variants={fadeIn}>
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-gold"
                >
                  Home Education Equestrians
                </motion.h1>
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gold/90 max-w-4xl mx-auto md:mx-0 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
                >
                  Educational horse sessions designed for home-educated children, delivered by BeHorseSavvy
                </motion.p>
                <motion.div 
                  className="flex justify-center md:justify-start gap-4"
                >
                  <Button 
                    onClick={() => {
                      // You can add an email or contact form link here
                      window.location.href = "mailto:Penelopepleasant@gmail.com?subject=Home%20Education%20Equestrians%20Enquiry";
                    }}
                    className="bg-gold text-black hover:bg-gold/90 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px] font-semibold"
                  >
                    Sign Up Today
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-gold">Why Choose BeHorseSavvy?</h2>
            <p className="text-xl text-gold/80 max-w-2xl mx-auto">
              Here's why you should sign your child up today:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {/* Benefit 1 */}
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-black/90 p-8 rounded-lg border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start mb-4">
                  <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4 mt-1">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-2">Fun & Educational</h3>
                    <p className="text-gold/70">
                      Informative, educational sessions that are fun and designed to inspire, support and encourage the pony enthusiast.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-black/90 p-8 rounded-lg border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start mb-4">
                  <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4 mt-1">
                    <Heart className="w-6 h-6 text-gold" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-2">Community & Confidence</h3>
                    <p className="text-gold/70">
                      Improved motivation and confidence through being part of a community with those that share the same aspirations, offering the opportunity to share ideas and experiences.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-black/90 p-8 rounded-lg border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start mb-4">
                  <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4 mt-1">
                    <GraduationCap className="w-6 h-6 text-gold" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-2">Reduced Pressure</h3>
                    <p className="text-gold/70">
                      Reduced pressure due to not being core GCSE subject matter thus helping to keep your child engaged.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Benefit 4 */}
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-black/90 p-8 rounded-lg border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-start mb-4">
                  <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4 mt-1">
                    <Clock className="w-6 h-6 text-gold" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gold mb-2">Fully Remote</h3>
                    <p className="text-gold/70">
                      Fully remote to fit in around commitments, reducing travel time and expenses.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Call to Action */}
          <motion.div 
            {...getAnimationProps()}
            className="text-center mt-16"
          >
            <div className="max-w-2xl mx-auto p-8 backdrop-blur-sm bg-black/90 border border-gold/30 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gold">Ready to Get Started?</h3>
              <p className="text-gold/80 mb-6">
                Contact us today to learn more about our Home Education Equestrians program and how it can benefit your child.
              </p>
              <Button 
                onClick={() => {
                  window.location.href = "mailto:Penelopepleasant@gmail.com?subject=Home%20Education%20Equestrians%20Enquiry";
                }}
                className="bg-gold hover:bg-gold/90 text-black py-3 px-8 rounded-md text-lg shadow-md font-semibold"
              >
                Contact Penny
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 