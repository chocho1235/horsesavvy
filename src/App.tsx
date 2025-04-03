import React, { useState, useEffect } from 'react';
import { 
  FileSliders as HorseSaddle, 
  ChevronRight, 
  Eye, 
  Search, 
  Menu, 
  ArrowDown,
  ArrowRight,
  Calendar,
  Users,
  Trophy,
  ChevronLeft
} from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import { useScrollPosition } from './hooks/useScrollPosition';
import { NewsItem, Partner } from './types';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMembershipMenu, setShowMembershipMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  const scrollPosition = useScrollPosition();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const newsItems: NewsItem[] = [
    {
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
      title: "Summer Camp Registration Now Open",
      snippet: "Join us for an unforgettable summer of riding and learning.",
      date: "March 15, 2024",
      category: "Events"
    },
    {
      image: "https://images.unsplash.com/photo-1566251037378-5e04e3bec343",
      title: "National Championships Results",
      snippet: "Celebrating our champions from across the country.",
      date: "March 10, 2024",
      category: "Competition"
    },
    {
      image: "https://images.unsplash.com/photo-1553984840-b8cbc34f5215",
      title: "New Training Programs Launched",
      snippet: "Explore our expanded curriculum for all skill levels.",
      date: "March 5, 2024",
      category: "Training"
    }
  ];

  const partners: Partner[] = [
    { name: "JCB", logo: "https://placehold.co/200x100/png?text=JCB" },
    { name: "Howden", logo: "https://placehold.co/200x100/png?text=Howden" },
    { name: "Partner 3", logo: "https://placehold.co/200x100/png?text=Partner+3" },
    { name: "Partner 4", logo: "https://placehold.co/200x100/png?text=Partner+4" },
    { name: "Partner 5", logo: "https://placehold.co/200x100/png?text=Partner+5" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar scrollPosition={scrollPosition} />
      <Hero />

      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-[#B68D40] rounded-lg p-8 text-white transform hover-lift overflow-hidden">
              <div className="relative">
                <Calendar className="w-12 h-12 mb-4 animate-fade-in" />
                <h3 className="text-2xl font-bold mb-2 animate-slide-in">Next Event</h3>
                <p className="text-lg mb-6 animate-fade-in">Spring Championship</p>
                <div className="grid grid-cols-4 gap-4 stagger-children">
                  <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-none">
                    <div className="text-3xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm">Days</div>
                  </div>
                  <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-none">
                    <div className="text-3xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm">Hours</div>
                  </div>
                  <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-none">
                    <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm">Mins</div>
                  </div>
                  <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-none">
                    <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm">Secs</div>
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
              </div>
            </div>

            <div className="bg-[#8B1E65] rounded-lg p-8 text-white">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Join Today</h3>
              <p className="mb-4">Become part of our growing community</p>
              <a href="#" className="inline-flex items-center text-lg">
                Learn More <ChevronRight className="ml-2" />
              </a>
            </div>

            <div className="bg-[#00205B] rounded-lg p-8 text-white">
              <Trophy className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Hundreds of Members</h3>
              <p className="mb-4">Join the UK's largest equestrian youth organization</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm">Events/Year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-4 sm:mb-0">Latest News</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                <ChevronLeft size={20} className="text-[#00205B]" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                <ChevronRight size={20} className="text-[#00205B]" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {newsItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-[#8B1E65] text-white px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <h3 className="text-xl font-bold text-[#00205B] mb-2 group-hover:text-[#8B1E65] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.snippet}</p>
                  <a 
                    href="#" 
                    className="text-[#8B1E65] font-medium hover:text-[#6F1850] inline-flex items-center group"
                  >
                    Read More 
                    <ChevronRight 
                      className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                      size={16} 
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#B68D40] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of riders who have found their passion with us
          </p>
          <a href="#" className="inline-flex items-center bg-white text-[#00205B] px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-100 transition-colors duration-200">
            Become a Member
            <ChevronRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      <section className="bg-gray-100 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00205B] mb-4">Join BeHorseSavvy Today</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Start your equestrian journey with us and become part of a supportive community dedicated to excellence in horsemanship.
              </p>
              <a href="#" className="inline-flex items-center bg-[#8B1E65] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-[#6F1850] transition-colors duration-200">
                Get Started
                <ChevronRight className="ml-2" size={20} />
              </a>
            </div>
            <div className="relative h-[300px] sm:h-[350px] lg:h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1553984840-b8cbc34f5215"
                alt="Horse and rider"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00205B] mb-8 sm:mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <img src={partner.logo} alt={partner.name} className="max-h-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#00205B] text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Membership</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Join</a></li>
                <li><a href="#" className="hover:text-gray-300">Renew</a></li>
                <li><a href="#" className="hover:text-gray-300">Insurance</a></li>
                <li><a href="#" className="hover:text-gray-300">Benefits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Mission</a></li>
                <li><a href="#" className="hover:text-gray-300">History</a></li>
                <li><a href="#" className="hover:text-gray-300">Team</a></li>
                <li><a href="#" className="hover:text-gray-300">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Downloads</a></li>
                <li><a href="#" className="hover:text-gray-300">Events</a></li>
                <li><a href="#" className="hover:text-gray-300">Guides</a></li>
                <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>info@behorsesavvy.com</li>
                <li>+44 (0) 123 456 7890</li>
                <li className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-gray-300"><Eye size={24} /></a>
                  <a href="#" className="hover:text-gray-300"><Search size={24} /></a>
                  <a href="#" className="hover:text-gray-300"><Menu size={24} /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">&copy; 2024 BeHorseSavvy. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-sm hover:text-gray-300">Privacy Policy</a>
                <a href="#" className="text-sm hover:text-gray-300">Terms of Service</a>
                <a href="#" className="text-sm hover:text-gray-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;