import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ onOpenAbout, onScrollToWorks }) {
  const [hoveredWord, setHoveredWord] = useState(null);

  const words = [
    { text: "Visit", highlight: false },
    { text: "my", highlight: false },
    { text: "selected", highlight: true },
    { text: "work", highlight: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <header className="relative z-20 w-full px-6 sm:px-10 md:px-14 pt-5 sm:pt-7 pb-2 flex flex-col sm:flex-row sm:items-start justify-between gap-4 select-none">
      {/* Brand Identity / Name & Interactive Word-by-Word Intro */}
      <div className="flex flex-col gap-2.5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[0_0_8px_rgba(0,0,0,0.3)] animate-pulse" />
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#111111]">
              ARSHAAN
            </h1>
          </div>
          <p className="font-sans text-xs sm:text-[13px] text-black/55 font-medium tracking-wide mt-0.5">
            Creative Technologist & Frontend Architect
          </p>
        </div>

        {/* ===================================================================
            VISIT MY SELECTED WORK (Staggered Word-to-Word Interactive Text)
            =================================================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onClick={onScrollToWorks}
          className="group inline-flex items-center gap-2 cursor-pointer pt-1"
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            {words.map((w, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                whileHover={{
                  y: -3,
                  scale: 1.08,
                  transition: { type: 'spring', stiffness: 400, damping: 14 },
                }}
                onMouseEnter={() => setHoveredWord(idx)}
                onMouseLeave={() => setHoveredWord(null)}
                className={`font-sans text-sm sm:text-base font-bold tracking-tight transition-colors duration-200 ${
                  w.highlight
                    ? 'text-black underline decoration-black/25 decoration-2 underline-offset-4 group-hover:decoration-black/70'
                    : 'text-black/60 group-hover:text-black/85'
                }`}
              >
                {w.text}
              </motion.span>
            ))}
          </div>

          {/* Kinetic Indicator Pill */}
          <motion.span
            whileHover={{ scale: 1.15, rotate: 12 }}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/[0.06] text-black/70 group-hover:text-black group-hover:border-black/20 transition-all ml-1 shrink-0"
          >
            <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </motion.span>
        </motion.div>
      </div>

      {/* Right Action: Clean About Pill */}
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <button
          onClick={onOpenAbout}
          className="group flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/90 hover:bg-white text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/[0.05] backdrop-blur-md font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="w-4 h-4 rounded-full overflow-hidden bg-black/10 shrink-0">
            <img
              src="./assets/creator_avatar.png"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              alt="Arshaan"
              className="w-full h-full object-cover"
            />
          </div>
          <span>About</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-black/40 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
}
