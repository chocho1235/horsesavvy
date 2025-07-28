import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ShoppingCart, Star, Heart, Share2, Mail, Phone, MapPin, Award, CheckCircle, User, Globe, ArrowRight, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Product data
const products = [
  {
    id: 1,
    name: "BeHorseSavvy T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg",
    category: "Clothing",
    description: "Premium cotton t-shirt featuring the BeHorseSavvy logo",
    rating: 4.8,
    reviews: 12,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: ["100% Cotton", "Premium Quality", "BeHorseSavvy Branded"]
  },
  {
    id: 2,
    name: "Equestrian Hoodie",
    price: 39.99,
    originalPrice: 49.99,
    image: "/placeholder.svg",
    category: "Clothing",
    description: "Comfortable hoodie perfect for yard work and riding",
    rating: 4.9,
    reviews: 8,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    features: ["Fleece Lined", "Perfect for Yard Work", "Riding Comfort"]
  },
  {
    id: 3,
    name: "Horse Care Notebook",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg",
    category: "Stationery",
    description: "Premium notebook for recording horse care and training notes",
    rating: 4.7,
    reviews: 15,
    inStock: true,
    features: ["A5 Size", "Lined Pages", "Horse Care Sections"]
  },
  {
    id: 4,
    name: "BeHorseSavvy Water Bottle",
    price: 18.99,
    originalPrice: 22.99,
    image: "/placeholder.svg",
    category: "Accessories",
    description: "Insulated water bottle with BeHorseSavvy branding",
    rating: 4.6,
    reviews: 6,
    inStock: true,
    features: ["Insulated", "500ml Capacity", "BeHorseSavvy Branded"]
  },
  {
    id: 5,
    name: "Equestrian Keyring",
    price: 8.99,
    originalPrice: 11.99,
    image: "/placeholder.svg",
    category: "Accessories",
    description: "Horseshoe-shaped keyring with leather detail",
    rating: 4.5,
    reviews: 9,
    inStock: true,
    features: ["Horseshoe Design", "Leather Detail", "Genuine Leather"]
  },
  {
    id: 6,
    name: "Training Log Book",
    price: 14.99,
    originalPrice: 18.99,
    image: "/placeholder.svg",
    category: "Stationery",
    description: "Comprehensive training log for tracking progress",
    rating: 4.8,
    reviews: 11,
    inStock: false,
    features: ["Progress Tracking", "Training Sections", "Photo Spaces"]
  }
];

const categories = ["All", "Clothing", "Stationery", "Accessories"];

export default function Merchandise() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const features = [
    { icon: Award, text: "Premium Quality" },
    { icon: User, text: "Equestrian Specialist" },
    { icon: Globe, text: "Worldwide Shipping" }
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-white font-dyslexic">
      <ContactHeader bgColor="bg-blue-950" />

      {/* Back Button */}
      <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
        <Link to="/">
          <Button
            variant="outline"
            className="bg-blue-900/80 hover:bg-blue-800 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            <span className="font-medium">Back Home</span>
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-blue-950 py-20 sm:py-24 md:py-32 overflow-hidden rounded-b-3xl shadow-xl border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/The%20penny%20club%20-%20WD2%20%281%29.svg')] bg-contain bg-center bg-no-repeat opacity-60" />
        <div className="absolute inset-0 bg-blue-950/60" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            animate="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              whileInView: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-8 text-white drop-shadow-lg">
              BeHorseSavvy <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">Collection</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Discover our exclusive range of premium equestrian merchandise designed for horse lovers and riders.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full border border-white/10 shadow-sm">
                  <feature.icon className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="p-4 sm:p-6 bg-blue-900 border border-white/20 rounded-lg max-w-2xl mx-auto shadow-lg mb-8 sm:mb-12">
              <p className="text-white/80 text-sm leading-relaxed">
                Show your passion for horses with our exclusive BeHorseSavvy collection. Quality products for riders, trainers, and horse enthusiasts. Contact us to place your order.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Our Collection */}
      <section className="py-16 sm:py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">About Our Collection</h2>
            <div className="w-24 h-1 bg-red-500/70 mx-auto mb-6 rounded-full" />
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Premium equestrian merchandise designed with quality and style in mind
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Premium Quality</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                All our products are crafted with the finest materials, ensuring durability and comfort for equestrian activities.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Equestrian Focused</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Designed specifically for horse lovers, riders, and equestrian professionals with practical needs in mind.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">BeHorseSavvy Branded</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Show your support for quality equestrian education with our exclusive BeHorseSavvy branded merchandise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Browse Our Collection</h2>
            <p className="text-white/80">Filter by category to find exactly what you're looking for</p>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-blue-900/80 text-white/90 hover:bg-blue-800 hover:text-white border border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="group relative bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border border-white/20 hover:border-red-400/50 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative mb-6 aspect-square rounded-xl overflow-hidden bg-blue-800/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold">Coming Soon</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Heart size={16} className="text-white" />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Share2 size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-400 font-medium bg-red-500/10 px-3 py-1 rounded-full">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm text-white/80">{product.rating}</span>
                      <span className="text-xs text-white/60">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-red-400 flex-shrink-0" />
                        <span className="text-xs text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sizes */}
                  {product.sizes && (
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20 text-white/80"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-2xl font-bold text-white">£{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/60 line-through">£{product.originalPrice}</span>
                    )}
                    {product.originalPrice && (
                      <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                        Save £{(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={!product.inStock}
                  >
                    <Mail size={16} className="mr-2" />
                    {product.inStock ? "Contact to Order" : "Coming Soon"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-16 bg-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              How to Order
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Ordering is simple - just contact us with your requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Choose Your Items</h3>
              <p className="text-white/70">Browse our collection and note the items you'd like to order</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-white/70">Email or call us with your order details and size requirements</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Receive Your Order</h3>
              <p className="text-white/70">We'll process your order and ship it directly to you</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-blue-950 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
              Ready to Order?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us to place your order, ask about custom sizes, bulk purchases, or any questions about our products.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  window.location.href = "mailto:Penelopepleasant@gmail.com?subject=BeHorseSavvy%20Merchandise%20Order";
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail size={16} className="mr-2" />
                Email Us
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/10 text-white px-8 py-3 font-medium transition-all duration-300"
              >
                <Phone size={16} className="mr-2" />
                Call Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 