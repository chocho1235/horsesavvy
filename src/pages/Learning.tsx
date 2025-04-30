import { Link } from "react-router-dom";
import { ContactHeader } from "@/components/ContactHeader";
import { ChevronLeft, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PostcodeChecker from "@/components/PostcodeChecker";
import { Footer } from "@/components/Footer";

const courses = [
  {
    id: "bhs-stage-1",
    title: "BHS Stage 1",
    description: "Begin your equestrian journey with BHS Stage 1. This course covers the fundamental skills and knowledge needed for horse care and riding.",
    duration: "12 weeks",
    features: [
      "Basic horse care and welfare",
      "Fundamental riding skills",
      "Stable management",
      "Health and safety"
    ],
    level: "Beginner",
    rating: 4.8
  },
  {
    id: "bhs-stage-2",
    title: "BHS Stage 2",
    description: "Advance your equestrian skills with BHS Stage 2. This course builds upon Stage 1 knowledge and introduces more advanced riding techniques and horse care practices.",
    duration: "16 weeks",
    features: [
      "Advanced riding techniques",
      "Comprehensive horse care",
      "Training principles",
      "Competition preparation"
    ],
    level: "Intermediate",
    rating: 4.9
  }
];

const Learning = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ContactHeader />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 bg-clip-text text-transparent">
              <div className="flex justify-center items-center">
                <img src="/homed2.png" alt="Home Education" className="w-full max-w-[600px] h-auto" />
              </div>
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-4xl mx-auto text-center mt-8 leading-8 tracking-wide">
            Our BHS distance learning courses are a flexible and supportive way to build your knowledge and prepare for BHS assessments. Whether you're starting with Stage 1 or moving on to Stage 2, our courses are designed to guide you every step of the way.
          </p>
        </motion.div>

        {/* Vertical stack of courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-black/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 p-12 transition-all duration-500 w-full shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl translate-y-16 -translate-x-16"></div>
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between mb-8"
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-2 text-white">{course.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="px-3 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1 px-4 py-1.5 bg-blue-600/20 rounded-full text-sm font-medium border border-blue-500/30 backdrop-blur-sm">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="text-gray-300 mb-10 leading-relaxed text-lg"
                >
                  {course.description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-10"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                    <span className="text-white">Course Features</span>
                  </h3>
                  <ul className="space-y-4">
                    {course.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-gray-300 group/item text-lg"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform"></div>
                        <span className="group-hover/item:text-white transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-end gap-4 pt-6 border-t border-white/10"
                >
                  <Link
                    to={`/learning/${course.id}`}
                    className="group/btn relative px-8 py-3 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-lg transition-all duration-300 font-medium text-lg backdrop-blur-sm"
                  >
                    <span className="relative z-10">Learn More</span>
                  </Link>
                  <Link
                    to={`/learning/${course.id}`}
                    className="group/btn relative px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-blue-500/20"
                  >
                    <span className="relative z-10">Get Started</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Postcode Checker */}
        <PostcodeChecker />

        {/* Disclaimer */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-48 p-8 bg-black/50 rounded-2xl border border-white/10"
        >
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Important Notice</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              These courses are intended for training purposes only. If you wish to obtain the BHS Stage 1 Or Stage 2 qualification you will need to sit and pass each exam at a recognised BHS exam centre. To find relevant dates and centres of where to take this exam, visit the British Horse Society website.
            </p>
          </div>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
};

export default Learning; 