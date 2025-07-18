import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles, Clock, BookOpen, Users, Globe, ChevronDown, ArrowLeft, Award, User, Search, MapPin, ChevronLeft, Star, Quote } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { BackToHome } from "@/components/BackToHome";
import { useIsMobile } from "@/hooks/use-mobile";
import FaqItem from "@/components/FaqItem";
import { CourseCheckout } from "@/components/checkout/CourseCheckout";
import { getCourseConfig } from "@/config/courses";

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

// UK postcodes covered for practical training
const TARGET_POSTCODE = "BB18 6TD";
const MAX_DISTANCE_MILES = 90;

// Function to calculate distance between two postcodes using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Function to get coordinates from postcode using postcodes.io API
const getCoordinates = async (postcode: string): Promise<{lat: number, lon: number} | null> => {
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    const data = await response.json();
    if (data.result) {
      return {
        lat: data.result.latitude,
        lon: data.result.longitude
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching postcode data:', error);
    return null;
  }
};

// Testimonials data
const testimonials = [
  {
    name: "Ella",
    location: "Bronze Challenge Award Student",
    rating: 5,
    text: "Ella started her BHS challenge awards August 2024 she work hard each week Ella started as a  complete novice with basic knowledge around caring for horses. Ella is now much more confident and has good knowledge she often tells mum and dad off for not doing things the correct way. February 2025 Ella completed all her bronze awards and working towards her silver. we are so grateful penny is very accommodating and Ella's confidence and knowledge hasn't gone unnoticed. ",
    course: "Bronze Challenge Award",
    image: "/ellatestimonialbronze.png"
  },
  {
    name: "Karla S",
    location: "Bronze Challenge Award Student",
    rating: 5,
    text: "I really enjoy learning with penny for the challenge awards, my aim is to get to BHS stage 2. The courses are fun, very educational and Penny also makes it easy to understand and remember. These courses are very good to do, if you get stressed about exams situations.",
    course: "Bronze Challenge Award",
    image: "/image copy 7.png"
  },
  {
    name: "Isla F",
    location: "Bronze Challenge Award Student",
    rating: 5,
    text: "I like doing the challenge awards, Penny makes it fun to learn, I have also made many friends on the course. I like learning all about ponies and how I can be a great owner for them. I think sometimes now Penny has made me know things that adults wouldn't even know.",
    course: "Bronze Challenge Award",
    image: "/testimonial-placeholder.svg"
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Bronze() {
  const [postcodeResult, setPostcodeResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [preSelectedPackage, setPreSelectedPackage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const postcodeInputRef = useRef<HTMLInputElement>(null);

  // Get Bronze course configuration
  const bronzeConfig = getCourseConfig('bronze-challenge');

  const handleFaqToggle = useCallback((index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  }, []);

  const handleEnrollClick = useCallback(() => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const checkPostcode = useCallback(async () => {
    const val = postcodeInputRef.current?.value.trim() ?? "";
    if (!val) {
      setPostcodeResult(null);
      return;
    }

    setIsChecking(true);
    try {
      // Format postcode (add space if missing)
      const formattedPostcode = val.replace(/([A-Z]{1,2}[0-9][0-9A-Z]?)([0-9][A-Z]{2})/i, '$1 $2').toUpperCase();
      
      // Get coordinates for both postcodes
      const [userCoords, targetCoords] = await Promise.all([
        getCoordinates(formattedPostcode),
        getCoordinates(TARGET_POSTCODE)
      ]);

      if (!userCoords || !targetCoords) {
        setPostcodeResult({
          available: false,
          message: "Sorry, we couldn't verify your postcode. Please try again."
        });
        return;
      }

      // Calculate distance
      const distance = calculateDistance(
        userCoords.lat,
        userCoords.lon,
        targetCoords.lat,
        targetCoords.lon
      );

      const isWithinRange = distance <= MAX_DISTANCE_MILES;
      
      setPostcodeResult({
        available: isWithinRange,
        message: isWithinRange
          ? `Great news! You're within our service area (${Math.round(distance)} miles from our location).`
          : `Sorry, you're ${Math.round(distance)} miles from our location, which is outside our service area (${MAX_DISTANCE_MILES} miles).`
      });
      
      if (isWithinRange) {
        setTimeout(() => {
          window.location.href = '/bronze-practical';
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking postcode:', error);
      setPostcodeResult({
        available: false,
        message: "Sorry, there was an error checking your postcode. Please try again."
      });
    } finally {
      setIsChecking(false);
    }
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="min-h-[100dvh] bg-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      <BackToHome />
      
      {/* Hero Section */}
      <section className="relative bg-blue-950 py-20 sm:py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/90 to-blue-950/95 shadow-2xl" style={{boxShadow: '0 0 80px 20px rgba(30, 41, 59, 0.7)'}} />
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
                Bronze Challenge Award
              </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              Build confidence and essential skills with this comprehensive online equestrian qualification.<br />
              <span className='text-white/70 text-base block mt-2'>Each book (£30) comes with its own certificate. Complete all four books (£97) to receive your BHS Bronze Award Certificate.</span>
              </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <Award className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">BHS Approved</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <Clock className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">12 Week Access</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                  <Users className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">All Levels Welcome</span>
                </div>
              </motion.div>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center gap-4"
            >
                <Button 
                  onClick={handleEnrollClick}
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Journey - £97
                </Button>
                <p className="text-white/70 text-sm">No prior experience required</p>
                <Link 
                  to="/bronze-practical" 
                  className="text-white/50 hover:text-white/70 text-sm"
                >
                  Looking for in-person training?
                </Link>
              </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Course Details</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Complete each book to receive individual BHS Bronze Certificates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Book 1</h3>
              <p className="text-white/80">Knowing Your Horse - Understand equine behaviour and communication.</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Book 2</h3>
              <p className="text-white/80">Caring for Your Horse - Essential care and management techniques.</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Book 3</h3>
              <p className="text-white/80">Handling Your Horse - Master safe and effective horse handling techniques.</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Book 4</h3>
              <p className="text-white/80">Lungeing Your Horse - Learn the fundamentals of lunging a horse safely and effectively.</p>
            </motion.div>
                </div>
              </div>
      </section>

      {/* Bronze Book 1: Knowing Your Horse Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Detailed Course Content</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
              <img 
                src="/image copy 2.png" 
                alt="Bronze Book 1: Knowing Your Horse" 
                className="rounded-xl shadow-2xl w-full max-w-xs md:max-w-sm aspect-[3/4] object-cover h-auto border-4 border-red-500/20 bg-white/10 p-4"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Bronze Book 1: Knowing Your Horse</h2>
              <div className="w-20 h-1 bg-red-500 mb-6"></div>
              <div className="space-y-8 text-white/90 text-lg">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Identification</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span>Describe a horse by colour, face and leg markings, and gender</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Anatomy</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Identify key points of the horse's body</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Recognise the main parts of the horse's foot</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Health</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>List signs of good and poor health</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Carry out daily health checks</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Recognise when and why a horse needs shoeing or trimming</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Describe ways to reduce the risk of disease on a yard</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Feeding</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Understand the rules of feeding</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Identify hay and haylage</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Describe different methods for providing hay or haylage</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Explain how to soak hay</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Identify ways to provide water in the stable</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Fittening</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Explain why a ridden horse should be fit</span></li>
                    <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>Recognise signs that a horse may not be fit</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bronze Book 2: Caring for Your Horse Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-2 flex justify-center">
            <img 
              src="/book 1.png" 
              alt="Bronze Book 2: Caring for Your Horse" 
              className="rounded-xl shadow-2xl w-full max-w-xs md:max-w-sm aspect-[3/4] object-cover h-auto border-4 border-red-500/20 bg-white/10 p-4"
            />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Bronze Book 2: Caring for Your Horse</h2>
            <div className="w-20 h-1 bg-red-500 mb-6"></div>
            <div className="space-y-8 text-white/90 text-lg">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Behaviour</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can describe the horse's natural behaviours and instincts</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can describe a horse's vision and how this may affect his behaviour</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Stable Care</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can list different types of bedding</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can skip out a stable and tidy the bed</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can clean and refill a water bucket or water drinker</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Field Care</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can give reasons to support regular turnout</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can describe suitable fencing for field boundaries</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can carry out routine daily field checks</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Rugs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can identify and describe types of rug and their use</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can put on and take off a rug</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Grooming</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can describe the benefits for grooming horses</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can explain the use of the items in a grooming kit</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can groom a horse</span></li>
                  <li className="flex items-start"><span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span><span>I can care for a horse after exercise</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bronze Book 3: Handling Your Horse Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img 
              src="/handling hotse book 3.png" 
              alt="Bronze Book 3: Handling Your Horse" 
              className="rounded-xl shadow-2xl w-full max-w-xs md:max-w-sm aspect-[3/4] object-cover h-auto border-4 border-red-500/20 bg-white/10 p-4"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Bronze Book 3: Handling Your Horse</h2>
            <div className="w-20 h-1 bg-red-500 mb-6"></div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Bronze Award</h3>
            </div>
            
            <div className="space-y-6 text-white/90 text-lg">
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>How to work safely on a yard</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>How your behaviour or actions could affect your horse</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>How to lead your horse</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>How to clean your tack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bronze Book 4: Lungeing Your Horse Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-2 flex justify-center">
            <img 
              src="/Untitled design (31).png" 
              alt="Bronze Book 4: Lungeing Your Horse" 
              className="rounded-xl shadow-2xl w-full max-w-xs md:max-w-sm aspect-[3/4] object-cover h-auto border-4 border-red-500/20 bg-white/10 p-4"
            />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Bronze Book 4: Lungeing Your Horse</h2>
            <div className="w-20 h-1 bg-red-500 mb-6"></div>
            
            <div className="mb-8">
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Lungeing will add variation to your horse's exercise and is a great way to build a trusting relationship with your horse.
              </p>
              <h3 className="text-2xl font-semibold text-white mb-4">Bronze Award</h3>
            </div>
            
            <div className="space-y-4 text-white/90 text-lg">
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can give reasons for lungeing a horse</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can list the equipment required to lunge a horse</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can tack up for lungeing</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can lead a horse in preparation for lungeing</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can coil the lunge line</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can change the whip over</span>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3 flex-shrink-0"></span>
                <span>I can untack the horse after lungeing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Tutor */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="relative overflow-hidden rounded-xl shadow-2xl">
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
              className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Your Qualified Instructor</h2>
              <div className="w-20 h-1 bg-red-500 mx-auto md:mx-0 mb-8"></div>
              <h3 className="text-xl font-semibold text-white mb-4">Penny Pleasant</h3>
              <div className="text-lg text-white/90 leading-relaxed mb-6">
                <p className="mb-4">
                  BHS Professional Accredited Coach<br/>
                  • Pony Club Accredited Trainer<br/>
                  • Pony Club Assessor<br/>
                  • BSPS Course Builder<br/>
                  • Panel Judge
                </p>
                <p className="mb-4">
                  Trained in relative adjustment
                </p>
                <p>
                  Fully Insured<br/>
                  DBS Checked<br/>
                  Safeguarding Certified
                </p>
                  </div>
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

      {/* Testimonials Carousel */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">What Our Students Say</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Join hundreds of riders who have transformed their equestrian journey with the Bronze Challenge Award
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <motion.div 
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 opacity-20">
                <Quote className="w-12 h-12 text-red-400" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-5 gap-6 items-center"
                >
                  {/* Image Section */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="relative">
                      <img 
                        src={testimonials[currentTestimonial].image}
                        alt={`${testimonials[currentTestimonial].name} with certificate`}
                        className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl shadow-2xl border-4 border-white/20"
                      />
                      {/* Certificate Badge Overlay */}
                      <div className="absolute -bottom-3 -right-3 bg-red-600 text-white px-2 py-1 rounded-lg shadow-lg transform rotate-12">
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span className="text-xs font-bold">BRONZE CERTIFIED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:col-span-3 text-center md:text-left">
                    {/* Stars */}
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 font-light italic">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex flex-col items-center md:items-start">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-white/70 text-sm mb-3">
                        {testimonials[currentTestimonial].location}
                      </p>
                      <div className="px-3 py-1 bg-red-600/20 rounded-full">
                        <span className="text-red-400 text-xs font-medium">
                          {testimonials[currentTestimonial].course}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-red-500 scale-110'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Course Details</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-red-400" />
                </div>
              <h3 className="text-lg font-semibold text-white mb-2">Access</h3>
              <p className="text-white/80">12 weeks access to course materials</p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Format</h3>
              <p className="text-white/80">Penny travels to your yard for practical sessions with your own horse</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-400" />
                </div>
              <h3 className="text-lg font-semibold text-white mb-2">Certification</h3>
              <p className="text-white/80">Official BHS Bronze Award</p>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center">
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
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Perfect For</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
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

            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300">
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

      {/* FAQ Section */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onToggle={() => handleFaqToggle(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Coaching on Your Horse - Moved to bottom */}
      <section className="py-12 bg-blue-950/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Coaching on Your Horse</h2>
            <p className="text-whdite/80 mb-6">For those who want personalised coaching with their own horse, we offer in-person sessions in select areas.</p>
            
            <div className="max-w-xl mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    ref={postcodeInputRef}
                    placeholder="Enter postcode (e.g. BB18 6TD)"
                    className="w-full px-4 py-3 bg-blue-900/50 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 shadow-inner transition-all"
                  />
                </div>
                <Button
                  onClick={checkPostcode}
                  disabled={isChecking}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors flex items-center justify-center h-[46px] border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isChecking ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  {isChecking ? 'Checking...' : 'Check Area'}
                </Button>
              </div>

              {postcodeResult && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`mt-4 p-4 rounded ${
                    postcodeResult.available
                      ? "bg-green-900/20 border border-green-500/30"
                      : "bg-red-900/20 border border-red-500/30"
                  }`}
                >
                  <p
                    className={`text-sm text-center ${
                      postcodeResult.available
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {postcodeResult.message}
                    {postcodeResult.available && (
                      <span className="block mt-2 text-green-300">
                        Redirecting to coaching details...
                      </span>
                    )}
                  </p>
                </motion.div>
              )}
            </div>

            <Link 
              to="/bronze-practical" 
              onClick={scrollToTop}
              className="inline-flex items-center text-red-400 hover:text-red-300 font-medium"
            >
              Learn more about coaching options
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12">
            <div className="relative mb-12">
              <img 
                src="/image copy 3.png" 
                alt="Horse and rider" 
                className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl border-4 border-white/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent rounded-xl"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Start Today</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Join hundreds of riders who have built their confidence and skills with the Bronze Challenge Award
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Individual Books Option */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:border-white/40 transition-all duration-300 cursor-pointer group" onClick={() => {
                setPreSelectedPackage(null);
                setShowCheckout(true);
              }}>
                                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Individual Books</h3>
                    <p className="text-white/80">Complete one book at a time with its own certificate</p>
                  </div>
                
                <div className="space-y-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Book 1: Knowing Your Horse</span>
                      <span className="text-red-400 font-semibold">£30</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Book 2: Caring for Your Horse</span>
                      <span className="text-red-400 font-semibold">£30</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Book 3: Handling Your Horse</span>
                      <span className="text-red-400 font-semibold">£30</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Book 4: Lungeing Your Horse</span>
                      <span className="text-red-400 font-semibold">£30</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors duration-300 py-3 group-hover:bg-white/20">
                  Select Books
                </Button>
              </div>

              {/* Complete Course Option */}
              <div className="bg-white/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 hover:border-red-500/50 transition-all duration-300 relative cursor-pointer group" onClick={() => {
                setPreSelectedPackage('bronze-complete');
                setShowCheckout(true);
              }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Best Value
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Complete Course</h3>
                  <p className="text-white/80">All 4 books + All Certificates</p>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <div className="text-4xl font-bold text-red-500">£97</div>
                  <div className="ml-2 text-white/60 line-through">£120</div>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-white/90">
                    <ChevronRight className="w-5 h-5 text-red-400 mr-2" />
                    All 4 books included
                  </li>
                  <li className="flex items-center text-white/90">
                    <ChevronRight className="w-5 h-5 text-red-400 mr-2" />
                    4 Individual Certificates
                  </li>
                  <li className="flex items-center text-white/90">
                    <ChevronRight className="w-5 h-5 text-red-400 mr-2" />
                    BHS Bronze Award Certificate
                  </li>
                  <li className="flex items-center text-white/90">
                    <ChevronRight className="w-5 h-5 text-red-400 mr-2" />
                    Save £23 on individual prices
                  </li>
                  <li className="flex items-center text-white/90">
                    <ChevronRight className="w-5 h-5 text-red-400 mr-2" />
                    12 weeks access
                  </li>
                </ul>

                <Button className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-4 text-lg font-semibold rounded-lg group-hover:bg-red-700">
                  Enroll Now
                </Button>
                <p className="text-white/60 text-sm mt-4 text-center">Secure your place today • No hidden fees</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />

      {/* Course Checkout Modal */}
      {showCheckout && bronzeConfig && (
        <CourseCheckout
          courseConfig={bronzeConfig}
          preSelectedPackage={preSelectedPackage}
          onClose={() => {
            setShowCheckout(false);
            setPreSelectedPackage(null);
          }}
        />
      )}
    </div>
  );
} 