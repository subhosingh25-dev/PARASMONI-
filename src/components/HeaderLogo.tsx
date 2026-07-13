import React from "react";
import { motion } from "motion/react";

interface HeaderLogoProps {
  imageUrl?: string;
  lang?: "en" | "bn";
}

export default function HeaderLogo({ imageUrl, lang = "en" }: HeaderLogoProps) {
  const hasImage = imageUrl && imageUrl.trim().length > 0;

  const t = {
    brand: lang === "bn" ? "পরশমণি জুয়েলার্স" : "PARASMONI JEWELLERS",
    brothers: lang === "bn" ? "অ্যান্ড ব্রাদার্স" : "& BROTHERS",
    estd: lang === "bn" ? "প্রতিষ্ঠিত ১৯৭৪" : "ESTD. 1974",
    tagline: lang === "bn" ? "সোনা চেনাবো আমরাই" : "SONA CHENABO AMRAI"
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      id="header-logo-container"
    >
      {/* Exact 200x200px Logo Container */}
      <div
        className="relative w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-md border border-neutral-200/50 flex items-center justify-center bg-white"
        id="header-logo-box"
        style={{ width: "200px", height: "200px" }}
      >
        {hasImage ? (
          <motion.img
            src={imageUrl}
            alt="Parasmoni Jewellers Header Logo"
            className="w-full h-full object-contain p-1"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            id="header-logo-img"
          />
        ) : (
          /* High-Fidelity SVG Replication of the Parasmoni Logo */
          <div className="w-full h-full bg-red-650 flex flex-col items-center justify-center relative p-3 bg-[#e11d48]">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* White Guitar Pick / Rounded Shield Shape */}
              <path
                d="M50,15 C75,12 85,32 80,55 C75,78 62,88 50,88 C38,88 25,78 20,55 C15,32 25,12 50,15 Z"
                fill="white"
              />
              
              {/* Red Calligraphic "प" Symbol inside the shield */}
              {/* Shirorekha (Top horizontal line) */}
              <path
                d="M36,35 L62,35"
                stroke="#e11d48"
                strokeWidth="5"
                strokeLinecap="round"
              />
              
              {/* Vertical stem line on right */}
              <path
                d="M56,35 L56,65"
                stroke="#e11d48"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Hook loop on left */}
              <path
                d="M38,40 C38,55 42,57 48,57 C53,57 56,53 56,48"
                stroke="#e11d48"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Little elegant tail hook on the stem bottom */}
              <path
                d="M56,60 C56,64 59,65 61,65"
                stroke="#e11d48"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Brand Text - UNDER THE LOGO */}
      <motion.h1
        className="font-serif text-2xl md:text-3xl tracking-[0.08em] font-medium text-neutral-900 leading-tight mb-1 mt-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {t.brand}
      </motion.h1>
      <motion.p
        className="font-sans text-[10px] tracking-[0.3em] text-neutral-400 font-bold uppercase mb-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.8 }}
      >
        {t.brothers}
      </motion.p>
      <motion.p
        className="text-[9px] tracking-widest text-red-500 uppercase font-mono mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {t.estd}
      </motion.p>
      <motion.div
        className="h-[1px] w-28 bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-1"
        initial={{ width: 0 }}
        animate={{ width: 112 }}
        transition={{ delay: 0.55, duration: 0.8 }}
      />
      <motion.p
        className="text-[11px] md:text-xs tracking-[0.2em] font-semibold text-red-600 uppercase leading-relaxed max-w-xs text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {t.tagline}
      </motion.p>
    </div>
  );
}
