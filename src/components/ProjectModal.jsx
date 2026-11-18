import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Sparkles, Monitor, ArrowUpRight, Cpu, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(760);

  // Measure container width to scale iframe to 1280px Desktop Mode
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const desktopWidth = 1280;
  const desktopHeight = 800;
  const scaleRatio = containerWidth > 0 ? containerWidth / desktopWidth : 0.6;
  const scaledHeight = desktopHeight * scaleRatio;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      {/* FLOATING NEOMORPHIC CHASSIS */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl max-h-[95vh] bg-[#F7F8FA]/95 backdrop-blur-3xl rounded-[32px] sm:rounded-[40px] p-4 sm:p-6 md:p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.85)] border border-white/60 flex flex-col justify-between overflow-y-auto no-scrollbar my-auto select-none"
      >
        {/* ===================================================================
            1. TOP CHASSIS BAR: Category + Title + Direct CTA + Close
            =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white font-mono text-[10px] sm:text-xs font-bold text-black/70 shadow-2xs border border-black/[0.04] hover:bg-black hover:text-white transition-colors cursor-default">
                {project.category}
              </span>
              <span className="text-black/30">•</span>
              <span className="font-mono text-[10px] sm:text-xs text-black/50 font-medium hover:text-black transition-colors cursor-default">
                {project.industry}
              </span>
            </div>

            <h2 className="group font-sans text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] tracking-tight mt-1 transition-all duration-300 hover:tracking-normal cursor-default">
              <span className="bg-gradient-to-r from-black via-black/90 to-black/70 bg-clip-text">
                {project.title}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Visit Website Button in Header */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-neutral-100 text-black/70 hover:text-black shadow-xs border border-black/[0.05] transition-colors cursor-pointer shrink-0 hover:rotate-90 duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ===================================================================
            2. BALANCED BENTO GRID: NO EMPTY VOID BELOW PREVIEW
            - Left Column: Desktop Preview (Top) + Engineering Deliverables & Tech Stack (Bottom)
            - Right Column: Overview + Key USPs Metrics Grid + Live Impact Specs
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 my-4 items-start">
          
          {/* ===============================================================
              LEFT COLUMN (7 cols): PREVIEW + SECTIONS ALIGNED UNDERNEATH
              =============================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* 2A: DESKTOP MODE WEBSITE PREVIEW (No Domain Exposed) */}
            <div className="w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] border border-black/[0.06] flex flex-col">
              
              {/* macOS Header Bar (Domain Completely Removed) */}
              <div className="h-8 px-3.5 bg-[#EFEFEF] border-b border-black/[0.08] flex items-center justify-between font-mono text-[10px] text-black/70 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10 hover:opacity-80 transition-opacity" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10 hover:opacity-80 transition-opacity" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10 hover:opacity-80 transition-opacity" />
                </div>

                {/* Desktop Mode indicator pill (NO domain or URL exposed) */}
                <div className="flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-md border border-black/10 font-mono text-[9px] text-black/70 font-semibold shadow-2xs">
                  <Monitor className="w-2.5 h-2.5 text-black/50" />
                  <span>DESKTOP VIEWPORT • 1280×800</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[9px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>INTERACTIVE</span>
                  </span>
                </div>
              </div>

              {/* LIVE SCALED DESKTOP VIEWPORT (1280x800 Scaled Smoothly) */}
              <div
                ref={containerRef}
                style={{ height: `${scaledHeight}px` }}
                className="relative w-full bg-neutral-900 overflow-hidden select-auto transition-all"
              >
                {/* Fallback image behind iframe during initial connection */}
                <img
                  src={project.image}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none ${
                    iframeLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* True Desktop Mode Scaled Iframe */}
                <div
                  style={{
                    width: `${desktopWidth}px`,
                    height: `${desktopHeight}px`,
                    transform: `scale(${scaleRatio})`,
                    transformOrigin: 'top left',
                  }}
                  className="absolute top-0 left-0"
                >
                  <iframe
                    src={project.liveUrl}
                    title={project.title}
                    style={{ width: `${desktopWidth}px`, height: `${desktopHeight}px` }}
                    className="border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Helper Subtext */}
            <div className="flex items-center justify-between px-1 text-black/45 font-mono text-[10px]">
              <span className="hover:text-black transition-colors cursor-default">
                Full 1:1 Desktop Resolution • Scroll & Click Active
              </span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black flex items-center gap-0.5 transition-colors"
              >
                <span>Open in dedicated tab</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* =============================================================
                2B: SECTIONS ALIGNED UNDER PREVIEW (Filling the empty void)
                Architecture Feats & Technologies Grid
                ============================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* BOX: ARCHITECTURE & ENGINEERING DELIVERABLES */}
              <div className="group p-5 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05] hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)] transition-all">
                <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-2 group-hover:text-black/70 transition-colors">
                  Engineering Deliverables
                </span>
                <div className="space-y-2">
                  {project.whatWeDid.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-black/80 font-medium p-1.5 rounded-lg hover:bg-[#F6F7F9] hover:text-black transition-all cursor-default"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOX: TECHNOLOGIES EMPLOYED & SYSTEM SPECS */}
              <div className="group p-5 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05] hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-2 group-hover:text-black/70 transition-colors">
                    Technologies Employed
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#F3F4F6] hover:bg-[#111111] text-black/75 hover:text-white font-mono text-[10px] sm:text-[11px] font-semibold border border-black/[0.04] transition-all duration-200 cursor-default hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between font-mono text-[10px] text-black/50">
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-black/40" />
                    <span>ZERO RUNTIME LAG</span>
                  </div>
                  <span className="font-bold text-emerald-700">SUB-SECOND FCP</span>
                </div>
              </div>

            </div>

          </div>

          {/* ===============================================================
              RIGHT COLUMN (5 cols): OVERVIEW + USPs & METRICS + IMPACT
              =============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* BOX 1: WHAT THIS WEBSITE IS ABOUT & WHAT IT DOES */}
            <div className="group p-5 sm:p-6 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05] hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)] transition-all">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-1 group-hover:text-black/70 transition-colors">
                Strategic Overview & Purpose
              </span>
              <h4 className="font-sans text-base sm:text-lg font-bold text-[#111111] mb-2 group-hover:text-black transition-colors">
                What this platform achieves
              </h4>
              <p className="font-sans text-xs sm:text-[13px] text-black/80 leading-relaxed font-normal hover:text-black transition-colors">
                {project.whatItDoes}
              </p>
            </div>

            {/* BOX 2: KEY USPS & WHY IT STANDS OUT (Interactive Metrics) */}
            <div className="group p-5 sm:p-6 rounded-[24px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.05] hover:shadow-[0_15px_35px_-8px_rgba(0,0,0,0.08)] transition-all">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold block mb-2 group-hover:text-black/70 transition-colors">
                Key USPs • Why It Stands Out
              </span>
              <div className="flex flex-col gap-2.5">
                {project.usps.map((usp, idx) => (
                  <div
                    key={idx}
                    className="group/card p-3.5 rounded-2xl bg-[#F8F9FA] hover:bg-white border border-black/[0.04] hover:border-black/15 shadow-2xs hover:shadow-md transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-xs sm:text-[13px] font-bold text-[#111111] group-hover/card:text-black">
                        {usp.title}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white group-hover/card:bg-[#111111] group-hover/card:text-white font-mono text-[10px] font-bold text-black/80 shadow-2xs transition-colors">
                        {usp.metric}
                      </span>
                    </div>
                    <p className="font-sans text-[11px] sm:text-xs text-black/65 group-hover/card:text-black/85 font-medium leading-normal mt-1.5 transition-colors">
                      {usp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 3: COMMERCIAL IMPACT & FAST LAUNCH ACTION */}
            <div className="p-4 sm:p-5 rounded-[24px] bg-gradient-to-br from-neutral-900 to-black text-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.2)] flex flex-col justify-between gap-3">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/50 font-bold block">
                  Deployment Status
                </span>
                <p className="font-sans text-xs sm:text-sm font-semibold text-white/90 mt-1">
                  Hosted live & fully operational with sub-second asset latency.
                </p>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-sans text-xs font-bold tracking-tight transition-all hover:scale-102 cursor-pointer shadow-sm"
              >
                <span>Experience Full Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* ===================================================================
            3. BOTTOM BAR: Dismiss & Primary CTA
            =================================================================== */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-black/15 text-[#111111] hover:bg-white font-sans text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Visit Live Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
