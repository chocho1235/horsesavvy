import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      className="w-full py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-black/30 to-black mt-32"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
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
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-white/20"></div>
              <h4 className="text-lg font-semibold text-white">Contact</h4>
            </div>
            <div className="space-y-4">
              <a href="tel:+447506600222" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+44 7506 600 222</span>
              </a>
              <a href="mailto:Penelopepleasant@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>Penelopepleasant@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Social Section */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-white/20"></div>
              <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/penny.pleasant" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/behorsesavvy/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/30 text-xs font-light tracking-widest uppercase">
              © 2025 BeHorseSavvy. All rights reserved.
            </div>
            <a 
              href="https://equinology.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-block text-white/30 text-xs font-light tracking-widest uppercase overflow-hidden group"
            >
              <span className="relative z-10 text-white/30">Powered by Equinology</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}; 