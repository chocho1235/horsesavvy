import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Users, 
  Home, 
  Coffee, 
  Award, 
  Camera, 
  ChevronRight, 
  ChevronLeft,
  Shield,
  FileText,
  CreditCard,
  Utensils,
  MapPin,
  HelpCircle,
  Star,
  Trophy,
  Heart,
  Sparkles,
  Compass,
  MessageCircle,
  CheckCircle,
  X,
  List,
  Copy,
  Phone,
  Mail,
  Banknote,
  Printer
} from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { BackToHome } from "@/components/BackToHome";
import FaqItem from "@/components/FaqItem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from '@/services/supabaseClient';

// Booking form schema
const campBookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  specialRequests: z.string().optional(),
});

type CampBookingFormData = z.infer<typeof campBookingSchema>;

// Bank details for payment
const bankDetails = {
  accountName: "BeHorseSavvy Ltd",
  sortCode: "12-34-56",
  accountNumber: "87654321",
  bankName: "Lloyds Bank"
};

// Stepper configuration
const steps = [
  { label: "Camp Details", icon: <Calendar className="w-5 h-5" /> },
  { label: "Your Details", icon: <Users className="w-5 h-5" /> },
  { label: "Payment", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Confirmation", icon: <CheckCircle className="w-5 h-5" /> },
];

// Camp pricing
const CAMP_PRICE = "£295";
const CAMP_PRICE_DESCRIPTION = "💥Option 1 - Full Fee";
const CAMP_DATES = "4th-7th June 2026";
const CAMP_LOCATION = "Kelsall Hill Equestrian Centre";

// Stepper Component
function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="sticky top-14 z-20 bg-blue-950/80 backdrop-blur border-b border-white/10 py-4 mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-0">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center gap-0">
            <div className={`flex flex-col items-center px-4 ${idx === currentStep ? 'text-red-500' : 'text-white/60'}`}> 
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 shadow-md transition-all duration-200 ${idx === currentStep ? 'border-red-500 bg-gradient-to-br from-red-500 to-red-700 text-white scale-110' : 'border-white/30 bg-blue-900 text-white/60'}`}>{step.icon}</div>
              <span className={`text-xs mt-2 font-semibold tracking-wide ${idx === currentStep ? 'text-white' : 'text-white/60'}`}>{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-10 h-1 ${idx < currentStep ? 'bg-gradient-to-r from-red-500 to-red-700' : 'bg-white/20'} mx-1 rounded-full`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Camp Details Component
const CampDetailsComponent = ({ onNext }: { onNext: () => void }) => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
        Camp Pleasant 2026
      </h2>
      <div className="w-24 h-1 bg-red-500 mx-auto mb-6 rounded-full" />
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Join us for an incredible 3-day equestrian experience at Kelsall Hill
      </p>
    </div>
    
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative w-full h-4 bg-gradient-to-r from-red-600 to-red-700"></div>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Camp Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-red-400" />
                    <span className="text-white font-medium">{CAMP_DATES}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span className="text-white">{CAMP_LOCATION}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-400" />
                    <span className="text-white">3 days of intensive training</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">What's Included</h4>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-400" />
                    <span>Professional BHS coaching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-400" />
                    <span>Stabling for your horse</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-400" />
                    <span>Haylage provided</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-red-400" />
                    <span>Access to all facilities</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="mb-2">
                  <Badge className="bg-red-600/90 text-white text-lg font-bold px-4 py-2 shadow-lg mb-2">
                    {CAMP_PRICE_DESCRIPTION}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-red-400 mb-2">{CAMP_PRICE}</div>
                <p className="text-white/70">Per person (horse included)</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Additional Information</h4>
                <div className="space-y-2 text-white/90">
                  <p className="text-sm">• Accommodation is arranged separately</p>
                  <p className="text-sm">• Contact us for accommodation recommendations</p>
                  <p className="text-sm">• Limited spaces available</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={onNext}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Secure Your Place
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Booking Summary Component
const CampBookingSummary = () => (
  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-8">
    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
      <CardTitle className="text-white flex items-center gap-2">
        <CheckCircle className="w-6 h-6" />
        Your Camp Booking Summary
      </CardTitle>
      <CardDescription className="text-white/90">
        Review your camp selection before proceeding
      </CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-400" />
            Camp Details
          </h4>
          <div className="space-y-2 text-white/90">
            <p><span className="font-medium">Event:</span> Camp Pleasant 2026</p>
            <p><span className="font-medium">Dates:</span> {CAMP_DATES}</p>
            <p><span className="font-medium">Location:</span> {CAMP_LOCATION}</p>
          </div>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-400" />
            Duration & Facilities
          </h4>
          <div className="space-y-2 text-white/90">
            <p><span className="font-medium">Duration:</span> 3 days</p>
            <p><span className="font-medium">Stabling:</span> Included</p>
            <p><span className="font-medium">Haylage:</span> Provided</p>
          </div>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-red-400" />
            Price
          </h4>
          <div className="space-y-2">
            <Badge className="bg-red-600/90 text-white text-sm font-bold px-3 py-1 mb-2">
              {CAMP_PRICE_DESCRIPTION}
            </Badge>
            <p className="text-2xl font-bold text-red-400">{CAMP_PRICE}</p>
            <p className="text-white/70 text-sm">Per person (horse included)</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Payment Instructions Component
const CampPaymentInstructions = ({
  bookingReference,
  onPaymentConfirmed,
  bookingData
}: {
  bookingReference: string;
  onPaymentConfirmed: () => void;
  bookingData?: any;
}) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard`);
    }).catch(() => {
      toast.error("Failed to copy to clipboard");
    });
  };

  return (
    <div className="space-y-8">
      <CampBookingSummary />
      
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
          <CardTitle className="text-white flex items-center gap-2">
            <Banknote className="w-6 h-6" />
            Payment Instructions
          </CardTitle>
          <CardDescription className="text-white/90">
            Please transfer the full fee to secure your place at Camp Pleasant 2026
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Bank Transfer Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/70">Account Name:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono">{bankDetails.accountName}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(bankDetails.accountName, "Account name")}
                      className="p-1 h-auto text-white/70 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/70">Sort Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono">{bankDetails.sortCode}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(bankDetails.sortCode, "Sort code")}
                      className="p-1 h-auto text-white/70 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/70">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono">{bankDetails.accountNumber}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                      className="p-1 h-auto text-white/70 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white/70">Bank:</span>
                  <span className="text-white">{bankDetails.bankName}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg mb-4">Payment Reference</h3>
              <div className="p-4 bg-red-600/20 rounded-lg border border-red-500/30">
                <div className="text-center">
                  <p className="text-white/80 text-sm mb-2">Use this reference:</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-white font-mono text-lg font-bold">{bookingReference}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(bookingReference, "Reference number")}
                      className="p-1 h-auto text-white/70 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-white font-semibold mb-2">Amount to Pay:</h4>
                <div className="mb-2">
                  <Badge className="bg-red-600/90 text-white text-sm font-bold px-3 py-1">
                    {CAMP_PRICE_DESCRIPTION}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-red-400">{CAMP_PRICE}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Important Payment Information</h4>
                <ul className="text-white/90 text-sm space-y-1">
                  <li>• Please use the reference number <strong>{bookingReference}</strong> when making your transfer</li>
                  <li>• Transfer the full fee of <strong>{CAMP_PRICE}</strong> - no partial payments accepted</li>
                  <li>• Bookings are only confirmed once full payment is received</li>
                  <li>• You will receive confirmation via email once payment is processed</li>
                  <li>• If you have any issues, contact us at penelopepleasant@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={onPaymentConfirmed}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              I've Made the Payment
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 flex items-center gap-2"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Gallery images
const galleryImages = [
  "/camp-photos/camp-training-1.png",
  "/camp-photos/camp-training-2.png",
  "/camp-photos/camp-training-3.png",
  "/camp-photos/camp-training-5.png",
  "/camp-photos/camp-training-6.png",
  "/camp-photos/camp-training-7.png",
  "/camp-photos/camp-training-8.png",
  "/camp-photos/camp-training-9.png"
];

// Testimonials data
const testimonials = [
  {
    name: "Esmae S.",
    location: "Camp Pleasant Student",
    rating: 5,
    text: "Esmae was lucky enough to be awared the Be Horse Savvy award at CampPleasant2025. Esmae has learned so much and grown in confidence in her horse knowledge with Penny.",
    year: "2025",
    image: "/testimonial-placeholder.svg"
  },
  {
    name: "Emma T.",
    location: "Camp Pleasant Student",
    rating: 5,
    text: "The perfect mix of intensive training and fun. Made great friends and learned so much!",
    year: "2025",
    image: "/testimonial-placeholder.svg"
  },
  {
    name: "Lucy M.",
    location: "Camp Pleasant Student",
    rating: 5,
    text: "Fantastic facilities and amazing instructors. Can't wait for next year!",
    year: "2025",
    image: "/testimonial-placeholder.svg"
  }
];

// Featured highlights data
const highlights = [
  {
    icon: Trophy,
    title: "Expert Coaching",
    description: "Learn from BHS accredited coaches with years of experience"
  },
  {
    icon: Heart,
    title: "Supportive Environment",
    description: "Train in a friendly, encouraging atmosphere"
  },
  {
    icon: Sparkles,
    title: "World-Class Facilities",
    description: "Access to Kelsall Hill's outstanding equestrian facilities"
  },
  {
    icon: Compass,
    title: "Tailored Training",
    description: "Programs adapted to your skill level and goals"
  }
];

// Statistics data
const statistics = [
  {
    number: "200+",
    label: "Happy Campers",
    description: "Trained since 2020"
  },
  {
    number: "60+",
    label: "Training Hours",
    description: "Per camp experience"
  },
  {
    number: "BHS",
    label: "Accredited",
    description: "Professional coaching"
  }
];

// FAQ data
const faqs = [
  {
    question: "What riding equipment do I need to bring?",
    answer: "You'll need your usual riding gear including boots, jodhpurs, and gloves. For cross-country, a back protector is mandatory. Current standard riding hat (non-peak) is required for all sessions."
  },
  {
    question: "What are the vaccination requirements?",
    answer: "All horses must have up-to-date vaccinations. You'll need to bring your horse's passport and vaccination record with you."
  },
  {
    question: "Can I arrange extra flatwork sessions?",
    answer: "Yes, additional flatwork sessions can be arranged. Please let us know in advance so we can schedule these around your other training sessions."
  },
  {
    question: "What's included in the camp fee?",
    answer: "The fee includes all scheduled training sessions, stabling, haylage, and access to facilities. Additional services like photography and massage are available at extra cost."
  },
  {
    question: "What happens if I need to cancel?",
    answer: "While fees are non-refundable, if we have a waiting list we'll try to swap your place with someone at your training level. Each case is handled individually."
  }
];

// Camp preparation checklist
const checklist = [
  {
    category: "Rider Equipment",
    items: [
      "Current standard riding hat (non-peak)",
      "Back protector for XC",
      "Multiple pairs of jodhpurs/breeches",
      "Riding boots and spare pair",
      "Gloves and spares",
      "Waterproof riding jacket"
    ]
  },
  {
    category: "Horse Equipment",
    items: [
      "Tack (saddle, bridle, etc.)",
      "Exercise/cooling rugs",
      "Stable rugs appropriate for weather",
      "Grooming kit",
      "First aid kit",
      "Feed and supplements"
    ]
  },
  {
    category: "Documentation",
    items: [
      "Horse passport",
      "Vaccination records",
      "Insurance documents",
      "Emergency contact details",
      "Medical information"
    ]
  }
];

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const campDate = new Date('2026-06-04T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = campDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-white/60 capitalize">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function CampPleasant() {
  // Gallery and testimonial states
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [showBookingSummary, setShowBookingSummary] = useState(false);

  // Booking system states
  const [bookingStep, setBookingStep] = useState<"details" | "form" | "payment" | "confirmation">("details");
  const [bookingReference, setBookingReference] = useState<string>("");
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form setup
  const form = useForm<CampBookingFormData>({
    resolver: zodResolver(campBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experienceLevel: "",
      specialRequests: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBookingSummary(scrollPosition > 500 && bookingStep === "details");
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bookingStep]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Generate reference number
  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CAMP-${timestamp.toString().slice(-6)}${random}`;
  };

  // Save camp booking to Supabase
  const saveCampBookingToSupabase = async (bookingData: any, reference: string) => {
    console.log('saveCampBookingToSupabase called with:', { bookingData, reference });

    const bookingInsertData = {
      first_name: bookingData.firstName,
      last_name: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      experience_level: bookingData.experienceLevel,
      horse_name: 'Not specified',
      accommodation_type: 'Not specified',
      special_requests: bookingData.specialRequests || '',
      reference: reference,
      status: 'pending',
      payment_status: 'pending',
      camp_price: CAMP_PRICE,
      camp_dates: CAMP_DATES,
      camp_location: CAMP_LOCATION,
    };
    console.log('Inserting camp booking data:', bookingInsertData);

    const { data, error } = await supabase
      .from('camp_bookings')
      .insert([bookingInsertData])
      .select()
      .single();
    console.log('Supabase insert result:', { data, error });
    if (error) {
      console.error('Insert error:', error);
      toast.error('Failed to save booking. Please try again.');
      return null;
    }
    console.log('Camp booking saved successfully:', data);
    return data;
  };

  // Handle form submission
  const onSubmit = async (data: CampBookingFormData) => {
    setIsSubmitting(true);
    const reference = generateReferenceNumber();
    setBookingReference(reference);
    setPendingBookingData(data);

    // Save to database immediately like courses do
    const result = await saveCampBookingToSupabase(data, reference);
    if (!result) {
      toast.error("Failed to save booking. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Send camp booking request received email (non-blocking for development)
    try {
      const res = await fetch('/api/send-camp-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
          camp: 'Camp Pleasant 2026',
          dates: CAMP_DATES,
          location: CAMP_LOCATION,
          price: CAMP_PRICE,
          reference,
          status: 'submitted',
        }),
      });
      const result = await res.json();
      if (!result.success) {
        console.warn("Email sending failed, but continuing with booking");
      }
    } catch (err) {
      console.warn("Email API not available (likely in development), continuing with booking:", err.message);
    }

    setBookingStep("payment");
    toast.success("Booking details saved! Please complete payment to confirm.");
    setIsSubmitting(false);
  };

  // Handle payment confirmation
  const handlePaymentConfirmed = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Booking is already saved to database, just proceed to confirmation
    setTimeout(() => {
      setBookingStep("confirmation");
      toast.success("Camp booking confirmed successfully!");
    }, 300);
  };

  // Get current step index for stepper
  const getCurrentStepIndex = () => {
    switch (bookingStep) {
      case "details": return 0;
      case "form": return 1;
      case "payment": return 2;
      case "confirmation": return 3;
      default: return 0;
    }
  };

  // Booking flow render logic
  const renderBookingFlow = () => {
    if (bookingStep === "form") {
      return (
        <div className="mb-16">
          {/* Decorative elements */}
          <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 -right-20 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
          
          <CampBookingSummary />
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <Users className="w-7 h-7" />
                Your Details
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Please provide your information to complete the booking
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold text-lg">First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your first name" 
                              {...field} 
                              className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold text-lg">Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your last name" 
                              {...field} 
                              className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold text-lg">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter your email address" 
                              {...field} 
                              className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold text-lg">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="Enter your phone number" 
                              {...field} 
                              className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300" 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold text-lg">Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white h-12 text-lg rounded-lg">
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-blue-900 border-white/20">
                            <SelectItem value="beginner" className="text-white hover:bg-blue-800 cursor-grab">Beginner</SelectItem>
                            <SelectItem value="intermediate" className="text-white hover:bg-blue-800 cursor-grab">Intermediate</SelectItem>
                            <SelectItem value="advanced" className="text-white hover:bg-blue-800 cursor-grab">Advanced</SelectItem>
                            <SelectItem value="expert" className="text-white hover:bg-blue-800 cursor-grab">Expert/Professional</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  

                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold text-lg">Special Requirements (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special requirements or questions?" 
                            className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 min-h-[120px] text-lg rounded-lg transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full"
                    >
                      {isSubmitting ? "Processing..." : "Continue to Payment"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    if (bookingStep === "payment") {
      return (
        <CampPaymentInstructions
          bookingReference={bookingReference}
          onPaymentConfirmed={handlePaymentConfirmed}
          bookingData={pendingBookingData}
        />
      );
    }
    
    if (bookingStep === "confirmation") {
      return (
        <div className="mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <CheckCircle className="w-7 h-7" />
                Booking Confirmed!
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Your camp booking has been successfully submitted
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank you for your booking!</h3>
                  <p className="text-white/80">
                    Your booking reference is: <span className="font-mono font-bold text-red-400">{bookingReference}</span>
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-white mb-2">What happens next?</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• We'll review your booking and payment</li>
                    <li>• You'll receive a confirmation email within 24 hours</li>
                    <li>• Camp details and preparation info will be sent closer to the date</li>
                    <li>• For questions, contact penelopepleasant@gmail.com</li>
                  </ul>
                </div>
                
                <Button
                  onClick={() => {
                    setBookingStep("details");
                    setBookingReference("");
                    setPendingBookingData(null);
                    form.reset();
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-lg"
                >
                  Book Another Place
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="min-h-[100dvh] bg-blue-950 text-white">
      <ContactHeader bgColor="bg-blue-950" />
      <BackToHome />



      {/* Sticky Booking Summary */}
      <AnimatePresence>
        {showBookingSummary && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 bg-blue-950/95 backdrop-blur-sm border-b border-white/20 z-50 py-4"
          >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <h3 className="text-lg font-semibold">Camp Pleasant 2026</h3>
                  <p className="text-white/60">4th-7th June</p>
                </div>
                <div className="hidden md:block">
                  <CountdownTimer />
                </div>
              </div>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                onClick={() => setBookingStep("form")}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 relative">
          {renderBookingFlow()}
        </div>
      </div>

      {/* Show additional sections only when not in booking flow */}
      {bookingStep === "details" && (
        <>
          {/* Hero Section */}
          <section className="relative bg-blue-950 py-20 sm:py-28 md:py-36 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/90 to-blue-950/95" />
            
            <div className="max-w-7xl mx-auto px-6 relative">
              <motion.div
                className="text-center"
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
                <motion.h1 
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-white">
                  Camp Pleasant 2026
                </motion.h1>
                <motion.p 
                  variants={fadeInUp}
                  className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
                  An Unforgettable 3-Day Equestrian Experience at Kelsall Hill
                </motion.p>
                
                <motion.div 
                  variants={fadeInUp}
                  className="mb-12">
                  <CountdownTimer />
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-wrap justify-center items-center gap-4 mb-12">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <Calendar className="h-5 w-5 text-red-400" />
                    <span className="text-white/90 text-sm font-medium">4th-7th June 2026</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <MapPin className="h-5 w-5 text-red-400" />
                    <span className="text-white/90 text-sm font-medium">Kelsall Hill</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <Award className="h-5 w-5 text-red-400" />
                    <span className="text-white/90 text-sm font-medium">BHS Accredited Coaches</span>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="flex justify-center"
                >
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setBookingStep("form")}
                  >
                    Secure Your Place
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

      {/* Facebook Event Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Join the Event</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Connect with other participants and stay updated on the latest camp news
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-full max-w-lg">
              <div 
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => window.open('https://fb.me/e/2XRCAj5Mk', '_blank')}
              >
                {/* Facebook Header */}
                <div className="bg-[#1877f2] px-4 py-3 flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Facebook Event</h3>
                    <p className="text-white/80 text-xs">Be Horse Savvy</p>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-4">
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Camp Pleasant 2026</h2>
                    <p className="text-gray-600 text-sm mb-3">
                      Join us for an incredible 3-day equestrian experience at Kelsall Hill with expert BHS accredited coaches.
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                        <Calendar className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium">Wed, Jun 4, 2026 at 4:15 PM</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                        <MapPin className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="text-sm">Kelsall Hill Equestrian Centre</span>
                    </div>
                  </div>

                  {/* Event Stats */}
                  <div className="border-t border-gray-200 pt-3 mb-4">
                    <div className="text-sm text-gray-600">
                      Public event · Hosted by Be Horse Savvy
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-[#1877f2] text-white text-center py-2 rounded-md text-sm font-medium hover:bg-[#166fe5] transition-colors">
                      Interested
                    </div>
                    <div className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                      Share
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Alternative: Try Facebook's Social Plugin */}
              <div className="mt-4 text-center">
                <div 
                  className="fb-social-plugin" 
                  data-href="https://fb.me/e/2XRCAj5Mk"
                  data-width="500"
                  data-height="400"
                >
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Experience #CampPleasant2026</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Take a glimpse into our top class facilities and training sessions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="w-full h-[250px] flex items-center justify-center bg-white/5 rounded-xl p-2"
              >
                <img 
                  src={image}
                  alt={`Camp Pleasant Gallery ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Our Impact</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-red-500/20 rounded-full mb-6">
                    {index === 0 && <Users className="w-8 h-8 text-red-400" />}
                    {index === 1 && <Clock className="w-8 h-8 text-red-400" />}
                    {index === 2 && <Award className="w-8 h-8 text-red-400" />}
                  </div>
                  <div className="text-5xl font-bold text-red-400 mb-3">{stat.number}</div>
                  <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-white/70 text-center">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="py-20 bg-blue-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Why Choose Camp Pleasant?</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300"
              >
                <highlight.icon className="w-12 h-12 text-red-400 mb-6" />
                <h3 className="text-xl font-semibold text-white mb-4">{highlight.title}</h3>
                <p className="text-white/90">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Your Camp Schedule</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Day Schedule */}
            <motion.div variants={fadeInRight}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">Daily Schedule</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Thursday, 4th June</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">4:15 PM onwards:</span> Arrival and check-in
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Star className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">Evening:</span> Optional pre-camp massage with Helen Rose
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">7:00 PM:</span> Welcome briefing and group introductions
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Friday - Saturday Training</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          Show jumping sessions in indoor arena
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          Cross-country training
                        </div>
                      </li>

                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Sunday, 7th June</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold">10:00 AM:</span> Camp conclusion and departure
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div variants={fadeInRight}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">What's Included</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Training</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>2 sessions a day</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Total of 4 Sessions over the weekend</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Flatwork Sessions by prior arrangement</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Facilities</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Access to indoor and outdoor arenas</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Cross-country course access</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Stabling and haylage included</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Extras</h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Professional photography available</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Spillers nutrition consultation</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <span>Equine massage services</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Groups Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Training Groups</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Choose the group that best matches your current skill level and goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Trophy className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Advanced Group</h3>
              <div className="space-y-4">
                <p className="text-white/90 font-semibold">80cm+ with fillers</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Complex course combinations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Technical XC questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Advanced striding exercises</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Award className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Intermediate Group</h3>
              <div className="space-y-4">
                <p className="text-white/90 font-semibold">60/70cm with fillers</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Progressive course building</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Confidence building exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Introduction to related distances</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Star className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Starter Group</h3>
              <div className="space-y-4">
                <p className="text-white/90 font-semibold">50/60cm fillers at the side</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Foundation jumping exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Basic course navigation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Optional flat work sessions</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Camper Stories</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Hear from riders who've experienced Camp Pleasant
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 items-center">
                {/* Content Section */}
                <div className="md:col-span-4 text-center">
                  {/* Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 font-light italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-white/70 text-sm mb-3">
                      {testimonials[currentTestimonial].location}
                    </p>
                    <div className="px-3 py-1 bg-red-600/20 rounded-full">
                      <span className="text-red-400 text-xs font-medium">
                        Camp Pleasant {testimonials[currentTestimonial].year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Stay With Us</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Choose from a range of comfortable accommodation options
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Home className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Static Caravans</h3>
              <div className="space-y-4">
                <p className="text-white/90">£65 for up to 6 people</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Two caravans available on site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Fully equipped kitchen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Comfortable living space</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Home className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Camping</h3>
              <div className="space-y-4">
                <p className="text-white/90">Bring your own accommodation</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Suitable for wagons & trailers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Tent camping welcome</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Access to site facilities</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <MapPin className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Local B&Bs</h3>
              <div className="space-y-4">
                <p className="text-white/90">Comfortable local options</p>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Various B&Bs nearby</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Book directly with providers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>Recommendations available</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">On-Site Facilities</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Coffee className="h-5 w-5 text-red-400" />
                <span className="text-white/90">Kelsall Cafe (9am-5pm)</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Utensils className="h-5 w-5 text-red-400" />
                <span className="text-white/90">Self-catering facilities</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <Home className="h-5 w-5 text-red-400" />
                <span className="text-white/90">On-site showers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-blue-950 border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Essential Information</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Shield className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Safety Requirements</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Back Protectors</span>
                    <span className="text-white/80">Mandatory for all XC sessions</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Riding Hats</span>
                    <span className="text-white/80">Current standard, non-peak required</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Vaccinations</span>
                    <span className="text-white/80">Up-to-date records required</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <Award className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Additional Services</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Spillers Nutrition</span>
                    <span className="text-white/80">Expert feed consultation available</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Helen Rose Massage</span>
                    <span className="text-white/80">Pre and post-training treatments</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Photography</span>
                    <span className="text-white/80">Braveheart Photography (£30 all photos)</span>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-colors duration-300">
              <FileText className="w-12 h-12 text-red-400 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">Important Notes</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Bedding</span>
                    <span className="text-white/80">Hay and shavings not included</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Haylage</span>
                    <span className="text-white/80">Included in camp fee</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block mb-1">Kelsall Rules</span>
                    <span className="text-white/80">No straw allowed on site</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-blue-950 border-t border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-white/80">
              Find answers to common questions about the camp.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={selectedFaq === index}
                onToggle={() => setSelectedFaq(selectedFaq === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </section>
        </>
      )}

      <Footer bgColor="bg-blue-950" />
    </div>
  );
} 