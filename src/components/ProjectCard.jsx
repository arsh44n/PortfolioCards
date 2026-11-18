import React, { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';

export default function ProjectCard({ project, onSelect, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-[310px] sm:w-[340px] md:w-[360px] shrink-0 bg-white rounded-[32px] p-3.5 sm:p-4 border border-black/[0.06] shadow-card-tactile hover:shadow-card-tactile-hover transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 select-none flex flex-col justify-between"
    >
      {/* ===================================================================
          1. TOP / CENTER ARTWORK CONTAINER
          - Custom themed soft background
          - Inverted top-right notch badge
          - Centered hero product visual with float hover
          - Lower curved signature banner
          =================================================================== */}
      <div
        className={`relative w-full aspect-[1/1.08] ${project.theme.bg} rounded-[24px] overflow-hidden flex flex-col justify-between p-3.5 border ${project.theme.border} transition-colors duration-300`}
      >
        {/* TOP-RIGHT INVERTED NOTCH BADGE (Signature Cutout from Reference) */}
        <div className="absolute top-0 right-0 z-20 flex items-center">
          {/* Left Inverted Concave Curve */}
          <svg className="w-3.5 h-3.5 text-white pointer-events-none -mr-[0.5px]" viewBox="0 0 14 14" fill="currentColor">
            <path d="M14 0 C14 7.732 7.732 14 0 14 H14 V0 Z" />
          </svg>

          {/* Notch Badge Pill (Seamless White) */}
          <div className="bg-white pl-3.5 pr-4 pt-1.5 pb-2 rounded-bl-[18px] flex items-center gap-1">
            <span className="font-mono text-xs sm:text-[13px] font-bold text-[#111111] tracking-tight">
              {project.badge}
            </span>
          </div>

          {/* Bottom Inverted Concave Curve */}
          <div className="absolute top-[31px] right-0 pointer-events-none">
            <svg className="w-3.5 h-3.5 text-white pointer-events-none -mt-[0.5px]" viewBox="0 0 14 14" fill="currentColor">
              <path d="M14 0 C14 7.732 7.732 14 0 14 H14 V0 Z" />
            </svg>
          </div>
        </div>

        {/* Top-Left Category Marker */}
        <div className="relative z-10 pt-1 pl-1">
          <span className="inline-block px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md font-mono text-[9px] sm:text-[10px] font-semibold text-black/60 tracking-wider uppercase border border-black/[0.04]">
            {project.category.split(' ')[0]}
          </span>
        </div>

        {/* CENTER HERO PRODUCT VISUAL (Scaled & Floating with 3D Shadow) */}
        <div className="relative flex-1 w-full flex items-center justify-center my-1 overflow-hidden">
          <div
            className={`relative w-[88%] h-[88%] rounded-xl overflow-hidden shadow-[0_16px_36px_-10px_rgba(0,0,0,0.22)] border border-black/10 transition-transform duration-500 ease-out ${
              isHovered ? 'scale-105 -translate-y-1' : 'scale-100'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top select-none pointer-events-none"
              loading="eager"
            />
            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* LOWER SIGNATURE CURVED BANNER (e.g. Free Delivery ribbon style from ref) */}
        <div className="relative z-10 w-full flex justify-center pb-0.5">
          <div
            className={`w-full py-1.5 px-3 rounded-xl ${project.theme.ribbon} ${project.theme.ribbonText} shadow-xs flex items-center justify-center text-center transition-transform duration-300 ${
              isHovered ? 'scale-[1.02]' : 'scale-100'
            }`}
          >
            <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-tight truncate">
              {project.ribbonText}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================
          2. BOTTOM METADATA & TAGS (Clean White Canvas)
          =================================================================== */}
      <div className="pt-3.5 pb-1 px-1 flex flex-col gap-2.5">
        {/* Title & Action Link Row */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-sans font-bold text-base sm:text-lg text-[#111111] tracking-tight group-hover:text-black transition-colors truncate">
            {project.title}
          </h3>

          <div className="flex items-center gap-0.5 text-black/70 group-hover:text-black font-sans text-xs font-semibold tracking-tight shrink-0 transition-colors">
            <span className="underline underline-offset-3 decoration-black/30 group-hover:decoration-black">
              Explore
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Soft Rounded Pill Tags Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {project.pills.map((pill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-[#F2F2F4] text-black/70 font-sans text-[10px] sm:text-[11px] font-medium tracking-tight shrink-0 group-hover:bg-[#EBEBEF] transition-colors"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
