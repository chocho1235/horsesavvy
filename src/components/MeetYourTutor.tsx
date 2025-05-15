import React from "react";
import { motion } from "framer-motion";

interface MeetYourTutorProps {
  getAnimationProps: () => any;
  fadeIn: any;
}

const MeetYourTutor: React.FC<MeetYourTutorProps> = ({ getAnimationProps, fadeIn }) => {
  return (
    <section className="py-16 sm:py-24 bg-blue-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          {...getAnimationProps()}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Meet Your Tutor</h2>
          <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            {...getAnimationProps()}
            className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <h3 className="font-serif text-2xl font-semibold text-white mb-6">Penny Pleasant</h3>
              <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4">
                Penny is a highly qualified and experienced equestrian professional with a passion for teaching and sharing knowledge. With extensive experience in BHS qualifications and training, she brings a wealth of practical expertise to her online courses.
              </p>
              <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed">
                Her teaching approach combines theoretical knowledge with practical insights, ensuring students gain a comprehensive understanding of horse care and management.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...getAnimationProps()}
            className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <h3 className="font-serif text-2xl font-semibold text-white mb-6">Teaching Approach</h3>
              <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4">
                Penny's teaching methodology focuses on building a strong foundation of knowledge while developing practical skills. She emphasizes:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start group/item">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                  <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Comprehensive understanding of horse care</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                  <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Professional techniques and safety</span>
                </li>
                <li className="flex items-start group/item">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                  <span className="text-white/90 text-sm sm:text-base group-hover/item:text-white transition-colors">Practical application of theoretical knowledge</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetYourTutor; 