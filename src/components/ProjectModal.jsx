import React, { useEffect, useState } from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, Sparkles, Globe, Layers, ArrowUpRight } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/35 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      {/* FLOATING NEOMORPHIC CHASSIS (Inspired by Image 2 Reference) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl max-h-[94vh] bg-[#F7F8FA]/95 backdrop-blur-3xl rounded-[32px] sm:rounded-[40px] p-5 sm:p-7 md:p-9 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.8)] border border-white/60 flex flex-col justify-between overflow-y-auto no-scrollbar my-auto select-none"
      >
        {/* ===================================================================
            1. TOP CHASSIS BAR: Brand + Title + Domain + Actions
            =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white font-mono text-[10px] sm:text-xs font-bold text-black/70 shadow-xs border border-black/[0.04]">
                {project.category}
              </span>
              <span className="text-black/30">•</span>
              <span className="font-mono text-[10px] sm:text-xs text-black/50 font-medium">
                {project.industry}
              </span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] tracking-tight mt-1">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Visit Website Button in Header */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-neutral-100 text-black/70 hover:text-black shadow-xs border border-black/[0.05] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ===================================================================
            2. BENTO MODULAR LAYOUT (Two-Column Layout Matching Image 2)
            - Left: Live Interactive Viewport (Immediate interaction from initiation)
            - Right: What It Does, USPs, Engineering Feats, and Tech Stack
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 my-5 items-start">
          
          {/* ---------------------------------------------------------------
              LEFT COLUMN (7 cols): LIVE INTERACTIVE SITE PREVIEW
              Immediate live interaction from initiation without explicit click
              --------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] border border-black/[0.06] flex flex-col">
              {/* macOS Chrome Header Bar */}
              <div className="h-8 px-3.5 bg-[#EFEFEF] border-b border-black/[0.08] flex items-center justify-between font-mono text-[10px] text-black/70 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10" />
                </div>

                <div className="flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-md border border-black/10 font-mono text-[9px] sm:text-[10px] text-black/80 font-medium shadow-2xs">
                  <span className="text-[10px]">🔒</span>
                  <span>{project.displayUrl}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[9px] font-bold">
                    LIVE
                  </span>
                </div>
              </div>

              {/* LIVE INTERACTIVE IFRAME VIEWPORT (16:10 Laptop Resolution) */}
              <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden select-auto">
                {/* Fallback image behind iframe during loading */}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 pointer-events-none ${
                    iframeLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Instant Live Interaction Iframe */}
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="w-full h-full border-0 relative z-10"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </div>

            {/* Quick Helper Caption */}
            <div className="flex items-center justify-between px-1 text-black/45 font-mono text-[10px]">
              <span>Direct Sandbox • Scroll & Click Active</span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black flex items-center gap-0.5"
              >
                <span>Open in dedicated window</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ---------------------------------------------------------------
              RIGHT COLUMN (5 cols): MODULAR BENTO CARDS
              --------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* BOX 1: WHAT THIS WEBSITE IS ABOUT & WHAT IT DOES */}
            <div className="p-5 sm:p-6 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-1">
                Overview & Purpose
              </span>
              <h4 className="font-sans text-base sm:text-lg font-bold text-[#111111] mb-2">
                What this platform achieves
              </h4>
              <p className="font-sans text-xs sm:text-[13px] text-black/80 leading-relaxed font-normal">
                {project.whatItDoes}
              </p>
            </div>

            {/* BOX 2: KEY USPS & WHY IT STANDS OUT (Metrics Grid) */}
            <div className="p-5 sm:p-6 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-2">
                Why It Stands Out • Unique Selling Propositions
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5">
                {project.usps.map((usp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#F8F9FA] border border-black/[0.04] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-xs font-bold text-[#111111]">
                        {usp.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white font-mono text-[10px] font-bold text-black/80 shadow-2xs">
                        {usp.metric}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] text-black/65 font-medium leading-normal mt-1">
                      {usp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 3: WHAT WE DID & ENGINEERED */}
            <div className="p-5 sm:p-6 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-2">
                Architecture & Engineering Deliverables
              </span>
              <div className="space-y-1.5">
                {project.whatWeDid.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-black/80 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 4: INDUSTRY & TECH STACK PILLS */}
            <div className="p-4 sm:p-5 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-2">
                Technologies Employed
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#F3F4F6] text-black/75 font-mono text-[10px] sm:text-[11px] font-semibold border border-black/[0.04]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ===================================================================
            3. BOTTOM BAR: Visit Website Action
            =================================================================== */}
        <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-black/15 text-[#111111] hover:bg-white font-sans text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold tracking-tight shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Visit Live Platform</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
