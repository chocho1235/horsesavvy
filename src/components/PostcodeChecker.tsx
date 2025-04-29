import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, CheckCircle2, XCircle } from "lucide-react";

const LIVERPOOL_COORDS = {
  lat: 53.4084,
  lng: -2.9916
};

const PostcodeChecker = () => {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<{ distance: number; isWithinRadius: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const checkPostcode = async () => {
    if (!postcode) {
      setError("Please enter a postcode");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, "")}`);
      const data = await response.json();

      if (data.status === 200) {
        const { latitude, longitude } = data.result;
        const distance = calculateDistance(
          latitude,
          longitude,
          LIVERPOOL_COORDS.lat,
          LIVERPOOL_COORDS.lng
        );
        
        setResult({
          distance: Math.round(distance * 10) / 10,
          isWithinRadius: distance <= 20
        });
      } else {
        setError("Invalid postcode. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mt-16 p-8 bg-gradient-to-br from-black/50 to-black/30 rounded-2xl border border-white/10 backdrop-blur-sm"
    >
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <MapPin className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-blue-400">Location Checker</h3>
        </div>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          Enter your postcode to check if you are within 20 miles of us, this is a requirement for the stage 1 and stage 2 qualifications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="Enter your postcode"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="w-5 h-5 text-white/40" />
            </div>
          </div>
          <motion.button
            onClick={checkPostcode}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Check Distance</span>
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2"
            >
              <XCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg border ${
                  result.isWithinRadius 
                    ? "bg-green-500/10 border-green-500/20" 
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}>
                  {result.isWithinRadius ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                <h4 className="text-lg font-semibold">
                  {result.isWithinRadius ? "Within Service Area" : "Outside Service Area"}
                </h4>
              </div>
              
              <div className="space-y-2">
                <p className="text-white/80">
                  Distance from us: <span className="font-medium">{result.distance} miles</span>
                </p>
                <p className={`text-sm ${result.isWithinRadius ? "text-green-400" : "text-yellow-400"}`}>
                  {result.isWithinRadius
                    ? "You are within our service area! We can provide in-person training sessions."
                    : "You are outside our service area. Please contact us for alternative arrangements."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostcodeChecker; 