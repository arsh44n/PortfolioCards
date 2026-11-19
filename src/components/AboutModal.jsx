import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Linkedin,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Activity,
  Flame
} from 'lucide-react';
import { creatorProfile } from '../data/projects';
import WordByWordText from './WordByWordText';

export default function AboutModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [liveProjectCount, setLiveProjectCount] = useState(1);

  // Live encounter counter animation for projects count (counting up to 14+)
  useEffect(() => {
    if (!isOpen) {
      setLiveProjectCount(1);
      return;
    }
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current >= 14) {
        setLiveProjectCount(14);
        clearInterval(interval);
      } else {
        setLiveProjectCount(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isOpen]);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/50 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[36px] p-5 sm:p-7 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.25)] border border-white/80 overflow-hidden my-auto select-none"
      >
        {/* ===================================================================
            1. TOP HEADER: Status Beacon + Title + Close
            =================================================================== */}
        <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/50 font-bold">
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
            2. REAL PHOTO BANNER — FILLS OUT THE BOX COMPLETELY (No Black Bars)
            =================================================================== */}
        <div className="my-4 space-y-4">
          
          {/* Real Photo Card - Fills out edge-to-edge */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm border border-black/[0.06] group">
            <img
              src="./assets/arshaan_profile.png"
              onError={(e) => {
                e.currentTarget.src = './assets/arshaan_profile_sq.png';
              }}
              alt="Arshaan"
              className="w-full h-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
            />
            {/* Ambient Gradient & Identification Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md font-sans text-xs font-black text-[#111111] shadow-2xs">
                Arshaan Khan
              </span>
              <span className="font-sans text-[11px] text-white/95 font-semibold">
                Frontend Architect
              </span>
            </div>
            
            {/* Live Encounter Status Tag */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ACTIVE NOW</span>
            </div>
          </div>

          {/* ===================================================================
              3. CONNECTION MESSAGE IN EXACT SAME FONT WITH GREEN "LET'S CONNECT."
              =================================================================== */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FA] border border-black/[0.05] shadow-2xs">
            <div className="font-sans text-sm sm:text-base md:text-lg font-black text-[#111111] leading-snug flex flex-col gap-1.5">
              <span className="text-black/60 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider">
                Hey,
              </span>
              <span className="text-[#111111] text-base sm:text-lg font-black leading-snug font-sans">
                Are you looking for a high-end premium website for your business with immersive experience?
              </span>
              <span className="text-emerald-500 font-extrabold underline decoration-emerald-500/40 underline-offset-4 pt-0.5 font-sans">
                Let's connect.
              </span>
            </div>
          </div>

          {/* ===================================================================
              4. LIVE ENCOUNTER METRICS (Dynamic Live Counter Numbers)
              =================================================================== */}
          <div className="grid grid-cols-2 gap-2.5">
            
            {/* Metric 1: Published Projects (Live Counter to 14+) */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between hover:border-black/15 transition-all">
              <span className="font-mono text-[9px] text-black/45 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>PUBLISHED PROJECTS</span>
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-sans font-black text-xl sm:text-2xl text-[#111111]">
                  {liveProjectCount}+
                </span>
                <span className="font-mono text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  LIVE
                </span>
              </div>
            </div>

            {/* Metric 2: Frame Rate Target */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between hover:border-black/15 transition-all">
              <span className="font-mono text-[9px] text-black/45 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Zap className="w-2.5 h-2.5 text-amber-500" />
                <span>FRAME RATE TARGET</span>
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-sans font-black text-xl sm:text-2xl text-[#111111]">
                  120 FPS
                </span>
                <span className="font-mono text-[9px] text-black/40 font-semibold">
                  KINETIC
                </span>
              </div>
            </div>

            {/* Metric 3: Client Reach */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between hover:border-black/15 transition-all">
              <span className="font-mono text-[9px] text-black/45 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Activity className="w-2.5 h-2.5 text-blue-500" />
                <span>CLIENT REACH</span>
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-sans font-black text-xl sm:text-2xl text-[#111111]">
                  GLOBAL
                </span>
                <span className="font-mono text-[9px] text-blue-700 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                  REMOTE
                </span>
              </div>
            </div>

            {/* Metric 4: Commissions Status */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-black/[0.06] shadow-2xs flex flex-col justify-between hover:border-black/15 transition-all">
              <span className="font-mono text-[9px] text-black/45 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Flame className="w-2.5 h-2.5 text-emerald-500" />
                <span>COMMISSIONS</span>
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-sans font-black text-xl sm:text-2xl text-emerald-600">
                  OPEN
                </span>
                <span className="font-mono text-[9px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Q1/Q2
                </span>
              </div>
            </div>

          </div>

          {/* ===============================================================
              5. DIRECT CONTACT CHANNELS (Minimal & Elegant)
              =============================================================== */}
          <div className="pt-1 space-y-2">
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-wider font-bold block">
              Direct Contact Channels
            </span>

            {/* WhatsApp Direct */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
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
                  className="p-2 rounded-lg bg-white hover:bg-neutral-50 text-black/70 hover:text-black border border-black/10 transition-colors cursor-pointer shadow-2xs"
                  title="Copy number"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <a
                  href={creatorProfile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
                >
                  Chat Now ↗
                </a>
              </div>
            </div>

            {/* Email Direct */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/15 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs">
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
                  className="px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
                >
                  Send Email ↗
                </a>
              </div>
            </div>

            {/* LinkedIn Direct */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/15 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-xs">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase font-bold text-black/40">
                    Professional Network
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-extrabold text-black">
                    {creatorProfile.linkedinDisplay}
                  </span>
                </div>
              </div>

              <a
                href={creatorProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-sans text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-102"
              >
                Connect ↗
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
