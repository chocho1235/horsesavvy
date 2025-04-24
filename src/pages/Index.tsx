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
          {/* Top Right Bubble - On the curve near top */}
          <PhotoBubble 
            imageSrc={horseImages.horse1} 
            size="lg"
            className="absolute right-[-60px] top-[80px]"
          />

          {/* Upper Middle Right Bubble - Following the curve */}
          <PhotoBubble 
            imageSrc={horseImages.horse2} 
            size="lg"
            className="absolute right-[-80px] top-[220px]"
          />

          {/* Lower Middle Right Bubble - Along the curve */}
          <PhotoBubble 
            imageSrc={horseImages.horse3} 
            size="lg"
            className="absolute right-[-60px] top-[360px]"
          />

          {/* Bottom Right Bubble - Near the bottom curve */}
          <PhotoBubble 
            imageSrc={horseImages.horse4} 
            size="lg"
            className="absolute right-[-20px] top-[480px]"
          />

          {/* Bottom Bubble - At the curve's end */}
          <PhotoBubble 
            imageSrc={horseImages.horse5} 
            size="lg"
            className="absolute right-[100px] top-[540px]"
          />
        </div>
      </div>

      <ContactHeader />
      
      <div className="relative min-h-[800px]">
        {/* Mobile Welcome Header */}
        <div className="md:hidden block bg-white w-full py-6 px-4">
          <h1 className="text-4xl font-bold text-black text-center">Welcome</h1>
        </div>
        
        {/* Center content */}
        <div className="pt-[120px] md:pt-[200px] px-4 md:px-8 max-w-[1600px] mx-auto">
          <div className="md:pl-[500px]">
            <div className="max-w-[600px]">
              <h2 className="text-4xl md:text-7xl font-bold mb-12 text-center md:text-left">Welcome to BeHorseSavvy</h2>
              
              <div className="mb-16">
                <p className="text-lg md:text-xl leading-relaxed mb-10">
                  Penny Pleasant is a skilled equestrian professional with over 40 years of experience in Working Hunter and Show Jumping. A Panel Judge and Ride Judge, as well as a BSPS Course Builder, she works with riders from complete novices to top-level competitors.
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 mt-16 px-4 md:px-12 pb-16 overflow-y-auto max-w-[1600px] mx-auto">
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
    </div>
  );
};

export default Index;

