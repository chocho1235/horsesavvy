import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight } from "lucide-react";
import { CoursePackage } from "@/config/courses";

interface CourseSelectionProps {
  packages: CoursePackage[];
  selectedPackages: string[];
  onPackageToggle: (packageId: string) => void;
  onContinue: () => void;
  courseName: string;
}

export function CourseSelection({
  packages,
  selectedPackages,
  onPackageToggle,
  onContinue,
  courseName
}: CourseSelectionProps) {
  // Handle selection logic - bundles are exclusive, individuals can be combined
  const handlePackageSelect = (packageId: string) => {
    const selectedPackage = packages.find(p => p.id === packageId);
    if (!selectedPackage) return;

    if (selectedPackage.type === 'bundle') {
      // If selecting a bundle, clear all other selections
      onPackageToggle(packageId);
    } else if (selectedPackage.type === 'individual') {
      // If selecting individual, first clear any bundle selections
      const bundlePackages = packages.filter(p => p.type === 'bundle');
      const hasBundleSelected = bundlePackages.some(p => selectedPackages.includes(p.id));
      
      if (hasBundleSelected) {
        // Clear bundle and select this individual
        onPackageToggle(packageId);
      } else {
        // Toggle individual package
        onPackageToggle(packageId);
      }
    } else {
      // Single package type
      onPackageToggle(packageId);
    }
  };

  const canContinue = selectedPackages.length > 0;
  
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
          Choose Your Package
        </h2>
        <div className="w-24 h-1 bg-red-500 mx-auto mb-6 rounded-full" />
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Select from our {courseName} packages designed to fit your learning goals
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
        {packages.map((pkg) => {
          const isSelected = selectedPackages.includes(pkg.id);
          const isBundle = pkg.type === 'bundle';
          const isIndividual = pkg.type === 'individual';
          
          return (
            <div
              key={pkg.id}
              className={`${isBundle ? 'md:col-span-2' : ''} flex flex-col bg-white/10 backdrop-blur-sm border ${
                isSelected 
                  ? 'border-red-500/50 bg-white/15' 
                  : isBundle 
                    ? 'border-red-500/30' 
                    : 'border-white/20'
              } rounded-xl p-8 hover:border-white/40 transition-all duration-300 cursor-pointer relative hover:-translate-y-1 hover:shadow-2xl ${
                isSelected ? 'ring-2 ring-red-400 shadow-2xl' : ''
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {/* Featured badge for bundles */}
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Best Value
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-white/80">{pkg.description}</p>
              </div>

              {/* Price display */}
              <div className="flex items-center justify-center mb-6">
                <div className="text-4xl font-bold text-red-500">£{pkg.price}</div>
                {pkg.savings && (
                  <div className="ml-2 text-white/60 line-through">£{pkg.price + pkg.savings}</div>
                )}
              </div>

              {/* Package items */}
              {pkg.items && (
                <ul className="space-y-3 mb-6">
                  {pkg.items.map((item, index) => (
                    <li key={index} className="flex items-center text-white/90">
                      <ChevronRight className="w-5 h-5 text-red-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Selection indicator */}
              {isSelected && (
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <CheckCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-200 font-bold">Selected</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Individual books section for Bronze */}
      {packages.some(p => p.type === 'individual') && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h4 className="text-white font-semibold mb-4">Individual Books Selected:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packages
                .filter(p => p.type === 'individual' && selectedPackages.includes(p.id))
                .map(pkg => (
                  <div key={pkg.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{pkg.name}</span>
                      <span className="text-red-400 font-semibold">£{pkg.price}</span>
                    </div>
                  </div>
                ))}
            </div>
            {selectedPackages.filter(id => packages.find(p => p.id === id)?.type === 'individual').length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-red-400 font-bold text-xl">
                    £{selectedPackages
                      .filter(id => packages.find(p => p.id === id)?.type === 'individual')
                      .reduce((total, id) => {
                        const pkg = packages.find(p => p.id === id);
                        return total + (pkg?.price || 0);
                      }, 0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="text-center">
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-8 text-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue to Details
        </Button>
      </div>
    </div>
  );
} 