import React from "react";

interface FullClinicPopupProps {
  open: boolean;
  onClose: () => void;
}

const FullClinicPopup: React.FC<FullClinicPopupProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm mx-auto rounded-2xl bg-white/95 border border-blue-200 shadow-xl px-7 py-9 flex flex-col items-center animate-fadeInScale"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-2xl leading-none focus:outline-none"
          aria-label="Close popup"
        >
          &times;
        </button>
        <h2 className="text-xl md:text-2xl font-medium text-blue-900 mb-3 tracking-tight font-sans">Clinic Fully Booked</h2>
        <p className="text-base text-gray-600 mb-6 text-center font-normal max-w-xs">
          Sorry, this clinic is fully booked. If you are still interested in partaking, please contact us:
        </p>
        <a
          href="mailto:Penelopepleasant@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-red-500 via-blue-500 to-blue-700 text-white font-semibold shadow hover:from-red-600 hover:to-blue-800 transition-all duration-200 text-base mb-2 border border-blue-300"
        >
          Penelopepleasant@gmail.com
        </a>
      </div>
    </div>
  );
};

export default FullClinicPopup; 