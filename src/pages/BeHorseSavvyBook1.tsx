import React, { useState, useCallback, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ArrowLeft, Heart } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { BackToHome } from "@/components/BackToHome";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load FAQ component
const BeHorseSavvyFaqItem = lazy(() => import("@/components/BeHorseSavvyFaqItem"));

// Loading fallback for lazy components
const LoadingFallback = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-white/10 rounded-lg mb-4"></div>
  </div>
);

const faqs = [
  {
    question: "When does the course start and finish?",
    answer: "The course starts now! As soon as you have enrolled you have access to the course and can start straight away."
  },
  {
    question: "What happens after I have enrolled?",
    answer: "You will have immediate access to the course material and can begin to study the course straight away!"
  },
  {
    question: "How does studying via distance learning work?",
    answer: "Once you have enrolled on the course, you can begin steadily working through the modules completing the learning activities as you progress. You work at your own pace fitting in your studies around your personal commitments."
  },
  {
    question: "Are there any other costs associated with the course?",
    answer: "There are no further costs associated with this course - everything you need to pass the course is included in the fee you pay when you enrol."
  },
  {
    question: "What will I receive on successful completion of the course?",
    answer: "You will receive a BeHorseSavvy Book 1 Certificate of Completion."
  },
  {
    question: "Can international students study this course?",
    answer: "YES! All of our courses are designed to be studied anywhere in the world and we have many international students studying with us."
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function BeHorseSavvyBook1() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // Memoize handlers
  const handleFaqToggle = useCallback((index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  }, []);

  const handleEnrollClick = useCallback(() => {
    window.location.href = "mailto:Penelopepleasant@gmail.com?subject=BeHorseSavvy%20Book%201%20Enquiry";
  }, []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-blue-950 to-blue-950 text-white font-dyslexic">
      <ContactHeader bgColor="bg-blue-950" />
      
      <BackToHome />
      
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/homed2.png')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/80 to-blue-950/95" />
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
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/80 border border-yellow-500/30 backdrop-blur-sm mb-6">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span className="text-white/90 text-sm font-medium tracking-wide">BeHorseSavvy Course</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
            >
              <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                BeHorseSavvy
              </span>
              <br />
              Book 1
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
            >
              Learn how to care for horses and keep them happy and healthy! Discover basic grooming skills and understand how horses think and feel.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4"
            >
              <Button 
                onClick={handleEnrollClick}
                className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px] font-bold border border-black/20"
              >
                Contact Penny
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet Your Tutor Section */}
      <section className="py-16 sm:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
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
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center md:text-left"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                Meet Your Tutor
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto md:mx-0 mb-8"></div>
              <p className="text-lg text-white/90 leading-relaxed">
                Penny Pleasant is a qualified horse instructor who has been working with horses for over 40 years! She started loving horses when she was just six years old and loves teaching children about horses, especially home-schooled students.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-12 sm:py-16 md:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              What Will We Be <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Covering</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 p-8 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative pl-4">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                    <Heart className="w-5 h-5 text-yellow-500" />
                  </span>
                  Horse Care Basics
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Daily care for your horse</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Keeping horses safe in stables and fields</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">How horses think and feel</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 p-8 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative pl-4">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </span>
                  Grooming Skills
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">How to groom your horse</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Different types of rugs available</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">How to put on and take off a rug</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 p-8 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-lg" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative pl-4">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                    <BookOpen className="w-5 h-5 text-yellow-500" />
                  </span>
                  Course Features
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Designed for home education</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Interactive worksheets included</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Age-appropriate content (8-14)</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-16 sm:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Perfect for <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Home Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mb-8"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              This course is perfect for home-schooled children! Learn at your own pace and discover important life skills while having fun with horses.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 p-8 rounded-2xl border border-yellow-500/20 shadow-xl"
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl" />
              <div className="pl-4">
                <h3 className="text-2xl font-bold text-white mb-4">Educational Benefits</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    Learn to be responsible and caring
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    Feel more confident around horses
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    Learn useful skills for life
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    Learn to solve problems
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 p-8 rounded-2xl border border-yellow-500/20 shadow-xl"
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl" />
              <div className="pl-4">
                <h3 className="text-2xl font-bold text-white mb-4">Practical Skills</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    How to brush and care for horses
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    How to stay safe around horses
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    Understanding what horses like and don't like
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3" />
                    Learning about brushes and horse equipment
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 mx-auto bg-gradient-to-r from-yellow-500 to-amber-600" />
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            <Suspense fallback={<LoadingFallback />}>
              {faqs.map((faq, index) => (
                <BeHorseSavvyFaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onToggle={() => handleFaqToggle(index)}
                />
              ))}
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-gradient-to-br from-blue-900/90 via-blue-900/80 to-blue-900/90 p-12 rounded-2xl border border-yellow-500/20 shadow-xl"
          >
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-l-2xl" />
            <div className="pl-4">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Start Your <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Journey</span>?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                Start your exciting horse adventure with BeHorseSavvy Book 1! Learn how to be a great friend to horses while having lots of fun.
              </p>
              <Button
                onClick={handleEnrollClick}
                className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black px-8 py-4 text-lg font-bold border border-black/20 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Contact Penny Today
              </Button>
              <div className="mt-6 text-white/70">
                <p className="text-sm">or email directly:</p>
                <a href="mailto:Penelopepleasant@gmail.com" className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors">
                  Penelopepleasant@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 