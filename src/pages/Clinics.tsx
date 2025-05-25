import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CalendarDays, Users, CheckCircle, AlertCircle, Phone, Mail, Copy, Banknote, Star, Award } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Clinic types available with predetermined dates and times
const clinicTypes = [
  {
    id: "dressage-1",
    name: "Dressage Clinic",
    description: "Focus on precision, balance, and communication between horse and rider",
    price: "£60",
    maxParticipants: 6,
    date: "Saturday, January 27, 2024",
    time: "9:00 AM - 11:00 AM",
    dateValue: "2024-01-27",
    timeValue: "09:00",
    instructor: "Sarah Mitchell",
    level: "Intermediate",
    featured: false,
  },
  {
    id: "jumping-1",
    name: "Show Jumping Clinic",
    description: "Develop jumping technique, course strategy, and confidence",
    price: "£65",
    maxParticipants: 6,
    date: "Sunday, January 28, 2024",
    time: "2:00 PM - 4:00 PM",
    dateValue: "2024-01-28",
    timeValue: "14:00",
    instructor: "James Thompson",
    level: "All Levels",
    featured: true,
  },
  {
    id: "cross-country-1",
    name: "Cross Country Clinic",
    description: "Navigate varied terrain and obstacles with confidence",
    price: "£70",
    maxParticipants: 4,
    date: "Saturday, February 3, 2024",
    time: "10:00 AM - 12:00 PM",
    dateValue: "2024-02-03",
    timeValue: "10:00",
    instructor: "Emma Roberts",
    level: "Advanced",
    featured: false,
  },
  {
    id: "flatwork-1",
    name: "Flatwork Fundamentals",
    description: "Master the basics of horse training and riding technique",
    price: "£55",
    maxParticipants: 8,
    date: "Sunday, February 4, 2024",
    time: "11:00 AM - 1:00 PM",
    dateValue: "2024-02-04",
    timeValue: "11:00",
    instructor: "Lisa Williams",
    level: "Beginner",
    featured: false,
  },
  {
    id: "dressage-2",
    name: "Advanced Dressage",
    description: "Advanced movements and collection techniques",
    price: "£70",
    maxParticipants: 4,
    date: "Saturday, February 10, 2024",
    time: "9:00 AM - 11:00 AM",
    dateValue: "2024-02-10",
    timeValue: "09:00",
    instructor: "Sarah Mitchell",
    level: "Expert",
    featured: true,
  },
  {
    id: "jumping-2",
    name: "Show Jumping Advanced",
    description: "Tackle higher jumps and complex courses",
    price: "£75",
    maxParticipants: 4,
    date: "Sunday, February 11, 2024",
    time: "1:00 PM - 3:00 PM",
    dateValue: "2024-02-11",
    timeValue: "13:00",
    instructor: "James Thompson",
    level: "Expert",
    featured: false,
  },
];

// Booking form schema
const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  clinicType: z.string().min(1, "Please select a clinic type"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  horseName: z.string().min(2, "Please enter your horse's name"),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Bank details for payment
const bankDetails = {
  accountName: "BeHorseSavvy Ltd",
  sortCode: "12-34-56",
  accountNumber: "87654321",
  bankName: "Lloyds Bank"
};

// Clinic Selection Component
const ClinicSelection = ({ 
  clinicTypes, 
  selectedClinic, 
  onClinicSelect 
}: {
  clinicTypes: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    maxParticipants: number;
    date: string;
    time: string;
    dateValue: string;
    timeValue: string;
    instructor: string;
    level: string;
    featured: boolean;
  }>;
  selectedClinic: string;
  onClinicSelect: (clinicId: string) => void;
}) => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        Choose Your Clinic
      </h2>
      <div className="w-24 h-1 bg-red-500 mx-auto mb-6" />
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Select from our expertly crafted clinics designed to elevate your riding skills
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {clinicTypes.map((clinic) => (
        <div
          key={clinic.id}
          className={`bg-red-600 rounded-xl shadow-lg p-6 mb-6 group hover:bg-red-700 transition-all duration-300 cursor-pointer overflow-hidden hover:z-10 relative ${
            selectedClinic === clinic.id ? "bg-red-700 scale-105 shadow-2xl" : ""
          }`}
          onClick={() => onClinicSelect(clinic.id)}
        >
          {clinic.featured && (
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-yellow-500 text-black border-white border-2 shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            </div>
          )}
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <h3 className="text-white text-xl font-semibold group-hover:text-yellow-300 transition-colors mb-2">
                {clinic.name}
              </h3>
              <p className="text-white/80 text-sm mb-3">
                {clinic.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="border-white/30 text-white bg-white/10">
                  {clinic.level}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white bg-white/10 text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  {clinic.instructor}
                </Badge>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-16 h-16 relative group-hover:scale-105 transition-transform duration-300">
              <img
                src="/ChatGPT Image May 17, 2025, 03_40_13 PM.png"
                alt={clinic.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 group-hover:bg-white/15 transition-all duration-300 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">{clinic.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white/90 text-sm">{clinic.time}</span>
            </div>
          </div>

          {/* Price and Participants */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-sm">
                Max {clinic.maxParticipants}
              </span>
            </div>
            <Badge className="bg-white text-red-600 text-lg font-bold px-3 py-1 shadow-lg">
              {clinic.price}
            </Badge>
          </div>

          {/* Selection indicator */}
          {selectedClinic === clinic.id && (
            <div className="flex items-center justify-center gap-2 pt-4 animate-bounce">
              <CheckCircle className="w-5 h-5 text-yellow-300" />
              <span className="text-yellow-300 font-bold">Selected!</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Booking Summary Component
const BookingSummary = ({
  selectedClinicDetails
}: {
  selectedClinicDetails: {
    id: string;
    name: string;
    description: string;
    price: string;
    maxParticipants: number;
    date: string;
    time: string;
    dateValue: string;
    timeValue: string;
    instructor: string;
    level: string;
    featured: boolean;
  } | undefined;
}) => (
  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-8">
    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
      <CardTitle className="text-white flex items-center gap-2">
        <CheckCircle className="w-6 h-6" />
        Your Booking Summary
      </CardTitle>
      <CardDescription className="text-white/90">
        Review your clinic selection before proceeding
      </CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-red-400" />
            Clinic Details
          </h4>
          <p className="text-white font-semibold text-lg">{selectedClinicDetails?.name}</p>
          <p className="text-white/70 text-sm mb-2">with {selectedClinicDetails?.instructor}</p>
          <Badge className="bg-red-600 text-white">
            {selectedClinicDetails?.price}
          </Badge>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-red-400" />
            Date & Time
          </h4>
          <p className="text-white font-semibold">{selectedClinicDetails?.date}</p>
          <p className="text-white/70">{selectedClinicDetails?.time}</p>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-400" />
            Course Info
          </h4>
          <p className="text-white/80 text-sm font-medium mb-2">{selectedClinicDetails?.description}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-white/30 text-white bg-white/10">
              {selectedClinicDetails?.level}
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white bg-white/10 text-xs">
              Max {selectedClinicDetails?.maxParticipants}
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Payment Instructions Component
const PaymentInstructions = ({
  selectedClinicDetails,
  bookingReference,
  onPaymentConfirmed,
  bookingData
}: {
  selectedClinicDetails: {
    id: string;
    name: string;
    description: string;
    price: string;
    maxParticipants: number;
    date: string;
    time: string;
    dateValue: string;
    timeValue: string;
    instructor: string;
  } | undefined;
  bookingReference: string;
  onPaymentConfirmed: () => void;
  bookingData?: any;
}) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Complete Your Bank Transfer
        </h1>
        <p className="text-xl text-white/80">
          Transfer {selectedClinicDetails?.price} to secure your booking
        </p>
      </div>

      {/* Bank Transfer Details */}
      <div className="mb-8">
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-xl">
              <Banknote className="w-6 h-6" />
              Bank Transfer
            </CardTitle>
            <CardDescription className="text-white/70">
              Transfer payment directly to our account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-white/70 font-medium">Account Name:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-semibold">{bankDetails.accountName}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.accountName, "Account name")}
                        className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-white/70 font-medium">Sort Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-semibold text-lg">{bankDetails.sortCode}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.sortCode, "Sort code")}
                        className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-white/70 font-medium">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-semibold text-lg">{bankDetails.accountNumber}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.accountNumber, "Account number")}
                        className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg border border-white/20">
                    <span className="text-white/70 font-medium">Reference:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono font-bold text-lg">{bookingReference}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bookingReference, "Reference")}
                        className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <div className="flex justify-between items-center p-6 bg-white/10 border border-white/20 rounded-xl">
                  <span className="text-white font-semibold text-lg">Amount to Transfer:</span>
                  <span className="text-white font-bold text-3xl">{selectedClinicDetails?.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Confirmation */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-6">
            <CheckCircle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-3 text-lg">Payment Sent?</h3>
              <p className="text-white/80 text-sm mb-6">
                Once you've completed your bank transfer using the details above, click below to confirm your booking. Please ensure you use the correct reference number.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 mb-6">
                <p className="text-white text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-400" />
                  I have sent payment using reference: 
                  <span className="font-mono text-white bg-white/10 px-2 py-1 rounded">{bookingReference}</span>
                </p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onPaymentConfirmed}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] rounded-full"
          >
            Confirm Payment Sent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Clinics = () => {
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<"selection" | "form" | "payment" | "confirmation">("selection");
  const [bookingReference, setBookingReference] = useState<string>("");

  // Handle URL parameters for payment success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const reference = urlParams.get('reference');
    
    if (paymentSuccess === 'true' && reference) {
      setBookingReference(reference);
      setBookingStep("confirmation");
      toast.success("Payment completed successfully! Your booking is confirmed.");
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      clinicType: "",
      experienceLevel: "",
      horseName: "",
      specialRequests: "",
    },
  });

  // Handle clinic type selection
  const handleClinicSelect = (clinicId: string) => {
    setSelectedClinic(clinicId);
    form.setValue("clinicType", clinicId);
  };

  // Generate a proper reference number
  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BHS-${timestamp.toString().slice(-6)}${random}`;
  };

  // Save booking to localStorage
  const saveBookingToStorage = (bookingData: any, reference: string) => {
    const selectedClinicDetails = clinicTypes.find(c => c.id === selectedClinic);
    
    const booking = {
      id: `booking-${Date.now()}`,
      reference: reference,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      clinicType: selectedClinic,
      clinicName: selectedClinicDetails?.name || '',
      clinicPrice: selectedClinicDetails?.price || '',
      clinicDate: selectedClinicDetails?.date || '',
      clinicTime: selectedClinicDetails?.time || '',
      instructor: selectedClinicDetails?.instructor || '',
      experienceLevel: bookingData.experienceLevel,
      horseName: bookingData.horseName,
      specialRequests: bookingData.specialRequests || '',
      bookingTimestamp: new Date().toISOString(),
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
    };

    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem('clinic-bookings') || '[]');
    
    // Add new booking
    existingBookings.push(booking);
    
    // Save back to localStorage
    localStorage.setItem('clinic-bookings', JSON.stringify(existingBookings));
    
    return booking;
  };

  // Handle form submission (go to payment)
  const onSubmit = async (data: BookingFormData) => {
    if (!selectedClinic) {
      toast.error("Please select a clinic");
      return;
    }

    // Generate proper reference number
    const reference = generateReferenceNumber();
    
    // Save booking to storage
    saveBookingToStorage(data, reference);
    
    setBookingReference(reference);
    setBookingStep("payment");
    
    toast.success("Booking details saved! Please complete payment to confirm.");
  };

  // Handle payment confirmation
  const handlePaymentConfirmed = () => {
    // Smooth scroll to top first
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Set confirmation step after a short delay for smooth transition
    setTimeout(() => {
      setBookingStep("confirmation");
      toast.success("Booking confirmed successfully!");
    }, 300);
  };

  // Get selected clinic details
  const selectedClinicDetails = clinicTypes.find(c => c.id === selectedClinic);

  return (
    <div className="min-h-screen bg-blue-950 text-white relative">
      <ContactHeader bgColor="bg-blue-950" />
      
      {/* Enhanced Back Home Button */}
      <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
        <Link to="/">
          <Button 
            variant="outline"
            className="bg-blue-900/80 hover:bg-blue-800 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            <span className="font-medium">Back Home</span>
          </Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="relative">
        
        {bookingStep === "selection" && (
          <>
            {/* Enhanced Hero Section with Full Background - Stretch to top */}
            <section className="relative bg-blue-950 pt-0 pb-16 sm:pb-20 md:pb-24 overflow-hidden w-screen ml-[calc(-50vw+50%)] min-h-screen flex items-center">
              <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 via-blue-950/80 to-blue-950/95" />
              
              {/* Decorative bubbles positioned over the hero image in top right */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse z-10"></div>
              <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full opacity-30 animate-pulse delay-1000 z-10"></div>
              <div className="absolute top-60 right-16 w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full opacity-20 animate-pulse delay-2000 z-10"></div>
              
              <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="text-center">
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
                    Book Your Clinic
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
                    Join our expert-led clinics designed to enhance your riding skills and deepen your connection with horses. 
                    Select your preferred clinic to get started on your equestrian journey.
                  </p>
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                    <Star className="w-6 h-6 text-red-400" />
                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                  </div>
                  
                  {/* Stats or highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                      <div className="text-2xl font-bold text-red-400 mb-1">50+</div>
                      <div className="text-white/90 text-sm font-medium">Expert Instructors</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                      <div className="text-2xl font-bold text-red-400 mb-1">1000+</div>
                      <div className="text-white/90 text-sm font-medium">Happy Riders</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                      <div className="text-2xl font-bold text-red-400 mb-1">15+</div>
                      <div className="text-white/90 text-sm font-medium">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Content section */}
            <div className="max-w-7xl mx-auto px-6 relative py-16">
              <ClinicSelection 
                clinicTypes={clinicTypes}
                selectedClinic={selectedClinic}
                onClinicSelect={handleClinicSelect}
              />

              {/* Enhanced Continue Button */}
              {selectedClinic && (
                <div className="text-center animate-fadeIn">
                  <Button
                    onClick={() => setBookingStep("form")}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full"
                  >
                    Continue to Booking Details
                    <ArrowLeft className="w-6 h-6 ml-2 rotate-180" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {bookingStep === "form" && (
          <div className="max-w-7xl mx-auto px-6 relative pt-32 pb-16">
            {/* Decorative elements for other sections */}
            <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-40 -right-20 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
            
            <BookingSummary
              selectedClinicDetails={selectedClinicDetails}
            />

            {/* Enhanced Booking Form */}
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
                                className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300"
                                {...field} 
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
                                className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300"
                                {...field} 
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
                                className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300"
                                {...field} 
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
                                className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300"
                                {...field} 
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
                                <SelectItem value="beginner" className="text-white hover:bg-blue-800">Beginner</SelectItem>
                                <SelectItem value="intermediate" className="text-white hover:bg-blue-800">Intermediate</SelectItem>
                                <SelectItem value="advanced" className="text-white hover:bg-blue-800">Advanced</SelectItem>
                                <SelectItem value="expert" className="text-white hover:bg-blue-800">Expert/Professional</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="horseName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white font-semibold text-lg">Horse's Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your horse's name" 
                                className="bg-blue-900/50 border border-white/20 focus:border-red-400 text-white placeholder:text-white/50 h-12 text-lg rounded-lg transition-all duration-300"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

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

                    <div className="flex gap-6 pt-8">
                      <Button
                        type="button"
                        onClick={() => setBookingStep("selection")}
                        variant="outline"
                        className="bg-blue-900/50 border-white/30 text-white hover:bg-blue-800 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Selection
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white flex-1 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        Continue to Payment
                        <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}

        {bookingStep === "payment" && (
          <div className="max-w-7xl mx-auto px-6 relative pt-32 pb-16">
            {/* Decorative elements for payment section */}
            <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-40 -right-20 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
            
            <PaymentInstructions
              selectedClinicDetails={selectedClinicDetails}
              bookingReference={bookingReference}
              onPaymentConfirmed={handlePaymentConfirmed}
              bookingData={form.getValues()}
            />
          </div>
        )}

        {bookingStep === "confirmation" && (
          <div className="max-w-7xl mx-auto px-6 relative pt-32 pb-16">
            {/* Decorative elements for confirmation section */}
            <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full opacity-20 animate-pulse delay-2000"></div>
            
            <div className="text-center">
              <div className="mb-12">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-red-500/30 rounded-full opacity-30 animate-ping"></div>
                  <CheckCircle className="w-24 h-24 text-green-400 mx-auto relative z-10 drop-shadow-lg" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  Booking Confirmed!
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  Thank you for booking with BeHorseSavvy. We look forward to seeing you and your horse at the clinic.
                </p>
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl mb-12">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                  <CardTitle className="text-white text-2xl flex items-center justify-center gap-3">
                    <Award className="w-7 h-7" />
                    Your Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Banknote className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-white font-bold text-lg">Booking Reference</span>
                      </div>
                      <p className="text-red-400 font-mono text-2xl font-bold bg-white/5 p-3 rounded-lg text-center">{bookingReference}</p>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Star className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-white font-bold text-lg">Clinic</span>
                      </div>
                      <p className="text-white font-semibold text-xl">{selectedClinicDetails?.name}</p>
                      <p className="text-white/70">with {selectedClinicDetails?.instructor}</p>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <CalendarDays className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-white font-bold text-lg">Date</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{selectedClinicDetails?.date}</p>
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Clock className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-white font-bold text-lg">Time</span>
                      </div>
                      <p className="text-white font-semibold text-lg">{selectedClinicDetails?.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-white/10 border border-white/20 rounded-xl p-8 mb-12 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-600 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-white font-bold text-xl mb-4">What's Next?</h3>
                    <ul className="text-white/80 space-y-3 text-lg">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        You'll receive a confirmation email within 24 hours
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        We'll verify your payment and send final confirmation
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        Please arrive 15 minutes before your scheduled time
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        Bring appropriate riding gear and safety equipment
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-white/90 text-lg font-medium">
                  If you have any questions or need to make changes to your booking, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a 
                    href="tel:+447506600222" 
                    className="flex items-center justify-center gap-3 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">+44 7506 600 222</span>
                  </a>
                  <a 
                    href="mailto:Penelopepleasant@gmail.com" 
                    className="flex items-center justify-center gap-3 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 px-6 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-semibold">Penelopepleasant@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="pt-12">
                <Link to="/">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                    <ArrowLeft className="w-6 h-6 mr-3" />
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
};

export default Clinics; 