import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle, Sparkles, GraduationCap, Heart, Clock, User, Globe, ArrowRight, Mail, BookOpen, Award } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

// Sophisticated animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};

export default function BeHorseSavvy() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const benefits = [
    {
      icon: Sparkles,
      title: "Expert-Led Education",
      description: "Professional equestrian education tailored specifically for home-educated children, combining academic learning with practical horse knowledge."
    },
    {
      icon: Heart,
      title: "Confidence Building",
      description: "Foster deep connections with horses while building confidence through structured learning in a supportive, pressure-free environment."
    },
    {
      icon: GraduationCap,
      title: "Flexible Learning",
      description: "Curriculum designed to complement home education schedules, reducing academic pressure while maintaining educational excellence."
    },
    {
      icon: Clock,
      title: "Remote Excellence",
      description: "World-class equestrian education delivered remotely, eliminating travel constraints while maintaining the highest teaching standards."
    }
  ];

  const features = [
    { icon: CheckCircle, text: "BHS Accredited Instructor" },
    { icon: User, text: "Home Education Specialist" },
    { icon: Globe, text: "Fully Remote Learning" }
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-white font-dyslexic">
      <ContactHeader bgColor="bg-blue-950" />

      {/* Back Button */}
      <div className="fixed top-20 left-6 z-30">
        <Link to="/">
          <Button
            variant="outline"
            className="bg-blue-900/80 hover:bg-blue-800 text-white border-white/30 hover:border-yellow-500/50 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <ChevronLeft size={16} />
            <span className="ml-2 font-medium">Back to Home</span>
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-blue-950 py-20 sm:py-24 md:py-32 overflow-hidden rounded-b-3xl shadow-xl border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/homed2.png')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-blue-950/90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              whileInView: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/80 border border-yellow-500/30 backdrop-blur-sm mb-12">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="text-white/90 text-sm font-medium tracking-wide">BeHorseSavvy Exclusive Program</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 text-white drop-shadow-lg tracking-tight leading-tight">
              Home Education <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Equestrians</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed tracking-wide px-4 sm:px-0">
              Transform your child's education with expert equestrian learning, designed exclusively for home-educated students.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-2 bg-blue-900 rounded-full border border-yellow-500/20 shadow-sm">
                  <feature.icon className="h-5 w-5 text-yellow-500" />
                  <span className="text-white/90 text-sm font-medium tracking-wide">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center">
              <Button 
                onClick={() => {
                  window.location.href = "mailto:Penelopepleasant@gmail.com?subject=Home%20Education%20Equestrians%20Enquiry";
                }}
                className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px] font-bold border border-black/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-800/50 border border-yellow-500/30 backdrop-blur-sm mb-6 shadow-lg">
              <Sparkles size={16} className="text-yellow-500" />
              <span className="text-white/90 text-sm font-medium tracking-wide">Why Choose Us</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-lg tracking-tight leading-tight"
            >
              Excellence in Every
              <br />
              <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                Learning Experience
              </span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide"
            >
              Discover why families worldwide trust BeHorseSavvy for their children's equestrian education.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-all duration-300 overflow-hidden border border-yellow-500/20 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500/40"
              >
                {/* Gold accent bar */}
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl shadow-lg" />
                
                {/* Subtle background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-2xl" />
                
                <div className="relative z-10 pl-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-800/80 to-blue-900/80 rounded-2xl flex items-center justify-center mb-6 group-hover:from-yellow-600/80 group-hover:to-amber-600/80 transition-all duration-300 shadow-lg border border-black/20">
                    <benefit.icon size={24} className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 tracking-wide leading-tight">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed tracking-wide">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course List Section */}
      <section className="py-24 bg-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-800/50 border border-yellow-500/30 backdrop-blur-sm mb-6 shadow-lg">
              <BookOpen size={16} className="text-yellow-500" />
              <span className="text-white/90 text-sm font-medium tracking-wide">Available Courses</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-lg tracking-tight leading-tight"
            >
              Educational
              <br />
              <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                Course Collection
              </span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed tracking-wide"
            >
              Comprehensive educational materials designed specifically for home-educated equestrian students.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* BeHorseSavvy Book 1 Course */}
            <motion.div
              variants={scaleIn}
              className="group relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-all duration-300 overflow-hidden border border-yellow-500/20 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500/40"
            >
              {/* Gold accent bar */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl shadow-lg" />
              
              {/* Subtle background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-2xl" />
              
              <div className="relative z-10 pl-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-800/80 to-blue-900/80 rounded-2xl flex items-center justify-center mb-6 group-hover:from-yellow-600/80 group-hover:to-amber-600/80 transition-all duration-300 shadow-lg border border-black/20">
                  <BookOpen size={28} className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 tracking-wide leading-tight">
                  BeHorseSavvy Book 1
                </h3>
                
                <p className="text-white/80 mb-6 leading-relaxed tracking-wide">
                  A fun first course teaching you how to care for horses, keep them safe, and understand what makes them happy.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/30">
                    Beginner Friendly
                  </span>
                  <span className="px-3 py-1 bg-blue-800/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                    Ages 8-14
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Horse anatomy and behaviour</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Basic grooming techniques</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Safety around horses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Interactive worksheets</span>
                  </div>
                </div>

                                 <Link to="/behorsesavvy/book1">
                   <Button
                     className="w-full bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black font-bold border border-black/20 transition-all duration-300 hover:scale-105 shadow-lg"
                   >
                     Learn More
                   </Button>
                 </Link>
              </div>
            </motion.div>

            {/* Coming Soon Course 1 */}
            <motion.div
              variants={scaleIn}
              className="group relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-all duration-300 overflow-hidden border border-yellow-500/20 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500/40"
            >
              {/* Gold accent bar */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl shadow-lg" />
              
              {/* Subtle background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-2xl" />
              
              <div className="relative z-10 pl-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-800/80 to-blue-900/80 rounded-2xl flex items-center justify-center mb-6 group-hover:from-yellow-600/80 group-hover:to-amber-600/80 transition-all duration-300 shadow-lg border border-black/20">
                  <GraduationCap size={28} className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 tracking-wide leading-tight">
                  BeHorseSavvy Book 2
                </h3>
                
                <p className="text-white/80 mb-6 leading-relaxed tracking-wide">
                  Advanced riding techniques, horse psychology, and stable management for intermediate young equestrians.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/30">
                    Intermediate
                  </span>
                  <span className="px-3 py-1 bg-blue-800/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                    Ages 12-16
                  </span>
                  <span className="px-3 py-1 bg-gray-600/30 text-gray-300 rounded-full text-sm font-medium border border-gray-500/30">
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Advanced riding skills</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Horse psychology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Stable management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Competition preparation</span>
                  </div>
                </div>

                <Button
                  disabled
                  className="w-full bg-gray-600/50 text-gray-300 font-bold border border-gray-500/30 cursor-not-allowed"
                >
                  Coming Soon
                </Button>
              </div>
            </motion.div>

            {/* Coming Soon Course 2 */}
            <motion.div
              variants={scaleIn}
              className="group relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 backdrop-blur-md rounded-2xl shadow-xl p-8 transition-all duration-300 overflow-hidden border border-yellow-500/20 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-500/40"
            >
              {/* Gold accent bar */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl shadow-lg" />
              
              {/* Subtle background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-2xl" />
              
              <div className="relative z-10 pl-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-800/80 to-blue-900/80 rounded-2xl flex items-center justify-center mb-6 group-hover:from-yellow-600/80 group-hover:to-amber-600/80 transition-all duration-300 shadow-lg border border-black/20">
                  <Award size={28} className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300 tracking-wide leading-tight">
                  Professional Development
                </h3>
                
                <p className="text-white/80 mb-6 leading-relaxed tracking-wide">
                  Career-focused course for aspiring equestrian professionals and advanced riders seeking certification.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/30">
                    Advanced
                  </span>
                  <span className="px-3 py-1 bg-blue-800/30 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                    Ages 16+
                  </span>
                  <span className="px-3 py-1 bg-gray-600/30 text-gray-300 rounded-full text-sm font-medium border border-gray-500/30">
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Instructor certification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Business management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Advanced horsemanship</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-white/90 text-sm tracking-wide">Professional networking</span>
                  </div>
                </div>

                <Button
                  disabled
                  className="w-full bg-gray-600/50 text-gray-300 font-bold border border-gray-500/30 cursor-not-allowed"
                >
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
            className="relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 backdrop-blur-md rounded-2xl shadow-xl p-12 border border-yellow-500/20 overflow-hidden"
          >
            {/* Gold accent bar */}
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl shadow-lg" />
            
            {/* Subtle background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-2xl" />
            
            <div className="relative z-10 pl-4">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-800/50 border border-yellow-500/30 backdrop-blur-sm mb-6 shadow-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-white/90 text-sm font-medium tracking-wide">Ready to Start</span>
              </motion.div>

              <motion.h3 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg tracking-tight leading-tight"
              >
                Begin Your Child's
                <br />
                <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg">
                  Equestrian Journey
                </span>
              </motion.h3>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed tracking-wide"
              >
                Join our exclusive program and give your child access to world-class equestrian education from the comfort of home.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => {
                    window.location.href = "mailto:Penelopepleasant@gmail.com?subject=Home%20Education%20Equestrians%20Enquiry";
                  }}
                  className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-black/20 backdrop-blur-sm"
                >
                  <Mail size={20} className="mr-2" />
                  Contact Penny
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="flex items-center gap-2 text-white/70">
                  <span className="text-sm">or email:</span>
                  <a href="mailto:Penelopepleasant@gmail.com" className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors underline-offset-4 hover:underline">
                    Penelopepleasant@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 