import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Award } from "lucide-react";
import { CoursePackage } from "@/config/courses";

interface CourseBookingSummaryProps {
  selectedPackages: CoursePackage[];
  total: number;
  courseName: string;
  accessDuration?: string;
}

export function CourseBookingSummary({ 
  selectedPackages, 
  total, 
  courseName,
  accessDuration 
}: CourseBookingSummaryProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl mb-8">
      <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Your Course Summary
        </CardTitle>
        <CardDescription className="text-white/90">
          Review your package selection before proceeding
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-red-400" />
              Course
            </h4>
            <p className="text-white/90 font-medium">{courseName}</p>
            {accessDuration && (
              <p className="text-white/70 text-sm mt-1">{accessDuration} access</p>
            )}
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-red-400" />
              Selected Packages
            </h4>
            <div className="space-y-2">
              {selectedPackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-between items-center">
                  <span className="text-white/90 text-sm">{pkg.name}</span>
                  <span className="text-red-400 font-semibold text-sm">£{pkg.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <h4 className="text-white font-bold mb-3">Total</h4>
            <div className="text-3xl font-bold text-red-500">£{total}</div>
            {selectedPackages.some(p => p.savings) && (
              <p className="text-green-400 text-sm mt-1">
                Savings: £{selectedPackages.find(p => p.savings)?.savings}
              </p>
            )}
          </div>
        </div>

        {/* Package benefits summary */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-white font-semibold mb-3">What's Included:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedPackages.flatMap(pkg => pkg.items || [pkg.name]).map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 