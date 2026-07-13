import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Moon,
  Sun,
  Gem,
  CheckCircle,
  ChevronDown,
  X,
  Maximize2
} from "lucide-react";
import { CertificateInfo } from "./types";
import HeaderLogo from "./components/HeaderLogo";
import ImageKitShowcase from "./components/ImageKitShowcase";
import QualityMarkers from "./components/QualityMarkers";
import CustomerTestimonials from "./components/CustomerTestimonials";

// =========================================================================
// BRAND CONFIGURATION - ADD YOUR IMAGEKIT LOGO URLS HERE
// =========================================================================
const HEADER_LOGO_IMAGE_URL = "https://ik.imagekit.io/pjmewfm9g/Untitled%20design%20-%202026-07-03T101910.636.png"; // Recommended size: 200x200
const LOGO_IMAGE_URL = "https://ik.imagekit.io/pjmewfm9g/Screenshot_2026-07-05_185444.jpg_2K_202607051859.jpeg"; // Recommended size: 1191x1648 (Ratio: 1191 X 1648)
const SCHEME_BANNER_IMAGE_URL = "https://ik.imagekit.io/pjmewfm9g/Screenshot%202026-07-03%20195346.jpg?updatedAt=1783088661007"; // Recommended size: 1191x1648 (Ratio: 1191 X 1648)

// Predefined catalog of premium certified silver jewellery items for dynamic lookup
const CERTIFICATE_CATALOG: Record<string, CertificateInfo & { name: string; weight: string }> = {
  "VB-925-837482": {
    certificateId: "VB-925-837482",
    name: "Solitaire Crown Sterling Ring",
    metal: "925 Sterling Silver",
    purity: "92.5% Fine",
    hallmark: "BIS-73892-X",
    issueDate: "2026-05-18",
    labRef: "LAB-XRF-90218",
    status: "Verified Platinum",
    weight: "4.85 grams",
  },
  "VB-925-104930": {
    certificateId: "VB-925-104930",
    name: "Infinity Elegance Silver Pendant",
    metal: "925 Sterling Silver",
    purity: "92.5% Fine",
    hallmark: "BIS-84102-Y",
    issueDate: "2026-06-01",
    labRef: "LAB-XRF-83100",
    status: "Verified Platinum",
    weight: "6.22 grams",
  },
  "VB-925-450123": {
    certificateId: "VB-925-450123",
    name: "Heritage Tennis Silver Bracelet",
    metal: "925 Sterling Silver",
    purity: "92.5% Fine",
    hallmark: "BIS-10394-Z",
    issueDate: "2026-06-05",
    labRef: "LAB-XRF-11492",
    status: "Verified Platinum",
    weight: "12.40 grams",
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [termsLang, setTermsLang] = useState<"en" | "bn">("en");
  const [activeZoomImage, setActiveZoomImage] = useState<string | null>(null);

  // Escape key handler to close the image zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveZoomImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const t = {
    // Terms section
    termsTitle: termsLang === "bn" ? "গোল্ড স্কিম শর্তাবলী ও নিয়মাবলী" : "Gold Scheme Terms & Conditions",
    termsSubtitle: termsLang === "bn"
      ? "(গোল্ড স্কিমে অংশগ্রহণ বাজার-সম্পর্কিত ঝুঁকির অধীন। স্কিমে যোগদানের আগে সমস্ত শর্তাবলী ও প্রাসঙ্গিক নথি ভালোভাবে পড়ে নিন।)"
      : "(Gold Scheme investments are subject to market risks. Please read all scheme-related documents carefully before investing.)",
    
    // Banner Section (Fallback)
    bannerTitle: termsLang === "bn" ? "গোল্ড স্কিম ব্যানার" : "GOLD SCHEME BANNER",
    bannerRatio: termsLang === "bn" ? "অনুপাত ১১৯১ : ১৬৪৮" : "Aspect Ratio 1191 : 1648",
    bannerInstruction: termsLang === "bn" 
      ? "আপনার নিজস্ব ডিজাইন এখানে প্রদর্শন করতে App.tsx ফাইলের SCHEME_BANNER_IMAGE_URL কনস্ট্যান্টে আপনার ইমেজকিট গোল্ড স্কিম ব্যানারের লিঙ্কটি যোগ করুন।"
      : "Add your ImageKit Gold Scheme banner link in App.tsx's SCHEME_BANNER_IMAGE_URL constant to display your custom artwork here.",
    bannerReady: termsLang === "bn" ? "গোল্ড স্কিম ভেরিফিকেশনের জন্য প্রস্তুত" : "Ready for Gold Scheme Verification",
    
    // Luxury CTA Banner
    ctaPre: termsLang === "bn" ? "অভিজাত অভিজ্ঞতা" : "EXPERIENCE LUXURY",
    ctaTitle: termsLang === "bn" ? "আপনার কালেকশনকে আরও উন্নত করতে প্রস্তুত?" : "Ready to elevate your collection?",
    ctaText: termsLang === "bn"
      ? "আমাদের অফিসিয়াল পোর্টাল থেকে সরাসরি প্রত্যয়িত স্টার্লিং সিলভার রিং, নেকলেস এবং প্রিমিয়াম সোনার সম্পূর্ণ কালেকশন দেখুন।"
      : "Browse our complete curate of certified sterling silver rings, necklaces, and premium gold pieces directly from our official portal.",
    ctaBtn: termsLang === "bn" ? "আমাদের ওয়েবসাইট থেকে কিনুন" : "SHOP FROM OUR WEBSITE",
    ctaRedirecting: termsLang === "bn" ? "নিরাপদে রিডাইরেক্ট করা হচ্ছে" : "Redirecting safely to",

    // Footer
    footerCopyright: termsLang === "bn" ? "© ২০২৬ পরশমণি জুয়েলার্স অ্যান্ড ব্রাদার্স। সর্বস্বত্ব সংরক্ষিত।" : "© 2026 PARASMONI JEWELLERS & BROTHERS. ALL RIGHTS RESERVED.",
    footerStatus: termsLang === "bn" ? "ISO 9001:2015 নিবন্ধিত ল্যাবরেটরি স্ট্যাটাস: সক্রিয়" : "ISO 9001:2015 REGISTERED LABORATORY STATUS: ACTIVE"
  };

  return (
    <div>
      <div
        className="min-h-screen font-sans bg-neutral-50 text-neutral-900 px-4 py-8 md:py-16 selection:bg-red-500/30 selection:text-red-900 relative"
        id="app-theme-host"
      >
        {/* Elegant Floating/Absolute Language Switcher in the Top Right Corner */}
        <div className="absolute top-3 right-3 md:top-6 md:right-6 z-50 flex items-center gap-0.5 bg-white border border-neutral-200/80 p-0.5 rounded-lg shadow-sm hover:shadow transition-all" id="global-language-switcher">
          <button
            onClick={() => setTermsLang("en")}
            className={`px-2 py-1 text-[9.5px] font-bold rounded-md transition-all cursor-pointer ${
              termsLang === "en"
                ? "bg-red-600 text-white shadow-sm"
                : "text-neutral-500 hover:text-red-600 hover:bg-red-50/50"
            }`}
            id="lang-btn-en"
          >
            EN
          </button>
          <button
            onClick={() => setTermsLang("bn")}
            className={`px-2 py-1 text-[9.5px] font-bold rounded-md transition-all cursor-pointer ${
              termsLang === "bn"
                ? "bg-red-600 text-white shadow-sm"
                : "text-neutral-500 hover:text-red-600 hover:bg-red-50/50"
            }`}
            id="lang-btn-bn"
          >
            বাংলা
          </button>
        </div>

        {/* Ambient background particles and aura colors */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-radial from-red-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-radial from-red-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Main Content Card Container */}
        <main className="max-w-5xl mx-auto space-y-12 relative z-10" id="main-content">
          {/* 1. Integrated Brand Cluster (Certification Header Logo, and Verified Checkmark Badge) */}
          <div className="flex flex-col items-center space-y-8 pt-4 text-center" id="header-cluster-container">
            {/* 200x200 Logo Image Option */}
            <HeaderLogo imageUrl={HEADER_LOGO_IMAGE_URL} lang={termsLang} />

            {/* 1191 x 1648 Gold Scheme Banner Section */}
            <motion.div
              className="w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xl bg-white relative p-4 flex flex-col items-center justify-center group lg:hidden"
              style={{ aspectRatio: "1191 / 1648" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              id="gold-scheme-banner-container"
            >
              {SCHEME_BANNER_IMAGE_URL ? (
                <div 
                  onClick={() => setActiveZoomImage(SCHEME_BANNER_IMAGE_URL)}
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center cursor-zoom-in group/zoom-banner"
                >
                  <img
                    src={SCHEME_BANNER_IMAGE_URL}
                    alt="Gold Scheme Banner"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover/zoom-banner:scale-105"
                  />
                  {/* Decorative Overlay and Premium touch */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  {/* Luxury touch-to-zoom indicator */}
                  <div className="absolute inset-0 bg-neutral-900/0 group-hover/zoom-banner:bg-neutral-900/10 active:bg-neutral-900/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover/zoom-banner:opacity-100 active:opacity-100 transition-opacity duration-300 bg-neutral-900/80 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl border border-white/10">
                      <Maximize2 size={12} className="text-red-400" />
                      <span>{termsLang === "bn" ? "বড় করে দেখতে টাচ করুন" : "Touch to Zoom"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-50/60 border border-neutral-100 flex flex-col items-center justify-center p-6 text-center space-y-5">
                  {/* Elegant gold outer glow ring */}
                  <div className="relative w-24 h-24 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                    <Gem className="w-12 h-12 text-red-500 animate-pulse" />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-dashed border-red-500/30"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-red-500 font-bold uppercase">
                      {t.bannerTitle}
                    </p>
                    <h4 className="font-serif text-lg font-semibold text-neutral-800">
                      {t.bannerRatio}
                    </h4>
                    <p className="text-xs text-neutral-400 max-w-[280px] mx-auto leading-relaxed">
                      {t.bannerInstruction}
                    </p>
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 text-[10px] font-mono text-neutral-500">
                    {t.bannerReady}
                  </div>
                </div>
              )}

              {/* Decorative luxury corners */}
              <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-neutral-300 rounded-tl-md pointer-events-none" />
              <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-neutral-300 rounded-tr-md pointer-events-none" />
              <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-neutral-300 rounded-bl-md pointer-events-none" />
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-neutral-300 rounded-br-md pointer-events-none" />
            </motion.div>
          </div>

          {/* 3. Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="dashboard-grid">
            {/* Left Column: Details Box with Side-by-Side Images on Desktop */}
            <div className="lg:col-span-7" id="column-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-start justify-center">
                {/* ImageKit Logo/Brand Image with 1191:1648 Aspect Ratio */}
                <ImageKitShowcase 
                  imageUrl={LOGO_IMAGE_URL} 
                  lang={termsLang} 
                  onZoom={(url) => setActiveZoomImage(url)}
                />

                {/* Desktop-only Gold Scheme Banner displayed side-by-side with identical aspect ratio and beautiful styling */}
                <div className="hidden sm:block" id="desktop-banner-side-container">
                  <motion.div
                    className="w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden border border-neutral-200/80 shadow-lg bg-white relative p-4 flex flex-col items-center justify-center group"
                    style={{ aspectRatio: "1191 / 1648" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    id="gold-scheme-banner-container-desktop"
                  >
                    {SCHEME_BANNER_IMAGE_URL ? (
                      <div 
                        onClick={() => setActiveZoomImage(SCHEME_BANNER_IMAGE_URL)}
                        className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center cursor-zoom-in group/zoom-banner"
                      >
                        <img
                          src={SCHEME_BANNER_IMAGE_URL}
                          alt="Gold Scheme Banner"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover/zoom-banner:scale-105"
                        />
                        {/* Decorative Overlay and Premium touch */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        {/* Luxury touch-to-zoom indicator */}
                        <div className="absolute inset-0 bg-neutral-900/0 group-hover/zoom-banner:bg-neutral-900/10 active:bg-neutral-900/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover/zoom-banner:opacity-100 active:opacity-100 transition-opacity duration-300 bg-neutral-900/80 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl border border-white/10">
                            <Maximize2 size={12} className="text-red-400" />
                            <span>{termsLang === "bn" ? "বড় করে দেখতে টাচ করুন" : "Touch to Zoom"}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-50/60 border border-neutral-100 flex flex-col items-center justify-center p-6 text-center space-y-5">
                        <div className="relative w-24 h-24 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                          <Gem className="w-12 h-12 text-red-500 animate-pulse" />
                        </div>
                        <div className="space-y-3">
                          <p className="font-mono text-[11px] tracking-[0.25em] text-red-500 font-bold uppercase">
                            {t.bannerTitle}
                          </p>
                          <h4 className="font-serif text-lg font-semibold text-neutral-800">
                            {t.bannerRatio}
                          </h4>
                        </div>
                      </div>
                    )}

                    {/* Decorative luxury corners */}
                    <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-neutral-300 rounded-tl-md pointer-events-none" />
                    <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-neutral-300 rounded-tr-md pointer-events-none" />
                    <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-neutral-300 rounded-bl-md pointer-events-none" />
                    <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-neutral-300 rounded-br-md pointer-events-none" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Column: Verified Quality Markers and Assays list */}
            <div className="lg:col-span-5 flex flex-col gap-6" id="column-right">
              <QualityMarkers lang={termsLang} />

              {/* Quick instructions / FAQ card -> Terms & Conditions Section */}
              <div className="bg-white/40 backdrop-blur-sm border border-neutral-200/40 rounded-2xl p-4 sm:p-6" id="faq-information-card">
                <div className="flex flex-col gap-1 border-b border-neutral-200/30 pb-4 mb-4" id="terms-header-row">
                  <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="w-full flex items-center justify-between gap-2 text-neutral-900 focus:outline-none select-none text-left"
                    id="terms-toggle-button"
                  >
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
                      <Gem size={12} className="text-red-500 shrink-0" />
                      {t.termsTitle}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-neutral-500 transition-transform duration-300 shrink-0 ${
                        showTerms ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {!showTerms && (
                    <p className="text-[10.5px] sm:text-[11.5px] text-red-600 font-serif italic font-medium leading-relaxed mt-2 pl-3 border-l-2 border-red-500/30 tracking-wide" id="terms-risk-disclaimer">
                      {t.termsSubtitle}
                    </p>
                  )}
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: showTerms ? "auto" : 0, opacity: showTerms ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                  id="terms-content-container"
                >
                  <ol className="space-y-3.5 text-xs text-neutral-500 leading-relaxed list-none pt-2">
                    {termsLang === "en" ? (
                      <>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">1.</span>
                          <span>Gold Scheme investments are subject to market risks. Please read all scheme-related documents carefully before investing.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">2.</span>
                          <span>Past performance is not indicative of future results or returns.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">3.</span>
                          <span>The value of your Gold Scheme investment may fluctuate depending on market conditions.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">4.</span>
                          <span>Investors should invest based on their financial goals, risk appetite, and investment horizon.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">5.</span>
                          <span>Gold Scheme investments are not guaranteed and may result in partial or complete loss of capital.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">6.</span>
                          <span>Applicable fees, charges, lock-in periods, or other conditions may apply as per the respective Gold Scheme.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">7.</span>
                          <span>Redemption or settlement will be processed in accordance with the applicable Gold Scheme guidelines and regulatory requirements.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">8.</span>
                          <span>Completion of KYC (Know Your Customer) and submission of all required documents are mandatory before joining the Gold Scheme.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">9.</span>
                          <span>Tax benefits, if any, are subject to prevailing tax laws and may change from time to time.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">10.</span>
                          <span>Investors are responsible for providing accurate and complete information. The company shall not be liable for any consequences arising from incorrect or incomplete information.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">11.</span>
                          <span>All investments are subject to the rules, regulations, and guidelines prescribed by the applicable regulatory authorities.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">12.</span>
                          <span>The company reserves the right to amend, modify, or update these Terms & Conditions at any time without prior notice, subject to applicable laws.</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">1.</span>
                          <span>গোল্ড স্কিমে অংশগ্রহণ বাজার-সম্পর্কিত ঝুঁকির অধীন। স্কিমে যোগদানের আগে সমস্ত শর্তাবলী ও প্রাসঙ্গিক নথি ভালোভাবে পড়ে নিন।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">2.</span>
                          <span>অতীতের ফলাফল বা সুবিধা ভবিষ্যতে একই রকম ফলাফলের নিশ্চয়তা দেয় না।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">3.</span>
                          <span>বাজার পরিস্থিতির উপর নির্ভর করে গোল্ড স্কিমের মূল্য বা সুবিধা পরিবর্তিত হতে পারে।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">4.</span>
                          <span>গ্রাহককে নিজের আর্থিক লক্ষ্য, ঝুঁকি গ্রহণের সক্ষমতা এবং পরিকল্পনার সময়কাল বিবেচনা করে স্কিমে অংশগ্রহণ করা উচিত।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">5.</span>
                          <span>গোল্ড স্কিমে অংশগ্রহণের ক্ষেত্রে কোনো নির্দিষ্ট লাভ বা রিটার্নের নিশ্চয়তা দেওয়া হয় না।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">6.</span>
                          <span>স্কিম অনুযায়ী প্রযোজ্য ফি, চার্জ, লক-ইন সময়কাল বা অন্যান্য শর্ত প্রযোজ্য হতে পারে।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">7.</span>
                          <span>রিডেম্পশন, নিষ্পত্তি বা সুবিধা প্রদান স্কিমের নির্ধারিত নিয়ম ও প্রযোজ্য বিধি অনুযায়ী সম্পন্ন হবে।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">8.</span>
                          <span>স্কিমে অংশগ্রহণের আগে KYC (Know Your Customer) সম্পন্ন করা এবং প্রয়োজনীয় সকল নথি জমা দেওয়া বাধ্যতামূলক।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">9.</span>
                          <span>কর-সংক্রান্ত সুবিধা (যদি প্রযোজ্য হয়) প্রচলিত কর আইনের অধীন এবং সময়ে সময়ে পরিবর্তিত হতে পারে।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">10.</span>
                          <span>গ্রাহক সঠিক ও সম্পূর্ণ তথ্য প্রদান করতে বাধ্য। ভুল বা অসম্পূর্ণ তথ্যের কারণে সৃষ্ট কোনো সমস্যার জন্য প্রতিষ্ঠান দায়ী থাকবে না।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">11.</span>
                          <span>সকল লেনদেন ও কার্যক্রম প্রযোজ্য আইন, বিধি এবং নিয়ন্ত্রক কর্তৃপক্ষের নির্দেশিকা অনুযায়ী পরিচালিত হবে।</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-mono font-bold text-red-600 shrink-0">12.</span>
                          <span>প্রতিষ্ঠান প্রযোজ্য আইন অনুসারে পূর্ব ঘোষণা ছাড়াই যেকোনো সময় এই শর্তাবলী সংশোধন, পরিবর্তন বা হালনাগাদ করার অধিকার সংরক্ষণ করে।</span>
                        </li>
                      </>
                    )}
                  </ol>
                  {showTerms && (
                    <div className="mt-5 pt-3.5 border-t border-dashed border-red-500/20" id="expanded-terms-disclaimer">
                      <p className="text-[10.5px] sm:text-[11.5px] text-red-600 font-serif italic font-medium leading-relaxed pl-3 border-l-2 border-red-500/30 tracking-wide">
                        {t.termsSubtitle}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Customer Testimonials Carousel Slider Section */}
          <CustomerTestimonials lang={termsLang} />

          {/* 4. Compact Website Option */}
          <div className="py-8 flex flex-col items-center justify-center text-center px-4" id="shop-cta-section">
            <motion.a
              href="https://velvetboxs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-sans tracking-wide bg-gradient-to-r from-red-50 to-red-100/50 hover:from-red-100 hover:to-red-200/50 text-red-700 active:scale-98 transition-all border border-red-100/60 shadow-sm cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="cta-shop-button"
            >
              <span>{termsLang === "bn" ? "আমাদের ওয়েবসাইট ভিজিট করুন:" : "Visit Our Official Website:"}</span>
              <span className="underline underline-offset-2 text-red-900 font-extrabold font-mono">
                velvetboxs.com
              </span>
              <ExternalLink size={12} className="text-red-600 shrink-0" />
            </motion.a>
          </div>
        </main>

        {/* Footer info line */}
        <footer className="text-center py-6 text-[10px] font-mono text-neutral-400 mt-12 border-t border-neutral-100" id="app-footer">
          <p>{t.footerCopyright}</p>
          <p className="mt-1">{t.footerStatus}</p>
        </footer>

        {/* Full-Screen Image Zoom Lightbox Modal */}
        <AnimatePresence>
          {activeZoomImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 select-none"
              id="image-lightbox-modal"
              onClick={() => setActiveZoomImage(null)}
            >
              {/* Close Button at top-right */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveZoomImage(null);
                }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full p-2.5 sm:p-3 transition-colors border border-white/10 shadow-lg cursor-pointer flex items-center justify-center group"
                id="lightbox-close-btn"
                title="Close"
              >
                <X size={20} className="transition-transform group-hover:scale-110" />
              </button>

              {/* Centered Image Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative max-w-full max-h-[80vh] aspect-[1191/1648] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center cursor-zoom-out"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveZoomImage(null);
                }}
                id="lightbox-image-container"
              >
                <img
                  src={activeZoomImage}
                  alt="Zoomed Scheme View"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[80vh] rounded-2xl"
                />
              </motion.div>

              {/* Bottom Instructions hint */}
              <div className="mt-4 sm:mt-6 text-center space-y-1">
                <p className="text-[11px] sm:text-xs font-sans font-semibold text-neutral-300 tracking-wider uppercase">
                  {termsLang === "bn" ? "বন্ধ করতে যেকোনো জায়গায় স্পর্শ করুন" : "Tap anywhere to close"}
                </p>
                <p className="text-[9px] font-mono text-neutral-500">
                  {termsLang === "bn" ? "কী-বোর্ডের ESC টিপলেও বন্ধ হবে" : "You can also press Escape to close"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
