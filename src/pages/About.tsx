import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Award, Heart, Clock, Users, Phone } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

const slideInRight = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 }
};

// Page-level animation
const pageAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const About = () => {
  // Use the mobile hook
  const isMobile = useIsMobile();
  
  // State to control when component animations start
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // After page animation completes, enable component animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 800); // Match this with page animation duration
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation props function (matching other pages)
  const getAnimationProps = (delay = 0) => {
    // For mobile devices, use simpler animations
    if (isMobile) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { 
          duration: 0.3,
          delay: delay * 0.5 // Reduce delay on mobile
        }
      };
    }
    
    // Don't animate components until page is loaded
    if (!pageLoaded) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 0 }
      };
    }
    
    // Animation with reduced motion for desktop only
    return {
      initial: "initial",
      whileInView: "whileInView",
      viewport: { once: true, margin: "-50px" },
      variants: fadeIn,
      transition: { 
        duration: 0.4,
        delay,
        ease: "easeOut"
      }
    };
  };

  // Decorative animation props - simplified for mobile
  const decorativeAnimProps = !isMobile ? {
    initial: { opacity: 0 },
    animate: { opacity: 0.4 },
    transition: { duration: 1.5 }
  } : {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
    transition: { duration: 0.5 }
  };

  // Decorative animation props with delay - simplified for mobile
  const decorativeAnimPropsWithDelay = !isMobile ? {
    initial: { opacity: 0 },
    animate: { opacity: 0.3 },
    transition: { duration: 1.5, delay: 0.3 }
  } : {
    initial: { opacity: 0 },
    animate: { opacity: 0.2 },
    transition: { duration: 0.5, delay: 0.2 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="about-page"
        initial={pageAnimation.initial}
        animate={pageAnimation.animate}
        exit={pageAnimation.exit}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen bg-black text-white overflow-hidden relative"
      >
        {/* Background pattern - matching Index page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-black/95 to-black/90">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCA0OGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTggMzZjMCAyLjIxLTEuNzkgNC00IDRTMCAzOC4yMSAwIDM2czEuNzktNCA0LTRzNCAxLjc5IDQgNHptNDggMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
        </div>

        <ContactHeader />
        
        {/* Back Home Button */}
        <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
          <Link to="/">
            <Button 
              variant="outline" 
              className={`bg-black/30 hover:bg-black/50 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg ${!isMobile ? 'transition-all duration-300 hover:translate-x-[-5px]' : ''} text-sm sm:text-base`}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span className="font-medium">Back Home</span>
            </Button>
          </Link>
        </div>
        
        {/* Main content */}
        <section className="relative pt-32 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            {/* Decorative images */}
            <motion.div 
              {...decorativeAnimProps}
              className="absolute top-28 -right-20 md:block hidden z-0"
            >
              <div className={`w-[280px] h-[280px] rounded-full bg-gradient-to-br from-gold/20 via-gold/10 to-transparent backdrop-blur-sm ${!isMobile ? 'animate-pulse' : ''}`} style={!isMobile ? { animationDuration: '6s' } : {}} />
            </motion.div>
            
            <motion.div 
              {...decorativeAnimPropsWithDelay}
              className="absolute top-[60%] -left-24 md:block hidden z-0"
            >
              <div className={`w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-gold/20 via-gold/10 to-transparent backdrop-blur-sm ${!isMobile ? 'animate-pulse' : ''}`} style={!isMobile ? { animationDuration: '8s' } : {}} />
            </motion.div>
            
            <motion.div 
              {...getAnimationProps()}
              className="mb-16 text-center relative z-10"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Welcome to BeHorseSavvy!
              </h1>
              
              <div className="w-32 h-1 bg-gradient-to-r from-white to-white/50 mx-auto rounded-full" />
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16 relative z-10">
              {/* Featured image */}
              <motion.div 
                {...getAnimationProps(0.1)}
                className="md:col-span-1 flex justify-center items-start"
              >
                <div className="relative overflow-hidden rounded-xl shadow-xl border border-white/10">
                  <img 
                    src="/DSC_1374.jpg" 
                    alt="BeHorseSavvy" 
                    className={`w-full h-auto object-cover ${!isMobile ? 'transform-gpu hover:scale-105 transition-transform duration-700' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </motion.div>
              
              {/* Text content */}
              <motion.div 
                {...getAnimationProps(0.2)}
                className="md:col-span-2 prose prose-lg prose-invert"
              >
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Penny Pleasant is a British Horse Society accredited coach with over 40 years of experience in the equestrian world. Her passion for horses began at the age of six and grew steadily during her time at boarding school in North Wales, along with having her own ponies at home. From an early age, horses became a central part of her life.
                </p>
                
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Over the years, Penny has competed in a range of disciplines including show jumping, working hunter, and endurance riding. While working towards her BHS qualifications, she also raised two boys and continued to teach riders of all levels.
                </p>

                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Today, Penny runs a range of online equestrian courses she has designed herself. These support students preparing for their pre and preliminary BHS assessments, help home-educated children build confidence, and offer flexible learning for recreational riders who want to deepen their skills and knowledge.
                </p>

                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  Penny combines decades of hands-on experience with a calm and practical teaching style. She's passionate about helping each rider grow, no matter their background or goals.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              {...getAnimationProps(0.3)}
              className="prose prose-lg prose-invert mx-auto relative z-10"
            >
              <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Qualifications & Certifications</h3>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>BHS Accredited Professional Coach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Panel Judge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>BSPS Course Builder</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Pony Club Accredited Coach & Assessor</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>DBS Checked</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Safeguarding & Child Protection Certified</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>First Aid at Work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Fully Insured</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm border border-white/10 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Courses Available:</h3>
                <h4 className="text-xl font-semibold mb-4 text-white/90">BRITISH HORSE SOCIETY</h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Stage 1 Care - Online Theory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Stage 2 Care - Online Theory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Bronze Challenge Award</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Silver Challenge Award</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Horse Knowledge Part 1</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▪</span>
                    <span>Horse Knowledge Part 2</span>
                  </li>
                </ul>

                <h4 className="text-xl font-semibold mt-8 mb-4 text-white/90">NON-BHS COURSES</h4>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">☆</span>
                    <span>The BeHorseSavvy Level 1</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">☆</span>
                    <span>The BeHorseSavvy Level 2</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">☆</span>
                    <span>The BeHorseSavvy Level 3</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Core values */}
            <motion.div 
              {...getAnimationProps(0.4)}
              className="grid md:grid-cols-2 gap-8 mt-16 mb-16 relative z-10"
            >
              <div className={`bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 ${!isMobile ? 'transition-all duration-300 hover:bg-white/10' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Horse-First Approach</h3>
                </div>
                <p className="text-white/80">Our philosophy centres on respectful, horse-first training methods that develop not only technical ability but also empathy and awareness.</p>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 ${!isMobile ? 'transition-all duration-300 hover:bg-white/10' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Guidance</h3>
                </div>
                <p className="text-white/80">With BHS accreditation and extensive experience, we provide guidance grounded in both tradition and current best practices.</p>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 ${!isMobile ? 'transition-all duration-300 hover:bg-white/10' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Inclusive Learning</h3>
                </div>
                <p className="text-white/80">We welcome riders of all ages and abilities, creating tailored learning experiences for each individual's goals and needs.</p>
              </div>
              
              <div className={`bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 ${!isMobile ? 'transition-all duration-300 hover:bg-white/10' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-white/20 to-white/10 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Lifelong Journey</h3>
                </div>
                <p className="text-white/80">We believe that true horsemanship is a lifelong pursuit — and we're here to help you make every step of it rewarding.</p>
              </div>
            </motion.div>
            
            {/* Contact section */}
            <motion.div 
              {...getAnimationProps(0.5)}
              className="mt-16 relative z-10"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Contact Us
                </h2>
                
                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  Ready to begin your journey with BeHorseSavvy? We'd love to hear from you.
                </p>
                
                <div className="space-y-4">
                  <p className="text-xl text-white mb-2 flex items-center gap-2">
                    <span className="font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-white/70" />
                      Phone:
                    </span> 
                    <a 
                      href="tel:+447506600222" 
                      className={`text-white/90 ${!isMobile ? 'hover:text-white underline transition-colors duration-300' : ''}`}
                    >
                      +44 7506 600 222
                    </a>
                  </p>
                  
                  <p className="text-xl text-white mb-2 flex items-center gap-2">
                    <span className="font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-white/70" />
                      Email:
                    </span> 
                    <a 
                      href="mailto:Penelopepleasant@gmail.com" 
                      className={`text-white/90 ${!isMobile ? 'hover:text-white underline transition-colors duration-300' : ''}`}
                    >
                      Penelopepleasant@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default About; 