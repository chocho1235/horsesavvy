import React from "react";
import { ContactHeader } from "@/components/ContactHeader";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const toc = [
  { id: "introduction", label: "1. Introduction" },
  { id: "definitions", label: "2. Definitions" },
  { id: "scope", label: "3. Scope of Terms" },
  { id: "booking-process", label: "4. Booking Process (Clinics & Courses)" },
  { id: "payments", label: "5. Payments & Confirmation" },
  { id: "cancellations", label: "6. Cancellations & Refunds" },
  { id: "changes", label: "7. Changes & Cancellations by BeHorseSavvy" },
  { id: "conduct", label: "8. Participant Conduct & Safety" },
  { id: "liability", label: "9. Liability & Insurance" },
  { id: "data", label: "10. Data Protection & Privacy" },
  { id: "general", label: "11. General Provisions" },
  { id: "acceptance", label: "12. Acceptance of Terms" },
];

const sectionClass =
  "pt-10 md:pt-14 pb-8 md:pb-12 border-b border-white/15 last:border-b-0 last:pb-0";
const headingClass =
  "text-2xl md:text-3xl font-extrabold mb-4 mt-0 tracking-tight text-white";
const listClass = "list-disc list-inside space-y-2 pl-2 md:pl-4 text-white/90";
const paraClass = "text-lg md:text-xl text-white/90 mb-4";

const Terms = () => (
  <div className="min-h-screen bg-blue-950 flex flex-col relative overflow-x-hidden text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950 via-blue-900/90 to-blue-950 opacity-100 -z-10" />
    <ContactHeader bgColor="bg-blue-950" />
    {/* Back Home Button */}
    <div className="absolute md:top-24 left-6 sm:left-8 z-20 mt-2 md:mt-0 top-[40px]">
      <Link to="/">
        <Button 
          variant="outline" 
          className="bg-blue-900/80 hover:bg-blue-800 text-white border-white/30 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1.5 sm:gap-2 shadow-lg transition-all duration-300 hover:translate-x-[-5px] text-sm sm:text-base"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span className="font-medium">Back Home</span>
        </Button>
      </Link>
    </div>
    <main className="flex-1 w-full flex flex-col items-center px-2 md:px-0 py-16">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 md:p-14 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-white tracking-tight">Terms and Conditions</h1>
        <p className="text-center text-white/80 mb-10 text-lg md:text-xl">Effective Date: 1 June 2025</p>
        {/* Table of Contents */}
        <nav className="mb-14 border-b border-white/20 pb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
          <ul className="list-decimal list-inside space-y-2 text-white/90 text-lg md:text-xl">
            {toc.map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:underline text-white/90">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="max-w-none">
          <section id="introduction" className={sectionClass}>
            <h2 className={headingClass}>1. Introduction</h2>
            <p className={paraClass}>These Terms and Conditions ("Terms") govern all bookings, purchases, and participation in clinics, courses, and related services (collectively, "Services") provided by BeHorseSavvy ("we", "us", "our"). By making a booking or purchase, you agree to be bound by these Terms.</p>
          </section>
          <section id="definitions" className={sectionClass}>
            <h2 className={headingClass}>2. Definitions</h2>
            <ul className={listClass}>
              <li><strong>"Client"</strong> means any individual or entity making a booking or purchase.</li>
              <li><strong>"Clinic"</strong> means any in-person event, workshop, or training session.</li>
              <li><strong>"Course"</strong> means any online or in-person educational program.</li>
              <li><strong>"Booking"</strong> means a reservation for a clinic or course.</li>
              <li><strong>"Participant"</strong> means the individual attending the clinic or course.</li>
            </ul>
          </section>
          <section id="scope" className={sectionClass}>
            <h2 className={headingClass}>3. Scope of Terms</h2>
            <p className={paraClass}>These Terms apply to all bookings, purchases, and participation in our Services, whether made via our website, email, phone, or in person.</p>
          </section>
          <section id="booking-process" className={sectionClass}>
            <h2 className={headingClass}>4. Booking Process (Clinics & Courses)</h2>
            <ul className={listClass}>
              <li>All bookings are subject to availability and acceptance by BeHorseSavvy.</li>
              <li>For clinics: Submitting a booking request constitutes an offer to attend. You will receive an initial confirmation email, but your place is not secured until payment is received and verified.</li>
              <li>For courses: Booking a course (online or in-person) is confirmed only upon receipt of full payment (or deposit, if applicable). Access to course materials may be withheld until payment is verified.</li>
              <li>We reserve the right to refuse or cancel any booking at our sole discretion.</li>
            </ul>
          </section>
          <section id="payments" className={sectionClass}>
            <h2 className={headingClass}>5. Payments & Confirmation</h2>
            <ul className={listClass}>
              <li>Payment must be made in accordance with the instructions provided at the time of booking.</li>
              <li>For clinics: Full payment (or deposit, if offered) is required to secure your place. You will receive a final confirmation email once payment is verified.</li>
              <li>For courses: Payment is due in full prior to the start of the course, unless otherwise agreed in writing.</li>
              <li>All prices are inclusive of VAT (if applicable) unless stated otherwise.</li>
              <li>We reserve the right to change prices at any time. Existing bookings will not be affected by price changes.</li>
            </ul>
          </section>
          <section id="cancellations" className={sectionClass}>
            <h2 className={headingClass}>6. Cancellations & Refunds</h2>
            <ul className={listClass}>
              <li>If you wish to cancel your booking, you must notify us in writing as soon as possible.</li>
              <li>Refunds are subject to our cancellation policy, which may vary depending on the Service. Administrative fees may apply.</li>
              <li>No refunds will be given for cancellations made less than 14 days before the start of a clinic or course, or for no-shows.</li>
              <li>We reserve the right to deduct reasonable administrative fees from any refund.</li>
            </ul>
          </section>
          <section id="changes" className={sectionClass}>
            <h2 className={headingClass}>7. Changes & Cancellations by BeHorseSavvy</h2>
            <ul className={listClass}>
              <li>We reserve the right to change, reschedule, or cancel any clinic or course due to unforeseen circumstances (e.g., instructor illness, insufficient bookings, adverse weather).</li>
              <li>In such cases, you will be offered a transfer to another date or a full refund.</li>
              <li>We are not responsible for any additional costs incurred by you (e.g., travel, accommodation) as a result of changes or cancellations.</li>
            </ul>
          </section>
          <section id="conduct" className={sectionClass}>
            <h2 className={headingClass}>8. Participant Conduct & Safety</h2>
            <ul className={listClass}>
              <li>All participants must follow the instructions of our staff and instructors at all times.</li>
              <li>We reserve the right to remove any participant whose behavior is deemed unsafe, disruptive, or inappropriate. No refund will be given in such cases.</li>
              <li>Participants must wear appropriate clothing and safety equipment as advised.</li>
              <li>Participation in clinics and courses involves inherent risks. You acknowledge and accept these risks by booking.</li>
            </ul>
          </section>
          <section id="liability" className={sectionClass}>
            <h2 className={headingClass}>9. Liability & Insurance</h2>
            <ul className={listClass}>
              <li>BeHorseSavvy, its staff, and instructors are not liable for any injury, loss, or damage sustained during participation, except where required by law.</li>
              <li>We recommend that all participants have adequate personal insurance (including for equestrian activities, where relevant).</li>
            </ul>
          </section>
          <section id="data" className={sectionClass}>
            <h2 className={headingClass}>10. Data Protection & Privacy</h2>
            <ul className={listClass}>
              <li>We collect and process your personal data in accordance with our Privacy Policy.</li>
              <li>Your information will only be used for managing your booking, providing Services, and communicating with you.</li>
              <li>We do not share your data with third parties except as required by law or to deliver our Services.</li>
            </ul>
          </section>
          <section id="general" className={sectionClass}>
            <h2 className={headingClass}>11. General Provisions</h2>
            <ul className={listClass}>
              <li>We reserve the right to update these Terms at any time. The latest version will always be available on our website.</li>
              <li>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in effect.</li>
              <li>These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</li>
            </ul>
          </section>
          <section id="acceptance" className={sectionClass}>
            <h2 className={headingClass}>12. Acceptance of Terms</h2>
            <p className={paraClass}>By making a booking or purchase, you confirm that you have read, understood, and agree to these Terms and Conditions.</p>
          </section>
        </article>
        <div className="text-center text-white/60 text-xs mt-12">
          &copy; {new Date().getFullYear()} BeHorseSavvy. All rights reserved.
        </div>
      </div>
    </main>
    <Footer bgColor="bg-blue-950" />
  </div>
);

export default Terms; 