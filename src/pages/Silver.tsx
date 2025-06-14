import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ChevronDown, ArrowLeft, Award, User } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { BackToHome } from "@/components/BackToHome";
import { useIsMobile } from "@/hooks/use-mobile";
import FaqItem from "@/components/FaqItem";

const faqs = [
  {
    question: "When does the course start and finish?",
    answer: "Please contact us for course dates and availability. We offer flexible scheduling to accommodate your needs."
  },
  {
    question: "What happens after I have enrolled?",
    answer: "After you have enrolled, you will receive a link to our Moodle online learning platform along with instructions to access your course materials and get started."
  },
  {
    question: "Who is this course suitable for?",
    answer: "This course is designed for those who have completed the Bronze Award or have equivalent experience and want to advance their horse care and management skills."
  },
  {
    question: "Can I join if the course has already started?",
    answer: "Yes, you can still join the course if it has already started, but you will only receive the remaining sessions."
  },
  {
    question: "What will I receive on successful completion of the course?",
    answer: "You will receive a BHS Silver Award certificate upon completion, demonstrating your advanced knowledge in horse care and management."
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function Silver() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationProps = useMemo(() => {
    if (isMobile || prefersReducedMotion) {
      return { initial: "initial", whileInView: "whileInView", variants: fadeIn };
    }
    return {
      initial: "initial",
      whileInView: "whileInView",
      viewport: { once: true, margin: "-50px" },
      variants: fadeIn,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    };
  }, [isMobile, prefersReducedMotion]);

  const handleFaqToggle = useCallback((index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  }, []);

  const handleEnrollClick = useCallback(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-blue-950 to-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      <BackToHome />
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/80 to-blue-950/95" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div {...animationProps}>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
              >
                Silver Challenge Award
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                The BHS Silver Challenge Award builds on the Bronze Award, introducing more advanced horse care and management skills. This course is ideal for those who have completed the Bronze Award or have equivalent experience. Successful completion may allow direct entry to BHS Stage 2 (subject to eligibility).
              </motion.p>
              <motion.div 
                className="flex justify-center gap-4"
              >
                <Button 
                  onClick={handleEnrollClick}
                  className="bg-red-600 text-white hover:bg-red-700 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px]"
                >
                  Enroll Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Meet Your Tutor Section */}
      <section className="py-16 sm:py-24 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              {...animationProps}
              className="relative overflow-hidden rounded-xl shadow-2xl"
            >
              <img 
                src="/P1000306 (1).jpg" 
                alt="Penny Pleasant - Your Tutor" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
            </motion.div>
            <motion.div 
              {...animationProps}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                Meet Your Tutor
              </h2>
              <div className="w-20 h-1 bg-red-500 mx-auto md:mx-0 mb-8"></div>
              <p className="text-lg text-white/90 leading-relaxed">
                Penny Pleasant is a BHS Accredited Professional Coach with over 40 years of experience in the equestrian world. Her passion for horses began at the age of six and has grown into a lifelong commitment to teaching and sharing knowledge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Course Overview */}
      <section className="py-12 sm:py-16 md:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...animationProps}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Is This Course Right For You?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              {...animationProps}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Bronze Graduates
                </h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Completed the Bronze Award? This course is your perfect progression, deepening your skills and preparing you for greater responsibilities in horse care.
                </p>
              </div>
            </motion.div>
            <motion.div
              {...animationProps}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Aspiring Professionals
                </h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Looking toward a future in the equine industry? This course provides the foundational professional knowledge and practical insights needed for your development.
                </p>
              </div>
            </motion.div>
            <motion.div
              {...animationProps}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-red-500" />
                  </span>
                  Keen Learners & Knowledge Seekers
                </h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Passionate about horses and always eager to learn more? Discover in-depth content on health, management, welfare, and more — designed to satisfy your curiosity and elevate your understanding.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Course Snapshot */}
      <section className="py-12 sm:py-16 md:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...animationProps}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Course Snapshot</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              {...animationProps}
              className="space-y-4"
            >
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Duration</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">6-week comprehensive course</p>
                  </div>
                </div>
              </div>
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Certification</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">BHS Silver Award certificate</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              {...animationProps}
              className="space-y-4"
            >
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <User className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Expert Instruction</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Personal guidance from Penny Pleasant</p>
                  </div>
                </div>
              </div>
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Location</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Practical sessions at our facility or your own yard</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Course Features */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...animationProps}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Course Features</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              {...animationProps}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Practical Learning</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Hands-on experience with expert guidance in a supportive environment
                </p>
              </div>
            </motion.div>
            <motion.div
              {...animationProps}
              className="group relative backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Professional Development</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Build essential skills and knowledge for a career in the equine industry. Silver Award offers direct entry to BHS Stage 2 (subject to eligibility).
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Syllabus Section */}
      <section className="py-12 bg-blue-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps}>
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 rounded-xl shadow-xl p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-serif text-2xl font-bold mb-8 text-center text-white relative">
                <span className="relative z-10 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[1px] after:bg-red-500/40">Syllabus</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500">●</span>
                  </span>
                  Advanced horse care and management skills
                </li>
                <li className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500">●</span>
                  </span>
                  Preparation for BHS Stage 2 (subject to eligibility)
                </li>
                <li className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500">●</span>
                  </span>
                  In-depth knowledge of horse health, welfare, and management
                </li>
                <li className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500">●</span>
                  </span>
                  Practical sessions at our facility or your own yard
                </li>
                <li className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                    <span className="text-red-500">●</span>
                  </span>
                  Personal guidance from an accredited coach
                </li>
              </ul>
              <div className="text-center mt-8">
                <a href="https://www.bhs.org.uk/go-riding-and-learn/recreational-awards/challenge-awards/riding-flat/#:~:text=Silver%20Award" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl font-medium">
                  <span className="text-lg font-medium">View syllabus here</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Enroll CTA Section */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-blue-950 to-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            {...animationProps}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Enroll Today</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Get access to hands-on, practical training and earn your BHS Silver Challenge Award.
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <motion.div
              {...animationProps}
              className="group relative backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">Silver Challenge Award</h3>
                  <p className="font-serif text-lg font-medium text-white/80 mb-5">6 months access • Advanced horse care & management</p>
                  <p className="font-serif text-5xl font-bold text-red-500 mb-8">£145</p>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium">
                    Enroll for Silver
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 