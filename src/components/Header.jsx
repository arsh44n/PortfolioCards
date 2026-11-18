import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function Header({ onOpenAbout, activeFilter, onSelectFilter }) {
  return (
    <header className="relative z-20 w-full px-5 sm:px-8 md:px-12 pt-5 sm:pt-7 pb-3 flex items-center justify-between select-none">
      {/* Brand Identity / Name */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black/80" />
          <h1 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight text-[#111111]">
            ARSHAAN
          </h1>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.08] font-mono text-[10px] text-black/60 font-medium">
            2026 PORTFOLIO
          </span>
        </div>
        <p className="font-sans text-[11px] sm:text-xs text-black/50 font-medium tracking-wide mt-0.5">
          Creative Technologist & Frontend Architect
        </p>
      </div>

      {/* Center Tag / Status Indicator (Desktop only) */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[10px] text-black/70 uppercase tracking-wider font-semibold">
          7 LIVE PROJECTS ARCHIVED
        </span>
      </div>

      {/* Right Action: About & Contact Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenAbout}
          className="group flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-neutral-50 text-[#111111] border border-black/[0.1] shadow-xs hover:shadow-sm font-sans text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <div className="w-4 h-4 rounded-full overflow-hidden bg-black/10 shrink-0">
            <img
              src="./assets/creator_avatar.png"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              alt="Arshaan"
              className="w-full h-full object-cover"
            />
          </div>
          <span>About Me</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-black/40 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
}
