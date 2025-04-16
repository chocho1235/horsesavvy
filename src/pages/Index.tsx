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
      <div className="absolute top-0 left-0 h-[40vh] w-[25vw] min-w-[250px] max-w-[300px] bg-white rounded-br-[100%] md:block hidden z-[51]">
        <div className="pl-8 pt-12">
          <h1 className="text-5xl font-bold text-black">Welcome</h1>
        </div>

        {/* Photo Bubbles */}
        <div className="absolute inset-0">
          {/* Top Right Bubble - On the curve near top */}
          <PhotoBubble 
            imageSrc={horseImages.horse1} 
            size="md"
            className="absolute right-[-90px] top-[20px]"
          />

          {/* Upper Middle Right Bubble - Following the curve */}
          <PhotoBubble 
            imageSrc={horseImages.horse2} 
            size="md"
            className="absolute right-[-90px] top-[130px]"
          />

          {/* Lower Middle Right Bubble - Along the curve */}
          <PhotoBubble 
            imageSrc={horseImages.horse3} 
            size="md"
            className="absolute right-[-70px] top-[240px]"
          />

          {/* Bottom Right Bubble - Near the bottom curve */}
          <PhotoBubble 
            imageSrc={horseImages.horse4} 
            size="md"
            className="absolute right-[-40px] top-[350px]"
          />

          {/* Bottom Bubble - At the curve's end */}
          <PhotoBubble 
            imageSrc={horseImages.horse5} 
            size="md"
            className="absolute right-[70px] top-[400px]"
          />
        </div>
      </div>

      <ContactHeader />
      
      <div className="relative min-h-[650px]">
        {/* Mobile Welcome Header */}
        <div className="md:hidden block bg-white w-full py-6 px-4">
          <h1 className="text-4xl font-bold text-black text-center">Welcome</h1>
        </div>
        
        {/* Center content */}
        <div className="pt-[150px] md:pl-[35vw] px-4 md:pr-12 max-w-[1200px] md:pt-[150px] pt-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 md:text-left text-center">Welcome to BeHorseSavvy</h2>
          
          <div className="mb-16">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Penny Pleasant is a skilled equestrian professional with over 40 years of experience in Working Hunter and Show Jumping. A Panel Judge and Ride Judge, as well as a BSPS Course Builder, she works with riders from complete novices to top-level competitors.
            </p>
            <div className="flex md:flex-row flex-col items-center gap-4 md:gap-8">
              <button className="text-xl bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto font-semibold">
                Read More
              </button>
              <Link 
                to="/case-studies" 
                className="text-xl bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors w-full md:w-auto text-center font-semibold"
              >
                Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation circles */}
      <div className="flex justify-start md:justify-center gap-4 md:gap-6 mt-8 md:mt-20 px-4 md:px-6 pb-8 overflow-x-auto max-w-[1400px] mx-auto">
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
