import { Link } from "react-router-dom";
import { CircleNavButton } from "@/components/CircleNavButton";
import { ContactHeader } from "@/components/ContactHeader";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-black/95 to-black/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCA0OGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTggMzZjMCAyLjIxLTEuNzkgNC00IDRTMCAzOC4yMSAwIDM2czEuNzktNCA0LTRzNCAxLjc5IDQgNHptNDggMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>

      {/* Left side curve shape - positioned before header to go behind */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 h-[60vh] w-[35vw] min-w-[400px] max-w-[500px] bg-gradient-to-br from-white/90 to-white/80 rounded-br-[100%] md:block hidden z-[51] overflow-hidden backdrop-blur-sm"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img
              src="/WhatsApp Image 2025-05-02 at 23.25.28.jpeg"
              alt="Horse"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30"></div>
          </div>
        </div>
        <div className="relative pl-16 pt-12 pr-8 h-full flex flex-col z-10">
        </div>
      </motion.div>

      <ContactHeader />
      
      <div className="relative min-h-[600px]">
        {/* Center content */}
        <div className="pt-[80px] md:pt-[100px] px-4 md:px-8 max-w-[1600px] mx-auto">
          <div className="md:pl-[500px]">
            <div className="max-w-[1000px] flex flex-col gap-8 items-center">
              {/* Welcome Text */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 w-full"
              >
                <h2 className="text-4xl md:text-7xl font-bold mb-8 text-center md:text-left bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  Welcome to BeHorseSavvy
                </h2>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mb-12"
                >
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
                    BHS Accredited Professional Coach, Panel Judge, Pony Club Assesor & BSPS Course Builder.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
                    Contact: Penelopepleasant@gmail.com
                  </p>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col md:flex-row items-center gap-6"
                  >
                    <Link 
                      to="/about"
                      className="relative text-xl bg-white text-black px-12 py-5 rounded-full hover:bg-white/90 transition-all duration-300 w-full md:w-auto font-semibold shadow-sm hover:shadow-md"
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/case-studies" 
                      className="relative text-xl bg-white text-black px-12 py-5 rounded-full hover:bg-white/90 transition-all duration-300 w-full md:w-auto text-center font-semibold shadow-sm hover:shadow-md"
                    >
                      Case Studies
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation circles */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center relative z-10"
      >
        {/* Mobile grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-6 md:hidden w-full max-w-[1200px] px-4"
        >
          <div className="flex justify-center">
            <CircleNavButton to="/education" color="black-gold" label="Home Education Equestrians" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/courses" color="blue" label="Courses" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/clinics" color="white" label="Clinics" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/camp" color="green" label="#Campleasant" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/events" color="yellow" label="Events" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/merchandise" color="purple" label="Merchandise" />
          </div>
          <div className="col-span-2 flex justify-center">
            <CircleNavButton to="/penny-club" color="red" label="The Penny Club" />
          </div>
        </motion.div>

        {/* Desktop layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:flex flex-wrap justify-center gap-2 lg:gap-12 px-2 lg:px-8 pb-8 max-w-[1200px]"
        >
          <div className="flex justify-center">
            <CircleNavButton to="/education" color="black-gold" label="Home Education Equestrians" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/courses" color="blue" label="Courses" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/clinics" color="white" label="Clinics" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/camp" color="green" label="#Campleasant" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/events" color="yellow" label="Events" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/merchandise" color="purple" label="Merchandise" />
          </div>
          <div className="flex justify-center">
            <CircleNavButton to="/penny-club" color="red" label="The Penny Club" />
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Index;

