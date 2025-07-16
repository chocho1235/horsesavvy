import { motion } from 'framer-motion';
import { Heart, Mail, Calendar, Star } from 'lucide-react';

const ComingSoon = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    whileInView: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(239,68,68,0.1),transparent_50%)]" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo/Icon */}
          <motion.div 
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-2xl">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              BeHorseSavvy
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-semibold text-white/90 mb-4"
          >
            Coming Soon
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We're working hard to bring you the best equestrian education experience. 
            Professional BHS courses, horse knowledge training, and expert instruction 
            with Penny Pleasant.
          </motion.p>

          {/* Features Grid */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Star className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Expert Instruction</h3>
              <p className="text-white/70 text-sm">BHS Professional Accredited Coach</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Flexible Learning</h3>
              <p className="text-white/70 text-sm">Online courses at your own pace</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Comprehensive</h3>
              <p className="text-white/70 text-sm">BHS Stage 1 & 2 Theory courses</p>
            </div>
          </motion.div>

          {/* Email Signup */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 max-w-md mx-auto"
          >
            <Mail className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Get Notified</h3>
            <p className="text-white/70 text-sm mb-4">Be the first to know when we launch</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-red-400"
              />
              <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                Notify Me
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            variants={fadeInUp}
            className="mt-12 pt-8 border-t border-white/20"
          >
            <p className="text-white/60 text-sm">
              © 2024 BeHorseSavvy. Professional equestrian education with Penny Pleasant.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon; 