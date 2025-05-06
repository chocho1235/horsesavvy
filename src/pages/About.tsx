import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
};

const About = () => {
  // Animation props function (matching other pages)
  const getAnimationProps = () => {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';
    
    // Simple animation with reduced motion/mobile consideration
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
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
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
            className="bg-black/30 hover:bg-black/50 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span className="font-medium">Back Home</span>
          </Button>
        </Link>
      </div>
      
      {/* Main content */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            {...getAnimationProps()}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              About BeHorseSavvy
            </h1>
          </motion.div>
          
          <motion.div 
            {...getAnimationProps()}
            transition={{ delay: 0.1 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              BeHorseSavvy was founded with a passion for horses and a commitment to providing quality equestrian education. 
              As a BHS Accredited Professional Coach, Panel Judge, Pony Club Assessor & BSPS Course Builder, I bring 
              extensive experience to help riders and horse enthusiasts of all levels.
            </p>
            
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Our courses are designed to make horse knowledge accessible to everyone, whether you're preparing for 
              official qualifications or simply want to deepen your understanding of these magnificent animals.
            </p>
            
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              With a focus on both theoretical knowledge and practical skills, our programs provide comprehensive education 
              that prepares you for success in the equestrian world.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-6 text-white">Our Mission</h2>
            
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              To inspire and educate the next generation of horse enthusiasts and professionals through accessible, 
              high-quality training programs that prioritize both horse welfare and rider development.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-6 text-white">Contact Us</h2>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Email: Penelopepleasant@gmail.com
            </p>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About; 