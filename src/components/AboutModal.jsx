import React, { useEffect, useState } from 'react';
import { X, Mail, Phone, MessageSquare, Linkedin, ArrowUpRight, Copy, Check, Sparkles, MapPin } from 'lucide-react';
import { creatorProfile } from '../data/projects';

export default function AboutModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/45 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-3xl rounded-[36px] p-6 sm:p-8 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.8)] border border-white/80 flex flex-col justify-between my-auto select-none overflow-hidden"
      >
        {/* ===================================================================
            1. HEADER & CLOSE
            =================================================================== */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold tracking-wider text-black/60 uppercase">
              Creator Profile & Connect
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black/70 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ===================================================================
            2. REAL PHOTO BANNER & PITCH HEADLINE
            =================================================================== */}
        <div className="my-4 space-y-4">
          
          {/* Real Photo Card */}
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm border border-black/[0.06]">
            <img
              src="./assets/arshaan_profile.png"
              onError={(e) => {
                e.currentTarget.src = './assets/arshaan_profile_sq.png';
              }}
              alt="Arshaan"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md font-sans text-xs font-black text-[#111111]">
                Arshaan Khan
              </span>
              <span className="font-mono text-[10px] text-white/90 font-medium">
                Frontend Architect
              </span>
            </div>
          </div>

          {/* EXACT REQUESTED PITCH QUOTE WITH EXPLICIT 3-LINE BREAKS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FA] border border-black/[0.05] shadow-2xs">
            <div className="font-sans text-sm sm:text-base md:text-lg font-black text-[#111111] leading-snug flex flex-col gap-1">
              <span className="text-black/60 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider">
                Hey,
              </span>
              <span className="text-[#111111] text-base sm:text-lg font-black leading-snug">
                Are you looking for a high-end premium website for your business with immersive experience?
              </span>
              <span className="text-emerald-700 font-extrabold underline decoration-emerald-500/40 underline-offset-4 pt-0.5">
                Let's connect.
              </span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 gap-2">
            {creatorProfile.stats.map((s, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-black/[0.05] shadow-2xs flex flex-col"
              >
                <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest font-bold">
                  {s.label}
                </span>
                <span className="font-display font-bold text-base text-[#111111] mt-0.5">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* ===============================================================
              3. CONTACT INFO (WhatsApp, Email, LinkedIn)
              =============================================================== */}
          <div className="pt-2 space-y-2">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-bold block">
              Direct Contact Channels
            </span>

            {/* WhatsApp Direct */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 border border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase font-bold text-emerald-800">
                    WhatsApp (Fastest Response)
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-extrabold text-black">
                    {creatorProfile.whatsapp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(creatorProfile.whatsapp, 'phone')}
                  className="p-2 rounded-lg bg-white/90 hover:bg-white text-black/70 hover:text-black border border-black/10 transition-colors cursor-pointer"
                  title="Copy number"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={creatorProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Chat Now ↗
                </a>
              </div>
            </div>

            {/* Email Direct */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase font-bold text-black/40">
                    Email Inquiries
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-extrabold text-black">
                    {creatorProfile.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(creatorProfile.email, 'email')}
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black/70 hover:text-black transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={`mailto:${creatorProfile.email}`}
                  className="px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Send Email ↗
                </a>
              </div>
            </div>

            {/* LinkedIn Direct */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/[0.06] shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase font-bold text-black/40">
                    Professional Network
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-extrabold text-black">
                    linkedin.com/in/arsh44n
                  </span>
                </div>
              </div>

              <a
                href={creatorProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Connect ↗
              </a>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-sans text-xs text-black/50">
            <MapPin className="w-3.5 h-3.5 text-black/40" />
            <span>{creatorProfile.location}</span>
          </div>

          <a
            href={creatorProfile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold transition-all hover:scale-103 cursor-pointer shadow-md"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
