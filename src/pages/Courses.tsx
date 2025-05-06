import { Link } from "react-router-dom";
import { ContactHeader } from "@/components/ContactHeader";
import { ChevronLeft, Clock, ChevronRight, Award, CheckCircle, User, Globe, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { useState } from "react";

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
    price: "£85",
    duration: "30 hours",
    level: "Beginner"
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

const Courses = () => {
  const [postcode, setPostcode] = useState("");
  const [postcodeResult, setPostcodeResult] = useState<null | { available: boolean; message: string }>(null);
  
  const checkPostcode = () => {
    if (!postcode.trim()) {
      setPostcodeResult(null);
      return;
    }
    
    const postcodeArea = postcode.trim().toUpperCase().split(" ")[0].replace(/[0-9]/g, "");
    const isAvailable = validPostcodeAreas.includes(postcodeArea);
    
    setPostcodeResult({
      available: isAvailable,
      message: isAvailable 
        ? "Great news! We offer practical training in your area."
        : "Sorry, we don't currently offer practical training in your area, but our online courses are available nationwide."
    });
  };

  const CourseCard = ({ course, type }: { course: typeof onlineCourses[0], type: "online" | "practical" }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-black/80 border border-amber-500/30 hover:border-amber-500/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
    >
      <Link
        to={course.id === "bhs-stage-1-theory" 
          ? "/bhs-stage-1-theory" 
          : "/horse-knowledge"}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 w-full"
      >
        <div className="flex-1 mb-4 md:mb-0 md:mr-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">{course.title}</h2>
            <span className="px-2 py-1 bg-amber-900/40 rounded-full text-xs text-amber-200 flex items-center">
              {type === "online" ? <Globe className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
              {type === "online" ? "Online" : "In-Person"}
            </span>
          </div>
          <p className="text-gray-400 text-sm md:text-base">{course.description}</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3 md:mr-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <span className="px-3 py-1 bg-amber-900/30 rounded-full text-xs text-amber-300 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration}
              </span>
              <span className="px-3 py-1 bg-amber-900/30 rounded-full text-xs text-amber-300 flex items-center">
                <Award className="w-3 h-3 mr-1" />
                {course.level}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400 text-lg">{course.price}</span>
            <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
              <ChevronRight className="w-5 h-5 text-amber-400" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <ContactHeader />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors mb-8 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              BeHorseSavvy
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-amber-400">
              Our Courses
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto mb-6">
              Discover our range of equestrian courses to help you excel in horse care
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-900/20 rounded-full">
                <CheckCircle className="h-5 w-5 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">BHS Approved</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-900/20 rounded-full">
                <User className="h-5 w-5 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">Delivered by Penny</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 border border-amber-500/30 bg-gradient-to-b from-amber-900/20 to-black/20 rounded-lg max-w-2xl mx-auto"
            >
              <p className="text-white/80 text-sm">
                All our courses are officially approved by the British Horse Society and personally delivered by Penny, 
                our expert instructor with over 20 years of equestrian experience.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Online Courses */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-6 w-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">ONLINE</h2>
            <div className="h-px bg-amber-500/30 flex-grow ml-3"></div>
          </div>
          
          <div className="space-y-4">
            {onlineCourses.map((course) => (
              <CourseCard key={course.id} course={course} type="online" />
            ))}
          </div>
        </motion.div>
        
        {/* Practical Courses */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-6 w-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">PRACTICAL</h2>
            <div className="h-px bg-amber-500/30 flex-grow ml-3"></div>
          </div>
          
          {/* Postcode Checker */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-5 bg-amber-900/10 border border-amber-500/20 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-amber-400 mb-3">Check if we deliver in your area</h3>
            <p className="text-white/70 text-sm mb-4">
              Practical courses are available in select areas. Enter your postcode to check availability:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter postcode (e.g. RG1 1AA)" 
                  className="w-full px-4 py-2 bg-black/50 border border-amber-500/30 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <button 
                onClick={checkPostcode}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors flex items-center justify-center"
              >
                <Search className="w-4 h-4 mr-1" />
                Check
              </button>
            </div>
            
            {postcodeResult && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded ${postcodeResult.available ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}
              >
                <p className={`text-sm ${postcodeResult.available ? 'text-green-400' : 'text-red-400'}`}>
                  {postcodeResult.message}
                </p>
              </motion.div>
            )}
          </motion.div>
          
          <div className="space-y-4">
            {practicalCourses.map((course) => (
              <CourseCard key={course.id} course={course} type="practical" />
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 p-6 bg-black/50 rounded-lg border border-amber-500/20 max-w-4xl mx-auto"
        >
          <div className="relative">
            <h3 className="text-sm font-semibold mb-2 text-amber-400">Important Notice</h3>
            <p className="text-white/60 text-xs">
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