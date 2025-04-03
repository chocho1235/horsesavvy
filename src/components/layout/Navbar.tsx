import React, { useState } from 'react';
import { ChevronRight, Eye, Search, Menu } from 'lucide-react';

interface NavbarProps {
  scrollPosition: number;
}

const membershipData = {
  information: {
    title: "Membership Information",
    links: [
      "How to Join",
      "Find a Pony Club",
      "Codes of Conduct",
      "Members Insurance",
      "Safeguarding",
      "Reasonable Adjustment",
      "Membership Terms and Conditions"
    ]
  },
  branch: {
    title: "Branch Membership",
    links: [
      "Why become a Pony Club Branch Member?",
      "Area Representatives Contact Details",
      "UK Centres",
      "Overseas Centres"
    ]
  },
  centre: {
    title: "Centre Membership",
    links: [
      "Why become a Pony Club Centre Member?",
      "Centre Co-ordinator Contact Details",
      "Howden Centre Equitation"
    ]
  }
};

const Navbar: React.FC<NavbarProps> = ({ scrollPosition }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMembershipMenu, setShowMembershipMenu] = useState(false);

  return (
    <nav className={`fixed w-full z-50 navbar-transition ${
      scrollPosition > 50 ? 'bg-[#00205B] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white">BeHorseSavvy</h1>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <div 
              className="relative group"
              onMouseEnter={() => setShowMembershipMenu(true)}
              onMouseLeave={() => setShowMembershipMenu(false)}
            >
              <button className="text-white hover:text-gray-200 text-base">
                Membership
              </button>
              
              {showMembershipMenu && (
                <div className="absolute left-1/2 transform -translate-x-1/2 w-[900px] bg-[#00205B]/95 backdrop-blur-sm shadow-2xl mt-6 rounded-xl overflow-hidden border border-white/10 transition-all duration-300 ease-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="px-8 py-12 grid grid-cols-4 gap-8">
                    {Object.entries(membershipData).map(([key, section]) => (
                      <div key={key} className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2 group-hover:border-white/30 transition-colors duration-300">
                          {section.title}
                        </h3>
                        <ul className="space-y-3">
                          {section.links.map((link, index) => (
                            <li key={index}>
                              <a href="#" className="text-white/80 hover:text-white text-sm transition-all duration-300 flex items-center group">
                                <span className="transform group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                                <ChevronRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" size={16} />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="text-white hover:text-gray-200 text-base">Training</a>
            <a href="#" className="text-white hover:text-gray-200 text-base">Activities</a>
            <a href="#" className="text-white hover:text-gray-200 text-base">Calendar</a>
            <a href="#" className="text-white hover:text-gray-200 text-base">Merchandise</a>
            <a href="#" className="border border-white text-white px-5 py-2 rounded text-base hover:bg-white hover:text-[#00205B] transition-colors duration-200">
              Educational Portal
            </a>
            <a href="#" className="bg-[#8B1E65] text-white px-5 py-2 rounded text-base hover:bg-[#6F1850] transition-colors duration-200">
              Join now
            </a>
            <button className="text-white hover:text-gray-200 ml-2">
              <Eye size={24} />
            </button>
            <button className="text-white hover:text-gray-200">
              <Search size={24} />
            </button>
          </div>

          <button 
            className="text-white hover:text-gray-200 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#00205B]/95 backdrop-blur-sm shadow-2xl mt-2 rounded-xl p-6 border border-white/10 transform transition-all duration-300 ease-out opacity-0 translate-y-2 scale-95 data-[open=true]:opacity-100 data-[open=true]:translate-y-0 data-[open=true]:scale-100" data-open={isMobileMenuOpen}>
            <div className="space-y-6">
              {['Membership', 'Training', 'Activities', 'Calendar', 'Merchandise', 'Members Portal'].map((item) => (
                <a key={item} href="#" className="text-white/80 hover:text-white block px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center group">
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">{item}</span>
                  <ChevronRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" size={16} />
                </a>
              ))}
              <a href="#" className="bg-[#8B1E65] text-white px-4 py-3 rounded-lg block hover:bg-[#6F1850] transition-colors duration-300 flex items-center justify-center group">
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">Join now</span>
                <ChevronRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 