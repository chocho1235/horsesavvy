import { Link } from "react-router-dom";
import { CircleNavButton } from "@/components/CircleNavButton";
import { ContactHeader } from "@/components/ContactHeader";
import { PhotoBubble } from "@/components/PhotoBubble";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Stock horse images
const horseImages = {
  horse1: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  horse2: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80",
  horse3: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  horse4: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  horse5: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80"
};

const carouselImages = [
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80"
];

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Left side curve shape - positioned before header to go behind */}
      <div className="absolute top-0 left-0 h-[40vh] w-[35vw] min-w-[400px] max-w-[500px] bg-white rounded-br-[100%] md:block hidden z-[51]">
        <div className="pl-16 pt-12">
          <h1 className="text-5xl font-medium text-black">Welcome</h1>
        </div>
      </div>

      <ContactHeader />
      
      <div className="relative min-h-[600px]">
        {/* Mobile Welcome Header */}
        <div className="md:hidden block bg-white w-full py-4 px-4">
          <h1 className="text-3xl font-medium text-black text-center">Welcome</h1>
        </div>
        
        {/* Center content */}
        <div className="pt-[80px] md:pt-[100px] px-4 md:px-8 max-w-[1600px] mx-auto">
          <div className="md:pl-[500px]">
            <div className="max-w-[1000px] flex flex-col md:flex-row gap-8 items-center">
              {/* Welcome Text */}
              <div className="flex-1 order-2 md:order-1">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center md:text-left">Welcome to BeHorseSavvy</h2>
                
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

              {/* Image Carousel */}
              <div className="w-full md:w-[300px] flex-shrink-0 order-1 md:order-2 hidden md:block">
                <Carousel className="w-full">
                  <CarouselContent>
                    {carouselImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={`Horse ${index + 1}`}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-black/50 hover:bg-black/70 text-white border-none" />
                  <CarouselNext className="right-2 bg-black/50 hover:bg-black/70 text-white border-none" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation circles */}
      <div className="flex flex-col items-center">
        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-6 md:hidden w-full max-w-[1200px] px-4">
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
          <div className="col-span-2 flex justify-center">
            <CircleNavButton to="/penny-club" color="red" label="The Penny Club" />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 lg:gap-12 px-2 lg:px-8 pb-8 max-w-[1200px]">
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
          <div className="flex justify-center">
            <CircleNavButton to="/penny-club" color="red" label="The Penny Club" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"></div>
        
        {/* Decorative elements */}
        <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent"></div>
        
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left section */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3 group">
                <span className="text-white/40 text-xs font-light tracking-widest uppercase">EST.</span>
                <span className="text-white/40 text-xs font-light tracking-widest uppercase">2025</span>
              </div>
              <div className="text-white/40 text-xs font-light tracking-widest uppercase">BeHorseSavvy</div>
            </div>

            {/* Center section */}
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/penny.pleasant" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/behorsesavvy/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

            {/* Right section */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="text-white/40 text-xs font-light tracking-widest uppercase">© 2025 BeHorseSavvy</div>
              <div className="text-white/40 text-xs font-light tracking-widest uppercase">All rights reserved</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Powered by Equinology */}
      <div className="w-full py-4 relative">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex justify-center">
          <a 
            href="https://equinology.co.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative inline-block text-white/40 text-xs font-light tracking-widest uppercase overflow-hidden group"
          >
            <span className="relative z-10">Powered by Equinology</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;

