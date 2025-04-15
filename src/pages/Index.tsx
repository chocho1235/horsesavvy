
import { Link } from "react-router-dom";
import { CircleNavButton } from "@/components/CircleNavButton";
import { PhotoBubble } from "@/components/PhotoBubble";
import { ContactHeader } from "@/components/ContactHeader";
import horseImage1 from "/lovable-uploads/de221d7a-d3a6-4182-8567-de2ca913847b.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ContactHeader />
      
      <div className="relative min-h-[650px]">
        {/* Left side curve shape */}
        <div className="absolute top-0 left-0 h-[600px] w-[300px] bg-white rounded-br-[100%]">
          <div className="pl-16 pt-24">
            <h1 className="text-6xl font-bold text-black">Welcome</h1>
          </div>
        </div>
        
        {/* Photo bubbles */}
        <div className="relative z-10">
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[30px] left-[320px]" 
          />
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[170px] left-[250px]" 
          />
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[310px] left-[180px]" 
          />
          <PhotoBubble 
            imageSrc={horseImage1} 
            size="lg" 
            className="absolute top-[420px] left-[100px]" 
          />
          
          {/* Arrow pointing to bubbles */}
          <div className="absolute top-[130px] left-[460px]">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 40C60 10 110 40 110 40" stroke="white" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Text next to arrow */}
          <div className="absolute top-[80px] left-[550px] max-w-[450px]">
            <p className="text-2xl text-white">Different little pics relevant</p>
            <p className="text-2xl text-white">to the page in these bubbles</p>
          </div>
        </div>
        
        {/* Center content */}
        <div className="pt-[270px] pl-[450px] pr-12 max-w-[1000px]">
          <h2 className="text-5xl font-bold mb-6">Welcome to BeHorseSavvy</h2>
          <h3 className="text-4xl mb-8">Bla, Bla, Bla (About Us)</h3>
          <h3 className="text-4xl mb-12">Penny Bio Here</h3>
          
          <div className="mt-20">
            <Link to="/case-studies" className="text-4xl font-semibold hover:underline">
              Case Studies link
            </Link>
          </div>
        </div>
        
        {/* Person outline illustration */}
        <div className="absolute top-[150px] right-[100px] z-0">
          <svg width="320" height="420" viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M160 15C193 15 220 42 220 75C220 108 193 135 160 135C127 135 100 108 100 75C100 42 127 15 160 15Z" stroke="white" strokeWidth="6"/>
            <path d="M115 135C70 165 60 210 60 270C60 330 90 380 160 380C230 380 260 330 260 270C260 210 250 165 205 135" stroke="white" strokeWidth="6"/>
            <path d="M100 170C70 200 40 230 40 300" stroke="white" strokeWidth="6"/>
            <path d="M220 170C250 200 280 230 280 300" stroke="white" strokeWidth="6"/>
          </svg>
        </div>
      </div>
      
      {/* Navigation circles */}
      <div className="flex justify-center gap-6 mt-20 px-6 pb-8 overflow-x-auto max-w-[1400px] mx-auto">
        <CircleNavButton to="/" color="white" label="Welcome" />
        <CircleNavButton to="/learning" color="yellow" label="Interactive & Online Learning" />
        <CircleNavButton to="/penny-club" color="red" label="The Penny Club" />
        <CircleNavButton to="/events" color="blue" label="Events & Shows" />
        <CircleNavButton to="/clinics" color="white" label="Clinics" />
        <CircleNavButton to="/education" color="yellow" label="Home Education Courses" />
        <CircleNavButton to="/merchandise" color="red" label="Merchandise" />
        <CircleNavButton to="/camp" color="blue" label="CampPeasant" />
      </div>
    </div>
  );
};

export default Index;
