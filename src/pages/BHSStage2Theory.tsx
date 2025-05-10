import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ChevronDown, ArrowLeft } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "When does the course start and finish?",
    answer: "The course starts now! As soon as you have enrolled you have access to the course and can start straight away."
  },
  {
    question: "What happens after I have enrolled?",
    answer: "You will have immediate access to the course material and can begin to study the course straight away!"
  },
  {
    question: "How does studying via distance learning work?",
    answer: "Once you have enrolled on the course, you can begin steadily working through the modules completing the learning activities as you progress. You work at your own pace fitting in your studies around your personal commitments."
  },
  {
    question: "Are there any other costs associated with the course?",
    answer: "There are no further costs associated with this course - everything you need to pass the course is included in the fee you pay when you enrol."
  },
  {
    question: "Will this course help me prepare for the BHS Stage 2 exams?",
    answer: "Yes, this course is specifically designed to cover the entire BHS Stage 2 Care and Lungeing syllabus and prepare you for the official examinations."
  },
  {
    question: "Can international students study this course?",
    answer: "YES! All of our courses are designed to be studied anywhere in the world and we have many international students studying with us."
  }
];

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function BHSStage2Theory() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="min-h-[100dvh] bg-gradient-to-b from-blue-950 to-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      
      {/* Back Home Button */}
      <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
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
      
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950" />
        <div className="absolute inset-0 bg-[url('/BHS-Acc-Pro-Coach-logo-COL.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-800/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div {...getAnimationProps()} variants={fadeIn}>
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-white"
              >
                BHS Stage 2 Theory
              </motion.h1>
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2 sm:px-4"
              >
                Welcome to Equine Knowledge BHS Stage 2 Care & Stage 2 Lungeing Preparation Course.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
              >
                <Button 
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-red-600 text-white hover:bg-red-700 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto h-[44px] sm:h-[52px] md:h-[60px]"
                >
                  Enroll Now
                </Button>
                <Button 
                  onClick={() => {
                    document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto h-[44px] sm:h-[52px] md:h-[60px]"
                >
                  View Syllabus
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction and Explanation */}
      <section className="py-6 sm:py-8 md:py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Introduction and Explanation</h2>
          </motion.div>
          
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto mb-6 sm:mb-8"
          >
            <div className="group relative backdrop-blur-sm bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                  British Horse Society Courses with Penny Pleasant
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                  Penny Pleasant delivers official British Horse Society (BHS) courses, meticulously designed by the BHS and delivered online for your convenience.
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                  This course builds upon the knowledge gained in BHS Stage 1 Theory, taking your understanding to the next level. While Stage 1 focuses on basic horse care and handling, Stage 2 delves deeper into advanced care techniques and introduces lungeing skills. You should have completed Stage 1 or have equivalent knowledge before starting this course.
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed">
                  Upon successful completion of the Online Stage 2 Theory course, you will be eligible to book the Stage 2 Care and Lungeing Examinations at a BHS-approved centre.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Progression Diagram */}
      <section className="py-12 sm:py-16 md:py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Your BHS Journey</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              Understanding your progression through the BHS qualification pathway
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              {...getAnimationProps()}
              className="relative"
            >
              {/* Connection Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600" />
              
              {/* Stage 1 Box */}
              <div className="relative mb-16">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="group relative backdrop-blur-sm bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 max-w-xl ml-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <div className="relative">
                    <h3 className="font-serif text-2xl font-semibold text-white mb-4">BHS Stage 1</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                        <p className="text-white/90 text-sm sm:text-base">Foundation in basic horse care and handling</p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                        <p className="text-white/90 text-sm sm:text-base">Essential safety and welfare knowledge</p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                        <p className="text-white/90 text-sm sm:text-base">Perfect for everyone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stage 2 Box */}
              <div className="relative">
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center z-10">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="group relative backdrop-blur-sm bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 max-w-xl ml-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <div className="relative">
                    <h3 className="font-serif text-2xl font-semibold text-white mb-4">BHS Stage 2</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                        <p className="text-white/90 text-sm sm:text-base">Advanced care techniques and lungeing skills</p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                        <p className="text-white/90 text-sm sm:text-base">Professional grooming and horse management</p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                        <p className="text-white/90 text-sm sm:text-base">Ideal for aspiring professionals and career development</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Box */}
              <div className="mt-16">
                <div className="group relative backdrop-blur-sm bg-white/10 p-6 sm:p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 max-w-3xl ml-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <div className="relative">
                    <h3 className="font-serif text-2xl font-semibold text-white mb-4">Career Benefits</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                          <Users className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="text-white/90 text-sm">Professional Recognition</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                          <BookOpen className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="text-white/90 text-sm">Industry Knowledge</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                          <Globe className="w-6 h-6 text-red-500" />
                        </div>
                        <p className="text-white/90 text-sm">Career Opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who is this course for */}
      <section className="py-12 sm:py-16 md:py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Who Is This Course For?</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12">
              Equine Knowledge BHS Stage 2 Training Course is suitable for:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-4 sm:p-6 md:p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Anyone training towards the BHS stage 2 qualification.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Those who have gained the BHS stage 1 qualification.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Anyone who has completed the Equine Knowledge BHS Stage 1 Course.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-4 sm:p-6 md:p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Equine college students.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">C & B Pony Club Members.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Intermediate horse-owners & riding school clients.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Those wanting to further their knowledge about horse care.</span>
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
            <h2 className="text-3xl font-bold mb-4 text-white">BHS Stage Two Syllabus</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold text-white mb-6">Stage 2: Care A</h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">1. Role, Rights & Responsibilities of an Assistant Groom.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">2. Fitting Tack & Boots.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">3. Travelling the Horse.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">4. The Horse's Behaviour.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">5. Feeding.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">6. Horse Anatomy.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">7. Fitness.</span>
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
                <h3 className="font-serif text-2xl font-semibold text-white mb-6">Stage 2: Care B</h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">8. Horse Health.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">9. Preparing a Horse for Presentation.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">10. Care of the Horse's Hooves.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">11. The Horse's Environment.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            {...getAnimationProps()}
            className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <h3 className="font-serif text-2xl font-semibold text-white mb-6">Stage 2: Lungeing the Horse</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-white mb-4">About lungeing:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Reasons for lungeing.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Factors affecting the lungeing process.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Lungeing technique problems.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Equipment required for lungeing.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-medium text-white mb-4">Fitting & removing lunge equipment:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to put on and fit a lunge cavesson.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to remove a lunge cavesson.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to put on side-reins.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to fit side-reins.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to remove side-reins.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-medium text-white mb-4">The roller:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to put on a roller.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to remove a roller.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to secure the stirrups on the saddle.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-medium text-white mb-4">Lungeing the horse:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Handling the lunge line:</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Handling the line before lungeing the horse.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to coil the lunge line.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to fold the lunge line.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Guidelines for handling the lunge line.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">How to lunge a horse for exercise.</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Evaluating the lunge session.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
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
                  This course is intended for training purposes only. If you wish to obtain the BHS Stage 2 Care or BHS Stage 2 Lungeing qualifications you will need to sit and pass each exam at a recognised BHS exam centre. To find relevant dates and centres of where to take each exam, visit the British Horse Society website.
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
              Get access to comprehensive training material to prepare for your BHS Stage 2 qualification
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
                  <p className="font-serif text-lg font-medium text-white/80 mb-5">One single payment for 10 months access</p>
                  <p className="font-serif text-5xl font-bold text-red-500 mb-8">£97.00</p>
                  
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                {...getAnimationProps()}
                className="group"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-xl font-semibold text-white group-hover:text-red-500 transition-colors pr-4">{faq.question}</h3>
                    <motion.span 
                      className="text-2xl text-red-500 flex-shrink-0 w-8 h-8 flex items-center justify-center"
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      +
                    </motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
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
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 