import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Header({ onOpenAbout }) {
  return (
    <header className="relative z-20 w-full px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 pb-3 flex items-center justify-between select-none">
      {/* Brand Identity / Name */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-black/80" />
          <h1 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl tracking-tight text-[#111111]">
            ARSHAAN
          </h1>
        </div>
        <p className="font-sans text-xs sm:text-[13px] text-black/55 font-medium tracking-wide mt-0.5">
          Creative Technologist & Frontend Architect
        </p>
      </div>

      {/* Right Action: Clean About Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenAbout}
          className="group flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/85 hover:bg-white text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/[0.04] backdrop-blur-md font-sans text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
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
