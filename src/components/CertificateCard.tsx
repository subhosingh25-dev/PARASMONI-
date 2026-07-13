import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Calendar, Award, CheckCircle, QrCode, FileText, Share2, Clipboard, LucideInfo } from "lucide-react";
import { CertificateInfo } from "../types";

interface CertificateCardProps {
  info: CertificateInfo;
}

export default function CertificateCard({ info }: CertificateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(info.certificateId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative w-full max-w-lg mx-auto select-none px-2"
      id="certificate-card-wrapper"
    >
      {/* Card Containment */}
      <div
        className="w-full relative rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80 shadow-2xl bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl min-h-[310px]"
        id="certificate-card-front"
      >
        {/* Subtle background luxury lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-900 dark:text-neutral-100" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glowing top-right badge */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-radial from-violet-600/10 via-transparent to-transparent rounded-full blur-2xl" />

        {/* Card Header: Mini Velvet Box Brand Logo replacing Registry badge */}
        <div className="flex justify-between items-center z-10 border-b border-neutral-100 dark:border-neutral-900/60 pb-3" id="card-front-header">
          <div className="flex items-center gap-2.5">
            {/* Mini Brand Icon SVG */}
            <div className="relative w-10 h-10 flex-shrink-0" id="mini-card-icon">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_2px_4px_rgba(139,92,246,0.15)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gradient-right-mini" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
                
                {/* Left Stroke */}
                <path
                  d="M20 20 L40 75 Q41 78, 43 78 L47 78 Q49 78, 50 75 L52 70"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="text-neutral-900 dark:text-neutral-100"
                />
                
                {/* Right Stroke */}
                <path
                  d="M51.5 76.5 L80 25"
                  stroke="url(#gradient-right-mini)"
                  strokeWidth="10.5"
                  strokeLinecap="round"
                />
                
                {/* Intersection Dot */}
                <circle cx="50" cy="77" r="4" fill="#a78bfa" />
              </svg>
            </div>

            {/* Mini Brand Title text representation */}
            <div className="text-left select-none leading-none">
              <p className="font-sans text-[8px] tracking-[0.3em] text-neutral-400 dark:text-neutral-500 font-bold uppercase mb-0.5">THE</p>
              <h3 className="font-serif text-base font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
                VELVET <span className="font-light text-neutral-400 dark:text-neutral-500">BOX</span>
              </h3>
            </div>
          </div>
          
          {/* Holographic Security seal */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-violet-500/30 bg-gradient-to-tr from-violet-100 to-indigo-100 dark:from-violet-950 dark:to-indigo-950 shadow-inner overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Award className="text-violet-600 dark:text-violet-400 w-5 h-5 animate-spin-slow" />
          </div>
        </div>

        {/* Certificate Main Metrics Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 my-6 z-10" id="card-front-metrics">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
              LAB REFERENCE
            </p>
            <p className="text-sm font-semibold font-mono text-neutral-800 dark:text-neutral-200">
              {info.labRef}
            </p>
          </div>
          
          <div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
              PURITY DECLARED
            </p>
            <p className="text-sm font-semibold font-mono text-violet-600 dark:text-violet-400 flex items-center gap-1">
              {info.purity}
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-normal">
                (Sterling)
              </span>
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
              METAL CLASSIFICATION
            </p>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {info.metal}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500">
              VERIFICATION CODES
            </p>
            <p className="text-sm font-semibold font-mono text-neutral-800 dark:text-neutral-200">
              {info.hallmark}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-end border-t border-neutral-100 dark:border-neutral-900 pt-4 z-10" id="card-front-footer">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              CERTIFICATE ID
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {info.certificateId}
              </span>
              <button
                onClick={handleCopyId}
                className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors text-neutral-500 dark:text-neutral-400"
                title="Copy Certificate ID"
              >
                <Clipboard size={12} />
              </button>
              {copied && (
                <span className="text-[9px] text-emerald-500 font-mono animate-bounce font-medium">
                  Copied!
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/10">
              <CheckCircle size={10} className="fill-emerald-500 text-white dark:text-neutral-900" />
              {info.status}
            </span>
            <p className="text-[9px] text-neutral-400 dark:text-neutral-500 mt-1 font-mono">
              Issued: {info.issueDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
