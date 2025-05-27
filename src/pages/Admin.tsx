import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, CheckCircle, XCircle, Clock, Calendar, User, Phone, Mail, Hash, Download, Shield, Users, Award, AlertTriangle, LogOut, Timer, Eye, EyeOff, Plus, Edit, Trash2, CalendarDays } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { format } from "date-fns";
import { toast } from "sonner";
import { simpleAuth } from "@/services/simpleAuth";
import { ClinicManagement } from "@/components/ClinicManagement";
import { supabase } from '@/services/supabaseClient';

// Types for booking data
interface BookingData {
  id: string;
  reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  clinic_type: string;
  clinic_name: string;
  clinic_price: string;
  experience_level: string;
  horse_name: string;
  special_requests?: string;
  selected_date: string;
  selected_time: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment_status: 'pending' | 'received' | 'confirmed';
  notes?: string;
}

// Sample bookings for demo purposes
const sampleBookings: BookingData[] = [
  {
    id: "booking-demo-1",
    reference: "BHS-123456",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 7700 900001",
    clinic_type: "dressage-1",
    clinic_name: "Dressage Clinic",
    clinic_price: "£60",
    experience_level: "intermediate",
    horse_name: "Thunder",
    special_requests: "My horse can be nervous around other horses, please seat us accordingly.",
    selected_date: "Saturday, January 27, 2024",
    selected_time: "9:00 AM - 11:00 AM",
    created_at: "2024-01-15T10:30:00Z",
    status: 'pending',
    payment_status: 'pending',
  },
  {
    id: "booking-demo-2",
    reference: "BHS-234567",
    first_name: "James",
    last_name: "Mitchell",
    email: "james.mitchell@example.com",
    phone: "+44 7700 900002",
    clinic_type: "jumping-1",
    clinic_name: "Show Jumping Clinic",
    clinic_price: "£65",
    experience_level: "advanced",
    horse_name: "Midnight Star",
    special_requests: "",
    selected_date: "Sunday, January 28, 2024",
    selected_time: "2:00 PM - 4:00 PM",
    created_at: "2024-01-14T14:20:00Z",
    status: 'confirmed',
    payment_status: 'confirmed',
  },
  {
    id: "booking-demo-3",
    reference: "BHS-345678",
    first_name: "Emma",
    last_name: "Roberts",
    email: "emma.roberts@example.com",
    phone: "+44 7700 900003",
    clinic_type: "flatwork-1",
    clinic_name: "Flatwork Fundamentals",
    clinic_price: "£55",
    experience_level: "beginner",
    horse_name: "Gentle Ben",
    special_requests: "First time at a clinic, would appreciate extra guidance.",
    selected_date: "Sunday, February 4, 2024",
    selected_time: "11:00 AM - 1:00 PM",
    created_at: "2024-01-13T09:15:00Z",
    status: 'pending',
    payment_status: 'pending',
  }
];

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [showPassword, setShowPassword] = useState(false);

  const lockoutInfo = simpleAuth.getLockoutInfo();

  useEffect(() => {
    setRemainingAttempts(simpleAuth.getRemainingAttempts());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (lockoutInfo.isLockedOut) {
      toast.error(`Account locked. Try again in ${lockoutInfo.remainingMinutes} minutes.`);
      return;
    }

    setIsLoading(true);

    try {
      const result = await simpleAuth.login(password);
      
      if (result.success) {
        toast.success(result.message);
        onLogin();
      } else {
        toast.error(result.message);
        if (result.remainingAttempts !== undefined && result.remainingAttempts > 0) {
          toast.warning(`Incorrect - (${result.remainingAttempts}) attempts remaining`);
          setRemainingAttempts(result.remainingAttempts);
        }
        setPassword("");
      }
    } catch (error) {
      toast.error("Authentication failed");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
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
        <CardContent className="p-6 space-y-6">
          {/* Lockout Warning */}
          {lockoutInfo.isLockedOut && (
            <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-red-200">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Account Locked</span>
              </div>
              <p className="text-red-200/80 text-sm mt-1">
                Try again in {lockoutInfo.remainingMinutes} minutes
              </p>
            </div>
          )}

          {/* Environment Configuration Warning */}
          {!import.meta.env.VITE_ADMIN_PASSWORD_HASH && (
            <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-red-200 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Missing Configuration</span>
              </div>
              <p className="text-red-200/80 text-sm">
                No password hash configured in environment variables.
              </p>
              <p className="text-red-200/60 text-xs mt-1">
                Use the secure environment generator to set up authentication credentials.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-blue-900/50 border-white/30 text-white placeholder:text-white/50 h-12 text-lg focus:border-red-400 transition-all duration-300 pr-12"
                disabled={lockoutInfo.isLockedOut}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200"
                disabled={lockoutInfo.isLockedOut}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading || lockoutInfo.isLockedOut}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Attempts Counter */}
          {!lockoutInfo.isLockedOut && remainingAttempts < 5 && (
            <div className="text-center">
              <p className="text-yellow-200 text-sm">
                {remainingAttempts} login attempts remaining
              </p>
            </div>
          )}
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
  const [activeTab, setActiveTab] = useState<"bookings" | "clinics">("bookings");

  const sessionInfo = simpleAuth.getSessionInfo();

  // Load bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        toast.error('Failed to load bookings from Supabase');
        setBookings([]);
      } else {
        setBookings(data || []);
      }
    };
    fetchBookings();
  }, []);

  // Save bookings to Supabase (update status)
  const updateBookingStatus = async (bookingId: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId);
    if (error) {
      toast.error('Failed to update booking status');
      return false;
    }
    // Refetch bookings
    const { data } = await supabase.from('bookings').select('*');
    setBookings(data || []);
    return true;
  };

  // Confirm booking
  const confirmBooking = async (bookingId: string) => {
    const success = await updateBookingStatus(bookingId, 'confirmed');
    if (success) toast.success('Booking confirmed!');
  };

  // Decline booking
  const declineBooking = async (bookingId: string) => {
    const success = await updateBookingStatus(bookingId, 'cancelled');
    if (success) toast.success('Booking declined!');
  };

  // Logout
  const handleLogout = () => {
    simpleAuth.logout();
    window.location.reload();
  };

  // Verify reference
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

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.clinic_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const pendingBookings = filteredBookings.filter(booking => booking.status === 'pending');
  const confirmedBookings = filteredBookings.filter(booking => booking.status === 'confirmed');
  const declinedBookings = filteredBookings.filter(booking => booking.status === 'cancelled');

  // Export bookings
  const exportBookings = () => {
    const headers = ['Reference', 'Name', 'Email', 'Phone', 'Clinic', 'Date', 'Time', 'Status', 'Booked At'];
    const csvData = filteredBookings.map(booking => [
      booking.reference,
      `${booking.first_name} ${booking.last_name}`,
      booking.email,
      booking.phone,
      booking.clinic_name,
      booking.selected_date,
      booking.selected_time,
      booking.status,
      booking.created_at && !isNaN(new Date(booking.created_at).getTime())
        ? format(new Date(booking.created_at), 'yyyy-MM-dd HH:mm')
        : 'N/A'
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

  // Delete all declined/cancelled bookings
  const deleteDeclinedBookings = async () => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .or('status.eq.declined,status.eq.cancelled');
    if (error) {
      toast.error('Failed to delete declined/cancelled bookings');
    } else {
      toast.success('All declined/cancelled bookings deleted');
      // Refetch bookings
      const { data } = await supabase.from('bookings').select('*');
      setBookings(data || []);
    }
  };

  // Booking card component
  const BookingCard = ({ booking, isPending = false, isDeclined = false }: { booking: BookingData; isPending?: boolean; isDeclined?: boolean }) => (
    <div className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-red-400" />
            <span className="text-white font-semibold text-lg">
              {booking.first_name} {booking.last_name}
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
            <p className="text-white/90 font-medium">{booking.clinic_name}</p>
            <p className="text-red-400 font-semibold">{booking.clinic_price}</p>
            <p className="text-white/70">{booking.selected_date}</p>
            <p className="text-white/70">{booking.selected_time}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Horse & Experience</h4>
          <div className="space-y-1 text-sm">
            <p className="text-white/80">
              <span className="text-white/60">Horse:</span> {booking.horse_name}
            </p>
            <p className="text-white/80">
              <span className="text-white/60">Level:</span> {booking.experience_level}
            </p>
            <p className="text-white/60 text-xs">
              Booked: {booking.created_at && !isNaN(new Date(booking.created_at).getTime()) ? format(new Date(booking.created_at), 'MMM d, HH:mm') : 'N/A'}
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
            </>
          ) : (
            <div className="space-y-3">
              <h4 className="text-white font-semibold">Status</h4>
              <div className={`p-3 rounded-lg ${
                isDeclined 
                  ? 'bg-red-950/50 border border-red-500/50'
                  : 'bg-green-950/50 border border-green-500/50'
              }`}>
                <p className={`text-sm flex items-center gap-2 ${
                  isDeclined ? 'text-red-200' : 'text-green-200'
                }`}>
                  {isDeclined ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  {isDeclined ? 'Declined' : 'Confirmed'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {booking.special_requests && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <h5 className="text-white font-medium mb-2">Special Requests:</h5>
          <p className="text-white/70 text-sm bg-white/5 p-3 rounded-lg border border-white/10">{booking.special_requests}</p>
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
            {/* Logout Button */}
            <div className="absolute md:top-0 right-0 sm:right-4 z-20 top-[-20px]">
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-red-900/80 hover:bg-red-800 text-white border-red-500/50 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[5px] text-sm sm:text-base"
              >
                <LogOut size={16} strokeWidth={2.5} />
                <span className="font-medium">Logout</span>
              </Button>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Admin Dashboard
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6" />
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              Secure clinic booking management
            </p>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 flex gap-2">
                <Button
                  onClick={() => setActiveTab("bookings")}
                  className={`px-6 py-3 rounded-md transition-all duration-300 ${
                    activeTab === "bookings"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-transparent text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookings
                </Button>
                <Button
                  onClick={() => setActiveTab("clinics")}
                  className={`px-6 py-3 rounded-md transition-all duration-300 ${
                    activeTab === "clinics"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-transparent text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Clinics
                </Button>
              </div>
            </div>

            {/* Session Info */}
            {sessionInfo && (
              <div className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Session Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-blue-400" />
                    <span>Login: {sessionInfo.loginTime}</span>
                  </div>
                </div>
                <div className="text-xs text-white/60 text-center mt-2">
                  Expires: {sessionInfo.expiresAt}
                </div>
              </div>
            )}
          </div>

          {/* Bookings Tab Content */}
          {activeTab === "bookings" && (
            <>
              {/* Delete Declined Bookings Button */}
              <div className="mb-6 flex justify-end">
                <button
                  onClick={deleteDeclinedBookings}
                  className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All Declined Bookings
                </button>
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
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl mb-8">
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

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-white mb-2">Clinic Management</h2>
                  <p className="text-white/70">Manage available clinics and offerings</p>
                </div>
              </div>
            </>
          )}

          {/* Clinics Tab Content */}
          {activeTab === "clinics" && (
            <>
              <ClinicManagement />
            </>
          )}
        </div>
      </section>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(simpleAuth.isAuthenticated());
  }, []);

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
};

export default Admin; 