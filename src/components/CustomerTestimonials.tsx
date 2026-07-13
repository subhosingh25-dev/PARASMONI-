import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatarText: string;
}

interface CustomerTestimonialsProps {
  lang: "en" | "bn";
}

const TESTIMONIALS_DATA: Record<"en" | "bn", Testimonial[]> = {
  en: [
    { id: 1, name: "Ananya Sharma", location: "Kolkata, WB", rating: 5, text: "Subscribed to this gold scheme last year, received incredibly high returns exactly on maturity. Highly transparent!", avatarText: "AS" },
    { id: 2, name: "Prithviraj Sen", location: "Bardhaman, WB", rating: 5, text: "Took this scheme for 12 months. Got fantastic maturity results. Highly recommend Parasmoni!", avatarText: "PS" },
    { id: 3, name: "Meenakshi Das", location: "Howrah, WB", rating: 5, text: "Extremely satisfied with my 24-month scheme returns. Got a massive bonus payout upon completion!", avatarText: "MD" },
    { id: 4, name: "Rajesh Halder", location: "Durgapur, WB", rating: 5, text: "The best investment decision I made. Subscribed for my daughter's wedding and got amazing maturity gains.", avatarText: "RH" },
    { id: 5, name: "Sudipta Roy", location: "Kolkata, WB", rating: 5, text: "Very clear calculations and the exact return promised was delivered seamlessly on maturity.", avatarText: "SR" },
    { id: 6, name: "Priyanka Paul", location: "Siliguri, WB", rating: 5, text: "We subscribed to the gold scheme last year. Exceptional profit yield and transparent calculations!", avatarText: "PP" },
    { id: 7, name: "Arindam Ghosh", location: "Kolkata, WB", rating: 5, text: "Beautiful jewelry and great return yields. Truly a highly rewarding scheme with fantastic results.", avatarText: "AG" },
    { id: 8, name: "Moumita Banerjee", location: "Asansol, WB", rating: 5, text: "Subscribed for 12 months, got marvelous returns. The staff made the payouts very easy.", avatarText: "MB" },
    { id: 9, name: "Subhashis Bose", location: "Kolkata, WB", rating: 5, text: "Excellent scheme return. They are the most transparent and premium jewellers in West Bengal.", avatarText: "SB" },
    { id: 10, name: "Tanusree Dey", location: "Kharagpur, WB", rating: 5, text: "A highly trusted brand! We subscribed twice and both times received top-tier maturity results.", avatarText: "TD" },
    { id: 11, name: "Joydeep Dutta", location: "Kolkata, WB", rating: 5, text: "I got exactly 18% equivalent yield value upon completion. Extremely pleased with this gold scheme.", avatarText: "JD" },
    { id: 12, name: "Riya Chakraborty", location: "Medinipur, WB", rating: 5, text: "Smooth monthly scheme savings experience with top-tier interest returns on maturity.", avatarText: "RC" },
    { id: 13, name: "Bikram Kundu", location: "Hooghly, WB", rating: 5, text: "Subscribed 12 months back and just got my reward weight. Amazing results and legacy trust!", avatarText: "BK" },
    { id: 14, name: "Debasmita Sen", location: "Kolkata, WB", rating: 5, text: "No hidden terms. Subscribed and received outstandingly high maturity value on gold jewelry.", avatarText: "DS" },
    { id: 15, name: "Abhijit Kar", location: "Kalyani, WB", rating: 5, text: "A perfect monthly gold savings plan with guaranteed premium returns. Highly recommended!", avatarText: "AK" },
    { id: 16, name: "Sanchita Maiti", location: "Haldia, WB", rating: 5, text: "We completed our 24-month tenure and got magnificent extra yield results. Very reliable.", avatarText: "SM" },
    { id: 17, name: "Sourav Nandi", location: "Kolkata, WB", rating: 5, text: "The calculated maturity amount matched our payout precisely. Incredible financial transparency.", avatarText: "SN" },
    { id: 18, name: "Paramita Som", location: "Kolkata, WB", rating: 5, text: "Exceptional returns on gold scheme! Truly helped us budget our wedding shopping easily.", avatarText: "PS" },
    { id: 19, name: "Abhishek Bhadra", location: "Siliguri, WB", rating: 5, text: "Both schemes are outstanding. Subscribed to the 24-month one and got brilliant results.", avatarText: "AB" },
    { id: 20, name: "Sohini Guha", location: "Howrah, WB", rating: 5, text: "Extremely high maturity yield. Got our gold ornaments smoothly with extra bonuses.", avatarText: "SG" },
    { id: 21, name: "Sandip Mitra", location: "Kolkata, WB", rating: 5, text: "Highly professional legacy brand. Subscribed to this plan and got great, transparent returns.", avatarText: "SM" },
    { id: 22, name: "Ipsita Pal", location: "Malda, WB", rating: 5, text: "Perfect gold savings results! We got wonderful maturity bonuses upon completion of 12 months.", avatarText: "IP" },
    { id: 23, name: "Debayan Shaw", location: "Kolkata, WB", rating: 5, text: "A marvelous way to save and invest in premium gold. Outstanding transparent payouts.", avatarText: "DS" },
    { id: 24, name: "Runu Sarkar", location: "Barasat, WB", rating: 5, text: "Calculations are 100% accurate. Subscribed to the 24-month plan and got excellent returns.", avatarText: "RS" },
    { id: 25, name: "Amitava Das", location: "Suri, WB", rating: 5, text: "Highly secured and high-yield scheme. Received great maturity benefits on time.", avatarText: "AD" },
    { id: 26, name: "Rupsa Kundu", location: "Kolkata, WB", rating: 5, text: "Transparent and straightforward. Got maximum returns on our 12-month gold plan.", avatarText: "RK" },
    { id: 27, name: "Monalisa Seal", location: "Serampore, WB", rating: 5, text: "Beautifully planned scheme. Our gold investment yielded wonderful profit on maturity.", avatarText: "MS" },
    { id: 28, name: "Kaustav Roy", location: "Kolkata, WB", rating: 5, text: "Highly recommended! Completed 24 months, got incredible extra bonuses upon maturity.", avatarText: "KR" },
    { id: 29, name: "Shampa Adhikary", location: "Kolkata, WB", rating: 5, text: "They delivered exactly the premium results they promised. Absolute trust and loyalty!", avatarText: "SA" },
    { id: 30, name: "Chiranjit Nag", location: "Kolkata, WB", rating: 5, text: "Superb customer care and flawless scheme returns. The best gold investment in Bengal.", avatarText: "CN" }
  ],
  bn: [
    { id: 1, name: "অনন্যা শর্মা", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "গত বছর এই স্বর্ণ স্কিমে যোগ দিয়েছিলাম, মেয়াদ শেষে দারুণ রিটার্ন পেয়েছি। অত্যন্ত স্বচ্ছ হিসেব!", avatarText: "অ" },
    { id: 2, name: "পৃথ্বীরাজ সেন", location: "বর্ধমান, পশ্চিমবঙ্গ", rating: 5, text: "১২ মাসের জন্য এই স্কিমটি নিয়েছিলাম। মেয়াদ শেষে চমৎকার ফলাফল পেয়েছি। পরশমণি জুয়েলার্স সেরা!", avatarText: "পৃ" },
    { id: 3, name: "মিনাক্ষী দাস", location: "হাওড়া, পশ্চিমবঙ্গ", rating: 5, text: "২৪ মাসের স্কিমের রিটার্ন পেয়ে আমি অত্যন্ত সন্তুষ্ট। মেয়াদ পূর্তিতে দুর্দান্ত বোনাস পেয়েছি!", avatarText: "মি" },
    { id: 4, name: "রাজেশ হালদার", location: "দুর্গাপুর, পশ্চিমবঙ্গ", rating: 5, text: "আমার জীবনের অন্যতম সেরা সিদ্ধান্ত। মেয়ের বিয়ের জন্য স্কিমে যোগ দিয়ে অসাধারণ লাভ পেয়েছি।", avatarText: "রা" },
    { id: 5, name: "সুদীপ্ত রায়", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "খুব স্পষ্ট হিসেব এবং মেয়াদ শেষে প্রতিশ্রুতি অনুযায়ী পুরো রিটার্ন একদম নির্বিঘ্নে পেয়েছি।", avatarText: "সু" },
    { id: 6, name: "প্রিয়াঙ্কা পাল", location: "শিলিগুড়ি, পশ্চিমবঙ্গ", rating: 5, text: "গত বছর আমরা গোল্ড স্কিমে সাবস্ক্রাইব করেছিলাম। চমৎকার লাভজনক মুনাফা ও দারুণ স্বচ্ছতা পেয়েছি!", avatarText: "প্র" },
    { id: 7, name: "অরিন্দম ঘোষ", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "অনন্য সুন্দর গহনা এবং দারুণ রিটার্ন লাভ। এটি সত্যিই একটি অত্যন্ত ফলপ্রসূ স্কিম!", avatarText: "অ" },
    { id: 8, name: "মৌমিতা ব্যানার্জী", location: "আসানসোল, পশ্চিমবঙ্গ", rating: 5, text: "১২ মাসের স্কিম নিয়ে মেয়াদ শেষে চমৎকার ফল পেয়েছি। স্টাফদের ব্যবহার অত্যন্ত মার্জিত।", avatarText: "মৌ" },
    { id: 9, name: "শুভাশিস বোস", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "দারুণ স্কিম রিটার্ন! পশ্চিমবাংলার সবচেয়ে বিশ্বস্ত ও প্রিমিয়াম জুয়েলার্স পরশমণি।", avatarText: "শু" },
    { id: 10, name: "তনুশ্রী দে", location: "খড়গপুর, পশ্চিমবঙ্গ", rating: 5, text: "অত্যন্ত নির্ভরযোগ্য ব্র্যান্ড! আমরা দুইবার স্কিমে যুক্ত হয়ে দুইবারই সেরা ফলাফল পেয়েছি।", avatarText: "ত" },
    { id: 11, name: "জয়দীপ দত্ত", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "মেয়াদান্তে প্রতিশ্রুতি মতো সম্পূর্ণ রিটার্ন মূল্য পেয়েছি। এই গোল্ড স্কিম নিয়ে আমি অত্যন্ত আনন্দিত।", avatarText: "জ" },
    { id: 12, name: "রিয়া চক্রবর্তী", location: "মেদিনীপুর, পশ্চিমবঙ্গ", rating: 5, text: "মেয়াদ শেষে আকর্ষণীয় সুদের রিটার্ন সহ চমৎকার গোল্ড স্কিম জমানোর অভিজ্ঞতা।", avatarText: "রি" },
    { id: 13, name: "বিক্রম কুন্ডু", location: "হুগলি, পশ্চিমবঙ্গ", rating: 5, text: "১২ মাস আগে স্কিমে যুক্ত হয়েছিলাম এবং মেয়াদ শেষে আকর্ষণীয় বোনাস লাভ করেছি। দারুণ ফলাফল!", avatarText: "বি" },
    { id: 14, name: "দেবস্মিতা সেন", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "কোনো লুকানো শর্ত নেই। স্বর্ণ স্কিমে অংশ নিয়ে দারুণ মেয়াদ্দোত্তর সুবিধা পেয়েছি।", avatarText: "দে" },
    { id: 15, name: "অভিজিৎ কর", location: "কল্যাণী, পশ্চিমবঙ্গ", rating: 5, text: "নিশ্চিত প্রিমিয়াম রিটার্ন সহ চমৎকার একটি মাসিক গোল্ড সেভিংস প্ল্যান। সবাইকে সুপারিশ করব!", avatarText: "অ" },
    { id: 16, name: "সঞ্চিতা মাইতি", location: "হলদিয়া, পশ্চিমবঙ্গ", rating: 5, text: "আমরা আমাদের ২৪ মাসের মেয়াদ শেষ করে অসাধারণ অতিরিক্ত মুনাফা পেয়েছি। খুবই নির্ভরযোগ্য।", avatarText: "স" },
    { id: 17, name: "সৌরভ নন্দী", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "হিসাবকৃত ম্যাচিউরিটি টাকা এবং প্রাপ্ত রিটার্ন একদম হুবহু মিলে গেছে। অবিশ্বাস্য আর্থিক স্বচ্ছতা।", avatarText: "সৌ" },
    { id: 18, name: "পারমিতা সোম", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "স্বর্ণ স্কিমে অসাধারণ রিটার্ন! আমাদের বিয়ের গহনা কেনাকাটার বাজেট অনেক সহজ করে দিয়েছে।", avatarText: "পা" },
    { id: 19, name: "অভিষেক ভদ্র", location: "শিলিগুড়ি, পশ্চিমবঙ্গ", rating: 5, text: "উভয় স্কিমই অসাধারণ। ২৪ মাসের প্ল্যানটিতে অংশ নিয়ে আমরা দুর্দান্ত ভালো ফলাফল পেয়েছি।", avatarText: "অ" },
    { id: 20, name: "সোহিনী গুহ", location: "হাওড়া, পশ্চিমবঙ্গ", rating: 5, text: "অত্যন্ত চমৎকার ম্যাচিউরিটি রিটার্ন। অতিরিক্ত বোনাস সহ আমাদের স্বর্ণের গহনা খুব সহজে পেয়েছি।", avatarText: "সো" },
    { id: 21, name: "সন্দীপ মিত্র", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "অত্যন্ত পেশাদার ঐতিহ্যবাহী ব্র্যান্ড। এই পরিকল্পনায় যুক্ত হয়ে দারুণ ও স্বচ্ছ রিটার্ন পেয়েছি।", avatarText: "স" },
    { id: 22, name: "ইপ্সিতা পাল", location: "মালদা, পশ্চিমবঙ্গ", rating: 5, text: "পারফেক্ট গোল্ড সেভিংসের ফলাফল! ১২ মাস শেষে দারুণ ম্যাচিউরিটি বোনাস লাভ করেছি।", avatarText: "ই" },
    { id: 23, name: "দেবায়ন শ", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "প্রিমিয়াম সোনায় সঞ্চয় ও বিনিয়োগের একটি চমৎকার মাধ্যম। অসামান্য স্বচ্ছ পেমেন্ট সিস্টেম।", avatarText: "দে" },
    { id: 24, name: "রানু সরকার", location: "বারাসাত, পশ্চিমবঙ্গ", rating: 5, text: "হিসাব ১০০% সঠিক। ২৪ মাসের প্ল্যানে অংশ নিয়ে চমৎকার অতিরিক্ত মুনাফা লাভ করেছি।", avatarText: "রা" },
    { id: 25, name: "অমিতাভ দাস", location: "সিউড়ি, পশ্চিমবঙ্গ", rating: 5, text: "অত্যন্ত নিরাপদ এবং উচ্চ-রিটার্ন স্কিম। সময়মতো দারুণ ম্যাচিউরিটি সুবিধা পেয়েছি।", avatarText: "অ" },
    { id: 26, name: "রূপসা কুন্ডু", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "সহজ ও স্বচ্ছ। আমাদের ১২ মাসের গোল্ড প্ল্যানটিতে সর্বোচ্চ রিটার্ন লাভ করেছি।", avatarText: "রূ" },
    { id: 27, name: "মোনালিসা শীল", location: "শ্রীরামপুর, পশ্চিমবঙ্গ", rating: 5, text: "চমৎকারভাবে পরিকল্পিত স্কিম। মেয়াদ শেষে আমাদের বিনিয়োগে দারুণ মুনাফা এসেছে।", avatarText: "মো" },
    { id: 28, name: "কৌস্তভ রায়", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "সবাইকে রিকমেন্ড করব! ২৪ মাস শেষ করে মেয়াদ শেষে অবিশ্বাস্য অতিরিক্ত বোনাস পেয়েছি।", avatarText: "কৌ" },
    { id: 29, name: "শম্পা অধিকারী", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "তারা যেমন প্রতিশ্রুতি দিয়েছিল ঠিক তেমনই প্রিমিয়াম ফলাফল প্রদান করেছে। চিরন্তন বিশ্বাস!", avatarText: "শ" },
    { id: 30, name: "চিরঞ্জিত নাগ", location: "কলকাতা, পশ্চিমবঙ্গ", rating: 5, text: "চমৎকার কাস্টমার কেয়ার এবং নিখুঁত স্কিম রিটার্ন। বাংলার সেরা গোল্ড ইনভেস্টমেন্ট স্কিম।", avatarText: "চি" }
  ]
};

export default function CustomerTestimonials({ lang }: CustomerTestimonialsProps) {
  const list = TESTIMONIALS_DATA[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const t = {
    sectionPre: lang === "bn" ? "গ্রাহকদের সন্তুষ্টি" : "PATRON REVIEWS",
    sectionTitle: lang === "bn" ? "সম্মানিত গ্রাহকদের মতামত" : "What Our Patrons Say",
    verifiedReview: lang === "bn" ? "ভেরিফাইড মেম্বার" : "Verified Member",
    ofText: lang === "bn" ? "এর" : "of"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5500); // Auto-slide every 5.5 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 35 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 350, damping: 35 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const activeTestimonial = list[currentIndex];
  const activeNextTestimonial = list[(currentIndex + 1) % list.length]; // for desktop premium feel we can preview the next tiny patron's name!

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-12 mb-8" id="customer-testimonials-section">
      {/* Elegant & Clean Title Section */}
      <div className="text-center space-y-1.5 mb-8">
        <span className="text-[10px] tracking-[0.25em] font-extrabold text-red-600 uppercase block" id="testimonials-badge">
          {t.sectionPre}
        </span>
        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight" id="testimonials-title">
          {t.sectionTitle}
        </h3>
      </div>

      {/* Main Showcase Card Container - Beautiful Soft Layout with no dark borders */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white via-white to-red-50/15 border border-neutral-100 overflow-hidden" id="testimonial-slider-frame">
        {/* Quote watermark background */}
        <div className="absolute right-6 top-6 text-neutral-100 pointer-events-none select-none z-0" id="testimonial-quote-bg">
          <Quote size={100} strokeWidth={0.5} className="text-neutral-100/30 opacity-20 fill-neutral-100/5 md:scale-125" />
        </div>

        {/* Carousel Slide Area with Framer Motion AnimatePresence */}
        <div className="min-h-[140px] sm:min-h-[110px] md:min-h-[130px] flex items-center relative z-10">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col sm:flex-row gap-5 md:gap-7 items-start sm:items-center"
            >
              {/* Luxury Compact Avatar Circle - Bigger on Desktop */}
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-600 to-amber-600 text-white font-serif font-bold text-base md:text-lg flex items-center justify-center shadow-sm select-none border border-red-500/10">
                {activeTestimonial.avatarText}
              </div>

              {/* Text, Stars and Info */}
              <div className="flex-1 space-y-2.5 md:space-y-3">
                {/* Stars and Verification Badge */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={1} />
                    ))}
                  </div>
                  <span className="text-[9px] md:text-[10px] bg-red-50 text-red-700 font-sans font-bold px-2 py-0.5 rounded-full border border-red-100/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    {t.verifiedReview}
                  </span>
                </div>

                {/* Review Text - Responsive font size (larger on desktop) */}
                <p className="text-neutral-700 text-xs sm:text-sm md:text-base leading-relaxed font-sans italic font-medium">
                  "{activeTestimonial.text}"
                </p>

                {/* Name & Location */}
                <div className="flex items-center gap-2.5 text-[11px] md:text-xs">
                  <span className="font-serif font-bold text-neutral-900 md:text-sm">
                    {activeTestimonial.name}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="font-sans font-medium text-neutral-400 uppercase tracking-wider text-[9.5px] md:text-[10px]">
                    {activeTestimonial.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Compact Navigation & Bullets Footer */}
        <div className="mt-6 pt-5 border-t border-neutral-100/80 flex items-center justify-between relative z-10">
          {/* Indicators / Bullets & Current Step Indicator */}
          <div className="flex items-center gap-3.5" id="testimonial-bullets">
            <span className="text-[10px] md:text-xs font-mono text-neutral-400">
              {currentIndex + 1} {t.ofText} {list.length}
            </span>
            
            {/* Elegant Dots representation */}
            <div className="hidden sm:flex items-center gap-1.5">
              {list.map((_, index) => {
                // To keep it compact, we only show dot highlights around the current index
                if (Math.abs(index - currentIndex) > 3 && index !== 0 && index !== list.length - 1) {
                  return null;
                }
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      index === currentIndex 
                        ? "w-4 bg-red-600" 
                        : "w-1.5 bg-neutral-200 hover:bg-neutral-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Desktop Preview Next Name for extreme luxurious feel */}
          <div className="hidden md:block text-[11px] text-neutral-400 font-sans">
            <span>Next: </span>
            <span className="font-serif font-bold text-neutral-500 hover:text-red-600 transition-colors cursor-pointer" onClick={handleNext}>
              {activeNextTestimonial.name}
            </span>
          </div>

          {/* Compact Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 md:p-2 rounded-xl bg-neutral-50 hover:bg-red-50 border border-neutral-100 hover:border-red-200 text-neutral-500 hover:text-red-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="Previous Review"
              id="review-prev-btn"
            >
              <ChevronLeft size={14} className="md:w-4 md:h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 md:p-2 rounded-xl bg-neutral-50 hover:bg-red-50 border border-neutral-100 hover:border-red-200 text-neutral-500 hover:text-red-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="Next Review"
              id="review-next-btn"
            >
              <ChevronRight size={14} className="md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
