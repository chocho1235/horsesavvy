import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ChevronDown, ArrowLeft } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import MeetYourTutor from "@/components/MeetYourTutor";
import FaqItem from "@/components/FaqItem";

const faqs = [
  {
    question: "When does the course start and finish?",
    answer: "You have 10 months access starting from the date of enrollment."
  },
  {
    question: "What happens after I have enrolled?",
    answer: "You'll receive login details to access the course material and can schedule any support calls directly with Penny."
  },
  {
    question: "How does studying via distance learning work?",
    answer: "You study online at your own pace and practice with horses either at your own yard or a local BHS centre. Optional in-person support is available."
  },
  {
    question: "Are there any other costs associated with the course?",
    answer: "You will need to book and pay separately for your official BHS assessments at an approved centre."
  },
  {
    question: "Will this course help me prepare for the BHS Stage 1 Practical exam?",
    answer: "Yes. The course is mapped directly to the BHS syllabus and designed specifically to prepare you for the Care and Ride practical exams."
  },
  {
    question: "Can international students study this course?",
    answer: "Yes. You can study from anywhere, but you must attend a BHS-approved centre for the practical assessments."
  }
];

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function BHSStage1Practical() {
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

  const handleFaqToggle = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  const handleEnrollClick = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
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
                BHS Stage 1 Practical
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                Essential horse care and riding skills with expert guidance.
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
                  Penny Pleasant delivers official British Horse Society (BHS) Stage 1 Practical training, tailored for beginners and delivered with professional support. This hands-on learning experience helps you prepare for both Stage 1 Care and Stage 1 Ride practical assessments.
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed">
                  Upon successful completion of your BHS Stage 1 Practical training, you will be ready to book the BHS Stage 1 Care and Ride Assessments at a BHS-approved equestrian centre.
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
                  This training course corresponds with the British Horse Society Stage 1 Practical syllabus, covering all practical aspects of the exam — from groundwork and stable management to flatwork riding. The course is divided into comprehensive modules that ensure you're fully prepared for both the Care and Ride assessments.
                </p>
                <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed">
                  Once enrolled, you'll have 10 months of access to all course materials and support. This gives you ample time to practice and perfect your practical skills at your own pace, with guidance available when you need it.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Course Image */}
          <motion.div 
            {...getAnimationProps()}
            className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8"
          >
            <div className="w-full max-w-4xl">
              <motion.div 
                {...getAnimationProps()}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <img 
                  src="/Screenshot_20250506_132854_Chrome~3.jpg" 
                  alt="BHS Stage 1 Practical Course Overview" 
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '600px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
              </motion.div>
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
              The BHS Stage 1 Practical Training Course is suitable for:
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
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Anyone preparing for the BHS Stage 1 practical assessments.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Aspiring grooms and stable hands.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">New horse owners seeking practical skills.</span>
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
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Riding school clients wanting to advance their skills.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Those starting their equestrian career journey.</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">International students seeking BHS qualifications.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-12 sm:py-16 md:py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Syllabus</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
              The course covers all practical aspects required for the BHS Stage 1 Care and Ride assessments:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Care Section */}
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 text-white">Stage 1 Care</h3>
                <ul className="space-y-3">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Safe handling and approach to horses</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Grooming and basic health checks</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Tacking up and equipment care</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Stable management and yard safety</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Basic feeding and watering</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Ride Section */}
            <motion.div
              {...getAnimationProps()}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-4 text-white">Stage 1 Ride</h3>
                <ul className="space-y-3">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Mounting and dismounting safely</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Walk and halt transitions</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Trot work and diagonals</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Basic canter work</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Arena figures and steering</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Syllabus Link */}
      <section className="py-6 sm:py-8 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center"
          >
            <a 
              href="https://www.bhs.org.uk/bhs-professional-qualifications-and-careers/bhs-qualifications-and-stages/stage-1/stage-1-care-syllabus/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white text-base sm:text-lg inline-flex items-center gap-2 transition-colors duration-300"
            >
              If you would like to view the full syllabus click here
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Course Pricing</h2>
          </motion.div>
          
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto"
          >
            <div className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">BHS Stage 1 Practical Course</h3>
                <p className="text-white/80 mb-6">10 months access to all course materials</p>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-6">£97</div>
                <p className="text-white/80 mb-6">Receives a BHS Horse Knowledge certificate</p>
                <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                  Enroll Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...getAnimationProps()}
            variants={fadeIn}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          </motion.div>
          
          <motion.div
            {...getAnimationProps()}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FaqItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === idx}
                  onToggle={() => handleFaqToggle(idx)}
                  animationProps={getAnimationProps()}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 