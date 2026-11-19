import React, { useEffect, useState, useRef } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Monitor,
  ArrowUpRight,
  Cpu,
  Layers,
  Zap,
  Activity,
  Maximize2,
  Minimize2,
  RotateCw,
  Eye,
  Check
} from 'lucide-react';
import WordByWordText from './WordByWordText';

export default function ProjectModal({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(760);
  const [activeUspIndex, setActiveUspIndex] = useState(0);
  const [activeTech, setActiveTech] = useState(null);
  const [completedFeats, setCompletedFeats] = useState({});
  const [iframeKey, setIframeKey] = useState(0);

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
  const scaledHeight = Math.max(220, desktopHeight * scaleRatio);

  const toggleFeat = (index) => {
    setCompletedFeats((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReloadIframe = () => {
    setIframeLoaded(false);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/50 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      {/* FLOATING NEOMORPHIC CHASSIS (Mobile-First Responsive) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl max-h-[94vh] bg-[#F8F9FA]/95 backdrop-blur-3xl rounded-[28px] sm:rounded-[36px] md:rounded-[44px] p-4 sm:p-6 md:p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.9)] border border-white/80 flex flex-col justify-between overflow-y-auto no-scrollbar my-auto select-none"
      >
        {/* ===================================================================
            1. TOP CHASSIS BAR: Category + Title + Live CTA + Close
            =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white font-mono text-[10px] sm:text-xs font-bold text-black/80 shadow-2xs border border-black/[0.04] hover:bg-black hover:text-white transition-all cursor-default">
                {project.category}
              </span>
              <span className="text-black/30">•</span>
              <span className="font-mono text-[10px] sm:text-xs text-black/50 font-medium hover:text-black transition-colors cursor-default">
                {project.industry}
              </span>
            </div>

            <h2 className="group font-sans text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] tracking-tight mt-1 transition-all duration-300 cursor-default">
              <WordByWordText
                text={project.title}
                wordClassName="animate-shimmer-text hover:brightness-125 transition-all"
                stagger={0.07}
              />
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-auto">
            {/* Direct Visit Website Button in Header */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-neutral-100 text-black/70 hover:text-black shadow-xs border border-black/[0.06] transition-all cursor-pointer shrink-0 hover:rotate-90 duration-200"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ===================================================================
            2. BALANCED BENTO GRID: INTERACTIVE INTERNAL CARDS
            - Left Column: Desktop Preview (Top) + Engineering Deliverables & Tech Stack (Bottom)
            - Right Column: Overview + Key USPs Metrics Grid + Fast Launch Specs
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 my-4 items-start">
          
          {/* ===============================================================
              LEFT COLUMN (7 cols): PREVIEW + SECTIONS ALIGNED UNDERNEATH
              =============================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* 2A: DESKTOP MODE WEBSITE PREVIEW (No Domain Exposed) */}
            <div className="w-full rounded-[22px] sm:rounded-[28px] overflow-hidden bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] border border-black/[0.06] flex flex-col transition-all duration-300 hover:shadow-[0_22px_50px_-10px_rgba(0,0,0,0.12)]">
              
              {/* macOS Header Bar (Interactive Window Controls) */}
              <div className="h-8.5 px-3.5 bg-[#F0F1F3] border-b border-black/[0.08] flex items-center justify-between font-mono text-[10px] text-black/70 shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    title="Close preview"
                    className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/10 hover:opacity-85 transition-opacity cursor-pointer"
                  />
                  <button
                    onClick={handleReloadIframe}
                    title="Reload site"
                    className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/10 hover:opacity-85 transition-opacity cursor-pointer"
                  />
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open full page"
                    className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/10 hover:opacity-85 transition-opacity cursor-pointer inline-block"
                  />
                </div>

                {/* Desktop Mode indicator pill (NO domain or URL exposed) */}
                <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 bg-white rounded-md border border-black/10 font-mono text-[9px] text-black/70 font-semibold shadow-2xs">
                  <Monitor className="w-2.5 h-2.5 text-black/50" />
                  <span>DESKTOP VIEWPORT • 1280×800</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReloadIframe}
                    title="Refresh connection"
                    className="p-1 rounded hover:bg-black/5 text-black/50 hover:text-black transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-2.5 h-2.5" />
                  </button>

                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[9px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="hidden sm:inline">LIVE INTERACTION</span>
                    <span className="sm:hidden">LIVE</span>
                  </span>
                </div>
              </div>

              {/* LIVE SCALED DESKTOP VIEWPORT (1280x800 Scaled Smoothly) */}
              <div
                ref={containerRef}
                style={{ height: `${scaledHeight}px` }}
                className="relative w-full bg-neutral-950 overflow-hidden select-auto transition-all"
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
                    key={iframeKey}
                    src={project.previewUrl || project.liveUrl}
                    title={project.title}
                    style={{ width: `${desktopWidth}px`, height: `${desktopHeight}px` }}
                    className="border-0 bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Helper Subtext with Hover Glow */}
            <div className="flex items-center justify-between px-1 text-black/45 font-mono text-[10px]">
              <span className="hover:text-black transition-colors cursor-default flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Full 1:1 Desktop Resolution • Scroll & Click Active</span>
              </span>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black flex items-center gap-0.5 transition-colors font-semibold"
              >
                <span>Open in dedicated tab</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* =============================================================
                2B: SECTIONS ALIGNED UNDER PREVIEW (Interactive Internal Cards)
                Engineering Deliverables & Tech Stack Grid
                ============================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* CARD 1: ARCHITECTURE & ENGINEERING DELIVERABLES */}
              <div className="group p-5 rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.06] hover:border-black/15 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-black/45 font-bold flex items-center gap-1.5 group-hover:text-black transition-colors">
                    <Layers className="w-3.5 h-3.5 text-black/50 group-hover:text-black transition-colors" />
                    <span>Engineering Deliverables</span>
                  </span>
                  <span className="font-mono text-[9px] font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2">
                  {project.whatWeDid.map((item, i) => {
                    const isChecked = completedFeats[i] ?? true;
                    return (
                      <div
                        key={i}
                        onClick={() => toggleFeat(i)}
                        className={`flex items-start gap-2.5 text-xs font-medium p-2 rounded-xl transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#F9FAFB] hover:bg-[#F3F4F6] text-black/85'
                            : 'bg-black/[0.02] text-black/40 line-through'
                        } hover:translate-x-1 hover:shadow-2xs`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isChecked
                              ? 'bg-emerald-600 text-white shadow-2xs scale-100'
                              : 'bg-black/10 text-black/30 scale-90'
                          }`}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug transition-colors group-hover:text-black">
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CARD 2: TECHNOLOGIES EMPLOYED & SYSTEM SPECS */}
              <div className="group p-5 rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.06] hover:border-black/15 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/45 font-bold flex items-center gap-1.5 group-hover:text-black transition-colors">
                      <Cpu className="w-3.5 h-3.5 text-black/50 group-hover:text-black transition-colors" />
                      <span>Technologies Employed</span>
                    </span>
                    <span className="font-mono text-[9px] font-bold text-black/40">
                      {project.techStack.length} MODULES
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <button
                        key={i}
                        onMouseEnter={() => setActiveTech(tech)}
                        onMouseLeave={() => setActiveTech(null)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[10px] sm:text-[11px] font-semibold border transition-all duration-200 cursor-pointer ${
                          activeTech === tech
                            ? 'bg-[#111111] text-white border-black scale-105 shadow-xs'
                            : 'bg-[#F4F5F7] hover:bg-[#EAECEF] text-black/75 border-black/[0.04]'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>

                  {activeTech && (
                    <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 font-mono text-[10px] animate-in fade-in duration-150">
                      Active Module: <strong>{activeTech}</strong> • Optimized for zero CLS
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between font-mono text-[10px] text-black/50">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-emerald-600 animate-pulse" />
                    <span>ZERO RUNTIME LAG</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    SUB-SECOND FCP
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ===============================================================
              RIGHT COLUMN (5 cols): OVERVIEW + INTERACTIVE USPs & METRICS
              =============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* CARD 3: STRATEGIC OVERVIEW & PURPOSE */}
            <div className="group p-5 sm:p-6 rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.06] hover:border-black/15 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
              <span className="font-mono text-[10px] uppercase tracking-wider text-black/45 font-bold block mb-1.5 group-hover:text-black transition-colors">
                Strategic Overview & Purpose
              </span>
              <h4 className="font-sans text-base sm:text-lg font-bold text-[#111111] mb-2 leading-snug">
                <span className="animate-shimmer-text">
                  What this platform achieves
                </span>
              </h4>
              <WordByWordText
                text={project.whatItDoes}
                wordClassName="font-sans text-xs sm:text-[13px] text-black/80 leading-relaxed font-normal hover:text-black transition-colors"
                stagger={0.03}
              />
            </div>

            {/* CARD 4: KEY USPS & WHY IT STANDS OUT (Deeply Interactive) */}
            <div className="group p-5 sm:p-6 rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-black/[0.06] hover:border-black/15 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-black/45 font-bold flex items-center gap-1.5 group-hover:text-black transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-black/50 group-hover:text-emerald-600 transition-colors" />
                  <span>Key USPs • Why It Stands Out</span>
                </span>
                <span className="font-mono text-[9px] text-black/40">
                  TAP TO INSPECT
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {project.usps.map((usp, idx) => {
                  const isActive = activeUspIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveUspIndex(idx)}
                      onMouseEnter={() => setActiveUspIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#111111] text-white border-black shadow-md -translate-y-0.5'
                          : 'bg-[#F8F9FA] hover:bg-white text-black/80 border-black/[0.04] hover:border-black/15 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-sans text-xs sm:text-[13px] font-bold transition-colors ${
                          isActive ? 'text-white' : 'text-[#111111]'
                        }`}>
                          {usp.title}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold shadow-2xs transition-all ${
                          isActive
                            ? 'bg-emerald-500 text-white scale-105'
                            : 'bg-white text-black/80 border border-black/[0.06]'
                        }`}>
                          {usp.metric}
                        </span>
                      </div>
                      <p className={`font-sans text-[11px] sm:text-xs font-medium leading-normal mt-1.5 transition-colors ${
                        isActive ? 'text-white/80' : 'text-black/65'
                      }`}>
                        {usp.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 5: FAST LAUNCH ACTION & LIVE STATUS */}
            <div className="p-4 sm:p-5 rounded-[22px] sm:rounded-[26px] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.3)] flex flex-col justify-between gap-3.5 border border-white/10 hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold">
                    DEPLOYMENT TELEMETRY
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm font-semibold text-white/95 mt-1.5 leading-snug">
                  Production ready, hosted on high-velocity global CDN with zero layout shifts.
                </p>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-black font-sans text-xs sm:text-sm font-bold tracking-tight transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-md"
              >
                <span>Experience Full Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* ===================================================================
            3. BOTTOM BAR: Dismiss & Primary CTA (Mobile Friendly)
            =================================================================== */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 sm:py-2.5 rounded-full border border-black/15 text-[#111111] hover:bg-white font-sans text-xs sm:text-sm font-semibold transition-all hover:border-black cursor-pointer"
          >
            Close
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Visit Live Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
