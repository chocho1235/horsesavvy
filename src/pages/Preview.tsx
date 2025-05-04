import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";

const faqs = [
  {
    question: "When does the course start and finish?",
    answer: "The course starts now! As soon as you have enrolled you have access to the course and can start straight away."
  },
  {
    question: "What happens after I have enrolled?",
    answer: "You will have immediate access to the course material and can begin to study the course straight away! You will also be sent a BHS Challenge Award workbook to work through."
  },
  {
    question: "How does studying via distance learning work?",
    answer: "Once you have enrolled on the course, you can begin steadily working through the modules completing the learning activities as you progress. You work at your own pace fitting in your studies around your personal commitments. You then send your completed workbook to your tutor for marking and feedback."
  },
  {
    question: "Are there any other costs associated with the course?",
    answer: "There are no further costs associated with this course - everything you need to pass the course is included in the fee you pay when you enrol. The cost of this course also includes the BHS Challenge Award workbook that will be posted to you."
  },
  {
    question: "What will I receive on successful completion of the course?",
    answer: "You will receive a Certificate from the British Horse Society. You will also receive your marked workbook that you can keep and refer to for future reference."
  },
  {
    question: "Can international students study this course?",
    answer: "YES! All of our courses are designed to be studied anywhere in the world and we have many international students studying with us."
  }
];

export default function Preview() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <ContactHeader />
      
      {/* Hero Section */}
      <section className="relative bg-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('/pennyclubmanifest.jpeg')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-8 text-yellow-400"
              >
                Horse Knowledge One
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed"
              >
                The BHS Challenge Award Horse Knowledge, Part One course covers essential topics such as yard safety, horse behaviour, and safe handling. It consists of seven modules with interactive quizzes, videos, and assessments, designed to be completed at your own pace in approximately 30 hours. Upon completion, you will receive a certificate from the British Horse Society. The course is ideal for horse owners, prospective owners, or anyone looking to improve their knowledge of horse care.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center"
              >
                <Button 
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg"
                >
                  Enroll Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Course Overview</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-[#c7a750] flex items-center">
                  <span className="w-10 h-10 rounded-full bg-[#c7a750]/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-[#c7a750]" />
                  </span>
                  What You'll Learn
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Complete horse care and management</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Horse handling skills</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Safety and welfare guidelines</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-2xl font-semibold mb-6 text-[#c7a750] flex items-center">
                  <span className="w-10 h-10 rounded-full bg-[#c7a750]/10 flex items-center justify-center mr-4">
                    <ChevronRight className="w-5 h-5 text-[#c7a750]" />
                  </span>
                  Course Features
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Learn at your own pace</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Expert tutor support</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Fully online, access from anywhere</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who is the Course For */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">Is This Course Right For You?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Don't worry if you're new to horses! This course is perfect for anyone who wants to learn about horse care, no matter your experience level.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">New Horse Owners</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Just got a horse or thinking about getting one? This course will teach you everything you need to know to get started.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Complete Beginners</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Never worked with horses before? No problem! We'll guide you through everything step by step.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Home Educated Children</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Perfect for home education! Learn about horses in a fun, engaging way that fits your learning schedule.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Future Horse Professionals</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Thinking about a career with horses? This course is your first step towards professional horse care and management.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificate and Graph Images */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full aspect-[4/3] max-w-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/Untitled design (11).png" 
                alt="Course Certificate" 
                className="w-full h-full object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Snapshot */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Course Snapshot</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="group relative backdrop-blur-sm bg-white/[0.03] p-8 rounded-xl border border-white/10 hover:border-[#c7a750]/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#c7a750]/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-[#c7a750]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#c7a750] mb-2">Duration</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">30 hours of self-paced learning</p>
                  </div>
                </div>
              </div>
              <div className="group relative backdrop-blur-sm bg-white/[0.03] p-8 rounded-xl border border-white/10 hover:border-[#c7a750]/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#c7a750]/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-7 w-7 text-[#c7a750]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#c7a750] mb-2">Support</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">Optional tutor call included</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="group relative backdrop-blur-sm bg-white/[0.03] p-8 rounded-xl border border-white/10 hover:border-[#c7a750]/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#c7a750]/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-7 w-7 text-[#c7a750]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#c7a750] mb-2">Format</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">7 interactive modules with quizzes</p>
                  </div>
                </div>
              </div>
              <div className="group relative backdrop-blur-sm bg-white/[0.03] p-8 rounded-xl border border-white/10 hover:border-[#c7a750]/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-14 h-14 rounded-xl bg-[#c7a750]/10 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-7 w-7 text-[#c7a750]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#c7a750] mb-2">Study Anywhere</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">All courses are designed to be studied anywhere in the world</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tutor Images */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Meet Your Tutor</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative max-w-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/10 via-transparent to-transparent rounded-xl" />
              <img 
                src="/77991a05-3d01-4281-b89e-df73707d1ff8.jpeg" 
                alt="Penny Pleasant - Tutor Images" 
                className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tutor Introduction */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="group relative backdrop-blur-sm bg-white/[0.03] p-10 rounded-xl border border-white/10 hover:border-[#c7a750]/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="font-serif text-3xl font-bold text-[#c7a750] mb-4">Penny Pleasant</h3>
                <p className="text-white/80 text-lg group-hover:text-white transition-colors leading-relaxed">
                  Penny designed this course from the ground up, drawing on years of coaching and judging to make each lesson clear, practical and fun.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Frequently Asked Questions</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "0px" }}
                className="group"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left backdrop-blur-sm bg-white/[0.03] p-8 rounded-xl border border-white/10 hover:border-[#c7a750]/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-xl font-semibold text-white group-hover:text-[#c7a750] transition-colors pr-4">{faq.question}</h3>
                    <motion.span 
                      className="text-2xl text-[#c7a750] flex-shrink-0 w-8 h-8 flex items-center justify-center"
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      +
                    </motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          height: { duration: 0.3, ease: "easeInOut" },
                          opacity: { duration: 0.2, ease: "easeInOut" }
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-white/10 text-white/80 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Get Started Now!</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-center">
                    <p className="font-serif text-5xl font-bold text-[#c7a750] mb-3">£125</p>
                    <p className="text-white/80 mb-8">UK students</p>
                    <Button className="w-full bg-[#c7a750] text-black hover:bg-[#d4b86a] transition-colors duration-300 py-6 text-lg font-medium">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-center">
                    <p className="font-serif text-5xl font-bold text-[#c7a750] mb-3">$195</p>
                    <p className="text-white/80 mb-8">International Students</p>
                    <Button className="w-full bg-[#c7a750] text-black hover:bg-[#d4b86a] transition-colors duration-300 py-6 text-lg font-medium">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Prompt */}
      <section className="py-16 bg-black border-t border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <h3 className="font-serif text-3xl font-bold text-[#c7a750] mb-4">Find Your Perfect Course Match</h3>
            <p className="text-lg text-white/80 mb-8">Take our quick assessment to discover which course aligns best with your goals and experience level</p>
            <Button className="bg-[#c7a750] text-black hover:bg-[#d4b86a] px-8 py-6 text-lg font-medium transition-colors duration-300">
              Start Your Course Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}