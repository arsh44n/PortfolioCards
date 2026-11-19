import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import WordByWordText from './WordByWordText';

export default function ProjectCard({ project, onSelect }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPill, setHoveredPill] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative w-[280px] sm:w-[340px] md:w-[370px] shrink-0 bg-white/95 backdrop-blur-2xl rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.14),0_2px_6px_rgba(0,0,0,0.04)] cursor-pointer select-none flex flex-col justify-between border border-white/80 active:scale-[0.98] transition-all"
    >
      {/* ===================================================================
          1. VISUAL FILLS THE CARD (Edge-to-Edge with Smooth Perspective)
          =================================================================== */}
      <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-100 flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-106"
          loading="eager"
        />

        {/* Subtle glassmorphic sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity" />

        {/* Interactive Hover Inspect Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 flex items-center gap-1 font-mono text-[9px] font-bold text-black/80">
          <span>INSPECT</span>
          <ArrowUpRight className="w-3 h-3 text-black/60" />
        </div>
      </div>

      {/* ===================================================================
          2. BOTTOM TITLE & CATEGORY (Word-by-Word Kinetic Interactive Text)
          =================================================================== */}
      <div className="p-5 sm:p-6 flex flex-col gap-2.5 bg-white">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-black/40 group-hover:bg-emerald-500 transition-colors" />
            <WordByWordText
              text={project.category}
              wordClassName="font-mono text-[10px] sm:text-[11px] font-semibold text-black/50 group-hover:text-black/80 tracking-wider uppercase transition-colors"
              stagger={0.04}
            />
          </div>

          <h3 className="font-sans font-extrabold text-lg sm:text-xl text-[#111111] tracking-tight group-hover:text-black transition-all duration-200 mt-1 truncate group-hover:translate-x-0.5">
            <WordByWordText
              text={project.title}
              wordClassName="font-sans font-black text-lg sm:text-xl text-[#111111] tracking-tight hover:text-black transition-colors"
              stagger={0.06}
            />
          </h3>
        </div>

        {/* Soft Rounded Interactive Pill Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {project.pills.map((pill, idx) => (
            <span
              key={idx}
              onMouseEnter={() => setHoveredPill(idx)}
              onMouseLeave={() => setHoveredPill(null)}
              className={`px-2.5 py-1 rounded-full font-sans text-[10px] sm:text-[11px] font-medium tracking-tight shrink-0 transition-all duration-200 ${
                hoveredPill === idx
                  ? 'bg-[#111111] text-white scale-105 shadow-2xs'
                  : 'bg-[#F3F4F6] text-black/70 group-hover:bg-[#EBECEF]'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
