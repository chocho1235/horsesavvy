import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="relative max-w-md w-full mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-70 rounded-xl" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative backdrop-blur-sm bg-black/80 p-10 rounded-xl border border-amber-500/30 shadow-xl shadow-amber-500/10 text-center"
        >
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="text-7xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <div className="w-16 h-1 mx-auto bg-amber-500/70 mb-6" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-100">Page Not Found</h2>
          <p className="text-white/70 mb-8">
            We're sorry, but the page you're looking for is currently under construction or doesn't exist.
          </p>
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-black hover:bg-black/80 text-amber-300 border-amber-500/50 rounded-full px-5 py-2 flex items-center gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] hover:border-amber-400 mx-auto"
            >
              <ArrowLeft size={16} strokeWidth={2.5} className="text-amber-400" />
              <span className="font-medium">Back to Home</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
