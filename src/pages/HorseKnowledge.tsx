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
    question: "What will I receive on successful completion of the course?",
    answer: "You will receive a Certificate of Completion from BeHorseSavvy."
  },
  {
    question: "Can international students study this course?",
    answer: "YES! All of our courses are designed to be studied anywhere in the world and we have many international students studying with us."
  }
];

// Add font preloading
const preloadFonts = () => {
  // Only preload fonts if there are valid fonts to load
  // This prevents unnecessary network requests for non-existent fonts
  const fontLinks: Array<Record<string, string>> = [
    // Only uncomment and use actual font files that exist in your project
    // { rel: 'preload', href: '/fonts/your-main-font.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  ];
  
  if (fontLinks.length === 0) return;
  
  fontLinks.forEach(link => {
    const linkElement = document.createElement('link');
    Object.entries(link).forEach(([key, value]) => {
      linkElement.setAttribute(key, value);
    });
    document.head.appendChild(linkElement);
  });
};

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function HorseKnowledge() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Preload fonts
    preloadFonts();

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
                Horse Knowledge Part One & Two
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                The BHS Challenge Award Horse Knowledge (Parts One & Two) offers a complete foundation in horse care. Part One focuses on safety, behaviour, and handling basics, while Part Two advances to health and management. Each part includes interactive modules with quizzes, taking 30 hours to complete. Perfect for horse owners and enthusiasts, with BHS certification upon completion.
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
                    document.getElementById('part-two')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px]"
                >
                  Part Two
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
            <h2 className="text-4xl font-bold mb-6 text-white">Horse Knowledge Part One</h2>
          </motion.div>
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Course Overview</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              {...getAnimationProps()}
              variants={fadeIn}
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
              {...getAnimationProps()}
              variants={fadeIn}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Course Features
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Learn at your own pace</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Expert tutor support</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Fully online, access from anywhere</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              {...getAnimationProps()}
              variants={fadeIn}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Course Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Professional certification</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Lifetime access to materials</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Flexible payment options</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Syllabus for Part One */}
          <motion.div {...getAnimationProps()} className="max-w-2xl mx-auto mt-16 mb-12">
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 rounded-xl shadow-xl p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-serif text-2xl font-bold mb-8 text-center text-white relative">
                <span className="relative z-10 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[1px] after:bg-red-500/40">Full Syllabus: Part One</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Introduction and Yard Safety",
                  "Horse Behaviour",
                  "Horse Welfare",
                  "Feeding",
                  "Stable Care",
                  "Grooming",
                  "Identification and points of the horse",
                  "Grooming Kit",
                  "Points of the Horse",
                  "Session Plans Horse Knowledge Part 1"
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

      {/* Who is the Course For */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Is This Course Right For You?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              This course is perfect for anyone who wants to learn about horse care, no matter your experience level.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              {...getAnimationProps()}
              variants={fadeIn}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">New Horse Owners</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Just got a horse or thinking about getting one? This course will teach you everything you need to know to get started.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...getAnimationProps()}
              variants={fadeIn}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Complete Beginners</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Never worked with horses before? No problem! We'll guide you through everything step by step.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...getAnimationProps()}
              variants={fadeIn}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Home Educated Children</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Perfect for home education! Learn about horses in a fun, engaging way that fits your learning schedule.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...getAnimationProps()}
              variants={fadeIn}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Future Horse Professionals</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Thinking about a career with horses? This course is your first step towards professional horse care and management.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificate and Graph Images */}
      <section className="py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.div
              {...getAnimationProps()}
              className="relative w-full aspect-[4/3] max-w-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/Untitled design (11).png" 
                alt="Course Certificate" 
                className="w-full h-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Snapshot */}
      <section className="py-12 sm:py-16 md:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Course Snapshot</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              {...getAnimationProps()}
              className="space-y-4"
            >
              <div className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Duration</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">30 hours of self-paced learning</p>
                  </div>
                </div>
              </div>
              <div className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Support</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Optional tutor call included</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              {...getAnimationProps()}
              className="space-y-4"
            >
              <div className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Format</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Interactive modules with quizzes</p>
                  </div>
                </div>
              </div>
              <div className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Study Anywhere</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">All courses are designed to be studied anywhere in the world</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tutor Images */}
      <section className="py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Meet Your Tutor</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <motion.div
            {...getAnimationProps()}
            className="flex justify-center"
          >
            <div className="relative max-w-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/P1000200.jpg" 
                alt="Penny Pleasant - Tutor Images" 
                className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tutor Introduction */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto"
          >
            <div className="group relative backdrop-blur-sm bg-white/10 p-10 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-3xl font-bold text-white mb-4">Penny Pleasant</h3>
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed">
                  These courses are designed by The British Horse Society (BHS) and are delivered online by Penny, with the added benefit of optional booked phone calls and ongoing support throughout.
                  You will receive a BHS Horse Knowledge certificate on completion of Part 1 and on completion of Part 2 a BHS Horse Knowledge Part 2 certificate.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
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

      {/* Part Two Section */}
      <section id="part-two" className="py-16 bg-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Horse Knowledge Part Two</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8" />
            <p className="text-lg text-white/80 max-w-4xl mx-auto mb-12">
              Part two further builds on your understanding and confidence by looking more in-depth at what you need to know when caring for a horse.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <motion.div
                {...getAnimationProps()}
                className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-6">What You'll Learn</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Horse behaviour</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Passports and microchips</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Signs of health</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Disease prevention</span>
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
                  <h3 className="font-serif text-2xl font-semibold text-white mb-6">Additional Topics</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Feeding</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Field checks</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Poisonous plants</span>
                    </li>
                    <li className="flex items-start group/item">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                      <span className="text-white/90 group-hover/item:text-white transition-colors">Parts of the saddle and bridle</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Syllabus for Part Two */}
            <motion.div {...getAnimationProps()} className="max-w-2xl mx-auto mt-8 mb-12">
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

            <Button 
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-red-600 text-white hover:bg-red-700 px-8 py-6 text-lg font-medium transition-colors duration-300 mt-4"
            >
              Enroll in Part Two
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Get Started Now CTA Section */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-blue-950 to-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Get Started Now!</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Choose your course and begin your journey into horse knowledge with expert guidance
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">Horse Knowledge</h3>
                  <h4 className="font-serif text-xl font-bold text-white mb-5">Part One</h4>
                  <p className="font-serif text-5xl font-bold text-red-500 mb-3">£97</p>
                  <div className="bg-white/5 rounded-lg p-4 mb-8">
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Foundation in horse care</span>
                      </li>
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Self-paced online learning</span>
                      </li>
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>BHS Certificate upon completion</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium">
                    Enroll in Part One
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              {...getAnimationProps()}
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
                        <span>BHS Certificate upon completion</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium">
                    Enroll in Part Two
                  </Button>
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