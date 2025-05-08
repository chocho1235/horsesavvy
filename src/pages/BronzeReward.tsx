import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Award, Globe, ChevronRight } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";

const awards = [
  {
    title: "🐴 Knowing Your Horse",
    items: [
      "Identification (colour, face markings, leg markings, gender)",
      "Anatomy (points of the horse, parts of the foot)",
      "Health (signs of good/poor health, daily checks, shoeing/trimming)",
      "Feeding (rules of feeding, hay/haylage, water provision)",
      "Fittening (importance of fitness, signs of unfitness)"
    ]
  },
  {
    title: "🏇🏼 Handling your Horse",
    items: [
      "Working safely on a yard",
      "Understanding horse behaviour",
      "Headcollar and tying up",
      "Leading techniques",
      "Tack cleaning"
    ]
  },
  {
    title: "💙 Caring for your horse",
    items: [
      "Natural behaviours and instincts",
      "Stable care and bedding",
      "Field care and fencing",
      "Rug types and usage",
      "Grooming and post-exercise care"
    ]
  },
  {
    title: "🐎 Lunging your horse",
    items: [
      "Reasons for lunging",
      "Required equipment",
      "Tacking up for lunging",
      "Leading preparation",
      "Lunge line handling",
      "Whip control",
      "Post-lunging care"
    ]
  }
];

const faqs = [
  {
    question: "What is the Bronze Reward?",
    answer: "The Bronze Reward is a comprehensive 1-to-1 online course that provides direct entry into BHS Stage 2. It covers essential horse knowledge and practical skills through four main awards: Knowing Your Horse, Handling your Horse, Caring for your horse, and Lungeing your horse."
  },
  {
    question: "How is the course delivered?",
    answer: "The course is delivered fully online with 1-to-1 tutoring. You'll have direct access to your tutor for personalized guidance and feedback throughout your learning journey."
  },
  {
    question: "What are the benefits of completing the Bronze Reward?",
    answer: "Upon successful completion, you'll gain direct entry into BHS Stage 2, demonstrating your comprehensive understanding of horse care, handling, and management. The course provides a solid foundation for further equine studies and professional development."
  }
];

export default function BronzeReward() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <ContactHeader />
      
      {/* Hero Section */}
      <section className="relative bg-black py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('/pennyclubmanifest.jpeg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 to-transparent" />
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
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-yellow-400"
              >
                Bronze Reward
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              >
                A comprehensive 1-to-1 online course providing direct entry into BHS Stage 2. Master essential horse knowledge and practical skills through four main awards, with personalized guidance from expert tutors.
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
                  className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
                >
                  Enroll Now
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-12 sm:py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-400">Course Features</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">1-to-1 Tutoring</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Personalized guidance and feedback from expert tutors throughout your learning journey.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Direct Entry to BHS Stage 2</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Successful completion provides direct entry into BHS Stage 2 qualification.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="group relative bg-black/80 p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Fully Online</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">
                  Study at your own pace from anywhere in the world with comprehensive online resources.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-400">Course Content</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group relative bg-black/80 p-6 sm:p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#c7a750] mb-4 sm:mb-8">{award.title}</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {award.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start">
                        <span className="w-2 h-2 rounded-full bg-[#c7a750] mt-2 mr-3 flex-shrink-0" />
                        <span className="text-white/80 text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Tutor Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-yellow-400">Meet Your Tutor</h2>
            <div className="w-16 h-1 mx-auto bg-yellow-400/70" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative order-2 md:order-1"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="/pennypleasant.jpeg"
                  alt="Penny Pleasant"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-4 sm:space-y-6 order-1 md:order-2"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-[#c7a750]">Penny Pleasant</h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                Penelope designed this course from the ground up, drawing on years of coaching and judging to make each lesson clear, practical and fun. With extensive experience in equine education and a passion for sharing knowledge, she ensures that every student receives the highest quality learning experience.
              </p>
              <Button className="bg-[#c7a750] text-black hover:bg-[#d4b86a] transition-colors duration-300 w-full sm:w-auto">
                Learn More About Penny
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-16 text-yellow-400">Get Started Now!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="group relative bg-black/80 p-6 sm:p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-center">
                    <p className="font-serif text-4xl sm:text-5xl font-bold text-[#c7a750] mb-2 sm:mb-3">£250</p>
                    <p className="text-white/80 mb-6 sm:mb-8">UK students</p>
                    <Button className="w-full bg-[#c7a750] text-black hover:bg-[#d4b86a] transition-colors duration-300 py-4 sm:py-6 text-base sm:text-lg font-medium">
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
                className="group relative bg-black/80 p-6 sm:p-8 rounded-lg border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7a750]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="text-center">
                    <p className="font-serif text-4xl sm:text-5xl font-bold text-[#c7a750] mb-2 sm:mb-3">$350</p>
                    <p className="text-white/80 mb-6 sm:mb-8">International Students</p>
                    <Button className="w-full bg-[#c7a750] text-black hover:bg-[#d4b86a] transition-colors duration-300 py-4 sm:py-6 text-base sm:text-lg font-medium">
                      Enroll Now
                    </Button>
                  </div>
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