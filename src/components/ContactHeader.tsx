/**
 * ContactHeader Component
 * 
 * A sticky header component that displays contact information.
 * It shows a phone number and email address, and is responsive
 * (hidden on mobile devices).
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.bgColor="bg-black"] - Background color class (Tailwind CSS)
 */

import { Phone, Mail } from "lucide-react";

interface ContactHeaderProps {
  /** Background color class (Tailwind CSS) */
  bgColor?: string;
}

export const ContactHeader = ({ bgColor = "bg-black" }: ContactHeaderProps) => {
  return (
    <div 
      className={`flex justify-end items-center py-4 px-8 text-white ${bgColor} sticky top-0 z-50`}
      role="banner"
      aria-label="Contact information"
    >
      <div className="hidden md:flex items-center gap-2 text-xl">
        <Phone className="h-5 w-5" aria-hidden="true" />
        <a href="tel:+447506600222" className="hover:underline">
          +44 7506 600 222
        </a>
        <span className="mx-2" aria-hidden="true">|</span>
        <Mail className="h-5 w-5" aria-hidden="true" />
        <a href="mailto:Penelopepleasant@gmail.com" className="hover:underline">
          Penelopepleasant@gmail.com
        </a>
      </div>
    </div>
  );
};
