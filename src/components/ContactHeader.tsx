import { Phone, Mail } from "lucide-react";

interface ContactHeaderProps {
  bgColor?: string;
}

export const ContactHeader = ({ bgColor = "bg-black" }: ContactHeaderProps) => {
  return (
    <div className={`flex justify-end items-center py-4 px-8 text-white ${bgColor} sticky top-0 z-50`}>
      <div className="hidden md:flex items-center gap-2 text-xl">
        <Phone className="h-5 w-5" />
        <span>+44 7506 600 222</span>
        <span className="mx-2">|</span>
        <Mail className="h-5 w-5" />
        <span>Penelopepleasant@gmail.com</span>
      </div>
    </div>
  );
};
