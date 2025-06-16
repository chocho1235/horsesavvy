import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Banknote, Copy } from "lucide-react";
import { toast } from "sonner";
import { CoursePackage } from "@/config/courses";

interface CoursePaymentInstructionsProps {
  selectedPackages: CoursePackage[];
  total: number;
  bookingReference: string;
  courseName: string;
  onPaymentConfirmed: () => void;
}

// Bank details - same as clinics
const bankDetails = {
  accountName: "BeHorseSavvy Ltd",
  sortCode: "12-34-56", 
  accountNumber: "87654321",
  bankName: "Lloyds Bank"
};

export function CoursePaymentInstructions({
  selectedPackages,
  total,
  bookingReference,
  courseName,
  onPaymentConfirmed
}: CoursePaymentInstructionsProps) {
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
          Transfer £{total} to secure your {courseName} enrollment
        </p>
      </div>

      {/* Course Summary */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedPackages.map((pkg) => (
              <div key={pkg.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <span className="text-white font-medium">{pkg.name}</span>
                  {pkg.description && (
                    <p className="text-white/70 text-sm">{pkg.description}</p>
                  )}
                </div>
                <span className="text-red-400 font-semibold">£{pkg.price}</span>
              </div>
            ))}
            <div className="border-t border-white/20 pt-4">
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span className="text-white font-bold text-lg">Total Amount:</span>
                <span className="text-red-400 font-bold text-2xl">£{total}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Transfer Details */}
      <div className="mb-8">
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-xl">
              <Banknote className="w-6 h-6" />
              Bank Transfer Details
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
                Once you've completed your bank transfer using the details above, click below to confirm your enrollment. Please ensure you use the correct reference number.
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
              By enrolling, you agree to our{' '}
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
} 