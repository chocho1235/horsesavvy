import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ChevronDown, ArrowLeft } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import MeetYourTutor from "@/components/MeetYourTutor";

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
    question: "Will this course help me prepare for the BHS Stage 1 exam?",
    answer: "Yes, this course is specifically designed to cover the entire BHS Stage 1 syllabus and prepare you for the official examination."
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

export default function BHSStage1Theory() {
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
      <section className="relative bg-blue-950 py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/80 to-blue-950/95" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div {...getAnimationProps()}>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
              >
                BHS Stage 1 Theory
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                Whichever route you plan to take with horses, whether you wish to start a career as a groom, be a dedicated owner, or simply want to further your knowledge about the general care of horses.
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
                  Penny Pleasant delivers official British Horse Society (BHS) courses, meticulously designed by the BHS and delivered online for your convenience. As part of our online offering, you'll benefit from pre-booked one-to-one telephone support sessions.
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed">
                  Upon successful completion of the Online Stage 1 Theory course, you will be eligible to book the Stage 1 Care Examination at a BHS-approved centre.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MeetYourTutor getAnimationProps={getAnimationProps} fadeIn={fadeIn} />

      {/* Course Overview */}
      <section className="py-6 sm:py-8 md:py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Course Overview</h2>
          </motion.div>
          
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto mb-6 sm:mb-8"
          >
            <div className="group relative backdrop-blur-sm bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                  This training course has been designed to correspond with the British Horse Society Stage 1 Care syllabus. In total, there are 8 separate topics covering all the relevant information needed to help you gain the BHS Stage 1 qualification. Plus, we also include 2 bonus subjects to ensure you are fully prepared for your first BHS exam.
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed">
                  Once subscribed, you will be provided with full access to all of the online course material for 6 months. This enables you the time and flexibility needed to study in your own time, at your pace.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Course Image */}
          <motion.div 
            {...getAnimationProps()}
            className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8"
          >
            <div className="relative w-full max-w-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent rounded-xl" />
              <img 
                src="/image.png" 
                alt="BHS Stage 1 Theory Course" 
                className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
          </motion.div>
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
              Equine Knowledge BHS Stage 1 Training Course is suitable for:
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
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Anyone training for the BHS Stage 1 exam.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Equestrian college students.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Novice horse-owners & riding school clients.</span>
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
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">D & C test Pony Club members.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Anyone wanting to learn about the general care of horses.</span>
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
            <h2 className="text-3xl font-bold mb-4 text-white">BHS Stage One Syllabus</h2>
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
                  This Stage 1 course is online. It delivers all the theory and preparation for your Stage 1 Care exam.
                </p>
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed mb-4">
                  Once completed, you can book your BHS exam at any Approved Equestrian Centre.
                </p>
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed mb-4">
                  Please use the postcode checker: If you are inside the radius, you can book directly with Penny any 1-to-1 coaching sessions in preparation for your Flatwork exam at the BHS approved Equestrian Centre.
                </p>
                <p className="text-white/90 text-lg group-hover:text-white leading-relaxed">
                  Alternatively, you can book your ride training at your local BHS approved centre.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tutor Images */}
      <section className="py-8 sm:py-12 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...getAnimationProps()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/Screenshot_20250506_132854_Chrome~3.jpg" 
                alt="BHS Approved Instructor" 
                className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/DSC_9397.jpg" 
                alt="BHS Training" 
                className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
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
                  These courses are designed by The British Horse Society (BHS) and are delivered online by Penny, with the added benefit of optional booked phone calls.
                  This is a preparation course for the BHS Stage 1 exam, which you will need to book separately at an approved center.
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
                  <p className="font-serif text-lg font-medium text-white/80 mb-5">One single payment for 10 months access</p>
                  <p className="font-serif text-5xl font-bold text-red-500 mb-8">£85.00</p>
                  
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