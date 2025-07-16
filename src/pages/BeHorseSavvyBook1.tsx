import React, { useState, useCallback, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, Heart, CheckCircle } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { BackToHome } from "@/components/BackToHome";
import { useIsMobile } from "@/hooks/use-mobile";
import SEO from "@/components/SEO";

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
    answer: "You will receive a BeHorseSavvy Level 1 Certificate of Completion."
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
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-blue-950 to-blue-950 text-white font-dyslexic">
      <SEO 
        title="BeHorseSavvy Level 1 Course - £55 - Home Education Horses with Penny Pleasant"
        description="BeHorseSavvy Level 1 course for home-educated children aged 8-14. Learn horse care, safety, and behavior with Penny Pleasant, BHS Professional Accredited Coach. £55 course fee."
        keywords="behorsesavvy level 1, behorsesavvy book 1, home education horses, horse care for children, penny pleasant horse courses, home schooled horse education, children horse training, horse knowledge for kids"
        canonicalUrl="/behorsesavvy/book1"
        courseData={{
          "@type": "Course",
          "name": "BeHorseSavvy Level 1",
          "description": "Fun first course teaching horse care, safety, and understanding for home-educated students aged 8-14.",
          "provider": {
            "@type": "Organization",
            "name": "BeHorseSavvy"
          },
          "instructor": {
            "@type": "Person",
            "name": "Penny Pleasant",
            "jobTitle": "BHS Professional Accredited Coach"
          },
          "educationalLevel": "Beginner",
          "audience": "Home-educated children aged 8-14",
          "url": "https://behorsesavvy.online/behorsesavvy/book1",
          "courseMode": "Online",
          "offers": {
            "@type": "Offer",
            "price": "55",
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "Online",
            "courseWorkload": "P3W",
            "instructor": {
              "@type": "Person",
              "name": "Penny Pleasant",
              "jobTitle": "BHS Professional Accredited Coach"
            }
          }
        }}
        breadcrumbData={{
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://behorsesavvy.online/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "BeHorseSavvy",
              "item": "https://behorsesavvy.online/behorsesavvy"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Level 1",
              "item": "https://behorsesavvy.online/behorsesavvy/book1"
            }
          ]
        }}
      />
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
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white"
            >
              BeHorseSavvy Level 1
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
            >
              A fun first course teaching you how to care for horses, keep them safe, and understand what makes them happy. Perfect for home-educated students aged 8-14.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-4"
            >
              <Button 
                onClick={handleEnrollClick}
                className="bg-red-600 text-white hover:bg-red-700 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto h-[52px] sm:h-[60px]"
              >
                Enrol Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meet Your Tutor Section */}
      <section className="py-16 sm:py-24 bg-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Meet Your Tutor
            </h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70 mb-8"></div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-2xl max-w-2xl mx-auto mb-12">
            <img 
              src="/P1000306 (1).jpg" 
              alt="Penny Pleasant - Your Tutor" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
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
            <h2 className="text-4xl font-bold mb-6 text-white">BeHorseSavvy Level 1</h2>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Course Overview</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <Heart className="w-5 h-5 text-red-500" />
                  </span>
                  What You'll Learn
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Horse anatomy and behavior</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Grooming techniques</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Safety around horses</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <Sparkles className="w-5 h-5 text-red-500" />
                  </span>
                  Course Features
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Designed for home education</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Interactive worksheets included</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Age-appropriate content (8-14)</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-white flex items-center">
                  <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-red-500" />
                  </span>
                  Course Benefits
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">BeHorseSavvy Certificate</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Self-paced learning</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">Perfect for home education</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Course Content */}
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-2xl mx-auto mt-16 mb-12"
          >
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 rounded-xl shadow-xl p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="font-serif text-2xl font-bold mb-8 text-center text-white relative">
                <span className="relative z-10 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[1px] after:bg-red-500/40">What We'll Cover</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Horse Care Essentials",
                  "Daily care routines for your horse",
                  "Keeping horses safe in stables and fields",
                  "Understanding how horses think and feel",
                  "Grooming Skills",
                  "How to groom your horse properly",
                  "Different types of rugs available",
                  "How to put on and take off a rug",
                  "Interactive worksheets and activities",
                  "Age-appropriate learning materials"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-white/90 hover:text-white transition-colors duration-200 text-lg group/item">
                    <span className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center mr-4 group-hover/item:bg-red-600/20 transition-all duration-300">
                      <span className="text-red-500">●</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Who is the Course For */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Is This Course Right For You?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              This course is perfect for home-educated children who want to learn about horses in a fun, engaging way.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Home-Educated Children</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Perfect for home education! Learn about horses in a fun, engaging way that fits your learning schedule.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Complete Beginners</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Never worked with horses before? No problem! We'll guide you through everything step by step.
                </p>
              </div>
          </motion.div>
          
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Horse Lovers</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Love horses and want to learn more? This course will teach you how to care for them properly and safely.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Future Riders</h3>
                <p className="text-white/90 group-hover:text-white transition-colors">
                  Planning to start riding or get your own horse? This course provides the essential knowledge you need.
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
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Course Snapshot</h2>
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Age Group</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Perfect for ages 8-14</p>
                  </div>
                </div>
              </div>
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Duration</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Self-paced learning</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              <div className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-md will-change-transform">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-red-600/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-7 w-7 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Format</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Interactive worksheets and activities</p>
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
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">Study Anywhere</h3>
                    <p className="text-white/90 group-hover:text-white transition-colors">Designed for home education worldwide</p>
                  </div>
                </div>
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
            <div className="w-16 h-1 mx-auto bg-red-600/70" />
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

      {/* Get Started Now CTA Section */}
      <section id="pricing" className="py-16 bg-gradient-to-b from-blue-950 to-blue-950 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Get Started Now!</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Start your exciting horse adventure with BeHorseSavvy Level 1
            </p>
          </motion.div>
          
          <div className="max-w-md mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative md:backdrop-blur-sm bg-white/10 p-8 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl will-change-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">BeHorseSavvy</h3>
                  <h4 className="font-serif text-xl font-bold text-white mb-5">Level 1</h4>
                  <p className="font-serif text-3xl font-bold text-red-500 mb-3">Fees £55</p>
                  <div className="bg-white/5 rounded-lg p-4 mb-8">
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Perfect for home education</span>
                      </li>
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Ages 8-14 beginner friendly</span>
                      </li>
                      <li className="flex items-center text-white/90">
                        <ChevronRight className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>Interactive worksheets included</span>
                      </li>
                    </ul>
                  </div>
                                <Button 
                    onClick={() => {
                      window.location.href = "mailto:Penelopepleasant@gmail.com?subject=BeHorseSavvy%20Level%201%20Enquiry";
                    }}
                    className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-6 text-lg font-medium"
                  >
                    Enrol Now
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