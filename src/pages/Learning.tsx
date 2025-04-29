import { Link } from "react-router-dom";
import { ContactHeader } from "@/components/ContactHeader";
import { ChevronLeft, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PostcodeChecker from "@/components/PostcodeChecker";

const courses = [
  {
    id: "bhs-stage-1",
    title: "BHS Stage 1",
    description: "Begin your equestrian journey with BHS Stage 1. This course covers the fundamental skills and knowledge needed for horse care and riding.",
    price: "£299",
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
    price: "£399",
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-center mt-6 leading-relaxed">
            Develop your horse care and riding skills with our online courses — designed to support your training for BHS Stage 1 and Stage 2 qualifications.
          </p>
        </motion.div>

        {/* Vertical stack of courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-black/50 rounded-2xl overflow-hidden border border-white/10 hover:border-white/15 p-8 transition-all duration-500"
            >
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between mb-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="px-2 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 rounded-full text-sm font-medium border border-blue-500/30">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="text-gray-300 mb-8 leading-relaxed"
                >
                  {course.description}
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    Course Features
                  </h3>
                  <ul className="space-y-3">
                    {course.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-gray-300 group/item"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform" />
                        <span className="group-hover/item:text-gray-100 transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between pt-4 border-t border-white/10"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">£Enquire</span>
                  </div>
                  <Link
                    to={`/learning/${course.id}`}
                    className="group/btn relative px-6 py-2.5 bg-blue-600/90 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 font-medium"
                  >
                    <span className="relative z-10">Learn More</span>
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

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-32 relative py-12"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Left section */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start gap-2"
              >
                <div className="flex items-center gap-3 group">
                  <span className="text-white/40 text-xs font-light tracking-widest uppercase">EST.</span>
                  <span className="text-white/40 text-xs font-light tracking-widest uppercase">2025</span>
                </div>
                <div className="text-white/40 text-xs font-light tracking-widest uppercase">BeHorseSavvy</div>
              </motion.div>

              {/* Center section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-6"
              >
                <a href="https://www.facebook.com/penny.pleasant" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/60 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/behorsesavvy/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>

              {/* Right section */}
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-end gap-2"
              >
                <div className="text-white/40 text-xs font-light tracking-widest uppercase">© 2025 BeHorseSavvy</div>
                <div className="text-white/40 text-xs font-light tracking-widest uppercase">All rights reserved</div>
              </motion.div>
            </div>
          </div>
        </motion.footer>

        {/* Powered by Equinology */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="w-full py-4 relative"
        >
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex justify-center">
            <a 
              href="https://equinology.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-block text-white/40 text-xs font-light tracking-widest uppercase overflow-hidden group"
            >
              <span className="relative z-10">Powered by Equinology</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learning; 