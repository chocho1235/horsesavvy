import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ContactHeader } from "@/components/ContactHeader";
import {
  ChevronLeft,
  Clock,
  ChevronRight,
  Award,
  CheckCircle,
  User,
  Globe,
  MapPin,
  Search,
  ChevronDown
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Course data
const onlineCourses = [
  {
    id: "horse-knowledge-part-one",
    title: "Horse Knowledge Part One",
    price: 97
  },
  {
    id: "horse-knowledge-part-two",
    title: "Horse Knowledge Part Two",
    price: 97
  },
  {
    id: "bhs-stage-1-theory",
    title: "BHS Stage 1 Theory",
    price: 85
  },
  {
    id: "bhs-stage-2-theory",
    title: "BHS Stage 2 Theory",
    price: 97
  }
];

const practicalCourses = [
  {
    id: "bhs-bronze-awards",
    title: "Bronze Challenge Award",
    price: 97
  },
  {
    id: "bhs-stage-1-practical",
    title: "BHS Stage 1 Practical",
    price: 97
  }
];

// UK postcodes covered for practical training
const validPostcodeAreas = ["RG", "OX", "SL", "HP", "GU"];

// Icon component
const HorseShoe = () => (
  <img
    src="/horse shoe.svg"
    alt="Horseshoe icon"
    className="w-12 h-12 object-contain"
  />
);

type CourseType = typeof onlineCourses[number];

const CourseCard = React.memo(
  ({
    course,
  }: {
    course: CourseType;
  }) => {
    const toPath = useMemo(() => {
      switch (course.id) {
        case "bhs-stage-1-theory":
          return "/bhs-stage-1-theory";
        case "bhs-stage-2-theory":
          return "/bhs-stage-2-theory";
        case "horse-knowledge-part-two":
          return "/horse-knowledge-2";
        case "bhs-bronze-awards":
          return "/bronze";
        case "bhs-stage-1-practical":
          return "/bhs-stage-1-practical";
        default:
          return "/horse-knowledge";
      }
    }, [course.id]);

    const onClickScroll = useCallback(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
      <Link to={toPath} onClick={onClickScroll} className="block group">
        <div
          className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-start justify-between px-8 py-7 mb-7 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group"
        >
          {/* Accent bar */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
          {/* Price badge top-right */}
          <div className="absolute top-5 right-7 z-20">
            <span className="inline-block bg-red-600 text-white font-bold text-lg rounded-full px-5 py-1.5 shadow-lg border-2 border-white/10 tracking-wide">
              £{course.price}
            </span>
          </div>
          <div className="flex-1 w-full z-10">
            <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-3 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
              {course.title}
            </h3>
          </div>
          <div className="flex-shrink-0 z-10 mt-4 self-end">
            <ChevronRight className="w-7 h-7 text-red-400 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    );
  }
);

export const Courses = () => {
  const [postcodeResult, setPostcodeResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [checkedOnce, setCheckedOnce] = useState(false);
  const postcodeInputRef = useRef<HTMLInputElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  // Reduced motion listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Postcode check handler
  const checkPostcode = useCallback(() => {
    const val = postcodeInputRef.current?.value.trim() ?? "";
    if (!val) {
      setPostcodeResult(null);
      return;
    }
    const area = val.toUpperCase().split(" ")[0].replace(/[0-9]/g, "");
    const ok = validPostcodeAreas.includes(area);
    setPostcodeResult({
      available: ok,
      message: ok
        ? "Great news! We offer practical training in your area."
        : "Sorry, we don't currently offer practical training in your area, but our online courses are available nationwide.",
    });
    if (!checkedOnce) setCheckedOnce(true);
  }, [checkedOnce]);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-blue-950 text-blue-50 overflow-x-hidden">
      <ContactHeader bgColor="bg-blue-950" />

      {/* Back Home Button */}
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
      <section className="relative bg-blue-950 py-16 sm:py-24 md:py-32 overflow-hidden rounded-b-3xl shadow-xl border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-blue-950/90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-8 text-white drop-shadow-lg">
                BeHorseSavvy Courses
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
                There's a course suited to everyone. Explore our online and practical options below.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full border border-white/10 shadow-sm">
                  <CheckCircle className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">
                    BHS Approved
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full border border-white/10 shadow-sm">
                  <User className="h-5 w-5 text-red-400" />
                  <span className="text-white/90 text-sm font-medium">
                    Delivered by Penny Pleasant BHS Accredited Professional Coach
                  </span>
                </div>
              </div>

              <div className="p-6 bg-blue-900 border border-white/20 rounded-lg max-w-2xl mx-auto shadow-lg will-change-transform">
                <p className="text-white/80 text-sm leading-relaxed">
                  Our courses feature a mix of programs designed by the British Horse Society and BeHorseSavvy.
                </p>
              </div>

              <div 
                className="mt-8 sm:mt-12"
              >
                <Button
                  onClick={scrollToCourses}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full transition-all duration-300 flex items-center gap-3 mx-auto text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
                >
                  <span>View Our Courses</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className="space-y-12"
          >
            <div className="text-center mb-16">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-lg">Explore Our Online Equestrian Courses</h2>
                <div className="w-24 h-1 bg-red-500/70 mx-auto mb-6 rounded-full" />
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  We offer a wide range of online equestrian courses tailored to support either home-educated learners and aspiring riders.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">BeHorse Savvy Courses</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  Our exclusive BeHorse Savvy Levels 1, 2 & 3 are specially designed for home-educated equestrians looking to deepen their horse knowledge. 
                  These courses serve as an excellent foundation for those considering future college enrollment or a career in the equestrian world.
                </p>
              </div>

              <div className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">British Horse Society (BHS) Courses</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  In addition to our own courses, we also offer Accredited British Horse Society (BHS) online theory courses, including:
                </p>
                <ul className="space-y-3 text-white/70 text-lg ml-6 mb-6">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>BHS Horse Knowledge - Part 1 & 2 Fully Online</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>BHS Stage 1 Theory (Care) – Fully Online</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span>BHS Stage 2 Theory – Fully Online</span>
                  </li>
                </ul>
                <div className="bg-blue-900 p-6 rounded-lg border border-white/10">
                  <p className="text-white/70 text-lg leading-relaxed">
                    If you're located within a qualifying postcode area, you may also be eligible for the BHS Challenge Award – Silver. 
                    This hybrid course includes online theory modules and a pre-booked coaching session with your horse at your own yard. 
                    On successful completion, you gain direct entry to the BHS Stage 2 exam (booked via the BHS website).
                  </p>
                </div>
              </div>

              <div className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Learn Your Way</h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  You can choose to take one course or work through the full progression. There's no pressure—just flexible, self-paced learning that includes:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900 p-6 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      Engaging Modules
                    </h4>
                    <p className="text-white/70">Comprehensive content designed for optimal learning</p>
                  </div>
                  <div className="bg-blue-900 p-6 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-400" />
                      Interactive Quizzes
                    </h4>
                    <p className="text-white/70">Test your knowledge and track your progress</p>
                  </div>
                </div>
                <p className="text-white/70 text-lg mt-6">
                  You decide what's working best for you or your learner, course by course.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-500/20 to-red-500/10 p-8 rounded-xl border border-red-500/20 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center">
                    <User className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Need Guidance?</h3>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">
                  At any time, you can call Penny to discuss your options and make a plan that suits your goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12" ref={coursesRef}>
        {/* Online Courses */}
        <section
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-900/80 px-5 py-2 rounded-full mb-4 border border-blue-700">
              <Globe className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Online Courses</h2>
            <p className="text-white/70 text-lg">Learn from anywhere, at your own pace.</p>
          </div>

          <div className="space-y-6">
            {onlineCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Practical Courses */}
        <section
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-900/80 px-5 py-2 rounded-full mb-4 border border-blue-700">
              <MapPin className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Practical Training</h2>
            <p className="text-white/70 text-lg">Hands-on experience with expert guidance. Check your eligibility below.</p>
          </div>

          {/* Postcode Checker */}
          <div
            className="mb-10 p-6 bg-blue-900 border border-white/20 rounded-lg shadow-lg"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full sm:w-auto">
                <input
                  type="text"
                  ref={postcodeInputRef}
                  placeholder="Enter postcode (e.g. RG1 1AA)"
                  className="w-full pl-10 pr-4 py-3 bg-blue-950/80 border-2 border-blue-700 rounded-full text-white placeholder:text-blue-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/80 shadow-inner"
                />
                <MapPin className="w-5 h-5 text-blue-300/60 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <Button
                onClick={checkPostcode}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Check Area
              </Button>
            </div>

            {postcodeResult && (
              <div
                className={`mt-6 p-4 rounded-lg ${
                  postcodeResult.available
                    ? "bg-green-900/20 border border-green-500/30"
                    : "bg-red-900/20 border border-red-500/30"
                }`}
              >
                <p
                  className={`text-sm text-center font-medium ${
                    postcodeResult.available
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {postcodeResult.message}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {practicalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div
          className="mt-16 p-6 bg-blue-900 border border-white/10 rounded-lg max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Can't decide?</h3>
            <p className="text-white/80">
              No problem. Feel free to give Penny a call to discuss your individual needs and she can advise on what's best for you.
            </p>
          </div>
        </div>
      </div>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
};

export default Courses;