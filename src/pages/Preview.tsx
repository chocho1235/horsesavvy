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
    question: "What happens if I have any questions about the course?",
    answer: "When you enrol on the course we will allocate you a tutor - you can contact your tutor as little or as often as you need to. If you have any questions at any stage we will be here to support you and offer guidance."
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
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-yellow-400">
                Horse Knowledge Courses
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                The BHS Challenge Award Horse Knowledge, Part One course covers essential topics such as yard safety, horse behaviour, and safe handling. It consists of seven modules with interactive quizzes, videos, and assessments, designed to be completed at your own pace in approximately 30 hours. Upon completion, you will receive a certificate from the British Horse Society. The course is ideal for horse owners, prospective owners, or anyone looking to improve their knowledge of horse care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg">
                  Enroll Now
                </Button>
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-6 text-lg">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Course Overview</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-6 text-yellow-400 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center mr-3">
                    <ChevronRight className="w-4 h-4 text-yellow-400" />
                  </span>
                  What You'll Learn
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Comprehensive horse care and management</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Practical skills for horse handling</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Safety and welfare best practices</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-xl font-semibold mb-6 text-yellow-400 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center mr-3">
                    <ChevronRight className="w-4 h-4 text-yellow-400" />
                  </span>
                  Course Features
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Self-paced learning</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Expert tutor support</span>
                  </li>
                  <li className="flex items-start group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 mr-3" />
                    <span className="text-white/80 group-hover/item:text-white transition-colors">Practical assessments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Image */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <div className="relative w-full aspect-[4/3] max-w-xl">
                <div className="absolute inset-0 bg-black/40 rounded-lg" />
                <img 
                  src="/Untitled design (11).png" 
                  alt="Course Certificate" 
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full aspect-[4/3] max-w-xl">
                <div className="absolute inset-0 bg-black/40 rounded-lg" />
                <img 
                  src="/graph.png" 
                  alt="Course Structure Graph" 
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Snapshot */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Course Snapshot</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">Duration</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">30 hours of self-paced learning</p>
                  </div>
                </div>
              </div>
              <div className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">Support</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">Optional tutor call included</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">Format</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">7 interactive modules with quizzes</p>
                  </div>
                </div>
              </div>
              <div className="group relative bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">Study Anywhere</h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">All courses are designed to be studied anywhere in the world</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutor Images */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Meet Your Tutor</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </div>
          <div className="flex justify-center">
            <div className="relative max-w-2xl">
              <div className="absolute inset-0 bg-black/40 rounded-lg" />
              <img 
                src="/77991a05-3d01-4281-b89e-df73707d1ff8.jpeg" 
                alt="Penny Pleasant - Tutor Images" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tutor Introduction */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">Penny Pleasant</h3>
                <p className="text-white/80 text-lg group-hover:text-white transition-colors">
                  Penny designed this course from the ground up, drawing on years of coaching and judging to make each lesson clear, practical and fun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Frequently Asked Questions</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "100px" }}
                className="group"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left bg-black/80 p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-yellow-400 pr-4">{faq.question}</h3>
                    <motion.span 
                      className="text-2xl text-yellow-400 flex-shrink-0 w-6 h-6 flex items-center justify-center"
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
                        <div className="pt-4 mt-4 border-t border-yellow-400/10 text-white/80">
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
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Get Started Now!</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* UK Full Payment */}
              <div className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-yellow-400 mb-2">£125</p>
                    <p className="text-white/80 mb-6">UK students</p>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* International Full Payment */}
              <div className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-yellow-400 mb-2">$195</p>
                    <p className="text-white/80 mb-6">International Students</p>
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Prompt */}
      <section className="py-16 bg-black border-t border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Find Your Perfect Course Match</h3>
            <p className="text-lg text-white/80 mb-6">Take our quick assessment to discover which course aligns best with your goals and experience level</p>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-6 text-lg">
              Start Your Course Assessment
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}