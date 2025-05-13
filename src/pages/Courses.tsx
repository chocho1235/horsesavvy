import { Link } from "react-router-dom";
import { ContactHeader } from "@/components/ContactHeader";
import { ChevronLeft, Clock, ChevronRight, Award, CheckCircle, User, Globe, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const onlineCourses = [
  {
    id: "horse-knowledge-part-one",
    title: "Horse Knowledge Part One",
    description: "Essential foundation in horse care, handling, and management for beginners.",
    price: "£97",
    duration: "30 hours",
    level: "Beginner"
  },
  {
    id: "horse-knowledge-part-two",
    title: "Horse Knowledge Part Two",
    description: "Advanced horse care knowledge building on the foundations from Part One.",
    price: "£97",
    duration: "30 hours",
    level: "Intermediate"
  },
  {
    id: "bhs-stage-1-theory",
    title: "BHS Stage 1 Theory",
    description: "Official preparation for BHS Stage 1 exams with complete syllabus coverage.",
    price: "£97",
    duration: "30 hours",
    level: "Beginner"
  },
  {
    id: "bhs-stage-2-theory",
    title: "BHS Stage 2 Theory",
    description: "Comprehensive preparation for BHS Stage 2 Care and Lungeing qualifications.",
    price: "£97",
    duration: "30 hours",
    level: "Intermediate"
  }
];

const practicalCourses = [
  {
    id: "practical-horse-handling",
    title: "Practical Horse Handling",
    description: "Hands-on training with real horses to develop essential handling skills.",
    price: "£195",
    duration: "12 hours",
    level: "Beginner to Intermediate"
  },
  {
    id: "bhs-riding-practical",
    title: "BHS Riding Practical",
    description: "Guided practical riding sessions to prepare for BHS riding assessments.",
    price: "£245",
    duration: "16 hours",
    level: "Intermediate"
  }
];

// UK postcodes covered for practical training
const validPostcodeAreas = ["RG", "OX", "SL", "HP", "GU"];

// Subtle animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

const HorseShoe = () => (
  <img src="/horse shoe.svg" alt="Horseshoe icon" className="w-12 h-12 object-contain" />
);

const Courses = () => {
  const [postcodeResult, setPostcodeResult] = useState<null | { available: boolean; message: string }>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [checkedOnce, setCheckedOnce] = useState(false);
  const postcodeInputRef = useRef<HTMLInputElement>(null);
  
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
  
  const checkPostcode = () => {
    if (!postcodeInputRef.current || !postcodeInputRef.current.value.trim()) {
      setPostcodeResult(null);
      return;
    }
    
    const postcodeValue = postcodeInputRef.current.value.trim();
    const postcodeArea = postcodeValue.toUpperCase().split(" ")[0].replace(/[0-9]/g, "");
    const isAvailable = validPostcodeAreas.includes(postcodeArea);
    
    setPostcodeResult({
      available: isAvailable,
      message: isAvailable 
        ? "Great news! We offer practical training in your area."
        : "Sorry, we don't currently offer practical training in your area, but our online courses are available nationwide."
    });
    
    if (!checkedOnce) {
      setCheckedOnce(true);
    }
  };

  const CourseCard = ({ course, type }: { course: typeof onlineCourses[0], type: "online" | "practical" }) => (
        <Link
          to={course.id === "bhs-stage-1-theory" 
            ? "/bhs-stage-1-theory" 
        : course.id === "bhs-stage-2-theory"
        ? "/bhs-stage-2-theory"
            : "/horse-knowledge"}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="block"
    >
      <motion.div 
        {...(checkedOnce ? { animate: { opacity: 1, y: 0 } } : getAnimationProps())}
        className="bg-red-600 rounded-2xl shadow-lg flex items-center justify-between px-6 py-8 mb-6 group hover:bg-red-700 transition-all duration-300 cursor-pointer"
      >
        <div className="flex-1">
          <div className="text-white text-2xl italic font-semibold mb-2 group-hover:text-yellow-300 transition-colors">{course.title}</div>
          <div className="text-white/80 text-sm">{course.description}</div>
          <div className="mt-4 text-white/90 text-sm italic">Click here to learn more</div>
      </div>
        <div className="ml-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <HorseShoe />
      </div>
    </motion.div>
    </Link>
  );

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
            <ChevronLeft size={16} strokeWidth={2.5} />
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
                BeHorseSavvy Courses
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                There's a course suited to everyone. Explore our online and practical options below.
              </motion.p>
              <motion.div
                {...getAnimationProps()}
                className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-800/30 rounded-full">
                  <CheckCircle className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">BHS Approved</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-800/30 rounded-full">
                  <User className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">Delivered by Penny Pleasant BHS Accredited Professional Coach</span>
                </div>
              </motion.div>
              
              <motion.div
                {...getAnimationProps()}
                className="p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg max-w-2xl mx-auto shadow-lg"
              >
                <p className="text-white/80 text-sm leading-relaxed">
                  Our courses feature a mix of programs designed by the British Horse Society and BeHorseSavvy, 
                  all personally delivered by Penny, our expert instructor with over 40 years of equestrian experience.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {/* Online Courses */}
        <motion.div 
          {...getAnimationProps()}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Globe className="h-6 w-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">ONLINE COURSES</h2>
            <div className="h-px bg-white/20 flex-grow ml-3"></div>
          </div>
          
          <div className="space-y-6">
            {onlineCourses.map((course) => (
              <CourseCard key={course.id} course={course} type="online" />
            ))}
          </div>
        </motion.div>
        
        {/* Practical Courses */}
        <motion.div 
          {...(checkedOnce ? { animate: { opacity: 1, y: 0 } } : getAnimationProps())}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-6 w-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">PRACTICAL COURSES</h2>
            <div className="h-px bg-white/20 flex-grow ml-3"></div>
          </div>
          
          {/* Postcode Checker */}
          <motion.div 
            {...(checkedOnce ? { animate: { opacity: 1, y: 0 } } : getAnimationProps())}
            className="mb-10 p-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Search className="w-5 h-5 text-red-400 mr-2" />
              Check if we deliver in your area
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Practical courses are available in select areas. Enter your postcode to check availability:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  ref={postcodeInputRef}
                  placeholder="Enter postcode (e.g. RG1 1AA)" 
                  className="w-full px-4 py-3 bg-blue-900/50 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 shadow-inner transition-all"
                />
              </div>
              <Button 
                onClick={checkPostcode}
                className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors flex items-center justify-center h-[46px]"
              >
                <Search className="w-4 h-4 mr-2" />
                Check Availability
              </Button>
            </div>
            
            {postcodeResult && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`mt-6 p-4 rounded ${postcodeResult.available ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}
              >
                <p className={`text-sm ${postcodeResult.available ? 'text-green-400' : 'text-red-400'}`}>
                  {postcodeResult.message}
                </p>
              </motion.div>
            )}
          </motion.div>
          
          <div className="space-y-6">
            {practicalCourses.map((course) => (
              <CourseCard key={course.id} course={course} type="practical" />
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div 
          {...(checkedOnce ? { animate: { opacity: 1, y: 0 } } : getAnimationProps())}
          className="mt-16 p-6 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg max-w-4xl mx-auto"
        >
          <div className="relative">
            <h3 className="text-sm font-semibold mb-2 text-red-400 flex items-center">
              <span className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mr-2">
                <ChevronRight className="w-3 h-3 text-red-400" />
              </span>
              Important Notice
            </h3>
            <p className="text-white/60 text-xs ml-7">
              These courses prepare you for BHS assessments, but official qualification requires examination at a recognized BHS centre.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Courses; 