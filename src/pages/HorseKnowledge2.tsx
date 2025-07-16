import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, BookOpen, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { BackToHome } from "@/components/BackToHome";

// Lazy load FAQ component
const FaqItem = lazy(() => import("@/components/FaqItem"));

// Loading fallback for lazy components
const LoadingFallback = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-white/10 rounded-lg mb-4"></div>
  </div>
);

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

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
    question: "What will I receive on successful completion of the course?",
    answer: "You will receive a BHS Horse Knowledge Part 2 Certificate from the British Horse Society."
  },
  {
    question: "Can international students study this course?",
    answer: "YES! All of our courses are designed to be studied anywhere in the world and we have many international students studying with us."
  }
];

export default function HorseKnowledge2() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useIsMobile();
  
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
  
  // Memoize animation props
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
      variants: fadeInUp,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    };
  }, [isMobile, prefersReducedMotion]);

  // Memoize handlers
  const handleFaqToggle = useCallback((index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  }, []);

  const handleEnrollClick = useCallback(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <BackToHome />
      
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950" />
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/80 to-blue-950/95" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            animate="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              whileInView: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
            >
              Horse Knowledge Part 2
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
            >
              Part two further builds on your understanding and confidence by looking more in-depth at what you need to know when caring for a horse.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={handleEnrollClick}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-medium rounded-lg transition-colors duration-300"
              >
                Enroll Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet Your Tutor Section */}
      <section className="py-16 sm:py-24 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Meet Your Tutor
            </h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-2xl max-w-2xl mx-auto mb-12">
              <img 
                src="/P1000306 (1).jpg" 
                alt="Penny Pleasant - Your Tutor" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
          </div>
            
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <h3 className="font-serif text-3xl font-bold text-white mb-2">Penny Pleasant</h3>
                <p className="text-xl text-red-400 font-semibold mb-8">BHS Professional Accredited Coach</p>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="text-white font-semibold mb-4 text-lg">Qualifications:</h4>
                    <ul className="space-y-2 text-white/90">
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Pony Club Accredited Trainer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Pony Club Assessor</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>BSPS Course Builder</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Panel Judge</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-4 text-lg">Professional Standards:</h4>
                    <ul className="space-y-2 text-white/90">
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Trained in relative adjustment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Fully Insured</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>DBS Checked</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        <span>Safeguarding Certified</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Snapshot */}
      <section className="py-12 sm:py-16 md:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Course Overview</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  What You'll Learn
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Complete horse care and management</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Horse handling skills</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Essential safety procedures</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Course Format
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Interactive modules with quizzes</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Self-paced learning</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Certificate upon completion</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Course Details
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">30 hours of content</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Lifetime access</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">BHS certification</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Is This Course Right For You */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Is This Course Right For You?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              This advanced course is designed for those who have completed Part 1 or have equivalent horse knowledge and want to deepen their understanding.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Experienced Horse Owners</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Looking to enhance your horse care knowledge? This course builds on your existing experience with advanced topics and techniques.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Part 1 Graduates</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Completed Part 1? Take your knowledge to the next level with this comprehensive follow-up course.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Aspiring Professionals</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Planning a career in horse care? This course provides the advanced knowledge needed for professional development.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ChevronRight className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Knowledge Seekers</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Want to deepen your understanding of horse care? This course offers comprehensive coverage of advanced topics.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Part Two Photo */}
      <section className="py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="relative w-full aspect-[4/3] max-w-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/Untitled design (19).png" 
                alt="Horse Knowledge Part Two" 
                className="w-full h-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Course Content</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 rounded-xl shadow-xl p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-serif text-2xl font-bold mb-8 text-center text-white relative">
                <span className="relative z-10 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[1px] after:bg-red-500/40">Full Syllabus: Part Two</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Coach Guidance Horse Knowledge Part 2",
                  "Advanced Horse Behaviour",
                  "Passports and Microchips",
                  "Health Indicators and Assessment",
                  "Disease Prevention and Healthcare",
                  "Horse Care",
                  "Advanced Feeding Techniques",
                  "Field Management and Safety",
                  "Poisonous Plants Identification",
                  "Feeding",
                  "Field checks",
                  "Parts of tack",
                  "Tack and Equipment Knowledge",
                  "Parts of the Bridle",
                  "Parts of the Saddle",
                  "Parts of the Saddle and Bridle",
                  "Expert Horse Management",
                  "Horse Knowledge Part 2 Coach Resources"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                    <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                      <span className="text-red-500">●</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Course Features</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Experienced Horse Owners</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Looking to enhance your horse care knowledge? This course builds on your existing experience with advanced topics and techniques.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Part 1 Graduates</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Completed Part 1? Take your knowledge to the next level with this comprehensive follow-up course.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Aspiring Professionals</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Planning a career in horse care? This course provides the advanced knowledge needed for professional development.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-blue-950 to-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Get Started Now!</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Begin your advanced horse knowledge journey with expert guidance
            </p>
          </motion.div>
          
          <div className="max-w-md mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">Horse Knowledge</h3>
                  <h4 className="font-serif text-xl font-bold text-white mb-5">Part Two</h4>
                  <p className="font-serif text-5xl font-bold text-red-500 mb-3">£97</p>
                  <div className="bg-white/5 rounded-lg p-4 mb-8">
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Advanced horse care knowledge</span>
                      </li>
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Building on Part One foundations</span>
                      </li>
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Receives a BHS Horse Knowledge 2 certificate</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <Suspense fallback={<LoadingFallback />}>
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === idx}
                  onToggle={() => handleFaqToggle(idx)}
                />
              ))}
            </Suspense>
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 