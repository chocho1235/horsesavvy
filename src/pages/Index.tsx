
import { Link } from "react-router-dom";
import { CircleNavButton } from "@/components/CircleNavButton";
import { PhotoBubble } from "@/components/PhotoBubble";
import { ContactHeader } from "@/components/ContactHeader";
import horseImage1 from "/lovable-uploads/de221d7a-d3a6-4182-8567-de2ca913847b.png";

const Index = () => {
  // Sample horse images - in a real app, these would be imported proper assets
  const navImages = {
    welcome: horseImage1,
    learning: horseImage1,
    club: horseImage1,
    events: horseImage1,
    clinics: horseImage1,
    education: horseImage1,
    merchandise: horseImage1,
    camp: horseImage1
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ContactHeader />
      
      <div className="relative pt-8 pb-20 px-4 md:px-8">
        {/* Left side curve shape - adjusted to be fully visible */}
        <div className="absolute top-0 left-0 h-[450px] w-[250px] sm:w-[300px] bg-white rounded-br-[100%] z-0">
          <div className="pl-6 sm:pl-16 pt-16 sm:pt-24">
            <h1 className="text-4xl sm:text-6xl font-bold text-black">Welcome</h1>
          </div>
        </div>
        
        {/* Photo bubbles - repositioned for better layout */}
        <div className="relative z-10 mt-10">
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[10px] left-[260px] sm:left-[320px]" 
            alt="Horse training session"
          />
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[130px] left-[200px] sm:left-[260px]" 
            alt="Horse jumping obstacle"
          />
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[250px] left-[140px] sm:left-[200px]" 
            alt="Horse care demonstration" 
          />
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[370px] left-[80px] sm:left-[140px]" 
            alt="Show horse performance"
          />
          
          {/* Arrow pointing to bubbles - adjusted position */}
          <div className="absolute top-[110px] left-[380px] sm:left-[460px] hidden md:block">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 40C60 10 110 40 110 40" stroke="white" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Text next to arrow - adjusted position */}
          <div className="absolute top-[60px] left-[380px] sm:left-[550px] max-w-[450px] hidden md:block">
            <p className="text-xl sm:text-2xl text-white">Horse training images</p>
            <p className="text-xl sm:text-2xl text-white">showcasing our expertise</p>
          </div>
        </div>
        
        {/* Center content - adjusted for better positioning */}
        <div className="pt-[480px] sm:pt-[450px] md:pt-[270px] md:pl-[450px] pr-4 md:pr-12 max-w-full md:max-w-[1000px] relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Welcome to BeHorseSavvy</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl mb-8">Professional Horse Training & Education</h3>
          <p className="text-lg mb-12">Expert guidance for riders of all levels. We specialize in creating strong partnerships between horses and their owners through proven training methods.</p>
          
          <div className="mt-12">
            <Link to="/case-studies" className="text-2xl md:text-4xl font-semibold hover:underline">
              Case Studies link
            </Link>
          </div>
        </div>
        
        {/* Person outline illustration - adjusted position */}
        <div className="absolute top-[150px] right-[20px] sm:right-[100px] z-0 hidden md:block">
          <svg width="320" height="420" viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M160 15C193 15 220 42 220 75C220 108 193 135 160 135C127 135 100 108 100 75C100 42 127 15 160 15Z" stroke="white" strokeWidth="6"/>
            <path d="M115 135C70 165 60 210 60 270C60 330 90 380 160 380C230 380 260 330 260 270C260 210 250 165 205 135" stroke="white" strokeWidth="6"/>
            <path d="M100 170C70 200 40 230 40 300" stroke="white" strokeWidth="6"/>
            <path d="M220 170C250 200 280 230 280 300" stroke="white" strokeWidth="6"/>
          </svg>
        </div>
      </div>
      
      {/* Navigation circles - now with images */}
      <div className="flex justify-center gap-4 md:gap-6 mt-10 px-4 pb-12 overflow-x-auto max-w-full mx-auto">
        <CircleNavButton to="/" label="Welcome" imageSrc={navImages.welcome} />
        <CircleNavButton to="/learning" label="Interactive & Online Learning" imageSrc={navImages.learning} />
        <CircleNavButton to="/penny-club" label="The Penny Club" imageSrc={navImages.club} />
        <CircleNavButton to="/events" label="Events & Shows" imageSrc={navImages.events} />
        <CircleNavButton to="/clinics" label="Clinics" imageSrc={navImages.clinics} />
        <CircleNavButton to="/education" label="Home Education Courses" imageSrc={navImages.education} />
        <CircleNavButton to="/merchandise" label="Merchandise" imageSrc={navImages.merchandise} />
        <CircleNavButton to="/camp" label="CampPeasant" imageSrc={navImages.camp} />
      </div>
    </div>
  );
};

export default Index;
