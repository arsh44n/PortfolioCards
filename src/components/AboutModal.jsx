import React, { useEffect } from 'react';
import { X, Mail, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { creatorProfile } from '../data/projects';

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-[32px] p-6 sm:p-8 shadow-depth-modal border border-black/10 flex flex-col justify-between my-auto select-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 border border-black/10 shrink-0">
              <img
                src="./assets/creator_avatar.png"
                onError={(e) => {
                  e.currentTarget.src = './assets/avatar_raw.jpg';
                }}
                alt={creatorProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#111111]">
                {creatorProfile.name}
              </h3>
              <p className="font-mono text-[11px] text-black/50 uppercase tracking-wider font-semibold">
                {creatorProfile.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black/70 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bio Content */}
        <div className="my-5 space-y-4">
          <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-normal">
            {creatorProfile.bio}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {creatorProfile.stats.map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#F7F7F8] border border-black/[0.05] flex flex-col"
              >
                <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest font-bold">
                  {s.label}
                </span>
                <span className="font-display font-bold text-lg text-[#111111] mt-0.5">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Core Competencies */}
          <div className="pt-2">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest font-bold block mb-2">
              Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {creatorProfile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-full bg-neutral-100 text-black/75 font-sans text-xs font-medium border border-black/[0.04]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Contact Link */}
        <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-sans text-xs text-black/50">
            <MapPin className="w-3.5 h-3.5 text-black/40" />
            <span>{creatorProfile.location}</span>
          </div>

          <a
            href="mailto:arshaan@users.noreply.github.com"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold transition-all hover:scale-103 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </div>
  );
}
