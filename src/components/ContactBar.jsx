import React, { useState } from 'react';
import { Send, Linkedin, Mail, Phone, MessageSquare, Check, ArrowUpRight, Copy } from 'lucide-react';
import { creatorProfile } from '../data/projects';

export default function ContactBar() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    sameAsPhone: true,
    service: 'Luxury E-Commerce',
    budget: '$3k – $5k',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const services = [
    'Luxury E-Commerce',
    '3D Interactive Web Platform',
    'Athletic & Sports Platform',
    'Custom Portfolio & Web App',
    'Full Brand Identity & UI/UX',
  ];

  const budgets = [
    '$1,000 – $3,000',
    '$3,000 – $5,000',
    '$5,000 – $10,000',
    '$10,000+',
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStatusMessage('Please enter your name.');
      return;
    }
    const whatsappNum = formData.sameAsPhone ? formData.phone : formData.whatsapp;

    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Arshaan,\n\nI would like to discuss a project with you.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `WhatsApp: ${whatsappNum || 'Same as phone'}\n` +
      `Selected Service: ${formData.service}\n` +
      `Estimated Budget: ${formData.budget}\n\n` +
      `Looking forward to connecting.`
    );

    // Trigger email client
    window.location.href = `mailto:${creatorProfile.email}?subject=${subject}&body=${body}`;
    setStatusMessage('Email draft generated. You can also chat directly on WhatsApp.');
  };

  return (
    <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        
        {/* ===================================================================
            1. HORIZONTAL CONTACT FORM CHASSIS
            =================================================================== */}
        <div className="w-full bg-white/90 backdrop-blur-2xl rounded-[28px] p-3 sm:p-4 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.02)] border border-white/80 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col lg:flex-row lg:items-center gap-2.5 flex-1"
          >
            {/* Field 1: Name */}
            <div className="flex-1 min-w-[130px]">
              <label className="block text-[9px] font-mono uppercase tracking-wider text-black/40 font-bold mb-1 pl-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-black/[0.05] text-xs font-medium text-[#111111] placeholder:text-black/30 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 transition-all"
                required
              />
            </div>

            {/* Field 2: Phone Number */}
            <div className="flex-1 min-w-[130px]">
              <label className="block text-[9px] font-mono uppercase tracking-wider text-black/40 font-bold mb-1 pl-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 / +91 Mobile"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    phone: val,
                    whatsapp: prev.sameAsPhone ? val : prev.whatsapp,
                  }));
                }}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-black/[0.05] text-xs font-medium text-[#111111] placeholder:text-black/30 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 transition-all"
              />
            </div>

            {/* Field 3: WhatsApp Number */}
            <div className="flex-1 min-w-[130px]">
              <div className="flex items-center justify-between mb-1 pl-1 pr-1">
                <label className="text-[9px] font-mono uppercase tracking-wider text-black/40 font-bold">
                  WhatsApp
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      sameAsPhone: !prev.sameAsPhone,
                      whatsapp: !prev.sameAsPhone ? prev.phone : '',
                    }))
                  }
                  className="text-[9px] font-mono font-semibold text-black/50 hover:text-black underline cursor-pointer"
                >
                  {formData.sameAsPhone ? 'Same as Phone ✓' : 'Use Same'}
                </button>
              </div>
              <input
                type="tel"
                placeholder="WhatsApp Number"
                disabled={formData.sameAsPhone}
                value={formData.sameAsPhone ? formData.phone : formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F6F7F9] border border-black/[0.05] text-xs font-medium text-[#111111] placeholder:text-black/30 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 transition-all disabled:opacity-60"
              />
            </div>

            {/* Field 4: Service Select */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[9px] font-mono uppercase tracking-wider text-black/40 font-bold mb-1 pl-1">
                Target Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#F6F7F9] border border-black/[0.05] text-xs font-medium text-[#111111] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 transition-all cursor-pointer"
              >
                {services.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 5: Budget Range */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[9px] font-mono uppercase tracking-wider text-black/40 font-bold mb-1 pl-1">
                Estimated Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#F6F7F9] border border-black/[0.05] text-xs font-medium text-[#111111] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/20 transition-all cursor-pointer"
              >
                {budgets.map((b, idx) => (
                  <option key={idx} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Action */}
            <div className="shrink-0 pt-2 lg:pt-4">
              <button
                type="submit"
                className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold tracking-tight shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Submit via Email</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>

        {/* ===================================================================
            2. EMBEDDED CONTACT CHANNELS (LinkedIn, Email, WhatsApp / Number)
            =================================================================== */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold">
              Direct Channels:
            </span>

            {/* LinkedIn Embed */}
            <a
              href={creatorProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-black/80 hover:text-black font-sans text-xs font-semibold shadow-2xs border border-black/[0.06] transition-all hover:scale-102 cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-black/30 group-hover:text-black transition-colors" />
            </a>

            {/* Email Embed */}
            <div className="flex items-center gap-1">
              <a
                href={`mailto:${creatorProfile.email}`}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-black/80 hover:text-black font-sans text-xs font-semibold shadow-2xs border border-black/[0.06] transition-all hover:scale-102 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-black/70" />
                <span>{creatorProfile.email}</span>
              </a>
              <button
                onClick={() => handleCopy(creatorProfile.email, 'email')}
                title="Copy email address"
                aria-label="Copy email"
                className="p-1.5 rounded-full bg-white/80 hover:bg-white text-black/60 hover:text-black border border-black/[0.06] cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Phone / WhatsApp Embed */}
            <div className="flex items-center gap-1">
              <a
                href={`tel:${creatorProfile.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-black/80 hover:text-black font-sans text-xs font-semibold shadow-2xs border border-black/[0.06] transition-all hover:scale-102 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-black/70" />
                <span>{creatorProfile.phone}</span>
              </a>
              <a
                href={creatorProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open WhatsApp Chat"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 font-sans text-xs font-bold border border-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Telemetry / Status indicator */}
          <div className="font-mono text-[10px] text-black/40 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>EST. 2026 • 10M POINT CLOUD READY</span>
          </div>

        </div>

      </div>
    </div>
  );
}
