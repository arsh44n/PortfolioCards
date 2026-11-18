import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Play, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const [isInteractive, setIsInteractive] = useState(false);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      {/* MODAL CARD CONTAINER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 shadow-depth-modal border border-black/10 flex flex-col justify-between overflow-y-auto no-scrollbar my-auto select-none"
      >
        {/* ===================================================================
            1. TOP HEADER: Category + Project Title + Close Button
            =================================================================== */}
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.08] pb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-bold text-black/60 tracking-wider uppercase">
                {project.category}
              </span>
              <span className="text-black/30">•</span>
              <span className="px-2 py-0.5 rounded-full bg-black/[0.05] font-mono text-[9px] sm:text-[10px] font-semibold text-black/80">
                {project.badge}
              </span>
            </div>

            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight mt-1">
              {project.title}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-black/60 font-medium mt-1">
              {project.caption}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-2 sm:p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black/70 hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ===================================================================
            2. DESKTOP VIEWPORT SHOWCASE (16:10 Aspect Ratio with Chrome Bar)
            =================================================================== */}
        <div className="my-5 rounded-2xl overflow-hidden border border-black/10 shadow-md flex flex-col bg-neutral-900 shrink-0">
          {/* Browser Chrome Header */}
          <div className="h-7 sm:h-8 px-3 bg-[#EAEAEA] border-b border-black/10 flex items-center justify-between font-mono text-[10px] text-black/70 select-none">
            {/* macOS 3 dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-black/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-black/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-black/15" />
            </div>

            {/* Clean Domain Bar */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 bg-white rounded-md border border-black/10 font-mono text-[9px] sm:text-[10px] text-black/80 font-medium">
              <span className="text-[10px]">🔒</span>
              <span>{project.displayUrl}</span>
            </div>

            {/* Interactive Toggle Button */}
            <div className="flex items-center gap-1">
              {project.liveUrl && (
                <button
                  onClick={() => setIsInteractive((prev) => !prev)}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 ${
                    isInteractive
                      ? 'bg-[#111111] text-white'
                      : 'bg-black/5 hover:bg-black/10 text-black/70'
                  }`}
                  title={isInteractive ? 'Show High-Res Capture' : 'Interact with Live Site'}
                >
                  {isInteractive ? <Eye className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-600" />}
                  <span className="hidden sm:inline">{isInteractive ? 'Capture' : 'Live Preview'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop Frame Container */}
          <div className="relative w-full aspect-[16/10] bg-neutral-950 overflow-hidden flex items-start justify-start select-none">
            {/* Real Desktop Screenshot */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top pointer-events-none"
              loading="eager"
            />

            {/* Live Interactive Iframe (Toggled on demand) */}
            {isInteractive && project.liveUrl && (
              <div className="absolute inset-0 bg-white">
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================
            3. SPECIFICATIONS, HIGHLIGHTS & ARCHITECTURE
            =================================================================== */}
        <div className="space-y-4 my-2">
          {/* Overview Description */}
          <div>
            <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-bold mb-1">
              Architecture & Overview
            </h4>
            <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Core Functionality Highlights */}
          {project.highlights && (
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-bold mb-1.5">
                Core Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-2.5 rounded-xl bg-neutral-50 border border-black/[0.06] flex items-center gap-2 text-xs text-black/80 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          {project.techStack && (
            <div>
              <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-black/50 font-bold mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-black/60" />
                <span>Technologies</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 text-black/75 font-mono text-[10px] sm:text-[11px] font-semibold border border-black/[0.05]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
            4. BOTTOM ACTION: Visit Website Button (Direct External Link)
            (Strictly zero GitHub links)
            =================================================================== */}
        <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between gap-3 mt-4 shrink-0">
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2.5 rounded-full border border-black/15 text-[#111111] hover:bg-neutral-100 font-sans text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs sm:text-sm font-bold tracking-tight shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
