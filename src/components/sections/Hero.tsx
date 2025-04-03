import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative">
      <div className="h-[50vh] sm:h-[60vh] lg:h-screen">
        <img
          src="https://images.pexels.com/photos/1559388/pexels-photo-1559388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Equestrian riding"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl px-4 sm:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 leading-tight">
              Horse Club & Online Learning
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#" className="bg-[#8B1E65] text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-[#6F1850] transition-colors duration-200 flex items-center justify-center text-base sm:text-lg">
                Join now
                <ChevronRight className="ml-2" size={20} />
              </a>
              <a href="#" className="bg-white text-[#00205B] px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center text-base sm:text-lg">
                Contact
                <ChevronRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-64 sm:w-72 lg:w-96 space-y-3 sm:space-y-4">
        <div className="bg-[#8B1E65] p-4 sm:p-6 rounded-lg text-white group hover:bg-[#6F1850] transition-colors duration-200 cursor-pointer">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Renew your membership today!</h2>
          <p className="mb-4 text-xs sm:text-sm lg:text-base">Explore the opportunities and try something new!</p>
          <ChevronRight className="text-white transform group-hover:translate-x-2 transition-transform duration-200" size={20} />
        </div>
        
        <div className="bg-[#B68D40] p-4 sm:p-6 rounded-lg text-white group hover:bg-[#96753A] transition-colors duration-200 cursor-pointer">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Book clinics / events / lessons</h2>
          <p className="mb-4 text-xs sm:text-sm lg:text-base">Join our upcoming training sessions and events</p>
          <ChevronRight className="text-white transform group-hover:translate-x-2 transition-transform duration-200" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Hero; 