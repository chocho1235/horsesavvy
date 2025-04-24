import { Link } from "react-router-dom";
import { CircleNavButton } from "@/components/CircleNavButton";
import { ContactHeader } from "@/components/ContactHeader";
import { PhotoBubble } from "@/components/PhotoBubble";

// Stock horse images
const horseImages = {
  horse1: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  horse2: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80",
  horse3: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  horse4: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  horse5: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80"
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Left side curve shape - positioned before header to go behind */}
      <div className="absolute top-0 left-0 h-[60vh] w-[35vw] min-w-[400px] max-w-[500px] bg-white rounded-br-[100%] md:block hidden z-[51]">
        <div className="pl-16 pt-20">
          <h1 className="text-7xl font-bold text-black">Welcome</h1>
        </div>

        {/* Photo Bubbles */}
        <div className="absolute inset-0">
          {/* Top Right Bubble */}
          <PhotoBubble 
            imageSrc={horseImages.horse1} 
            size="lg"
            className="absolute right-[-130px] top-[10%]"
          />

          {/* Upper Right Bubble */}
          <PhotoBubble 
            imageSrc={horseImages.horse2} 
            size="lg"
            className="absolute right-[-100px] top-[28%]"
          />

          {/* Middle Right Bubble */}
          <PhotoBubble 
            imageSrc={horseImages.horse3} 
            size="lg"
            className="absolute right-[-35px] top-[46%]"
          />

          {/* Lower Right Bubble */}
          <PhotoBubble 
            imageSrc={horseImages.horse4} 
            size="lg"
            className="absolute right-[-15px] top-[64%]"
          />

          {/* Bottom Right Bubble */}
          <PhotoBubble 
            imageSrc={horseImages.horse5} 
            size="lg"
            className="absolute right-[40px] top-[82%]"
          />
        </div>
      </div>

      <ContactHeader />
      
      <div className="relative min-h-[600px]">
        {/* Mobile Welcome Header */}
        <div className="md:hidden block bg-white w-full py-6 px-4">
          <h1 className="text-4xl font-bold text-black text-center">Welcome</h1>
        </div>
        
        {/* Center content */}
        <div className="pt-[100px] md:pt-[150px] px-4 md:px-8 max-w-[1600px] mx-auto">
          <div className="md:pl-[500px]">
            <div className="max-w-[600px]">
              <h2 className="text-4xl md:text-7xl font-bold mb-8 text-center md:text-left">Welcome to BeHorseSavvy</h2>
              
              <div className="mb-12">
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  BHS Accredited Professional Coach, Panel Judge, Pony Club Assesor & BSPS Course Builder.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  Contact: Penelopepleasant@gmail.com
                </p>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <button className="text-xl bg-white text-black px-12 py-5 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto font-semibold">
                    Read More
                  </button>
                  <Link 
                    to="/case-studies" 
                    className="text-xl bg-white text-black px-12 py-5 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto text-center font-semibold"
                  >
                    Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation circles */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-8 px-4 md:px-8 pb-8 max-w-[1600px] mx-auto">
        <div className="flex justify-center">
          <CircleNavButton to="/education" color="black-gold" label="Home Education Equestrians" />
        </div>
        <div className="flex justify-center">
          <CircleNavButton to="/learning" color="blue" label="Online & Interactive Learning" />
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
        <div className="col-span-2 md:col-span-3 flex justify-center">
          <CircleNavButton to="/penny-club" color="red" label="The Penny Club" />
        </div>
      </div>

      {/* Powered by Equinology */}
      <div className="flex justify-center pb-8">
        <a 
          href="https://equinology.co.uk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative inline-block text-white text-sm font-medium overflow-hidden group"
        >
          <span className="relative z-10">Powered by Equinology</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </a>
      </div>
    </div>
  );
};

export default Index;

