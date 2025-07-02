import { Link } from "react-router-dom";
import { CircleNavButton } from "@/components/CircleNavButton";
import { ContactHeader } from "@/components/ContactHeader";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";

// Light animation variant
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-black/95 to-black/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiA4YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptMCA0OGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6TTggMzZjMCAyLjIxLTEuNzkgNC00IDRTMCAzOC4yMSAwIDM2czEuNzktNCA0LTRzNCAxLjc5IDQgNHptNDggMGMwIDIuMjEtMS43OSA0LTQgNHMtNC0xLjc5LTQtNCAxLjc5LTQgNC00IDQgMS43OSA0IDR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>

      {/* Left side banner image - positioned before header to go behind */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="whileInView"
        className="absolute top-0 left-0 h-[50vh] w-[50vh] min-w-[350px] max-w-[450px] md:block hidden z-[51] md:backdrop-blur-sm shadow-2xl border-4 border-transparent bg-[#2a2a2a]"
        style={{
          background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #FF0000, #0066FF, #FFFFFF) border-box'
        }}
      >
        <img
          src="/DSC_1374.jpg"
          alt="BeHorseSavvy"
          className="object-cover w-full h-full"
          loading="eager"
          decoding="async"
          style={{
            objectPosition: "center center"
          }}
        />
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10"></div>
      </motion.div>

      <ContactHeader />
      
      <div className="relative min-h-[600px]">
        {/* Center content */}
        <div className="pt-[80px] md:pt-[100px] px-4 md:px-8 max-w-[1600px] mx-auto">
          <motion.div
            className="md:pl-[400px]"
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
            <div className="max-w-[1000px] flex flex-col gap-8 items-center">
              {/* Welcome Text */}
              <motion.div 
                variants={fadeInUp}
                className="flex-1 w-full"
              >
                <h2 className="text-4xl md:text-7xl font-bold mb-8 text-center md:text-left bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  Welcome to BeHorseSavvy
                </h2>
                
                <motion.div 
                  variants={fadeInUp}
                  className="mb-12"
                >
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
                    BHS Accredited Professional Coach, Panel Judge, Pony Club Assesor & BSPS Course Builder.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
                    Contact: Penelopepleasant@gmail.com
                  </p>
                  <motion.div 
                    variants={fadeInUp}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                  >
                    <Link 
                      to="/about"
                      className="relative text-xl bg-white text-black px-12 py-5 rounded-full hover:bg-white/90 transition-all duration-300 w-full md:w-auto font-semibold shadow-sm hover:shadow-md text-center"
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
          </motion.div>
        </div>
      </div>
      
      {/* Navigation circles */}
      <motion.div 
        {...fadeInUp}
        className="flex flex-col items-center relative z-[60]"
      >
        {/* Mobile grid */}
        <div 
          className="grid grid-cols-2 gap-6 md:hidden w-full max-w-[1200px] px-4"
        >
          <div className="flex justify-center">
            <CircleNavButton to="/behorsesavvy" color="black-gold" label="Home Education Equestrians" />
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
        </div>

        {/* Desktop layout */}
        <div
          className="hidden md:flex flex-wrap justify-center gap-2 lg:gap-12 px-2 lg:px-8 pb-8 max-w-[1200px]"
        >
          <div className="flex justify-center">
            <CircleNavButton to="/behorsesavvy" color="black-gold" label="Home Education Equestrians" />
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
        </div>
      </motion.div>

      <Footer />

      {process.env.NODE_ENV !== 'production' && (
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="/email-preview" style={{ color: '#b91c1c', fontWeight: 700, fontSize: 18, textDecoration: 'underline' }}>
            Preview Booking Emails
          </a>
        </div>
      )}
    </div>
  );
};

export default Index;

