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
import { motion } from "framer-motion";
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
    id: "bhs-silver-awards",
    title: "Silver Challenge Award",
    price: 97
  },
  {
    id: "bhs-stage-1-practical",
    title: "BHS Stage 1 Practical",
    price: 97
  }
];

// Animation variant
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

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
        case "bhs-silver-awards":
          return "/silver";
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
          className="relative bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 mb-7 transition-all duration-300 cursor-pointer overflow-hidden border border-blue-700 hover:shadow-2xl hover:-translate-y-1 group"
        >
          {/* Accent bar */}
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-red-500 to-red-700 rounded-l-2xl" />
          
          <div className="flex justify-between items-center w-full">
            <div className="flex-1 pr-4">
              <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-2 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                {course.title}
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-red-400 font-bold text-lg">
                  £{course.price}
                </span>
                <div className="flex-grow h-px bg-white/10" />
              </div>
            </div>
            <div className="flex-shrink-0 z-10">
              <div className="bg-blue-800/50 group-hover:bg-red-600/50 rounded-full p-3 transition-colors duration-300">
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

export const Courses = () => {
  const coursesRef = useRef<HTMLDivElement>(null);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-blue-950 text-blue-50">
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
      <section className="relative bg-blue-950 py-20 sm:py-24 md:py-32 overflow-hidden rounded-b-3xl shadow-xl border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/483657611_1328292291610514_6656248014588240074_n.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-blue-950/90" />
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
              BeHorseSavvy Courses
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              There's a course suited to everyone. Explore our online and practical options below.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full border border-white/10 shadow-sm">
                <CheckCircle className="h-5 w-5 text-red-400" />
                <span className="text-white/90 text-sm font-medium">
                  BHS Approved
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded-full border border-white/10 shadow-sm">
                <User className="h-5 w-5 text-red-400" />
                <span className="text-white/90 text-sm font-medium text-center">
                  Delivered by Penny Pleasant BHS Professional Accredited Coach
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-4 sm:p-6 bg-blue-900 border border-white/20 rounded-lg max-w-2xl mx-auto shadow-lg">
              <p className="text-white/80 text-sm leading-relaxed">
                Our courses feature a mix of programs designed by the British Horse Society and BeHorseSavvy.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 sm:mt-12">
              <Button
                onClick={scrollToCourses}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full transition-all duration-300 flex items-center gap-3 mx-auto text-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
              >
                <span>View Our Courses</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-blue-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className="space-y-12"
          >
            <motion.div {...fadeInUp} className="text-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">Explore Our Online Equestrian Courses</h2>
                <div className="w-24 h-1 bg-red-500/70 mx-auto mb-6 rounded-full" />
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                  We offer a wide range of online equestrian courses tailored to support either home-educated learners and aspiring riders.
                </p>
              </div>
            </motion.div>

            <div className="space-y-12">
              <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
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
              </motion.div>

              <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
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
                    The BHS Challenge Awards (Bronze and Silver) include online theory modules and a pre-booked coaching session with your horse at your own yard. 
                    On successful completion of the Silver Award, you gain direct entry to the BHS Stage 2 exam (booked via the BHS website).
                  </p>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-blue-900 p-8 rounded-xl border border-white/10 shadow-xl">
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
              </motion.div>

              <motion.div {...fadeInUp} className="bg-gradient-to-br from-red-500/20 to-red-500/10 p-8 rounded-xl border border-red-500/20 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-500/30 flex items-center justify-center">
                    <User className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Need Guidance?</h3>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">
                  At any time, you can call Penny to discuss your options and make a plan that suits your goals.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12" ref={coursesRef}>
        {/* Online Courses */}
        <section className="mb-16 max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <div className="inline-block bg-blue-900/80 px-5 py-2 rounded-full mb-4 border border-blue-700">
              <Globe className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Online Courses</h2>
            <p className="text-white/70 text-lg">Learn from anywhere, at your own pace.</p>
          </motion.div>

          <div className="space-y-6">
            {onlineCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Practical Courses */}
        <section className="mb-16 max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <div className="inline-block bg-blue-900/80 px-5 py-2 rounded-full mb-4 border border-blue-700">
              <User className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Practical Courses</h2>
            <p className="text-white/70 text-lg">In-person training with expert guidance.</p>
          </motion.div>

          <div className="space-y-6">
            {practicalCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <motion.div
          {...fadeInUp}
          className="mt-16 p-6 bg-blue-900 border border-white/10 rounded-lg max-w-4xl mx-auto"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Can't decide?</h3>
            <p className="text-white/80">
              No problem. Feel free to give Penny a call to discuss your individual needs and she can advise on what's best for you.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer bgColor="bg-blue-950" />
    </div>
  );
};

export default Courses;