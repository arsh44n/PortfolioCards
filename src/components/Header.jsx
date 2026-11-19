import React, { useState } from 'react';
import { ArrowDownRight, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { creatorProfile } from '../data/projects';
import WordByWordText from './WordByWordText';

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
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 14, filter: 'blur(5px)' },
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
    <header className="relative z-20 w-full max-w-full min-w-0 px-4 sm:px-10 md:px-14 pt-4 sm:pt-6 pb-2 flex flex-col gap-2.5 sm:gap-4 select-none">
      
      {/* ===================================================================
          ROW 1: BRAND IDENTITY (Left) & 3D MODEL + SQUARE PROFILE CARD (Right)
          =================================================================== */}
      <div className="w-full flex items-center justify-between gap-3 min-w-0">
        
        {/* Left: Name & Title with Word-by-Word Animation */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[0_0_10px_rgba(0,0,0,0.35)] animate-pulse shrink-0" />
            <h1 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl tracking-tight text-[#111111] truncate">
              <span className="bg-gradient-to-r from-black via-neutral-800 to-black bg-clip-text">
                ARSHAAN
              </span>
            </h1>
          </div>
          <WordByWordText
            text="Creative Technologist & Frontend Architect"
            className="mt-0.5"
            wordClassName="font-sans text-[11px] sm:text-[13px] text-black/55 font-medium tracking-wide hover:text-black transition-colors"
            delay={0.2}
            stagger={0.06}
          />
        </div>

        {/* Right: 3D Twin Character + Square Profile Card */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          
          {/* Interactive 3D Animated Character Model */}
          <div
            onClick={onOpenAbout}
            className="group relative cursor-pointer flex flex-col items-center justify-end"
            title="Arshaan // 3D Interactive Model — Click to Connect"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative h-14 sm:h-20 md:h-24 w-auto flex items-end justify-center"
            >
              <img
                src="./assets/arshaan_3d_avatar.png"
                alt="Arshaan 3D Animated Model"
                className="h-full w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.14)] filter transition-transform duration-300 group-hover:brightness-105"
              />
              {/* Soft Ambient Contact Shadow Under Feet */}
              <div className="absolute -bottom-0.5 w-6 sm:w-10 h-1.5 rounded-full bg-black/15 blur-[2px] -z-10 group-hover:scale-125 transition-transform" />
            </motion.div>
          </div>

          {/* Square Profile Card */}
          <button
            onClick={onOpenAbout}
            aria-label="Open Arshaan's Profile & Connect Card"
            className="group relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white/95 hover:bg-white p-1 sm:p-1.5 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between overflow-hidden border border-white/80"
          >
            {/* Top image fill */}
            <div className="relative w-full h-[64%] rounded-xl overflow-hidden bg-neutral-100">
              <img
                src="./assets/arshaan_profile_sq.png"
                onError={(e) => {
                  e.currentTarget.src = './assets/arshaan_profile.png';
                }}
                alt="Arshaan"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
              />
              {/* Live Green Beacon */}
              <div className="absolute top-1 right-1 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[7px] text-white font-bold hidden sm:inline">LIVE</span>
              </div>
            </div>

            {/* Bottom internal summary in square card */}
            <div className="w-full flex items-center justify-between px-1 pt-0.5 pb-0.5">
              <span className="font-sans text-[10px] sm:text-[11px] font-black text-[#111111] leading-none group-hover:text-black">
                About
              </span>
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#111111] group-hover:bg-black text-white flex items-center justify-center transition-transform group-hover:scale-110">
                <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ===================================================================
          ROW 2: ENLARGED "VISIT MY SELECTED WORK" (Word-by-Word Kinetic Flow)
          =================================================================== */}
      <div className="w-full pt-1 sm:pt-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onClick={onScrollToWorks}
          className="group inline-flex items-center gap-2 sm:gap-2.5 cursor-pointer"
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
                    ? 'text-black underline decoration-black/30 decoration-2 underline-offset-4 sm:underline-offset-6 group-hover:decoration-black'
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

    </header>
  );
}
