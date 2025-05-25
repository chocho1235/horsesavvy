import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, CheckCircle, XCircle, Clock, Calendar, User, Phone, Mail, Hash, Eye, Download, Filter, Shield, Users, Award } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { format } from "date-fns";
import { toast } from "sonner";

// Types for booking data
interface BookingData {
  id: string;
  reference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clinicType: string;
  clinicName: string;
  clinicPrice: string;
  experienceLevel: string;
  horseName: string;
  specialRequests?: string;
  selectedDate: string;
  selectedTime: string;
  bookingTimestamp: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'received' | 'confirmed';
  notes?: string;
}

// Mock admin credentials (in real app, this would be proper authentication)
const ADMIN_PASSWORD = "admin123";

// Sample bookings for demo purposes
const sampleBookings: BookingData[] = [
  {
    id: "booking-demo-1",
    reference: "BHS-123456",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 7700 900001",
    clinicType: "dressage-1",
    clinicName: "Dressage Clinic",
    clinicPrice: "£60",
    experienceLevel: "intermediate",
    horseName: "Thunder",
    specialRequests: "My horse can be nervous around other horses, please seat us accordingly.",
    selectedDate: "Saturday, January 27, 2024",
    selectedTime: "9:00 AM - 11:00 AM",
    bookingTimestamp: "2024-01-15T10:30:00Z",
    status: 'pending',
    paymentStatus: 'pending',
  },
  {
    id: "booking-demo-2",
    reference: "BHS-234567",
    firstName: "James",
    lastName: "Mitchell",
    email: "james.mitchell@example.com",
    phone: "+44 7700 900002",
    clinicType: "jumping-1",
    clinicName: "Show Jumping Clinic",
    clinicPrice: "£65",
    experienceLevel: "advanced",
    horseName: "Midnight Star",
    specialRequests: "",
    selectedDate: "Sunday, January 28, 2024",
    selectedTime: "2:00 PM - 4:00 PM",
    bookingTimestamp: "2024-01-14T14:20:00Z",
    status: 'confirmed',
    paymentStatus: 'confirmed',
  },
  {
    id: "booking-demo-3",
    reference: "BHS-345678",
    firstName: "Emma",
    lastName: "Roberts",
    email: "emma.roberts@example.com",
    phone: "+44 7700 900003",
    clinicType: "flatwork-1",
    clinicName: "Flatwork Fundamentals",
    clinicPrice: "£55",
    experienceLevel: "beginner",
    horseName: "Gentle Ben",
    specialRequests: "First time at a clinic, would appreciate extra guidance.",
    selectedDate: "Sunday, February 4, 2024",
    selectedTime: "11:00 AM - 1:00 PM",
    bookingTimestamp: "2024-01-13T09:15:00Z",
    status: 'pending',
    paymentStatus: 'pending',
  },
  {
    id: "booking-demo-4",
    reference: "BHS-456789",
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.thompson@example.com",
    phone: "+44 7700 900004",
    clinicType: "cross-country-1",
    clinicName: "Cross Country Clinic",
    clinicPrice: "£70",
    experienceLevel: "expert",
    horseName: "Storm Chaser",
    specialRequests: "",
    selectedDate: "Saturday, February 3, 2024",
    selectedTime: "10:00 AM - 12:00 PM",
    bookingTimestamp: "2024-01-12T16:45:00Z",
    status: 'confirmed',
    paymentStatus: 'confirmed',
  },
  {
    id: "booking-demo-5",
    reference: "BHS-567890",
    firstName: "Sophie",
    lastName: "Williams",
    email: "sophie.williams@example.com",
    phone: "+44 7700 900005",
    clinicType: "dressage-2",
    clinicName: "Advanced Dressage",
    clinicPrice: "£70",
    experienceLevel: "expert",
    horseName: "Royal Grace",
    specialRequests: "Interested in preparing for competition season.",
    selectedDate: "Saturday, February 10, 2024",
    selectedTime: "9:00 AM - 11:00 AM",
    bookingTimestamp: "2024-01-11T11:30:00Z",
    status: 'cancelled',
    paymentStatus: 'pending',
  },
  {
    id: "booking-demo-6",
    reference: "BHS-678901",
    firstName: "Oliver",
    lastName: "Brown",
    email: "oliver.brown@example.com",
    phone: "+44 7700 900006",
    clinicType: "jumping-2",
    clinicName: "Show Jumping Advanced",
    clinicPrice: "£75",
    experienceLevel: "advanced",
    horseName: "Silver Arrow",
    specialRequests: "",
    selectedDate: "Sunday, February 11, 2024",
    selectedTime: "1:00 PM - 3:00 PM",
    bookingTimestamp: "2024-01-10T13:20:00Z",
    status: 'pending',
    paymentStatus: 'pending',
  }
];

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin();
        toast.success("Admin access granted");
      } else {
        toast.error("Invalid password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl relative z-10">
        <CardHeader className="text-center bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
          <CardTitle className="text-white text-2xl flex items-center justify-center gap-2">
            <Shield className="w-6 h-6" />
            Admin Access
          </CardTitle>
          <CardDescription className="text-white/90">
            Enter admin password to access booking management
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12 text-lg focus:border-red-400 transition-all duration-300"
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </form>
          <p className="text-white/60 text-sm mt-4 text-center bg-white/5 p-3 rounded-lg border border-white/10">
            Demo password: <span className="font-mono text-red-400">admin123</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [verifyReference, setVerifyReference] = useState("");
  const [verificationResult, setVerificationResult] = useState<BookingData | null>(null);

  // Load bookings from localStorage
  useEffect(() => {
    const storedBookings = localStorage.getItem("clinic-bookings");
    if (storedBookings) {
      const parsedBookings = JSON.parse(storedBookings);
      if (parsedBookings.length > 0) {
        setBookings(parsedBookings);
      } else {
        // If no bookings exist, load sample data for demo
        setBookings(sampleBookings);
        localStorage.setItem("clinic-bookings", JSON.stringify(sampleBookings));
      }
    } else {
      // If no localStorage data exists, load sample data for demo
      setBookings(sampleBookings);
      localStorage.setItem("clinic-bookings", JSON.stringify(sampleBookings));
    }
  }, []);

  // Save bookings to localStorage
  const saveBookings = (updatedBookings: BookingData[]) => {
    setBookings(updatedBookings);
    localStorage.setItem("clinic-bookings", JSON.stringify(updatedBookings));
  };

  // Confirm booking (change from pending to confirmed)
  const confirmBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { 
        ...booking, 
        status: 'confirmed' as BookingData['status']
      } : booking
    );
    saveBookings(updatedBookings);
    toast.success("Booking confirmed!");
  };

  // Decline booking (change from pending to cancelled)
  const declineBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { 
        ...booking, 
        status: 'cancelled' as BookingData['status']
      } : booking
    );
    saveBookings(updatedBookings);
    toast.success("Booking declined!");
  };

  // Load sample data for demo
  const loadSampleData = () => {
    setBookings(sampleBookings);
    localStorage.setItem("clinic-bookings", JSON.stringify(sampleBookings));
    toast.success("Sample bookings loaded for demo!");
  };

  // Verify reference number
  const handleVerifyReference = () => {
    if (!verifyReference.trim()) {
      toast.error("Please enter a reference number");
      return;
    }

    const booking = bookings.find(b => b.reference.toLowerCase() === verifyReference.toLowerCase());
    setVerificationResult(booking || null);
    
    if (booking) {
      toast.success("Reference verified successfully");
    } else {
      toast.error("Reference number not found");
    }
  };

  // Filter bookings by search term
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.clinicName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Split bookings into pending, confirmed, and declined
  const pendingBookings = filteredBookings.filter(booking => booking.status === 'pending');
  const confirmedBookings = filteredBookings.filter(booking => booking.status === 'confirmed');
  const declinedBookings = filteredBookings.filter(booking => booking.status === 'cancelled');

  // Export bookings as CSV
  const exportBookings = () => {
    const headers = ['Reference', 'Name', 'Email', 'Phone', 'Clinic', 'Date', 'Time', 'Status', 'Booked At'];
    const csvData = filteredBookings.map(booking => [
      booking.reference,
      `${booking.firstName} ${booking.lastName}`,
      booking.email,
      booking.phone,
      booking.clinicName,
      booking.selectedDate,
      booking.selectedTime,
      booking.status,
      format(new Date(booking.bookingTimestamp), 'yyyy-MM-dd HH:mm')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinic-bookings-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Bookings exported successfully");
  };

  // Booking card component
  const BookingCard = ({ booking, isPending = false, isDeclined = false }: { booking: BookingData; isPending?: boolean; isDeclined?: boolean }) => (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-red-400" />
            <span className="text-white font-semibold text-lg">
              {booking.firstName} {booking.lastName}
            </span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-white/70 flex items-center gap-2">
              <Hash className="w-3 h-3" />
              <span className="font-mono">{booking.reference}</span>
            </p>
            <p className="text-white/70 flex items-center gap-2">
              <Mail className="w-3 h-3" />
              {booking.email}
            </p>
            <p className="text-white/70 flex items-center gap-2">
              <Phone className="w-3 h-3" />
              {booking.phone}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center gap-2">
            <Award className="w-4 h-4 text-red-400" />
            Clinic Details
          </h4>
          <div className="space-y-1 text-sm">
            <p className="text-white/90 font-medium">{booking.clinicName}</p>
            <p className="text-red-400 font-semibold">{booking.clinicPrice}</p>
            <p className="text-white/70">{booking.selectedDate}</p>
            <p className="text-white/70">{booking.selectedTime}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Horse & Experience</h4>
          <div className="space-y-1 text-sm">
            <p className="text-white/80">
              <span className="text-white/60">Horse:</span> {booking.horseName}
            </p>
            <p className="text-white/80">
              <span className="text-white/60">Level:</span> {booking.experienceLevel}
            </p>
            <p className="text-white/60 text-xs">
              Booked: {format(new Date(booking.bookingTimestamp), 'MMM d, HH:mm')}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          {isPending ? (
            <>
              <h4 className="text-white font-semibold">Action Required</h4>
              <div className="space-y-2">
                <Button
                  onClick={() => confirmBooking(booking.id)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
                <Button
                  onClick={() => declineBooking(booking.id)}
                  className="w-full bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white font-semibold py-3 shadow-lg transition-all duration-300 transform hover:scale-105 border border-red-600/50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline
                </Button>
              </div>
              <div className="bg-red-950/30 border border-red-500/30 p-3 rounded-lg">
                <p className="text-red-200 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Awaiting decision
                </p>
              </div>
            </>
          ) : isDeclined ? (
            <>
              <h4 className="text-white font-semibold">Status</h4>
              <div className="bg-red-950/50 border border-red-500/50 p-3 rounded-lg">
                <p className="text-red-200 text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Declined
                </p>
              </div>
              <p className="text-white/60 text-xs">
                Booking was declined
              </p>
            </>
          ) : (
            <>
              <h4 className="text-white font-semibold">Status</h4>
              <div className="bg-green-950/50 border border-green-500/50 p-3 rounded-lg">
                <p className="text-green-200 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Confirmed
                </p>
              </div>
              <p className="text-white/60 text-xs">
                Ready for clinic day!
              </p>
            </>
          )}
        </div>
      </div>
      
      {booking.specialRequests && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <h5 className="text-white font-medium mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-red-400" />
            Special Requests:
          </h5>
          <p className="text-white/70 text-sm bg-white/5 p-3 rounded-lg border border-white/10">{booking.specialRequests}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-950 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-full opacity-20 animate-pulse delay-2000"></div>

      <ContactHeader bgColor="bg-blue-950" />
      
      {/* Back Home Button */}
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
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Admin Dashboard
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              Manage clinic bookings with ease
            </p>
            <Button 
              onClick={loadSampleData}
              variant="outline"
              className="bg-blue-900/50 border-white/30 text-white hover:bg-blue-800 px-6 py-2 font-semibold shadow-lg transition-all duration-300"
            >
              🎯 Load Sample Data (Demo)
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Total</p>
                    <p className="text-white text-xl md:text-2xl font-bold">{bookings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Pending</p>
                    <p className="text-white text-xl md:text-2xl font-bold">
                      {pendingBookings.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Confirmed</p>
                    <p className="text-white text-xl md:text-2xl font-bold">
                      {confirmedBookings.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Declined</p>
                    <p className="text-white text-xl md:text-2xl font-bold">
                      {declinedBookings.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Button */}
          <div className="mb-8 text-center">
            <Button 
              onClick={exportBookings}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All Bookings (CSV)
            </Button>
          </div>

          {/* Reference Verification */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl mb-8">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center gap-2">
                <Hash className="w-5 h-5" />
                Quick Reference Lookup
              </CardTitle>
              <CardDescription className="text-white/90">
                Enter a booking reference to verify and view details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Input
                  placeholder="Enter reference number (e.g., BHS-123456)"
                  value={verifyReference}
                  onChange={(e) => setVerifyReference(e.target.value)}
                  className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12 text-lg focus:border-red-400 transition-all duration-300"
                />
                <Button 
                  onClick={handleVerifyReference}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Verify
                </Button>
              </div>
              
              {verificationResult && (
                <div className="bg-white/10 p-6 rounded-lg border border-white/20 shadow-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Booking Found
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-white/80"><span className="text-white font-medium">Name:</span> {verificationResult.firstName} {verificationResult.lastName}</p>
                        <p className="text-white/80"><span className="text-white font-medium">Email:</span> {verificationResult.email}</p>
                        <p className="text-white/80"><span className="text-white font-medium">Clinic:</span> {verificationResult.clinicName}</p>
                        <p className="text-white/80"><span className="text-white font-medium">Date:</span> {verificationResult.selectedDate}</p>
                        <p className="text-white/80"><span className="text-white font-medium">Time:</span> {verificationResult.selectedTime}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-lg">Status</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white/70 text-sm font-medium">Status:</span>
                          {verificationResult.status === 'confirmed' ? (
                            <Badge className="bg-green-600 text-white shadow-sm">Confirmed</Badge>
                          ) : verificationResult.status === 'cancelled' ? (
                            <Badge className="bg-red-600 text-white shadow-sm">Declined</Badge>
                          ) : (
                            <Badge className="bg-yellow-600 text-white shadow-sm">Pending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {verifyReference && !verificationResult && verifyReference.length > 3 && (
                <div className="bg-red-950/30 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-red-200 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reference number not found
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-white/70 flex-shrink-0" />
                <Input
                  placeholder="Search bookings by name, email, reference, or clinic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12 text-lg focus:border-red-400 transition-all duration-300"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pending Bookings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl mb-8">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Pending Bookings ({pendingBookings.length})
              </CardTitle>
              <CardDescription className="text-white/90">
                Bookings awaiting confirmation
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {pendingBookings.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <Clock className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-lg">No pending bookings</p>
                  <p className="text-sm text-white/50">All caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} isPending={true} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Confirmed Bookings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Confirmed Bookings ({confirmedBookings.length})
              </CardTitle>
              <CardDescription className="text-white/90">
                All confirmed and ready for clinic day
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {confirmedBookings.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <CheckCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-lg">No confirmed bookings yet</p>
                  <p className="text-sm text-white/50">Confirm pending bookings above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {confirmedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} isPending={false} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Declined Bookings */}
          {declinedBookings.length > 0 && (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                <CardTitle className="text-white flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  Declined Bookings ({declinedBookings.length})
                </CardTitle>
                <CardDescription className="text-white/90">
                  Bookings that were declined
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {declinedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} isPending={false} isDeclined={true} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
};

export default Admin; 