import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const MeetYourTutor: React.FC = () => {
  return (
    <motion.section 
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-50px" }}
      className="py-16 sm:py-24 bg-blue-950/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Meet Your Tutor</h2>
          <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8" />
        </div>
        
        {/* Penny's Image */}
        <div
          className="relative overflow-hidden rounded-xl shadow-2xl max-w-2xl mx-auto mb-12"
        >
          <img 
            src="/P1000306 (1).jpg" 
            alt="Penny Pleasant - Your Tutor" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div
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
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MeetYourTutor; 