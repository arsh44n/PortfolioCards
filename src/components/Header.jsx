import React, { useState } from 'react';
import { ArrowDownRight, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { creatorProfile } from '../data/projects';

export default function Header({ onOpenAbout, onScrollToWorks }) {
  const [hoveredWord, setHoveredWord] = useState(null);

  const words = [
    { text: "Visit", highlight: false },
    { text: "My", highlight: false },
    { text: "Selected", highlight: true },
    { text: "Work", highlight: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 150,
      },
    },
  };

  return (
    <header className="relative z-20 w-full px-6 sm:px-10 md:px-14 pt-5 sm:pt-7 pb-2 flex flex-col sm:flex-row sm:items-start justify-between gap-5 select-none">
      
      {/* ===================================================================
          LEFT: BRAND IDENTITY & ENLARGED "VISIT MY SELECTED WORK"
          =================================================================== */}
      <div className="flex flex-col">
        {/* Name & Title */}
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[0_0_10px_rgba(0,0,0,0.35)] animate-pulse" />
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#111111]">
            <span className="bg-gradient-to-r from-black via-neutral-800 to-black bg-clip-text">
              ARSHAAN
            </span>
          </h1>
        </div>
        <p className="font-sans text-xs sm:text-[13px] text-black/55 font-medium tracking-wide mt-0.5">
          Creative Technologist & Frontend Architect
        </p>

        {/* Space separation & ENLARGED "Visit My Selected Work" */}
        <div className="mt-4 sm:mt-5 md:mt-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onClick={onScrollToWorks}
            className="group inline-flex items-center gap-2.5 cursor-pointer"
          >
            <div className="flex items-center gap-2 flex-wrap">
              {words.map((w, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  whileHover={{
                    y: -4,
                    scale: 1.1,
                    transition: { type: 'spring', stiffness: 450, damping: 12 },
                  }}
                  onMouseEnter={() => setHoveredWord(idx)}
                  onMouseLeave={() => setHoveredWord(null)}
                  className={`font-sans text-lg sm:text-xl md:text-2xl font-black tracking-tight transition-all duration-200 ${
                    w.highlight
                      ? 'text-black underline decoration-black/30 decoration-2 underline-offset-6 group-hover:decoration-black'
                      : 'text-black/65 group-hover:text-black'
                  }`}
                >
                  {w.text}
                </motion.span>
              ))}
            </div>

            {/* Kinetic Arrow Badge */}
            <motion.span
              whileHover={{ scale: 1.18, rotate: 15 }}
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 shadow-[0_3px_12px_rgba(0,0,0,0.08)] border border-black/[0.08] text-black group-hover:bg-black group-hover:text-white transition-all ml-1 shrink-0 cursor-pointer"
            >
              <ArrowDownRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ===================================================================
          RIGHT: SQUARE PROFILE CARD (Displaying internal details & photo)
          =================================================================== */}
      <div className="self-end sm:self-auto shrink-0">
        <button
          onClick={onOpenAbout}
          aria-label="Open Arshaan's Profile & Connect Card"
          className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/90 hover:bg-white p-1.5 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden border border-white/80"
        >
          {/* Top image fill */}
          <div className="relative w-full h-[62%] rounded-xl overflow-hidden bg-neutral-100">
            <img
              src="./assets/arshaan_profile_sq.png"
              onError={(e) => {
                e.currentTarget.src = './assets/arshaan_profile.png';
              }}
              alt="Arshaan"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
            />
            {/* Live Green Beacon */}
            <div className="absolute top-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[8px] text-white font-bold">LIVE</span>
            </div>
          </div>

          {/* Bottom internal summary in square card */}
          <div className="w-full flex items-center justify-between px-1 pt-1 pb-0.5">
            <div className="flex flex-col text-left">
              <span className="font-sans text-[11px] font-black text-[#111111] leading-none group-hover:text-black">
                Arshaan
              </span>
              <span className="font-mono text-[8px] text-black/50 font-semibold uppercase tracking-wider mt-0.5">
                Connect
              </span>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#111111] group-hover:bg-black text-white flex items-center justify-center transition-transform group-hover:scale-110">
              <MessageCircle className="w-3 h-3 text-white" />
            </div>
          </div>
        </button>
      </div>

    </header>
  );
}
