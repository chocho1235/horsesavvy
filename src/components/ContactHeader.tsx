
import { Phone, Mail } from "lucide-react";

export const ContactHeader = () => {
  return (
    <div className="flex justify-end py-4 px-8 text-white bg-black sticky top-0 z-50">
      <div className="flex items-center gap-2 text-xl">
        <Phone className="h-5 w-5" />
        <span>+1 800-HORSE</span>
        <span className="mx-2">|</span>
        <Mail className="h-5 w-5" />
        <span>contact@behorsesavvy.com</span>
      </div>
    </div>
  );
};
