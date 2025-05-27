import React from "react";

interface FullClinicPopupProps {
  open: boolean;
  onClose: () => void;
}

const FullClinicPopup: React.FC<FullClinicPopupProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-auto rounded-2xl bg-white border border-blue-100 shadow-2xl px-8 py-10 flex flex-col items-center transition-all duration-300 ease-out transform animate-popupEnter"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'popupEnter 0.38s cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-400 hover:text-blue-700 text-2xl leading-none focus:outline-none bg-white rounded-full w-9 h-9 flex items-center justify-center shadow border border-blue-100"
          aria-label="Close popup"
        >
          &times;
        </button>
        <div className="mb-4">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="26" fill="#e3eaf6" />
            <ellipse cx="28" cy="36" rx="12" ry="6" fill="#fff" fillOpacity=".8" />
            <ellipse cx="21" cy="24" rx="3" ry="4" fill="#fff" />
            <ellipse cx="35" cy="24" rx="3" ry="4" fill="#fff" />
            <ellipse cx="21" cy="25" rx="1.2" ry="1.7" fill="#64748b" />
            <ellipse cx="35" cy="25" rx="1.2" ry="1.7" fill="#64748b" />
            <path d="M23 33c2 1.5 8 1.5 10 0" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-3 tracking-tight font-sans text-center">
          This Clinic is Full
        </h2>
        <p className="text-base text-blue-800/90 mb-6 text-center font-normal max-w-md">
          This clinic has reached its maximum capacity.<br />
          If you'd like to be notified if a place becomes available, please contact us:
        </p>
        <a
          href="mailto:Penelopepleasant@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all duration-200 text-base border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
        >
          📧&nbsp; Penelopepleasant@gmail.com
        </a>
        <a
          href="tel:+447506600222"
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-900 font-semibold shadow border border-blue-200 hover:bg-blue-100 transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
        >
          📞&nbsp; +44 7506 600 222
        </a>
        <div className="mt-6 text-blue-700/70 text-xs text-center max-w-xs">
          Thank you for your interest and understanding.<br />
          We hope to see you at a future clinic!
        </div>
        <style>{`
          @keyframes popupEnter {
            0% { opacity: 0; transform: scale(0.92) translateY(30px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default FullClinicPopup; 