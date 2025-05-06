/**
 * Footer Component
 * 
 * A responsive footer component that displays contact information and social media links.
 * Features smooth animations and decorative elements.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.bgColor="bg-black"] - Background color class (Tailwind CSS)
 */

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

interface FooterProps {
  /** Background color class (Tailwind CSS) */
  bgColor?: string;
}

/**
 * Animation variants for footer elements
 */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
  viewport: { once: true, margin: "-50px" }
};

const fadeInUpDelayed = {
  ...fadeInUp,
  transition: { ...fadeInUp.transition, delay: 0.1 }
};

export const Footer = ({ bgColor = "bg-black" }: FooterProps) => {
  return (
    <motion.footer 
      {...fadeInUp}
      className={`w-full py-24 relative overflow-hidden ${bgColor} mt-32`}
      role="contentinfo"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Left decorative element */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
        {/* Right decorative element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl"></div>
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Section */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-white/10"></div>
              <h4 className="text-lg font-semibold text-white">Contact</h4>
            </div>
            <div className="space-y-4">
              <a 
                href="tel:+447506600222" 
                className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                aria-label="Call us at +44 7506 600 222"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <span>+44 7506 600 222</span>
              </a>
              <a 
                href="mailto:Penelopepleasant@gmail.com" 
                className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                aria-label="Email us at Penelopepleasant@gmail.com"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <span>Penelopepleasant@gmail.com</span>
              </a>
            </div>
          </motion.section>

          {/* Social Section */}
          <motion.section 
            {...fadeInUpDelayed}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-white/10"></div>
              <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/penelope.pleasant" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/penelope_pleasant/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.footer>
  );
}; 