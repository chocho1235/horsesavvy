import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Home, 
  Coffee, 
  Award, 
  Camera, 
  ChevronRight, 
  ChevronLeft,
  Shield,
  FileText,
  CreditCard,
  Utensils,
  MapPin,
  HelpCircle,
  Star,
  Trophy,
  Heart,
  Sparkles,
  Compass,
  MessageCircle,
  CheckCircle,
  X,
  List
} from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { BackToHome } from "@/components/BackToHome";
import FaqItem from "@/components/FaqItem";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Gallery images
const galleryImages = [
  "/camp-photos/camp-training-1.png",
  "/camp-photos/camp-training-2.png",
  "/camp-photos/camp-training-3.png",
  "/camp-photos/camp-training-5.png",
  "/camp-photos/camp-training-6.png",
  "/camp-photos/camp-training-7.png",
  "/camp-photos/camp-training-8.png",
  "/camp-photos/camp-training-9.png"
];

// Testimonials data
const testimonials = [
  {
    name: "Esmae S.",
    location: "Camp Pleasant Student",
    rating: 5,
    text: "Esmae was lucky enough to be awared the Be Horse Savvy award at CampPleasant2025. Esmae has learned so much and grown in confidence in her horse knowledge with Penny.",
    year: "2025",
    image: "/testimonial-placeholder.svg"
  },
  {
    name: "Emma T.",
    location: "Camp Pleasant Student",
    rating: 5,
    text: "The perfect mix of intensive training and fun. Made great friends and learned so much!",
    year: "2025",
    image: "/testimonial-placeholder.svg"
  },
  {
    name: "Lucy M.",
    location: "Camp Pleasant Student",
    rating: 5,
    text: "Fantastic facilities and amazing instructors. Can't wait for next year!",
    year: "2025",
    image: "/testimonial-placeholder.svg"
  }
];

// Featured highlights data
const highlights = [
  {
    icon: Trophy,
    title: "Expert Coaching",
    description: "Learn from BHS accredited coaches with years of experience"
  },
  {
    icon: Heart,
    title: "Supportive Environment",
    description: "Train in a friendly, encouraging atmosphere"
  },
  {
    icon: Sparkles,
    title: "World-Class Facilities",
    description: "Access to Kelsall Hill's outstanding equestrian facilities"
  },
  {
    icon: Compass,
    title: "Tailored Training",
    description: "Programs adapted to your skill level and goals"
  }
];

// Statistics data
const statistics = [
  {
    number: "200+",
    label: "Happy Campers",
    description: "Trained since 2020"
  },
  {
    number: "60+",
    label: "Training Hours",
    description: "Per camp experience"
  },
  {
    number: "BHS",
    label: "Accredited",
    description: "Professional coaching"
  }
];

// FAQ data
const faqs = [
  {
    question: "What riding equipment do I need to bring?",
    answer: "You'll need your usual riding gear including boots, jodhpurs, and gloves. For cross-country, a back protector is mandatory. Current standard riding hat (non-peak) is required for all sessions."
  },
  {
    question: "What are the vaccination requirements?",
    answer: "All horses must have up-to-date vaccinations. You'll need to bring your horse's passport and vaccination record with you."
  },
  {
    question: "Can I arrange extra flatwork sessions?",
    answer: "Yes, additional flatwork sessions can be arranged. Please let us know in advance so we can schedule these around your other training sessions."
  },
  {
    question: "What's included in the camp fee?",
    answer: "The fee includes all scheduled training sessions, stabling, haylage, and access to facilities. Additional services like photography and massage are available at extra cost."
  },
  {
    question: "What happens if I need to cancel?",
    answer: "While fees are non-refundable, if we have a waiting list we'll try to swap your place with someone at your training level. Each case is handled individually."
  }
];

// Camp preparation checklist
const checklist = [
  {
    category: "Rider Equipment",
    items: [
      "Current standard riding hat (non-peak)",
      "Back protector for XC",
      "Multiple pairs of jodhpurs/breeches",
      "Riding boots and spare pair",
      "Gloves and spares",
      "Waterproof riding jacket"
    ]
  },
  {
    category: "Horse Equipment",
    items: [
      "Tack (saddle, bridle, etc.)",
      "Exercise/cooling rugs",
      "Stable rugs appropriate for weather",
      "Grooming kit",
      "First aid kit",
      "Feed and supplements"
    ]
  },
  {
    category: "Documentation",
    items: [
      "Horse passport",
      "Vaccination records",
      "Insurance documents",
      "Emergency contact details",
      "Medical information"
    ]
  }
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const campDate = new Date('2026-06-04T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = campDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-white/60 capitalize">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CampPleasant() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [showBookingSummary, setShowBookingSummary] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBookingSummary(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-[100dvh] bg-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      <BackToHome />

      {/* Sticky Booking Summary */}
      <AnimatePresence>
        {showBookingSummary && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-blue-950/95 backdrop-blur-sm border-b border-white/20 z-50 py-4"
          >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <h3 className="text-lg font-semibold">Camp Pleasant 2026</h3>
                  <p className="text-white/60">4th-7th June</p>
                </div>
                <div className="hidden md:block">
                  <CountdownTimer />
                </div>
              </div>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative bg-blue-950 py-20 sm:py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/90 to-blue-950/95" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center"
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
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white">
              Camp Pleasant 2026
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              An Unforgettable 4-Day Equestrian Experience at Kelsall Hill
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="mb-12">
              <CountdownTimer />
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center items-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <Calendar className="h-5 w-5 text-red-400" />
                <span className="text-white/90 text-sm font-medium">4th-7th June 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <MapPin className="h-5 w-5 text-red-400" />
                <span className="text-white/90 text-sm font-medium">Kelsall Hill</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                <Award className="h-5 w-5 text-red-400" />
                <span className="text-white/90 text-sm font-medium">BHS Accredited Coaches</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center"
            >
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              >
                Secure Your Place
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Experience Camp Pleasant</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Take a glimpse into our world-class facilities and training sessions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="w-full h-[250px] flex items-center justify-center bg-white/5 rounded-xl p-2"
              >
                <img 
                  src={image}
                  alt={`Camp Pleasant Gallery ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Our Impact</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-red-500/20 rounded-full mb-6">
                    {index === 0 && <Users className="w-8 h-8 text-red-400" />}
                    {index === 1 && <Clock className="w-8 h-8 text-red-400" />}
                    {index === 2 && <Award className="w-8 h-8 text-red-400" />}
                  </div>
                  <div className="text-5xl font-bold text-red-400 mb-3">{stat.number}</div>
                  <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-white/70 text-center">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Why Choose Camp Pleasant?</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300"
              >
                <highlight.icon className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{highlight.title}</h3>
                <p className="text-white/90">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Your Camp Experience</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Four days of intensive training, skill development, and unforgettable memories
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Day Schedule */}
            <motion.div variants={fadeInRight}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Daily Schedule</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Thursday, 4th June</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">4:15 PM onwards:</span> Arrival and check-in
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Evening:</span> Optional pre-camp massage with Helen Rose
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">7:00 PM:</span> Welcome briefing and group introductions
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Friday - Saturday Training</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Morning:</span> Show jumping sessions in indoor arena
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Afternoon:</span> Cross-country training
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Evening:</span> Optional flat work sessions by arrangement
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Sunday, 7th June</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Morning:</span> Final training sessions
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">10:00 AM:</span> Camp conclusion and departure
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div variants={fadeInRight}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">What's Included</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Training</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>6 intensive training sessions (SJ & XC)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Optional flatwork sessions</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Personalized feedback and development plans</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Facilities</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Access to indoor and outdoor arenas</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Cross-country course access</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Stabling and haylage included</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Extras</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Professional photography available</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Spillers nutrition consultation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Equine massage services</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Groups Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Training Groups</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Choose the group that best matches your current skill level and goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Trophy className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Advanced Group</h3>
              <div className="space-y-4">
                <p className="text-white/90 font-semibold">80cm+ with fillers</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Complex course combinations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Technical XC questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Advanced striding exercises</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Award className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Intermediate Group</h3>
              <div className="space-y-4">
                <p className="text-white/90 font-semibold">60/70cm with fillers</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Progressive course building</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Confidence building exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Introduction to related distances</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Star className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Starter Group</h3>
              <div className="space-y-4">
                <p className="text-white/90 font-semibold">50/60cm fillers at the side</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Foundation jumping exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Basic course navigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Optional flat work sessions</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Camper Stories</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Hear from riders who've experienced Camp Pleasant
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 items-center">
                {/* Content Section */}
                <div className="md:col-span-4 text-center">
                  {/* Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 font-light italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-white/70 text-sm mb-3">
                      {testimonials[currentTestimonial].location}
                    </p>
                    <div className="px-3 py-1 bg-red-600/20 rounded-full">
                      <span className="text-red-400 text-xs font-medium">
                        Camp Pleasant {testimonials[currentTestimonial].year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Stay With Us</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Choose from a range of comfortable accommodation options
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Home className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Static Caravans</h3>
              <div className="space-y-4">
                <p className="text-white/90">£65 for up to 6 people</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Two caravans available on site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Fully equipped kitchen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Comfortable living space</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Home className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Camping</h3>
              <div className="space-y-4">
                <p className="text-white/90">Bring your own accommodation</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Suitable for wagons & trailers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Tent camping welcome</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Access to site facilities</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <MapPin className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Local B&Bs</h3>
              <div className="space-y-4">
                <p className="text-white/90">Comfortable local options</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Various B&Bs nearby</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Book directly with providers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Recommendations available</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">On-Site Facilities</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Coffee className="h-5 w-5 text-red-400" />
                <span className="text-white/90">Kelsall Cafe (9am-5pm)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Utensils className="h-5 w-5 text-red-400" />
                <span className="text-white/90">Self-catering facilities</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Home className="h-5 w-5 text-red-400" />
                <span className="text-white/90">On-site showers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Essential Information</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Shield className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Safety Requirements</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Back Protectors</span>
                    <span className="text-white/80">Mandatory for all XC sessions</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Riding Hats</span>
                    <span className="text-white/80">Current standard, non-peak required</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Vaccinations</span>
                    <span className="text-white/80">Up-to-date records required</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Award className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Additional Services</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Spillers Nutrition</span>
                    <span className="text-white/80">Expert feed consultation available</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Helen Rose Massage</span>
                    <span className="text-white/80">Pre and post-training treatments</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Photography</span>
                    <span className="text-white/80">Braveheart Photography (£30 all photos)</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <FileText className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Important Notes</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Bedding</span>
                    <span className="text-white/80">Hay and shavings not included</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Haylage</span>
                    <span className="text-white/80">Included in camp fee</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Kelsall Rules</span>
                    <span className="text-white/80">No straw allowed on site</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-blue-950 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/80">
              Find answers to common questions about the camp.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={selectedFaq === index}
                onToggle={() => setSelectedFaq(selectedFaq === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 