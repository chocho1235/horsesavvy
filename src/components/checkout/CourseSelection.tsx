import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
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
  const bundlePackages = packages.filter(p => p.type === 'bundle');
  const individualPackages = packages.filter(p => p.type === 'individual');
  const singlePackages = packages.filter(p => p.type === 'single');
  
  const calculateTotal = () => {
    return selectedPackages.reduce((total, id) => {
      const pkg = packages.find(p => p.id === id);
      return total + (pkg?.price || 0);
    }, 0);
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Choose your package
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Select the learning option that best fits your goals
        </p>
      </div>

      {/* Bundle Package */}
      {bundlePackages.length > 0 && (
        <div className="mb-12">
          {bundlePackages.map((pkg) => {
            const isSelected = selectedPackages.includes(pkg.id);
            
            return (
              <div
                key={pkg.id}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-200 cursor-pointer border-2 ${
                  isSelected 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-white/20 hover:border-white/40 hover:shadow-lg'
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {/* Recommended Badge */}
                {pkg.featured && (
                  <div className="absolute -top-3 left-8 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Recommended
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-red-600 border-red-600' 
                        : 'border-white/40'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                        <p className="text-white/80">{pkg.description}</p>
                      </div>
                    </div>

                    {/* Features */}
                    {pkg.items && (
                      <div className="grid md:grid-cols-2 gap-3 mb-6 ml-10">
                        {pkg.items.map((item, index) => (
                          <div key={index} className="flex items-center text-white/90">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3"></div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right ml-8">
                    <div className="text-3xl font-bold text-red-400 mb-1">£{pkg.price}</div>
                    {pkg.savings && (
                      <div className="text-sm text-white/60">
                        <span className="line-through">£{pkg.price + pkg.savings}</span>
                        <span className="text-green-400 ml-2">Save £{pkg.savings}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Individual Packages */}
      {individualPackages.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-medium text-white mb-6">Individual books</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {individualPackages.map((pkg) => {
              const isSelected = selectedPackages.includes(pkg.id);
              
              return (
                <div
                  key={pkg.id}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-200 cursor-pointer border-2 ${
                    isSelected 
                      ? 'border-red-500 shadow-md shadow-red-500/20' 
                      : 'border-white/20 hover:border-white/40 hover:shadow-md'
                  }`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-red-600 border-red-600' 
                        : 'border-white/40'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="text-lg font-bold text-red-400">£{pkg.price}</div>
                  </div>
                  
                  <h4 className="text-base font-bold text-white mb-2 leading-tight">
                    {pkg.name}
                  </h4>
                  <p className="text-sm text-white/80">{pkg.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Single Packages */}
      {singlePackages.length > 0 && (
        <div className="mb-12">
          {singlePackages.map((pkg) => {
            const isSelected = selectedPackages.includes(pkg.id);
            
            return (
              <div
                key={pkg.id}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-200 cursor-pointer border-2 ${
                  isSelected 
                    ? 'border-red-500 shadow-lg shadow-red-500/20' 
                    : 'border-white/20 hover:border-white/40 hover:shadow-lg'
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-red-600 border-red-600' 
                        : 'border-white/40'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                      <p className="text-white/80">{pkg.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-red-400">£{pkg.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Summary */}
      {selectedPackages.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-white/20">Order Summary</h3>
          
          <div className="space-y-4 mb-6">
            {selectedPackages.map(id => {
              const pkg = packages.find(p => p.id === id);
              if (!pkg) return null;
              
              return (
                <div key={id} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                  <div className="flex-1">
                    <span className="text-white font-medium">{pkg.name}</span>
                    {pkg.description && (
                      <div className="text-sm text-white/70 mt-1">{pkg.description}</div>
                    )}
                  </div>
                  <span className="font-bold text-white text-lg ml-4">£{pkg.price}</span>
                </div>
              );
            })}
          </div>
          
          <div className="border-t-2 border-white/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-red-400">£{calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          onClick={onContinue}
          disabled={!canContinue}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 text-base rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
} 