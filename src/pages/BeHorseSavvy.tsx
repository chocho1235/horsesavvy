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
        <div className="absolute inset-0 bg-[url('/The%20penny%20club%20-%20WD2%20%281%29.svg')] bg-contain bg-center bg-no-repeat opacity-60" />
        <div className="absolute inset-0 bg-blue-950/60" />
        
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
              Transform your child's education with expert equestrian learning, designed for all students.
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
                              <Link to="/behorsesavvy/level1" className="block">
                <div className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group">
                  {/* Red accent bar */}
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-4 group-hover:text-red-300 transition-colors duration-300 leading-tight">
                        BeHorseSavvy Level 1
                      </h3>

                      

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

            {/* BeHorseSavvy Level 2 Course */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
                              <Link to="/behorsesavvy/level2" className="block">
                <div className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group">
                  {/* Red accent bar */}
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-4 group-hover:text-red-300 transition-colors duration-300 leading-tight">
                        BeHorseSavvy Level 2
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Horse breeds and anatomy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Health and welfare</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Feeding and fitness</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-red-400 font-bold text-lg">Fees £75</span>
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

            {/* BeHorseSavvy Level 3 Course */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
                              <Link to="/behorsesavvy/level3" className="block">
                <div className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group">
                  {/* Red accent bar */}
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-4 group-hover:text-red-300 transition-colors duration-300 leading-tight">
                        BeHorseSavvy Level 3
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Horse communication</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Stable management</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Advanced grooming</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-red-400 font-bold text-lg">Fees £75</span>
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

            {/* BeHorseSavvy Level 4 Course */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
                              <Link to="/behorsesavvy/level4" className="block">
                <div className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group">
                  {/* Red accent bar */}
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-4 group-hover:text-red-300 transition-colors duration-300 leading-tight">
                        BeHorseSavvy Level 4
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Yard work and handling</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Safety procedures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Equipment care</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-red-400 font-bold text-lg">Fees £75</span>
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

            {/* BeHorseSavvy Level 5 Course */}
            <motion.div
              variants={fadeInUp}
              className="group"
            >
                              <Link to="/behorsesavvy/level5" className="block">
                <div className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group">
                  {/* Red accent bar */}
                  <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1 pr-4">
                      <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-4 group-hover:text-red-300 transition-colors duration-300 leading-tight">
                        BeHorseSavvy Level 5
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Rider fitness</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Body position</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full" />
                          <span className="text-white/80 text-sm">Mental health</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-red-400 font-bold text-lg">Fees £75</span>
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
          </div>
        </div>
      </section>

      {/* Course Selection Guide */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-950 to-blue-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Which Level is Right for You?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Use this guide to find the perfect starting point for your equestrian journey
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            {/* Main Decision Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              {/* Level 1 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-red-500/40 rounded-xl p-6 text-center hover:border-red-400 hover:bg-blue-800/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Level 1</h3>
                  <p className="text-red-300 text-sm mb-4 font-medium">Complete Beginner</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>No horse experience</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Learn basic safety</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Start from scratch</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-red-400"></div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-red-500/40 rounded-xl p-6 text-center hover:border-red-400 hover:bg-blue-800/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Level 2</h3>
                  <p className="text-red-300 text-sm mb-4 font-medium">Basic Knowledge</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Level 1 completed</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Basic horse care</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Health & welfare</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-red-400"></div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-red-500/40 rounded-xl p-6 text-center hover:border-red-400 hover:bg-blue-800/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Level 3</h3>
                  <p className="text-red-300 text-sm mb-4 font-medium">Intermediate</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Level 2 completed</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Advanced care</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Communication</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-red-400"></div>
                </div>
              </div>

              {/* Level 4 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-red-500/40 rounded-xl p-6 text-center hover:border-red-400 hover:bg-blue-800/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Level 4</h3>
                  <p className="text-red-300 text-sm mb-4 font-medium">Advanced</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Level 3 completed</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Yard work skills</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Professional handling</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-red-500 to-red-400"></div>
                </div>
              </div>

              {/* Level 5 */}
              <div className="group relative">
                <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-red-500/40 rounded-xl p-6 text-center hover:border-red-400 hover:bg-blue-800/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">5</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Level 5</h3>
                  <p className="text-red-300 text-sm mb-4 font-medium">Expert</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Level 4 completed</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Rider fitness</span>
                    </div>
                    <div className="flex items-center text-white/80 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                      <span>Performance focus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Decision Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:border-red-400/50 hover:bg-blue-800/90 transition-all duration-300 shadow-lg"
              >
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 text-red-400 mr-2" />
                  New to Horses?
                </h4>
                <p className="text-white/80 text-sm mb-4">Start with Level 1 to build a solid foundation</p>
                <Link to="/behorsesavvy/level1">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    Start Level 1
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:border-red-400/50 hover:bg-blue-800/90 transition-all duration-300 shadow-lg"
              >
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-red-400 mr-2" />
                  Some Experience?
                </h4>
                <p className="text-white/80 text-sm mb-4">Choose Level 2 or 3 based on your current knowledge</p>
                <div className="flex gap-2">
                  <Link to="/behorsesavvy/level2" className="flex-1">
                    <Button className="w-full border-2 border-red-400/50 bg-transparent text-white hover:bg-red-500/20 hover:border-red-400 text-sm font-medium transition-all duration-300">
                      Level 2
                    </Button>
                  </Link>
                  <Link to="/behorsesavvy/level3" className="flex-1">
                    <Button className="w-full border-2 border-red-400/50 bg-transparent text-white hover:bg-red-500/20 hover:border-red-400 text-sm font-medium transition-all duration-300">
                      Level 3
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 hover:border-red-400/50 hover:bg-blue-800/90 transition-all duration-300 shadow-lg"
              >
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 text-red-400 mr-2" />
                  Advanced Learner?
                </h4>
                <p className="text-white/80 text-sm mb-4">Level 4 for yard work or Level 5 for rider fitness</p>
                <div className="flex gap-2">
                  <Link to="/behorsesavvy/level4" className="flex-1">
                    <Button className="w-full border-2 border-red-400/50 bg-transparent text-white hover:bg-red-500/20 hover:border-red-400 text-sm font-medium transition-all duration-300">
                      Level 4
                    </Button>
                  </Link>
                  <Link to="/behorsesavvy/level5" className="flex-1">
                    <Button className="w-full border-2 border-red-400/50 bg-transparent text-white hover:bg-red-500/20 hover:border-red-400 text-sm font-medium transition-all duration-300">
                      Level 5
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Progression Benefits */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="mt-12 bg-gradient-to-br from-blue-900/90 to-blue-800/90 backdrop-blur-sm border-2 border-red-500/30 rounded-xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6">Why Follow the Progression?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <BookOpen className="w-6 h-6 text-red-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Structured Learning</h4>
                  <p className="text-white/70 text-sm">Each level builds upon the previous, ensuring comprehensive understanding</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Confidence Building</h4>
                  <p className="text-white/70 text-sm">Gradual progression helps build confidence and skills systematically</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Award className="w-6 h-6 text-red-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Professional Development</h4>
                  <p className="text-white/70 text-sm">Complete all levels for a comprehensive equestrian education</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
            <Link to="/behorsesavvy/level1">
              <Button
                variant="outline"
                  className="border-red-400/50 text-white hover:bg-red-500/20 hover:border-red-400 px-8 py-3 text-base font-bold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
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