import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Printer } from "lucide-react";
import { supabase } from '@/services/supabaseClient';

import { CourseStepper } from "./CourseStepper";
import { CourseSelection } from "./CourseSelection";
import { CourseBookingSummary } from "./CourseBookingSummary";
import { CoursePaymentInstructions } from "./CoursePaymentInstructions";
import { CourseConfig, getSelectedPackageDetails, calculateTotal } from "@/config/courses";

// Form schema for customer details
const courseBookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type CourseBookingFormData = z.infer<typeof courseBookingSchema>;

interface CourseCheckoutProps {
  courseConfig: CourseConfig;
  preSelectedPackage?: string | null;
  onClose: () => void;
}

type CheckoutStep = "selection" | "form" | "payment" | "confirmation";

export function CourseCheckout({ courseConfig, preSelectedPackage, onClose }: CourseCheckoutProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(preSelectedPackage ? "form" : "selection");
  const [selectedPackages, setSelectedPackages] = useState<string[]>(preSelectedPackage ? [preSelectedPackage] : []);
  const [bookingReference, setBookingReference] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Disable body scroll when checkout is open
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY;
    
    // Disable scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Cleanup function to restore scroll
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const form = useForm<CourseBookingFormData>({
    resolver: zodResolver(courseBookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Generate unique booking reference
  const generateReferenceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `CR${timestamp}${random}`;
  };

  // Handle package selection toggle
  const handlePackageToggle = (packageId: string) => {
    const pkg = courseConfig.packages.find(p => p.id === packageId);
    if (!pkg) return;

    setSelectedPackages(prev => {
      if (pkg.type === 'bundle') {
        // Bundle selection clears all others
        return prev.includes(packageId) ? [] : [packageId];
      } else if (pkg.type === 'individual') {
        // Clear any bundle selections first
        const withoutBundles = prev.filter(id => {
          const existingPkg = courseConfig.packages.find(p => p.id === id);
          return existingPkg?.type !== 'bundle';
        });
        
        // Toggle individual selection
        return withoutBundles.includes(packageId)
          ? withoutBundles.filter(id => id !== packageId)
          : [...withoutBundles, packageId];
      } else {
        // Single package type
        return prev.includes(packageId) ? [] : [packageId];
      }
    });
  };

  // Save course booking to database
  const saveCourseBookingToSupabase = async (bookingData: any, reference: string) => {
    try {
      const bookingRecord = {
        reference: reference,
        course_id: courseConfig.id,
        selected_packages: selectedPackages,
        total_amount: calculateTotal(selectedPackages, courseConfig.id),
        customer_name: `${bookingData.firstName} ${bookingData.lastName}`,
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        status: 'pending'
      };

      console.log('Attempting to save course booking:', bookingRecord);

      const { data, error } = await supabase
        .from('course_bookings')
        .insert([bookingRecord]);

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Course booking saved successfully:', data);
      return data;
    } catch (error) {
      console.error('Full error object:', error);
      throw error;
    }
  };

  // Handle form submission
  const onSubmit = async (data: CourseBookingFormData) => {
    if (selectedPackages.length === 0) {
      toast.error('Please select at least one package');
      return;
    }

    setIsSubmitting(true);
    const reference = generateReferenceNumber();
    setBookingReference(reference);

    try {
      await saveCourseBookingToSupabase(data, reference);
      
      // Send course booking pending email
      try {
        const packageDetails = getSelectedPackageDetails(selectedPackages, courseConfig.id);
        const total = calculateTotal(selectedPackages, courseConfig.id);
        
        await fetch('/api/send-course-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            course: courseConfig.name,
            packageSelection: packageDetails.map(p => p.name).join(', '),
            totalPrice: total,
            reference,
            status: 'pending',
          }),
        });
      } catch (emailError) {
        console.warn("Course email sending failed, but continuing with booking:", emailError);
        // Don't block the booking process if email fails
      }
      
      toast.success('Course booking details saved successfully!');
      setCurrentStep("payment");
    } catch (error) {
      console.error('Error submitting course booking:', error);
      toast.error('There was an error saving your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle payment confirmation
  const handlePaymentConfirmed = async () => {
    try {
      // Update booking status to confirmed
      const { error } = await supabase
        .from('course_bookings')
        .update({ 
          status: 'payment_sent',
          confirmed_at: new Date().toISOString()
        })
        .eq('reference', bookingReference);

      if (error) throw error;

      toast.success('Payment confirmation received!');
      setCurrentStep("confirmation");
    } catch (error) {
      console.error('Error confirming payment:', error);
      toast.error('There was an error confirming your payment. Please contact support.');
    }
  };

  // Get current step index for stepper
  const stepIndex = {
    selection: 0,
    form: 1,
    payment: 2,
    confirmation: 3
  }[currentStep];

  const selectedPackageDetails = getSelectedPackageDetails(selectedPackages, courseConfig.id);
  const total = calculateTotal(selectedPackages, courseConfig.id);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen bg-blue-950">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-blue-950/90 backdrop-blur border-b border-white/10 py-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            <div>
              <h1 className="text-white font-bold text-xl">
                {courseConfig.name}
                {preSelectedPackage && (
                  <span className="text-red-400 text-base ml-2">• Complete Course Selected</span>
                )}
              </h1>
              <p className="text-white/70 text-sm">{courseConfig.description}</p>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <CourseStepper currentStep={stepIndex} />

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <AnimatePresence mode="wait">
            {currentStep === "selection" && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CourseSelection
                  packages={courseConfig.packages}
                  selectedPackages={selectedPackages}
                  onPackageToggle={handlePackageToggle}
                  onContinue={() => setCurrentStep("form")}
                  courseName={courseConfig.name}
                />
              </motion.div>
            )}

            {currentStep === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                      Your Details
                    </h2>
                    <div className="w-24 h-1 bg-red-500 mx-auto mb-6 rounded-full" />
                  </div>

                  {/* Booking Summary */}
                  <CourseBookingSummary
                    selectedPackages={selectedPackageDetails}
                    total={total}
                    courseName={courseConfig.name}
                    accessDuration={courseConfig.checkout.accessDuration}
                  />

                  {/* Customer Details Form */}
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-white">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                      placeholder="Enter your first name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                      placeholder="Enter your last name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Email Address</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="email"
                                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                      placeholder="Enter your email"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="tel"
                                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                      placeholder="Enter your phone number"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex gap-4 pt-4">
                            {!preSelectedPackage && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCurrentStep("selection")}
                                className="flex-1 border-white/20 text-white hover:bg-white/10"
                              >
                                Back to Selection
                              </Button>
                            )}
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className={`${preSelectedPackage ? 'w-full' : 'flex-1'} bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white`}
                            >
                              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {currentStep === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CoursePaymentInstructions
                  selectedPackages={selectedPackageDetails}
                  total={total}
                  bookingReference={bookingReference}
                  courseName={courseConfig.name}
                  onPaymentConfirmed={handlePaymentConfirmed}
                />
              </motion.div>
            )}

            {currentStep === "confirmation" && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="max-w-2xl mx-auto">
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Enrollment Confirmed!
                  </h2>
                  <p className="text-white/80 text-lg mb-8">
                    Thank you for enrolling in {courseConfig.name}. We've received your payment confirmation 
                    and you'll receive an email with your access details shortly.
                  </p>
                  <div className="bg-white/10 rounded-lg p-6 mb-8">
                    <p className="text-white font-medium mb-2">
                      Reference Number: <span className="font-mono font-bold">{bookingReference}</span>
                    </p>
                    <p className="text-white/70 text-sm">
                      Keep this reference number for your records.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => {
                        // Generate and print the beautiful invoice
                        const participantName = form.getValues().firstName && form.getValues().lastName
                          ? `${form.getValues().firstName} ${form.getValues().lastName}`
                          : '';
                        const invoiceHTML = renderCourseInvoiceHTML({
                          reference: bookingReference,
                          courseName: courseConfig.name,
                          selectedPackages: selectedPackageDetails,
                          total: total,
                          participant: participantName,
                          accessDuration: courseConfig.checkout.accessDuration
                        });
                        const printWindow = window.open('', '', 'height=900,width=800');
                        if (printWindow) {
                          printWindow.document.write(invoiceHTML);
                          printWindow.document.close();
                          printWindow.focus();
                          setTimeout(() => printWindow.print(), 500);
                        }
                      }}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 flex items-center justify-center gap-2"
                    >
                      <Printer className="w-5 h-5" />
                      Print Invoice
                    </Button>
                    <Button
                      onClick={onClose}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Beautiful branded invoice renderer for courses
function renderCourseInvoiceHTML({ 
  reference, 
  courseName, 
  selectedPackages, 
  total, 
  participant,
  accessDuration 
}: {
  reference: string;
  courseName: string; 
  selectedPackages: any[];
  total: number;
  participant: string;
  accessDuration?: string;
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Course Enrollment Invoice - ${courseName}</title>
      <style>
        body {
          background: #fff;
          color: #222;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
          margin: 0;
          padding: 0;
          line-height: 1.6;
        }
        .invoice-container {
          max-width: 700px;
          margin: 40px auto;
          padding: 50px 45px 40px 45px;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .header {
          text-align: center;
          margin-bottom: 24px;
          border-bottom: 3px solid #b91c1c;
          padding-bottom: 24px;
        }
        .brand {
          font-size: 3rem;
          font-weight: 900;
          color: #b91c1c;
          letter-spacing: 2px;
          margin-bottom: 0.3em;
          font-family: 'Georgia', 'Times New Roman', serif;
          text-shadow: 0 2px 4px rgba(185,28,28,0.1);
        }
        .tagline {
          font-size: 1.3rem;
          color: #374151;
          font-weight: 600;
          margin-bottom: 0.5em;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .invoice-title {
          font-size: 1.1rem;
          color: #6b7280;
          font-weight: 500;
          margin-top: 8px;
        }
        .invoice-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 32px 0;
          padding: 20px;
          background: linear-gradient(135deg, #fef3f3 0%, #fee2e2 100%);
          border-radius: 12px;
          border: 1px solid #fecaca;
        }
        .invoice-number {
          font-size: 1.1rem;
          font-weight: 700;
          color: #b91c1c;
        }
        .invoice-date {
          font-size: 1rem;
          color: #6b7280;
        }
        .section-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #b91c1c;
          margin-bottom: 16px;
          margin-top: 36px;
          border-bottom: 2px solid #fee2e2;
          padding-bottom: 8px;
        }
        .info-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .info-table th, .info-table td {
          text-align: left;
          padding: 16px 20px;
          border-bottom: 1px solid #f3f4f6;
        }
        .info-table th {
          background: linear-gradient(135deg, #fef3f3 0%, #fee2e2 100%);
          color: #b91c1c;
          font-weight: 700;
          width: 200px;
          font-size: 1rem;
        }
        .info-table td {
          color: #374151;
          font-weight: 500;
        }
        .package-row {
          background: #fafafa;
        }
        .package-row td {
          padding: 12px 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .package-name {
          font-weight: 600;
          color: #374151;
        }
        .package-price {
          font-weight: 700;
          color: #b91c1c;
          text-align: right;
        }
        .total-row {
          background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
        }
        .total-row td {
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
          border: none;
          padding: 20px;
        }
        .total-label {
          text-align: left;
        }
        .total-amount {
          text-align: right;
        }
        .benefits-section {
          margin-top: 36px;
          padding: 24px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .benefits-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #b91c1c;
          margin-bottom: 16px;
        }
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefits-list li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
          color: #374151;
          font-weight: 500;
        }
        .benefits-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: 900;
          font-size: 1.1rem;
        }
        .footer {
          text-align: center;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 2px solid #f3f4f6;
          color: #6b7280;
          font-size: 1rem;
        }
        .contact-info {
          margin-top: 16px;
          font-weight: 600;
        }
        .contact-info a {
          color: #b91c1c;
          text-decoration: none;
        }
        .watermark {
          position: fixed;
          bottom: 20px;
          right: 20px;
          color: #e5e7eb;
          font-size: 0.8rem;
          transform: rotate(-45deg);
          pointer-events: none;
        }
        @media print {
          body { background: #fff !important; }
          .invoice-container { 
            box-shadow: none !important; 
            border: 1px solid #ccc !important;
            margin: 0 !important;
            padding: 30px !important;
          }
          .watermark { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="brand">BeHorseSavvy</div>
          <div class="tagline">Course Enrollment</div>
          <div class="invoice-title">Professional Training Invoice</div>
        </div>

        <div class="invoice-meta">
          <div class="invoice-number">Invoice #${reference}</div>
          <div class="invoice-date">Date: ${new Date().toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </div>

        <div class="section-title">Student Information</div>
        <table class="info-table">
          <tr><th>Student Name</th><td>${participant}</td></tr>
          <tr><th>Course</th><td>${courseName}</td></tr>
          ${accessDuration ? `<tr><th>Access Duration</th><td>${accessDuration}</td></tr>` : ''}
          <tr><th>Enrollment Date</th><td>${new Date().toLocaleDateString('en-GB')}</td></tr>
        </table>

        <div class="section-title">Course Package Details</div>
        <table class="info-table">
          <thead>
            <tr>
              <th>Package/Item</th>
              <th style="text-align: right; width: 120px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${selectedPackages.map(pkg => `
              <tr class="package-row">
                <td class="package-name">${pkg.name}</td>
                <td class="package-price">£${pkg.price}</td>
              </tr>
            `).join('')}
            <tr class="total-row">
              <td class="total-label">Total Amount</td>
              <td class="total-amount">£${total}</td>
            </tr>
          </tbody>
        </table>

        ${selectedPackages.some(pkg => pkg.items) ? `
          <div class="benefits-section">
            <div class="benefits-title">What's Included</div>
            <ul class="benefits-list">
              ${selectedPackages.flatMap(pkg => pkg.items || [pkg.name]).map(item => `
                <li>${item}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="footer">
          <div style="font-weight: 700; color: #b91c1c; font-size: 1.1rem; margin-bottom: 12px;">
            Thank you for choosing BeHorseSavvy
          </div>
          <div>
            Your journey to equestrian excellence starts here.<br />
            We look forward to supporting your learning and development.
          </div>
          <div class="contact-info">
            Questions or support needed?<br />
            <a href="mailto:Penelopepleasant@gmail.com">Penelopepleasant@gmail.com</a> • +44 7506 600 222
          </div>
        </div>
      </div>
      <div class="watermark">BeHorseSavvy ${new Date().getFullYear()}</div>
    </body>
    </html>
  `;
} 