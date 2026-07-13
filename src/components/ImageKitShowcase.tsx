import React from "react";
import { motion } from "motion/react";
import { Image, Sparkles, UploadCloud, Maximize2 } from "lucide-react";

interface ImageKitShowcaseProps {
  imageUrl?: string;
  lang?: "en" | "bn";
  onZoom?: (url: string) => void;
}

export default function ImageKitShowcase({ imageUrl, lang = "en", onZoom }: ImageKitShowcaseProps) {
  const hasImage = imageUrl && imageUrl.trim().length > 0;

  const t = {
    title: lang === "bn" ? "ইমেজকিট লোগো অপশন" : "IMAGEKIT LOGO OPTION",
    ratio: lang === "bn" ? "লোগো অনুপাত ১১৯১:১৬৪৮" : "Logo Aspect Ratio 1191:1648",
    instruction: lang === "bn"
      ? "এটি এখানে দেখতে App.tsx ফাইলের LOGO_IMAGE_URL কনস্ট্যান্টে আপনার ইমেজকিট লোগো লিঙ্কটি যোগ করুন।"
      : "Add your ImageKit logo link in App.tsx's LOGO_IMAGE_URL constant to view it here.",
    ready: lang === "bn" ? "ভেরিফিকেশনের জন্য প্রস্তুত" : "Ready for Verification",
    touchToZoom: lang === "bn" ? "বড় করে দেখতে টাচ করুন" : "Touch to Zoom"
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center p-4 bg-white rounded-3xl border border-neutral-200/80 shadow-lg overflow-hidden w-full max-w-[420px] mx-auto group"
      style={{ aspectRatio: "1191 / 1648" }}
      id="imagekit-showcase-card"
    >
      {/* Aspect Ratio 1191:1648 container */}
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center"
        id="imagekit-aspect-box"
      >
        {hasImage ? (
          <div 
            onClick={() => onZoom?.(imageUrl)}
            className="relative w-full h-full cursor-zoom-in group/zoom overflow-hidden"
            id="image-zoom-trigger-box"
          >
            <motion.img
              src={imageUrl}
              alt="Parasmoni Jewellers Brand Logo"
              className="w-full h-full object-cover select-none transition-transform duration-700 group-hover/zoom:scale-105"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              id="imagekit-rendered-img"
              onError={(e) => {
                // Fallback if image fails to load
                console.error("Failed to load ImageKit logo from URL");
              }}
            />
            {/* Elegant luxury hover overlay */}
            <div className="absolute inset-0 bg-neutral-900/0 group-hover/zoom:bg-neutral-900/10 active:bg-neutral-900/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover/zoom:opacity-100 active:opacity-100 transition-opacity duration-300 bg-neutral-900/80 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl border border-white/10">
                <Maximize2 size={12} className="text-red-400" />
                <span>{t.touchToZoom}</span>
              </div>
            </div>
          </div>
        ) : (
          /* High-fidelity Placeholder when no custom image link is added yet */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
            {/* Elegant outer glow ring */}
            <div className="relative w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
              <UploadCloud className="w-10 h-10 text-red-500 animate-pulse" />
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-red-500/30"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              />
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[10px] tracking-[0.25em] text-red-500 font-bold uppercase">
                {t.title}
              </p>
              <h4 className="font-serif text-base font-semibold text-neutral-800">
                {t.ratio}
              </h4>
              <p className="text-[11px] text-neutral-400 max-w-[220px] leading-relaxed mx-auto">
                {t.instruction}
              </p>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-[9px] font-mono text-neutral-500">
              <Sparkles size={10} className="text-red-400" />
              {t.ready}
            </div>
          </div>
        )}

        {/* Decorative corner accents for luxury feeling */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-neutral-300 rounded-tl-md pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-neutral-300 rounded-tr-md pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-neutral-300 rounded-bl-md pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-neutral-300 rounded-tr-md pointer-events-none" />
      </div>
    </div>
  );
}
