import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle, Sparkles, GraduationCap, Heart, Clock, User, Globe, ArrowRight, Mail, BookOpen, Award, ChevronDown } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

// Optimized animation variants (same as Courses page)
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
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

  const features = [
    { icon: CheckCircle, text: "BHS Professional Accredited Coach" },
    { icon: User, text: "Home Education Specialist" },
    { icon: Globe, text: "Fully Remote Learning" }
  ];

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white font-dyslexic">
      <ContactHeader bgColor="bg-blue-950" />

      {/* Back Button - Mobile Optimized */}
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

      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-blue-950 py-20 sm:py-24 md:py-32 overflow-hidden rounded-b-3xl shadow-xl border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/homed2.png')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-blue-950/90" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
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
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 text-white drop-shadow-lg">
              Home Education <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">Equestrians</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Transform your child's education with expert equestrian learning, designed exclusively for home-educated students.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full border border-white/10 shadow-sm">
                  <feature.icon className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="p-4 sm:p-6 bg-blue-900 border border-white/20 rounded-lg max-w-2xl mx-auto shadow-lg mb-8 sm:mb-12">
              <p className="text-white/80 text-sm leading-relaxed">
                Professional equestrian education tailored specifically for home-educated children, combining academic learning with practical horse knowledge.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button 
                onClick={scrollToCourses}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full transition-all duration-300 flex items-center gap-3 mx-auto text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
              >
                <span>Explore Our Courses</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-12">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">Why Choose BeHorseSavvy?</h2>
              <div className="w-24 h-1 bg-red-500/70 mx-auto mb-6 rounded-full" />
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                We specialize in providing world-class equestrian education designed specifically for home-educated students.
              </p>
            </motion.div>
            
            <div className="space-y-8">
              <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Expert-Led Education</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  Professional equestrian education tailored specifically for home-educated children. Our courses combine academic learning with practical horse knowledge, delivered by BHS Professional Accredited Coach Penny Pleasant.
                </p>
          </motion.div>

              <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Confidence Building</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Foster deep connections with horses while building confidence through structured learning in a supportive, pressure-free environment.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-950/50 p-6 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      Safe Learning Environment
                    </h4>
                    <p className="text-white/70">Pressure-free atmosphere designed for confidence building</p>
                  </div>
                  <div className="bg-blue-950/50 p-6 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      Structured Learning
                    </h4>
                    <p className="text-white/70">Progressive curriculum that builds skills systematically</p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Flexible Learning</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Curriculum designed to complement home education schedules, reducing academic pressure while maintaining educational excellence.
                </p>
                <ul className="space-y-3 text-white/70 text-lg ml-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Self-paced learning modules</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Flexible scheduling options</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>No academic pressure</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-gradient-to-br from-red-500/20 to-red-500/10 p-8 rounded-xl border border-red-500/20 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Remote Excellence</h3>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">
                  World-class equestrian education delivered remotely, eliminating travel constraints while maintaining the highest teaching standards. Learn from anywhere, at your own pace.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Course List Section - Mobile Optimized */}
      <section id="courses" className="py-16 sm:py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16">
            <div className="inline-block bg-blue-900/80 px-5 py-2 rounded-full mb-4 border border-blue-700">
              <BookOpen className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Available Courses</h2>
            <p className="text-white/70 text-lg">Comprehensive educational materials designed for home-educated equestrians.</p>
          </motion.div>

          <div className="space-y-6">
            {/* BeHorseSavvy Level 1 Course */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
              <Link to="/behorsesavvy/book1" className="block">
                <div className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group">
                  {/* Red accent bar */}
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2 group-hover:text-red-300 transition-colors duration-300 leading-tight">
                        BeHorseSavvy Level 1
                </h3>
                      <p className="text-white/80 mb-4 text-sm sm:text-base leading-relaxed">
                  A fun first course teaching you how to care for horses, keep them safe, and understand what makes them happy.
                </p>

                      

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Horse anatomy and behaviour</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Grooming techniques</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Safety around horses</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-red-400 font-bold text-lg">Fees £55</span>
                        <div className="flex-grow h-px bg-white/10" />
                      </div>
                  </div>
                    <div className="flex-shrink-0 z-10">
                      <div className="bg-blue-800/50 group-hover:bg-red-600/50 rounded-full p-3 transition-colors duration-300">
                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  </div>
                  </div>
                </div>
                </Link>
            </motion.div>

            {/* Coming Soon Course 1 */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
              <div className="relative bg-blue-900/50 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 overflow-hidden border border-blue-700/50 opacity-75">
                {/* Blue accent bar */}
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-500 to-blue-700 rounded-l-2xl" />
                
                <div className="flex justify-between items-start w-full">
                  <div className="flex-1 pr-4">
                    <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2 leading-tight">
                      BeHorseSavvy Level 2
                </h3>
                    <p className="text-white/70 mb-4 text-sm sm:text-base leading-relaxed">
                  Advanced riding techniques, horse psychology, and stable management for intermediate young equestrians.
                </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30">
                        Intermediate
                      </span>
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium border border-gray-500/30">
                        Coming Soon
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-white/70 text-sm">Advanced riding skills</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-white/70 text-sm">Horse psychology</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-white/70 text-sm">Stable management</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-bold text-lg">Coming Soon</span>
                      <div className="flex-grow h-px bg-white/10" />
                  </div>
                  </div>
                  <div className="flex-shrink-0 z-10">
                    <div className="bg-gray-600/50 rounded-full p-3">
                      <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Coming Soon Course 2 */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
              <div className="relative bg-blue-900/50 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 overflow-hidden border border-blue-700/50 opacity-75">
                {/* Red accent bar */}
                <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                
                <div className="flex justify-between items-start w-full">
                  <div className="flex-1 pr-4">
                    <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2 leading-tight">
                  Professional Development
                </h3>
                    <p className="text-white/70 mb-4 text-sm sm:text-base leading-relaxed">
                  Career-focused course for aspiring equestrian professionals and advanced riders seeking certification.
                </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium border border-red-500/30">
                        Advanced
                      </span>
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium border border-gray-500/30">
                        Coming Soon
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span className="text-white/70 text-sm">Instructor certification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span className="text-white/70 text-sm">Business management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span className="text-white/70 text-sm">Advanced horsemanship</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 font-bold text-lg">Coming Soon</span>
                      <div className="flex-grow h-px bg-white/10" />
                  </div>
                  </div>
                  <div className="flex-shrink-0 z-10">
                    <div className="bg-gray-600/50 rounded-full p-3">
                      <Clock className="w-6 h-6 text-gray-400" />
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Mobile Optimized */}
      <section className="py-16 sm:py-20 bg-blue-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            {...fadeInUp}
            className="p-8 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-xl border border-red-500/20 shadow-xl"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center">
                <Mail className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Ready to Start Your Journey?</h3>
            </div>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Join our community of home-educated equestrians and unlock your child's potential with professional guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => {
                window.location.href = "mailto:Penelopepleasant@gmail.com?subject=Home%20Education%20Equestrians%20Enquiry";
              }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-base font-bold transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
            >
                <Mail className="mr-2 h-5 w-5" />
              Get Started Today
            </Button>
            <Link to="/behorsesavvy/book1">
              <Button
                variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-3 text-base font-bold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Level 1
              </Button>
            </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 