import { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CalendarDays, Users, CheckCircle, AlertCircle, Phone, Mail, Copy, Banknote, Star, Award, CreditCard, Printer } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from '@/services/supabaseClient';
import React from "react";
import { lazy } from "react";

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

const steps = [
  { label: "Select Clinic", icon: <CalendarDays className="w-5 h-5" /> },
  { label: "Your Details", icon: <Users className="w-5 h-5" /> },
  { label: "Payment", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Confirmation", icon: <CheckCircle className="w-5 h-5" /> },
];

function Stepper({ currentStep }: { currentStep: number }) {
  // Adjust 'top-14' if your ContactHeader height changes
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
  onClinicSelect: (clinicId: string) => Promise<void>;
}) => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
        Choose Your Clinic
      </h2>
      <div className="w-24 h-1 bg-red-500 mx-auto mb-6 rounded-full" />
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Select from our expertly crafted clinics designed to elevate your riding skills
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {clinicTypes.map((clinic) => (
        <div
          key={clinic.id}
          className={`flex flex-col bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden group transition-all duration-300 cursor-pointer relative hover:-translate-y-1 hover:shadow-3xl ${
            selectedClinic === clinic.id ? "ring-2 ring-red-400 shadow-3xl" : "hover:ring-1 hover:ring-red-300"
          }`}
          onClick={() => onClinicSelect(clinic.id)}
        >
          {/* Gradient header bar and Popular badge */}
          <div className="relative w-full h-4 bg-gradient-to-r from-red-600 to-red-700">
            {/* Popular badge removed */}
          </div>
          {/* Card Content */}
          <div className="flex-1 flex flex-col p-6 gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-white text-2xl font-bold tracking-tight mb-1 group-hover:text-yellow-300 transition-colors">
                {clinic.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-white/30 text-white bg-white/10 text-xs px-2 py-0.5">
                  {clinic.level}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white bg-white/10 text-xs px-2 py-0.5">
                  <Award className="w-3 h-3 mr-1" />
                  {clinic.instructor}
                </Badge>
              </div>
              <p className="text-white/80 text-base mb-2 min-h-[48px]">{clinic.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-red-400" />
                <span className="text-white font-medium text-sm">{clinic.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                <span className="text-white/90 text-sm">{clinic.time}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Users className="w-5 h-5 text-white/70" />
                <span className="text-white/70 text-sm">Max {clinic.maxParticipants}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Badge className="bg-red-600/90 text-white text-lg font-bold px-4 py-2 shadow-lg text-base">
                {clinic.price}
              </Badge>
              {selectedClinic === clinic.id && (
                <div className="flex items-center gap-2 animate-none">
                  <CheckCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-200 font-bold">Selected</span>
                </div>
              )}
            </div>
          </div>
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
  const [agreed, setAgreed] = useState(false);
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
          
          <div className="flex items-center gap-3 mb-4 mt-2">
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded border border-white/30 focus:ring-2 focus:ring-red-400 cursor-pointer"
            />
            <label htmlFor="agree-terms" className="text-white/80 text-sm select-none">
              By booking, you agree to our{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline text-red-300 hover:text-red-400">Terms and Conditions</a>.
            </label>
          </div>
          <Button
            onClick={onPaymentConfirmed}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] rounded-full"
            disabled={!agreed}
          >
            Confirm Payment Sent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const FullClinicPopup = React.lazy(() => import("./FullClinicPopup"));

const Clinics = () => {
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [bookingStep, setBookingStep] = useState<"selection" | "form" | "payment" | "confirmation">("selection");
  const [bookingReference, setBookingReference] = useState<string>("");
  const [clinicTypes, setClinicTypes] = useState<any[]>([]);
  const [isCheckingClinic, setIsCheckingClinic] = useState<string | null>(null);
  const [fullClinicPopup, setFullClinicPopup] = useState(false);

  // Fetch clinics from Supabase on mount
  useEffect(() => {
    const fetchClinics = async () => {
      const { data, error } = await supabase.from('clinics').select('*').order('date_value', { ascending: true });
      if (error) {
        toast.error('Failed to load clinics');
        setClinicTypes([]);
      } else {
        // Map Supabase fields to expected frontend fields
        setClinicTypes((data || []).map(c => ({
          id: c.id,
          name: c.name,
          description: c.description,
          price: c.price,
          maxParticipants: c.max_participants,
          date: c.date,
          time: c.time,
          dateValue: c.date_value,
          timeValue: c.time_value,
          instructor: c.instructor,
          level: c.level,
          featured: c.featured,
        })));
      }
    };
    fetchClinics();
  }, []);

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

  // Scroll to top on bookingStep change (except confirmation, which already does it)
  useEffect(() => {
    if (bookingStep !== "confirmation") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [bookingStep]);

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

  // Enhanced clinic selection handler with capacity check
  const handleClinicSelect = async (clinicId: string) => {
    setIsCheckingClinic(clinicId);
    const selectedClinicDetails = clinicTypes.find(c => c.id === clinicId);
    if (!selectedClinicDetails) {
      setIsCheckingClinic(null);
      return;
    }
    const maxParticipants = selectedClinicDetails.maxParticipants || 0;
    // Check current bookings for this clinic, excluding cancelled/declined
    const { count, error: countError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('clinic_type', clinicId)
      .not('status', 'in', '("cancelled","declined")');
    setIsCheckingClinic(null);
    if (countError) {
      setFullClinicPopup(true);
      return;
    }
    if (count >= maxParticipants) {
      setFullClinicPopup(true);
      return;
    }
    setSelectedClinic(clinicId);
    form.setValue("clinicType", clinicId);
  };

  // Generate a proper reference number
  const generateReferenceNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BHS-${timestamp.toString().slice(-6)}${random}`;
  };

  // Store booking form data in state until payment is confirmed
  const [pendingBookingData, setPendingBookingData] = useState<any>(null);

  // Save booking to Supabase (with .select() to always return data)
  const saveBookingToSupabase = async (bookingData: any, reference: string) => {
    const selectedClinicDetails = clinicTypes.find(c => c.id === selectedClinic);
    const maxParticipants = selectedClinicDetails?.maxParticipants || 0;

    // Check current bookings for this clinic
    const { count, error: countError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('clinic_type', selectedClinic);
    if (countError) {
      toast.error('Error checking clinic capacity. Please try again.');
      return null;
    }
    if (count >= maxParticipants) {
      toast.error('Sorry, this clinic is fully booked. If you are still interested in partaking, please email Penelopepleasant@gmail.com.');
      return null;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          first_name: bookingData.firstName,
          last_name: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone,
          clinic_type: selectedClinic,
          clinic_name: selectedClinicDetails?.name || '',
          clinic_price: selectedClinicDetails?.price || '',
          clinic_date: selectedClinicDetails?.date || '',
          clinic_time: selectedClinicDetails?.time || '',
          instructor: selectedClinicDetails?.instructor || '',
          experience_level: bookingData.experienceLevel,
          horse_name: bookingData.horseName,
          special_requests: bookingData.specialRequests || '',
          reference: reference,
          status: 'pending',
          payment_status: 'pending',
        }
      ])
      .select()
      .single();
    if (error) {
      toast.error('Failed to save booking. Please try again.');
      return null;
    }
    return data;
  };

  // Handle form submission (go to payment)
  const onSubmit = async (data: BookingFormData) => {
    if (!selectedClinic) {
      toast.error("Please select a clinic");
      return;
    }
    // Generate proper reference number
    const reference = generateReferenceNumber();
    setBookingReference(reference);
    setPendingBookingData(data);

    // Send booking request received email
    const selectedClinicDetails = clinicTypes.find(c => c.id === selectedClinic);
    if (selectedClinicDetails) {
      try {
        const res = await fetch('/api/send-booking-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            clinic: selectedClinicDetails.name,
            date: selectedClinicDetails.date,
            time: selectedClinicDetails.time,
            reference,
            status: 'submitted',
          }),
        });
        const result = await res.json();
        if (!result.success) {
          toast.error("There was a problem sending your confirmation email.");
          return;
        }
      } catch (err) {
        toast.error("There was a network error sending your confirmation email.");
        return;
      }
    }

    setBookingStep("payment");
    toast.success("Booking details saved! Please complete payment to confirm.");
  };

  // Handle payment confirmation (now does the Supabase insert)
  const handlePaymentConfirmed = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!pendingBookingData || !bookingReference) {
      toast.error("Missing booking details. Please try again.");
      return;
    }
    const result = await saveBookingToSupabase(pendingBookingData, bookingReference);
    if (!result) return;
    setTimeout(() => {
      setBookingStep("confirmation");
      toast.success("Booking confirmed successfully!");
    }, 300);
  };

  // Get selected clinic details
  const selectedClinicDetails = clinicTypes.find(c => c.id === selectedClinic);

  // Fetch booking details from Supabase by reference for confirmation
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    const fetchConfirmedBooking = async () => {
      if (bookingStep === 'confirmation' && bookingReference) {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('reference', bookingReference)
          .single();
        if (!error && data) {
          setConfirmedBooking(data);
        }
      }
    };
    fetchConfirmedBooking();
  }, [bookingStep, bookingReference]);

  return (
    <div className="min-h-screen bg-blue-950 text-white relative">
      {fullClinicPopup && (
        <Suspense fallback={null}>
          <FullClinicPopup open={fullClinicPopup} onClose={() => setFullClinicPopup(false)} />
        </Suspense>
      )}
      <ContactHeader bgColor="bg-blue-950" />
      <Stepper currentStep={
        bookingStep === "selection" ? 0 :
        bookingStep === "form" ? 1 :
        bookingStep === "payment" ? 2 : 3
      } />
      
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
        <AnimatePresence mode="wait" initial={false}>
          {bookingStep === "selection" && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
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
                        <div className="text-2xl font-bold text-red-400 mb-1">5*</div>
                        <div className="text-white/90 text-sm font-medium">Rated Experience</div>
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
                {clinicTypes.length === 0 ? (
                  <div className="text-center py-24 text-white/70 text-2xl font-semibold">
                    There are no clinics available right now.<br />
                    Please check back soon!
                  </div>
                ) : (
                  <ClinicSelection 
                    clinicTypes={clinicTypes}
                    selectedClinic={selectedClinic}
                    onClinicSelect={handleClinicSelect}
                  />
                )}
                {/* Enhanced Continue Button */}
                {selectedClinic && clinicTypes.length > 0 && (
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
            </motion.div>
          )}
          {bookingStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
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
            </motion.div>
          )}
          {bookingStep === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
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
            </motion.div>
          )}
          {bookingStep === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="max-w-7xl mx-auto px-6 relative pt-32 pb-16" id="confirmation-section">
                {/* Decorative elements for confirmation section */}
                <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full opacity-20 animate-pulse delay-2000"></div>
                <div className="text-center">
                  <div className="mb-8">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-red-500/30 rounded-full opacity-30 animate-ping"></div>
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto relative z-10 drop-shadow-lg" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                      Booking Confirmed!
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-2">
                      Thank you for booking with BeHorseSavvy. We look forward to seeing you and your horse at the clinic.
                    </p>
                  </div>

                  <Card className="bg-white/20 backdrop-blur-sm border border-white/20 shadow-xl mb-8">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg py-3 px-4">
                      <CardTitle className="text-white text-xl flex items-center justify-center gap-3">
                        <Award className="w-6 h-6" />
                        Your Booking Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 md:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-red-500/20 rounded-lg">
                              <Banknote className="w-4 h-4 text-red-400" />
                            </div>
                            <span className="text-white font-bold text-base">Booking Reference</span>
                          </div>
                          <p className="text-red-400 font-mono text-lg font-bold bg-white/5 p-2 rounded-lg text-center">{bookingReference}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-red-500/20 rounded-lg">
                              <Star className="w-4 h-4 text-red-400" />
                            </div>
                            <span className="text-white font-bold text-base">Clinic</span>
                          </div>
                          <p className="text-white font-semibold text-base">{selectedClinicDetails?.name}</p>
                          <p className="text-white/70 text-sm">with {selectedClinicDetails?.instructor}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-red-500/20 rounded-lg">
                              <CalendarDays className="w-4 h-4 text-red-400" />
                            </div>
                            <span className="text-white font-bold text-base">Date</span>
                          </div>
                          <p className="text-white font-semibold text-base">{selectedClinicDetails?.date}</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-red-500/20 rounded-lg">
                              <Clock className="w-4 h-4 text-red-400" />
                            </div>
                            <span className="text-white font-bold text-base">Time</span>
                          </div>
                          <p className="text-white font-semibold text-base">{selectedClinicDetails?.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-8 shadow-lg max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-600 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-white font-bold text-lg mb-2">What's Next?</h3>
                        <ul className="text-white/80 space-y-2 text-base">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            You'll receive a confirmation email within 24 hours
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            We'll verify your payment and send final confirmation
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            Please arrive 15 minutes before your scheduled time
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            Bring appropriate riding gear and safety equipment
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-white/90 text-base font-medium">
                      If you have any questions or need to make changes to your booking, please contact us:
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <a 
                        href="tel:+447506600222" 
                        className="flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 px-5 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="font-semibold">+44 7506 600 222</span>
                      </a>
                      <a 
                        href="mailto:Penelopepleasant@gmail.com" 
                        className="flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 px-5 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="font-semibold">Penelopepleasant@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col items-center gap-4">
                    <button
                      onClick={() => {
                        // Professional invoice printout
                        const participantName = form.getValues().firstName && form.getValues().lastName
                          ? `${form.getValues().firstName} ${form.getValues().lastName}`
                          : '';
                        const invoiceHTML = renderInvoiceHTML({
                          reference: bookingReference,
                          clinic: selectedClinicDetails?.name,
                          instructor: selectedClinicDetails?.instructor,
                          date: selectedClinicDetails?.date,
                          time: selectedClinicDetails?.time,
                          price: selectedClinicDetails?.price,
                          participant: participantName,
                        });
                        const printWindow = window.open('', '', 'height=900,width=700');
                        if (printWindow) {
                          printWindow.document.write(invoiceHTML);
                          printWindow.document.close();
                          printWindow.focus();
                          setTimeout(() => printWindow.print(), 300);
                        }
                      }}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2 transition-all duration-300 no-print"
                    >
                      <Printer className="w-5 h-5 mr-2" />
                      Print Invoice
                    </button>
                    <Link to="/">
                      <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-3 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Return to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
};

function renderInvoiceHTML({ reference, clinic, instructor, date, time, price, participant }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Clinic Booking Invoice</title>
      <style>
        body {
          background: #fff;
          color: #222;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .invoice-container {
          max-width: 650px;
          margin: 40px auto;
          padding: 40px 40px 32px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
        }
        .header {
          text-align: center;
          margin-bottom: 18px;
        }
        .brand {
          font-size: 2.5rem;
          font-weight: 800;
          color: #b91c1c;
          letter-spacing: 1.5px;
          margin-bottom: 0.2em;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .tagline {
          font-size: 1.15rem;
          color: #374151;
          font-weight: 500;
          margin-bottom: 0.5em;
        }
        .divider {
          border: none;
          border-top: 2px solid #b91c1c;
          margin: 0 auto 32px auto;
          width: 80%;
        }
        .section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #b91c1c;
          margin-bottom: 8px;
          margin-top: 32px;
        }
        .info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 18px;
        }
        .info-table th, .info-table td {
          text-align: left;
          padding: 10px 8px;
          border-bottom: 1px solid #f3f4f6;
        }
        .info-table th {
          background: #f8fafc;
          color: #b91c1c;
          font-weight: 600;
          width: 180px;
        }
        .info-table td {
          color: #222;
        }
        .total-row td {
          font-size: 1.2rem;
          font-weight: bold;
          color: #b91c1c;
          border-top: 2px solid #b91c1c;
          background: #f8fafc;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          color: #888;
          font-size: 1rem;
        }
        @media print {
          body { background: #fff !important; }
          .invoice-container { box-shadow: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="brand">BeHorseSavvy</div>
          <div class="tagline">Clinic Booking Invoice</div>
        </div>
        <hr class="divider" />
        <div class="section-title">Billed To</div>
        <table class="info-table" style="margin-bottom: 32px;">
          <tr><th>Name</th><td>${participant || '<span style=\"color:#bbb\">(Not provided)</span>'}</td></tr>
        </table>
        <div class="section-title">Clinic Details</div>
        <table class="info-table">
          <tr><th>Booking Reference</th><td>${reference || ''}</td></tr>
          <tr><th>Clinic</th><td>${clinic || ''}</td></tr>
          <tr><th>Instructor</th><td>${instructor || ''}</td></tr>
          <tr><th>Date</th><td>${date || ''}</td></tr>
          <tr><th>Time</th><td>${time || ''}</td></tr>
          <tr class="total-row"><th>Total Due</th><td>${price || ''}</td></tr>
        </table>
        <div class="footer">
          Thank you for booking with BeHorseSavvy.<br />
          For questions, contact Penelope Pleasant:<br />
          <a href="mailto:Penelopepleasant@gmail.com">Penelopepleasant@gmail.com</a> &nbsp;|&nbsp; +44 7506 600 222
        </div>
      </div>
    </body>
    </html>
  `;
}

export default Clinics; 