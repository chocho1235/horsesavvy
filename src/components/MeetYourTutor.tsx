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

        {/* Penny's Image */}
        <motion.div 
          {...getAnimationProps()}
          className="relative overflow-hidden rounded-xl shadow-2xl max-w-2xl mx-auto mb-12"
        >
          <img 
            src="/P1000306 (1).jpg" 
            alt="Penny Pleasant - Your Tutor" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
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
              <h3 className="font-serif text-2xl font-semibold text-white mb-6">How We'll Learn Together</h3>
              <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                Penny's friendly teaching style makes learning enjoyable and accessible. We'll take it step by step, making sure you're comfortable with each topic before moving on. No rushing - just steady, confident progress.
              </p>
              <p className="text-white/90 text-base sm:text-lg group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                You'll learn through engaging activities and real-world examples, making it easy to understand and remember what you've learned. Got questions? No problem! We're here to help you succeed, with friendly guidance and support throughout your learning journey.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetYourTutor; 