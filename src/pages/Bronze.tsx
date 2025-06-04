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
    answer: "This course is designed for beginners of all ages who want to learn essential horse care and handling skills. No prior experience is required."
  },
  {
    question: "Can I join if the course has already started?",
    answer: "Yes, you can still join the course if it has already started, but you will only receive the remaining sessions."
  },
  {
    question: "What will I receive on successful completion of the course?",
    answer: "You will receive a BHS Challenge Award - Bronze Award certificate upon completion, demonstrating your foundational knowledge in horse care and handling."
  }
];

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

export default function Bronze() {
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
    <div className="min-h-[100dvh] bg-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      <BackToHome />
      
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-20 sm:py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-blue-950/90" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div {...animationProps}>
              <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white">
                Bronze Challenge Award
              </motion.h1>
              <motion.p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
                Master the fundamentals of horsemanship with Britain's most trusted equestrian qualification
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <Award className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">BHS Approved</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <Clock className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">6 Week Course</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <Users className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">All Levels Welcome</span>
                </div>
              </motion.div>
              <motion.div>
                <Button 
                  onClick={handleEnrollClick}
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Journey - £97
                </Button>
                <p className="text-white/70 text-sm mt-3">No prior experience required</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Why Choose the Bronze Award?</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              The perfect starting point for your equestrian journey, combining practical skills with essential knowledge in a structured, supportive environment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Comprehensive Curriculum</h3>
              <p className="text-white/80">From basic riding position to advanced techniques, covering everything you need to know.</p>
            </motion.div>

            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Expert Instruction</h3>
              <p className="text-white/80">Learn from Penny Pleasant, BHS Accredited Professional Coach with 40+ years experience.</p>
            </motion.div>

            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Recognized Qualification</h3>
              <p className="text-white/80">Earn your official BHS Bronze Award certificate, respected throughout the equestrian industry.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">What You'll Master</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Build confidence and competence across three essential areas of horsemanship
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Riding Skills */}
            <motion.div {...animationProps} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <ChevronRight className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Riding Fundamentals</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Correct riding position and balance</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Walk and trot transitions</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Steering and control</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Safe mounting and dismounting</span>
                </li>
              </ul>
            </motion.div>

            {/* Horse Handling */}
            <motion.div {...animationProps} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Horse Handling</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Leading horses safely</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Arena safety protocols</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Equipment adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Basic groundwork skills</span>
                </li>
              </ul>
            </motion.div>

            {/* Fitness & Preparation */}
            <motion.div {...animationProps} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Preparation for Advanced Skills</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Light seat for jumping preparation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Rider fitness and alignment</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Nutrition and hydration</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>Mental preparation</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Course Image */}
          <motion.div {...animationProps} className="text-center mt-16">
            <img src="/Untitled design (14).svg" alt="Bronze Challenge Award" className="w-full max-w-md h-auto object-contain mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Meet Your Tutor */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...animationProps} className="relative overflow-hidden rounded-xl shadow-2xl">
              <img 
                src="/P1000306 (1).jpg" 
                alt="Penny Pleasant - Your Tutor" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
            </motion.div>
            
            <motion.div {...animationProps} className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Your Expert Instructor</h2>
              <div className="w-20 h-1 bg-red-500 mx-auto md:mx-0 mb-8"></div>
              <h3 className="text-xl font-semibold text-white mb-4">Penny Pleasant</h3>
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                BHS Accredited Professional Coach with over 40 years of experience in the equestrian world. Penny's passion for horses began at age six and has grown into a lifelong commitment to teaching and sharing knowledge.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <Award className="h-4 w-4 text-red-400" />
                  <span className="text-white/90 text-sm">BHS Accredited</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <Clock className="h-4 w-4 text-red-400" />
                  <span className="text-white/90 text-sm">40+ Years Experience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Course Details</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Duration</h3>
              <p className="text-white/80">6-week comprehensive program</p>
            </motion.div>

            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Format</h3>
              <p className="text-white/80">Practical sessions at our facility</p>
            </motion.div>

            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Certification</h3>
              <p className="text-white/80">Official BHS Bronze Award</p>
            </motion.div>

            <motion.div {...animationProps} className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Prerequisites</h3>
              <p className="text-white/80">None - all levels welcome</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Perfect For</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...animationProps} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center mr-3">
                  <ChevronRight className="w-4 h-4 text-red-500" />
                </span>
                Complete Beginners
              </h3>
              <p className="text-white/90">
                Never worked with horses before? Perfect! This course starts from the very beginning, teaching you essential skills and building your confidence step by step.
              </p>
            </motion.div>

            <motion.div {...animationProps} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center mr-3">
                  <ChevronRight className="w-4 h-4 text-red-500" />
                </span>
                Returning Riders
              </h3>
              <p className="text-white/90">
                Have some experience but want to refresh your skills and gain formal qualification? Build on your knowledge with proper technique and safety protocols.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Syllabus */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Complete Syllabus</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80">
              Everything you'll learn during your Bronze Award journey
            </p>
          </motion.div>

          <motion.div {...animationProps} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 sm:p-10 hover:border-white/40 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Describe the correct riding position</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Explain why riding in the correct position is important</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">List the sequence of footfalls for walk and trot</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Lead a horse from the stable to the arena</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Enter and leave the arena safely</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Mount using a mounting block</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Dismount safely</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Adjust stirrups and girth whilst mounted</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Transitions between halt, walk and trot</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Execute turns and changes of rein</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Ride accurate 20m circles</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Use the correct trot diagonal</span>
                </div>
                <div className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-white/90">Carry and use a short whip</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a 
                href="https://www.bhs.org.uk/go-riding-and-learn/recreational-awards/challenge-awards/riding-flat/#:~:text=Bronze%20Award,a%20short%20whip" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-white rounded-lg transition-all duration-300 border border-red-500/50 hover:border-red-500 font-medium"
              >
                <span>View Official BHS Syllabus</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FaqItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === idx}
                onToggle={() => handleFaqToggle(idx)}
                animationProps={animationProps}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...animationProps} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Start Your Equestrian Journey</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Join hundreds of riders who have built their confidence and skills with the Bronze Challenge Award
            </p>
          </motion.div>
          
          <motion.div {...animationProps} className="max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Bronze Challenge Award</h3>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="h-4 w-4 text-red-400" />
                  <span className="text-sm">6 weeks</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-4 w-4 text-red-400" />
                  <span className="text-sm">BHS Certified</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-4 w-4 text-red-400" />
                  <span className="text-sm">Expert tuition</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-red-500 mb-6">£97</div>
              <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-4 text-lg font-semibold rounded-lg">
                Enroll Now
              </Button>
              <p className="text-white/60 text-sm mt-4">Secure your place today • No hidden fees</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 