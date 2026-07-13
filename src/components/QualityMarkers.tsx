import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Percent, Calendar, Coins, ArrowRight, Sparkles, Check, Info } from "lucide-react";

interface QualityMarkersProps {
  lang?: "en" | "bn";
}

// Convert English numbers to Bengali script numbers (including commas and decimal points)
function toBengaliNumber(numStr: string | number): string {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  
  let str = typeof numStr === "number" ? numStr.toString() : numStr;
  
  for (let i = 0; i < 10; i++) {
    const reg = new RegExp(englishDigits[i], "g");
    str = str.replace(reg, bengaliDigits[i]);
  }
  return str;
}

// Indian Numbering System Formatter (e.g. 1,00,000 instead of 100,000)
function formatCurrency(amount: number, lang: "en" | "bn"): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  if (lang === "bn") {
    return "৳ " + toBengaliNumber(formatted);
  }
  return "₹ " + formatted;
}

const TRANSLATIONS = {
  en: {
    title: "Gain Probability Calculator",
    subtitle: "Estimate your interest gain value and total maturity amount on premium investment plans instantly.",
    amountLabel: "1. Enter Investment Amount",
    amountPlaceholder: "e.g. 1,00,000",
    tenureLabel: "2. Select Investment Tenure",
    rateLabel: "3. Choose Annual Interest Rate",
    months12: "12 Months",
    months24: "24 Months",
    rate6: "Minimum (6%)",
    rate12: "Average (12%)",
    rate18: "Maximum (18%)",
    btnCalculate: "Calculate / OK",
    gainLabel: "Gain Value (Interest Earned)",
    totalLabel: "Total Maturity Amount",
    principalLabel: "Principal Amount",
    summaryTitle: "Return Summary",
    errorAmount: "Please enter a valid amount greater than 0.",
    quickAdd: "Quick Add:",
    monthsLabel: "Months",
    purityNotice: "All calculations are based on physical gold backed reserves.",
    summaryText: (amount: string, months: string, rate: string, gain: string, total: string) => 
      `Investing ${amount} for ${months} Months at ${rate}% annual interest yields a gain of ${gain}, making your total amount ${total}.`
  },
  bn: {
    title: "গেইন প্রোবাবিলিটি ক্যালকুলেটর",
    subtitle: "স্কিমে আপনার বিনিয়োগের পরিমাণ, সময়কাল এবং লাভের হার নির্বাচন করে মোট অর্জিত লাভ এবং মেয়াদান্তের টাকা হিসাব করুন।",
    amountLabel: "১. বিনিয়োগের পরিমাণ লিখুন",
    amountPlaceholder: "যেমন: ১,০০,০০০",
    tenureLabel: "২. বিনিয়োগের মেয়াদ নির্বাচন করুন",
    rateLabel: "৩. বার্ষিক সুদের হার নির্বাচন করুন",
    months12: "১২ মাস",
    months24: "২৪ মাস",
    rate6: "সর্বনিম্ন (৬%)",
    rate12: "গড় (১২%)",
    rate18: "সর্বোচ্চ (১৮%)",
    btnCalculate: "হিসাব করুন (OK)",
    gainLabel: "লাভের পরিমাণ (Gain Value)",
    totalLabel: "সর্বমোট পরিমাণ (Total Amount)",
    principalLabel: "আসল বিনিয়োগের পরিমাণ",
    summaryTitle: "হিসাব নিকাশের বিবরণ",
    errorAmount: "অনুগ্রহ করে ০-এর চেয়ে বড় সঠিক বিনিয়োগের পরিমাণ লিখুন।",
    quickAdd: "সহজে যুক্ত করুন:",
    monthsLabel: "মাস",
    purityNotice: "সকল হিসাব সম্পূর্ণ গোল্ড ব্যাকড রিজার্ভ স্কিমের ওপর ভিত্তি করে নির্ধারিত।",
    summaryText: (amount: string, months: string, rate: string, gain: string, total: string) => 
      `আপনার ${amount} আসল বিনিয়োগে ${months} মাসের জন্য বার্ষিক ${rate}% সুদের হারে মোট অর্জিত লাভ (গেইন) হবে ${gain} এবং মেয়াদ শেষে আসলসহ সর্বমোট পরিমাণ হবে ${total} টাকা।`
  }
};

export default function QualityMarkers({ lang = "en" }: QualityMarkersProps) {
  const [amountInput, setAmountInput] = useState<string>("100000");
  const [tenureMonths, setTenureMonths] = useState<number>(12); // 12 or 24
  const [interestRate, setInterestRate] = useState<number>(12); // 6, 12, or 18
  
  // Results states
  const [isCalculated, setIsCalculated] = useState<boolean>(true); // Default calculated for smooth initial load
  const [loading, setLoading] = useState<boolean>(false);
  const [calcResults, setCalcResults] = useState<{
    principal: number;
    gain: number;
    total: number;
    rate: number;
    months: number;
  }>({
    principal: 100000,
    gain: 12000,
    total: 112000,
    rate: 12,
    months: 12,
  });

  const t = TRANSLATIONS[lang];

  // Quick preset handlers
  const handleQuickAdd = (value: number) => {
    const current = parseFloat(amountInput.replace(/,/g, "")) || 0;
    const nextValue = current + value;
    setAmountInput(nextValue.toString());
    // Auto calculate on change
    triggerCalculation(nextValue, tenureMonths, interestRate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, ""); // Keep only digits
    setAmountInput(val);
    if (val) {
      const parsed = parseFloat(val);
      triggerCalculation(parsed, tenureMonths, interestRate);
    }
  };

  const handleTenureChange = (months: number) => {
    setTenureMonths(months);
    const parsed = parseFloat(amountInput.replace(/,/g, "")) || 0;
    triggerCalculation(parsed, months, interestRate);
  };

  const handleRateChange = (rate: number) => {
    setInterestRate(rate);
    const parsed = parseFloat(amountInput.replace(/,/g, "")) || 0;
    triggerCalculation(parsed, tenureMonths, rate);
  };

  const triggerCalculation = (pAmount: number, months: number, rate: number) => {
    if (pAmount <= 0) return;
    const tenureYears = months / 12;
    const calculatedGain = pAmount * (rate / 100) * tenureYears;
    const calculatedTotal = pAmount + calculatedGain;

    setCalcResults({
      principal: pAmount,
      gain: calculatedGain,
      total: calculatedTotal,
      rate: rate,
      months: months,
    });
  };

  const handleCalculateClick = () => {
    const parsedAmount = parseFloat(amountInput.replace(/,/g, ""));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert(t.errorAmount);
      return;
    }

    setLoading(true);
    // Add a tiny premium delay to simulate a real-time calculation engine
    setTimeout(() => {
      triggerCalculation(parsedAmount, tenureMonths, interestRate);
      setIsCalculated(true);
      setLoading(false);
    }, 450);
  };

  // Percent ratios for the horizontal visual progress bars
  const totalAmount = calcResults.total || 1;
  const principalPercent = (calcResults.principal / totalAmount) * 100;
  const gainPercent = (calcResults.gain / totalAmount) * 100;

  return (
    <div className="w-full space-y-6" id="fd-calculator-section">
      {/* Premium Header */}
      <div className="flex flex-col items-center justify-center text-center px-4" id="calculator-header">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[10px] font-mono text-red-600 font-bold uppercase mb-2">
          <Calculator size={11} className="text-red-500 animate-spin-slow" />
          <span>Interactive Calculator</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-neutral-900 tracking-tight" id="calc-main-title">
          {t.title}
        </h3>
        <p className="text-xs text-neutral-500 max-w-md mt-1 leading-relaxed" id="calc-sub-title">
          {t.subtitle}
        </p>
      </div>

      {/* Main Calculator Layout Panel */}
      <div className="bg-white border border-neutral-200/80 rounded-3xl shadow-lg overflow-hidden" id="calculator-card">
        {/* Top Decorative Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-neutral-900 to-red-600" />
        
        <div className="p-5 sm:p-7 space-y-6">
          {/* OPTION 1: Amount Input Row */}
          <div className="space-y-2.5" id="opt-amount-container">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Coins size={13} className="text-red-500" />
              {t.amountLabel}
            </label>
            <div className="relative rounded-2xl border-2 border-neutral-200/80 hover:border-neutral-300 focus-within:border-red-500/50 focus-within:ring-2 focus-within:ring-red-500/10 transition-all bg-neutral-50/30">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-xl font-extrabold text-neutral-400">
                  {lang === "bn" ? "৳" : "₹"}
                </span>
              </div>
              <input
                type="text"
                value={amountInput}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-4 py-4 bg-transparent rounded-2xl text-xl font-bold font-sans text-neutral-900 focus:outline-none placeholder:text-neutral-300 placeholder:font-sans tracking-wide"
                placeholder={t.amountPlaceholder}
                id="calc-amount-input"
              />
            </div>
            {/* Quick add luxury micro chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs" id="quick-add-row">
              <span className="text-neutral-400 font-medium mr-1">{t.quickAdd}</span>
              <button
                type="button"
                onClick={() => handleQuickAdd(25000)}
                className="px-2.5 py-1 rounded-lg border border-neutral-200/80 bg-neutral-50 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all font-sans font-semibold text-neutral-600 text-[11px] cursor-pointer"
              >
                +{lang === "bn" ? toBengaliNumber("২৫,০০০") : "25,000"}
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(50000)}
                className="px-2.5 py-1 rounded-lg border border-neutral-200/80 bg-neutral-50 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all font-sans font-semibold text-neutral-600 text-[11px] cursor-pointer"
              >
                +{lang === "bn" ? toBengaliNumber("৫০,০০০") : "50,000"}
              </button>
              <button
                type="button"
                onClick={() => handleQuickAdd(100000)}
                className="px-2.5 py-1 rounded-lg border border-neutral-200/80 bg-neutral-50 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all font-sans font-semibold text-neutral-600 text-[11px] cursor-pointer"
              >
                +{lang === "bn" ? toBengaliNumber("১,০০,০০০") : "1,00,000"}
              </button>
            </div>
          </div>

          {/* OPTION 2: Tenure Selector */}
          <div className="space-y-2.5" id="opt-tenure-container">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Calendar size={13} className="text-red-500" />
              {t.tenureLabel}
            </label>
            <div className="grid grid-cols-2 gap-3" id="tenure-tabs-wrapper">
              <button
                type="button"
                onClick={() => handleTenureChange(12)}
                className={`relative py-3.5 rounded-2xl border text-xs font-bold font-sans tracking-wider uppercase transition-all flex flex-col items-center justify-center gap-1 select-none cursor-pointer ${
                  tenureMonths === 12
                    ? "border-red-600 bg-red-50/40 text-red-700 shadow-sm ring-1 ring-red-500/30 font-semibold"
                    : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                }`}
                id="tenure-btn-12"
              >
                <span>{t.months12}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-sans uppercase font-medium ${tenureMonths === 12 ? 'bg-red-100 text-red-700 font-semibold' : 'bg-neutral-100 text-neutral-400'}`}>
                  12 {t.monthsLabel}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleTenureChange(24)}
                className={`relative py-3.5 rounded-2xl border text-xs font-bold font-sans tracking-wider uppercase transition-all flex flex-col items-center justify-center gap-1 select-none cursor-pointer ${
                  tenureMonths === 24
                    ? "border-red-600 bg-red-50/40 text-red-700 shadow-sm ring-1 ring-red-500/30 font-semibold"
                    : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                }`}
                id="tenure-btn-24"
              >
                <span>{t.months24}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-sans uppercase font-medium ${tenureMonths === 24 ? 'bg-red-100 text-red-700 font-semibold' : 'bg-neutral-100 text-neutral-400'}`}>
                  24 {t.monthsLabel}
                </span>
              </button>
            </div>
          </div>

          {/* OPTION 3: Percentage Choice Chips */}
          <div className="space-y-2.5" id="opt-rate-container">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Percent size={13} className="text-red-500" />
              {t.rateLabel}
            </label>
            <div className="grid grid-cols-3 gap-3.5" id="percentage-chips-row">
              {/* 6% Card */}
              <button
                type="button"
                onClick={() => handleRateChange(6)}
                className={`relative p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  interestRate === 6
                    ? "border-red-600 bg-red-50/40 text-red-700 shadow-sm ring-1 ring-red-500/30"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
                id="rate-btn-6"
              >
                {interestRate === 6 && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center p-0.5">
                    <Check size={8} strokeWidth={4} />
                  </div>
                )}
                <span className="text-base font-bold font-sans">
                  {lang === "bn" ? toBengaliNumber("6") : "6"}%
                </span>
                <span className="text-[9.5px] text-neutral-400 font-sans tracking-tight font-medium">
                  {t.rate6}
                </span>
              </button>

              {/* 12% Card */}
              <button
                type="button"
                onClick={() => handleRateChange(12)}
                className={`relative p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  interestRate === 12
                    ? "border-red-600 bg-red-50/40 text-red-700 shadow-sm ring-1 ring-red-500/30"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
                id="rate-btn-12"
              >
                {interestRate === 12 && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center p-0.5">
                    <Check size={8} strokeWidth={4} />
                  </div>
                )}
                <span className="text-base font-bold font-sans">
                  {lang === "bn" ? toBengaliNumber("12") : "12"}%
                </span>
                <span className="text-[9.5px] text-neutral-400 font-sans tracking-tight font-medium">
                  {t.rate12}
                </span>
              </button>

              {/* 18% Card */}
              <button
                type="button"
                onClick={() => handleRateChange(18)}
                className={`relative p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  interestRate === 18
                    ? "border-red-600 bg-red-50/40 text-red-700 shadow-sm ring-1 ring-red-500/30"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
                id="rate-btn-18"
              >
                {interestRate === 18 && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full flex items-center justify-center p-0.5">
                    <Check size={8} strokeWidth={4} />
                  </div>
                )}
                <span className="text-base font-bold font-sans">
                  {lang === "bn" ? toBengaliNumber("18") : "18"}%
                </span>
                <span className="text-[9.5px] text-neutral-400 font-sans tracking-tight font-medium">
                  {t.rate18}
                </span>
              </button>
            </div>
          </div>

          {/* Core Action Button (OK Button) */}
          <div className="pt-2" id="calculate-btn-row">
            <button
              type="button"
              onClick={handleCalculateClick}
              disabled={loading}
              className="relative w-full py-4.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.99] text-white text-xs font-bold font-sans tracking-widest uppercase transition-all shadow-md hover:shadow-lg hover:shadow-red-500/15 select-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              id="calc-action-button"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{t.btnCalculate}</span>
                  <ArrowRight size={13} className="shrink-0" />
                </>
              )}
            </button>
          </div>

          {/* RESULT PANELS WITH SMOOTH TRANSITION */}
          <AnimatePresence mode="wait">
            {isCalculated && (
              <motion.div
                key="results-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="mt-6 border-t border-neutral-100 pt-6 space-y-6"
                id="calc-results-panel"
              >
                {/* Result Title */}
                <div className="flex items-center gap-2 text-neutral-800" id="results-title-row">
                  <Sparkles size={14} className="text-amber-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">
                    {t.summaryTitle}
                  </span>
                </div>

                {/* Return Output Cards Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4" id="results-bento-grid">
                  {/* Left Column Principal & Gain */}
                  <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
                    {/* Principal Display */}
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between" id="result-principal-card">
                      <div>
                        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">
                          {t.principalLabel}
                        </span>
                        <h5 className="font-serif text-base font-bold text-neutral-700 mt-0.5">
                          {formatCurrency(calcResults.principal, lang)}
                        </h5>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-neutral-400 bg-neutral-200/50 px-2.5 py-1 rounded-full">
                        {lang === "bn" ? toBengaliNumber("১০০") : "100"}%
                      </span>
                    </div>

                    {/* GAIN VALUE DISPLAY (Highlighted in Luxury Gold-Red) */}
                    <div className="p-5 bg-red-50/40 rounded-2xl border border-red-100/60 flex items-center justify-between" id="result-gain-card">
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          {t.gainLabel}
                        </span>
                        <h5 className="font-serif text-2xl font-bold text-red-600 mt-1">
                          {formatCurrency(calcResults.gain, lang)}
                        </h5>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-red-600 bg-red-100/60 px-3 py-1 rounded-full">
                          +{lang === "bn" ? toBengaliNumber(calcResults.rate) : calcResults.rate}%
                        </span>
                        <p className="text-[9px] text-neutral-400 font-mono mt-1">
                          {lang === "bn" ? toBengaliNumber(calcResults.months) : calcResults.months} {t.monthsLabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Total Maturity Amount */}
                  <div className="md:col-span-5 p-5 bg-gradient-to-br from-red-700 via-red-850 to-neutral-900 text-white rounded-3xl border border-red-800/30 flex flex-col justify-between relative overflow-hidden group shadow-md" id="result-total-card">
                    {/* Ambient subtle glow */}
                    <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-red-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none" />
                    
                    <div className="relative z-10 space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-red-200/80 block">
                        {t.totalLabel}
                      </span>
                      <h4 className="font-serif text-3xl font-bold text-amber-300 tracking-tight">
                        {formatCurrency(calcResults.total, lang)}
                      </h4>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-red-800/40 mt-4 flex items-center justify-between text-[10px] font-sans text-red-100/80">
                      <span>Maturity Yield</span>
                      <span className="text-white font-bold bg-red-900/60 px-2.5 py-0.5 rounded border border-red-700/50">
                        +{lang === "bn" ? toBengaliNumber(gainPercent.toFixed(1)) : gainPercent.toFixed(1)}% Net
                      </span>
                    </div>
                  </div>
                </div>

                {/* Custom Graphical Representation (Ratios Bar) */}
                <div className="space-y-2 bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100" id="visual-ratio-bar-section">
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono text-neutral-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-neutral-400" />{t.principalLabel}</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500" />{t.gainLabel}</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden flex" id="ratio-progress-bar">
                    <div 
                      style={{ width: `${principalPercent}%` }} 
                      className="h-full bg-neutral-400 transition-all duration-500" 
                    />
                    <div 
                      style={{ width: `${gainPercent}%` }} 
                      className="h-full bg-red-500 transition-all duration-500" 
                    />
                  </div>
                </div>

                {/* Natural Language Summary Paragraph */}
                <div className="p-4 bg-amber-50/30 rounded-2xl border border-amber-100/50 flex gap-2.5 items-start text-xs text-amber-900 leading-relaxed" id="calculation-prose-notice">
                  <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="font-sans">
                    {t.summaryText(
                      formatCurrency(calcResults.principal, lang),
                      lang === "bn" ? toBengaliNumber(calcResults.months) : calcResults.months.toString(),
                      lang === "bn" ? toBengaliNumber(calcResults.rate) : calcResults.rate.toString(),
                      formatCurrency(calcResults.gain, lang),
                      formatCurrency(calcResults.total, lang)
                    )}
                  </p>
                </div>

                {/* Purity Assurance Footnote */}
                <p className="text-[10px] text-neutral-400 text-center italic font-sans">
                  * {t.purityNotice}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
