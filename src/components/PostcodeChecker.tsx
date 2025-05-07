/**
 * PostcodeChecker Component
 * 
 * A component that checks if a user's postcode is within 100 miles of a reference location.
 * Uses the postcodes.io API to get coordinates and calculates the distance using the Haversine formula.
 * 
 * @component
 */

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

/** Reference coordinates for BB18 6TD (Barnoldswick) */
const REFERENCE_COORDS = {
  lat: 53.9167,
  lng: -2.1833
} as const;

/** Maximum service radius in miles */
const SERVICE_RADIUS = 100;

// Define interfaces for type safety
interface PostcodeResult {
  status: number;
  result: {
    latitude: number;
    longitude: number;
    [key: string]: any;
  };
}

interface PostcodeError {
  status: number;
  error: string;
}

interface CheckResult {
  distance: number;
  isWithinRadius: boolean;
}

/**
 * Calculates the distance between two points using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in miles
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const resultVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const PostcodeChecker = memo(() => {
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Validates and formats a UK postcode
   * @param code - The postcode to validate and format
   * @returns The formatted postcode or null if invalid
   */
  const formatPostcode = (code: string): string => {
    return code.trim().toUpperCase().replace(/\s+/g, "");
  };

  /**
   * Checks if the entered postcode is within the service radius
   */
  const checkPostcode = async () => {
    if (!postcode) {
      setError("Please enter a postcode");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formattedPostcode = formatPostcode(postcode);
      const response = await fetch(`https://api.postcodes.io/postcodes/${formattedPostcode}`);
      const data = await response.json() as PostcodeResult | PostcodeError;
      
      if ('result' in data && data.status === 200) {
        const { latitude, longitude } = data.result;
        const distance = calculateDistance(
          latitude,
          longitude,
          REFERENCE_COORDS.lat,
          REFERENCE_COORDS.lng
        );
        
        setResult({
          distance: Math.round(distance * 10) / 10,
          isWithinRadius: distance <= SERVICE_RADIUS
        });
      } else {
        setError('error' in data ? data.error : "Invalid postcode. Please try again.");
      }
    } catch (err) {
      console.error("Postcode API error:", err);
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission with Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      checkPostcode();
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="mt-16 p-8 bg-gradient-to-br from-black/50 to-black/30 rounded-2xl border border-white/10 backdrop-blur-sm animation-container"
      data-animate="true"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 animate-gpu">
            <MapPin className="w-5 h-5 text-blue-400" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-blue-400">Location Checker</h3>
        </div>
        
        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          Enter your postcode to check if you are within {SERVICE_RADIUS} miles of us, 
          this is a requirement for the stage 1 and stage 2 qualifications.
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-6">
          If you are not within our area, please refer to{" "}
          <Link 
            to="/education" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Home Education Equestrians
          </Link>
        </p>

        {/* Input Form */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              placeholder="Enter your postcode"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-label="Postcode"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="w-5 h-5 text-white/40" aria-hidden="true" />
            </div>
          </div>
          <motion.button
            onClick={checkPostcode}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-gpu transform-gpu"
            aria-label={loading ? "Checking postcode..." : "Check distance"}
            data-animate="true"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-gpu"
                  aria-hidden="true"
                />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" aria-hidden="true" />
                <span>Check Distance</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 animate-gpu"
              role="alert"
              data-animate="true"
            >
              <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-6 p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-lg border border-white/10 animate-gpu"
              data-animate="true"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg border ${
                  result.isWithinRadius 
                    ? "bg-green-500/10 border-green-500/20" 
                    : "bg-yellow-500/10 border-yellow-500/20"
                }`}>
                  {result.isWithinRadius ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-5 h-5 text-yellow-400" aria-hidden="true" />
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
                    : `You are ${result.distance - SERVICE_RADIUS} miles outside our service area. Please contact us for alternative arrangements.`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

PostcodeChecker.displayName = 'PostcodeChecker';

export default PostcodeChecker; 