import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ChevronDown, ArrowLeft } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function BHSStage1Theory() {
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
    // Disable animations on mobile devices
    if (window.innerWidth < 768 || prefersReducedMotion) {
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
    <div className="min-h-[100dvh] bg-gradient-to-b from-blue-950 to-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      
      {/* Back Home Button */}
      <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
        <Link to="/">
          <Button 
            variant="outline" 
            className="bg-blue-900/80 hover:bg-blue-800 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span className="font-medium">Back Home</span>
          </Button>
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950" />
        <div className="absolute inset-0 bg-[url('/BHS-Acc-Pro-Coach-logo-COL.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-800/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div {...getAnimationProps()} variants={fadeIn}>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
              >
                BHS Stage 1 Theory
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                Whichever route you plan to take with horses, whether you wish to start a career as a groom, be a dedicated owner, or simply want to further your knowledge about the general care of horses - then this course is your very first step.
              </motion.p>
              <motion.div 
                className="flex justify-center gap-4"
              >
                <Button 
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-red-600 text-white hover:bg-red-700 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px]"
                >
                  Enroll Now
                </Button>
                <Button 
                  onClick={() => {
                    document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px]"
                >
                  View Syllabus
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-12 sm:py-16 md:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Course Overview</h2>
          </motion.div>
          
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed mb-6">
                  This training course has been designed to correspond with the British Horse Society Stage 1 Care syllabus. In total, there are 8 separate topics covering all the relevant information needed to help you gain the BHS Stage 1 qualification. Plus, we also include 2 bonus subjects to ensure you are fully prepared for your first BHS exam.
                </p>
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed">
                  Once subscribed, you will be provided with full access to all of the online course material for 2 years. This enables you the time and flexibility needed to study in your own time, at your pace.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Who is this course for */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Who Is This Course For?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Equine Knowledge BHS Stage 1 Training Course is suitable for:
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Anyone training for the BHS Stage 1 exam.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Equestrian college students.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Novice horse-owners & riding school clients.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">D & C test Pony Club members.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Anyone wanting to learn about the general care of horses.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section id="syllabus" className="py-16 bg-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">BHS Stage One Subjects</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold text-white mb-6">Stage 1: Care A</h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">About the British Horse Society.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Exam Techniques & Tips.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">1. Responsibilities of Working on a Yard.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">2. Mucking Out & Yard Maintenance.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">3. Grooming & the Horse's Hooves.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">4. Horse Description, Health & Behaviour.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">5. Rugs.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold text-white mb-6">Stage 1: Care B</h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">6. Saddlery & Tacking Up.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">7. Handling the Horse.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">8. Feeding & Watering the Horse.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto"
          >
            <div className="group relative backdrop-blur-sm bg-white/10 p-10 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-bold text-white mb-4">Please Read</h3>
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed mb-4">
                  This course is intended for training purposes only. If you wish to obtain the BHS Stage 1 Care qualification you will need to sit and pass each exam at a recognised BHS exam centre. To find relevant dates and centres of where to take this exam, visit the British Horse Society website.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-blue-950 to-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Enroll Today</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Get access to comprehensive training material to prepare for your BHS Stage 1 qualification
            </p>
          </motion.div>
          
          <div className="max-w-md mx-auto">
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">Course Price</h3>
                  <p className="font-serif text-lg font-medium text-white/80 mb-5">One single payment for 2 years access</p>
                  <p className="font-serif text-5xl font-bold text-red-500 mb-8">£85.00</p>
                  
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium">
                    Enroll Now
                  </Button>
                  
                  <p className="text-white/80 mt-4 text-sm">
                    Still not sure? Sign up for our <span className="text-red-400 underline">Free Trial</span> and get a taster of what we offer.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 