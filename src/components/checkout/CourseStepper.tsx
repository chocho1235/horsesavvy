import { CalendarDays, Users, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  { label: "Select Package", icon: <CalendarDays className="w-5 h-5" /> },
  { label: "Your Details", icon: <Users className="w-5 h-5" /> },
  { label: "Payment", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Confirmation", icon: <CheckCircle className="w-5 h-5" /> },
];

interface CourseStepperProps {
  currentStep: number;
}

export function CourseStepper({ currentStep }: CourseStepperProps) {
  return (
    <div className="sticky top-14 z-20 bg-blue-950/80 backdrop-blur border-b border-white/10 py-4 mb-8">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-0">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-center gap-0">
            <div className={`flex flex-col items-center px-4 ${idx === currentStep ? 'text-red-500' : 'text-white/60'}`}> 
              <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold border-2 shadow-md transition-all duration-200 ${idx === currentStep ? 'border-red-500 bg-gradient-to-br from-red-500 to-red-700 text-white scale-110' : 'border-white/30 bg-blue-900 text-white/60'}`}>
                {step.icon}
              </div>
              <span className={`text-xs mt-2 font-semibold tracking-wide ${idx === currentStep ? 'text-white' : 'text-white/60'}`}>
                {step.label}
              </span>
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