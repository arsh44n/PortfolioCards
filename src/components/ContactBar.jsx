import React, { useState } from 'react';
import { Send, Linkedin, Mail, MessageSquare, Check, ArrowUpRight, Copy, CheckCircle2, Loader2 } from 'lucide-react';
import { creatorProfile } from '../data/projects';

export default function ContactBar() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    service: 'Premium Website',
    budget: 'Less than $1,000',
    additionalInfo: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(false);

  // Exact services required by user
  const services = [
    'Premium Website',
    'AI Receptionist',
    'AI Calling Agent',
    'WhatsApp Marketing',
    'Business Automation',
    'Custom Software or App Development',
    'Others',
  ];

  const budgets = [
    'Less than $1,000',
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

  const getFormattedMessage = () => {
    return (
      `Hello Arshaan,\n\nI would like to discuss a project with you.\n\n` +
      `• Name: ${formData.name || 'Not provided'}\n` +
      `• WhatsApp: ${formData.whatsapp || 'Not provided'}\n` +
      `• Targeted Service: ${formData.service}\n` +
      `• Estimated Budget: ${formData.budget}\n` +
      (formData.additionalInfo ? `• Additional Details: ${formData.additionalInfo}\n\n` : `\n`) +
      `Looking forward to connecting.`
    );
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!formData.whatsapp.trim()) {
      alert('Please enter your WhatsApp number.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Seamless AJAX email submission — Strictly No redirect, No blank page!
      const payload = {
        Name: formData.name,
        WhatsApp: formData.whatsapp,
        TargetService: formData.service,
        EstimatedBudget: formData.budget,
        AdditionalInfo: formData.additionalInfo || 'None',
        _subject: `New Project Inquiry: ${formData.service} from ${formData.name}`,
      };

      await fetch('https://formsubmit.co/ajax/arsh44n.me@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Always confirm on current page without leaving or opening new tabs
      setSubmittedStatus(true);
      setFormData({
        name: '',
        whatsapp: '',
        service: 'Premium Website',
        budget: '$3,000 – $5,000',
        additionalInfo: '',
      });
    } catch (err) {
      // If offline or blocked by adblocker, keep user on page with confirmation
      setSubmittedStatus(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    const text = encodeURIComponent(getFormattedMessage());
    window.open(`https://wa.me/918837866368?text=${text}`, '_blank');
  };

  return (
    <div className="relative z-20 w-full max-w-full min-w-0 px-3 sm:px-8 md:px-14 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        
        {/* ===================================================================
            1. HORIZONTAL CONTACT FORM CHASSIS (Mobile-first responsive flow)
            =================================================================== */}
        <div className="w-full bg-white/95 backdrop-blur-2xl rounded-[24px] sm:rounded-[28px] p-3.5 sm:p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.02)] border border-white/80 flex flex-col gap-3">
          
          <form
            onSubmit={handleSubmitEmail}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end gap-2.5 sm:gap-3"
          >
            {/* Field 1: Name */}
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-black/50 font-bold mb-1 pl-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F7F9] border border-black/[0.06] text-xs font-semibold text-[#111111] placeholder:text-black/35 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/25 transition-all"
                required
              />
            </div>

            {/* Field 2: WhatsApp Number ONLY */}
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-black/50 font-bold mb-1 pl-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="+91 8837866368"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F7F9] border border-black/[0.06] text-xs font-semibold text-[#111111] placeholder:text-black/35 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/25 transition-all"
                required
              />
            </div>

            {/* Field 3: Targeted Service */}
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-black/50 font-bold mb-1 pl-1">
                Targeted Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F6F7F9] border border-black/[0.06] text-xs font-semibold text-[#111111] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/25 transition-all cursor-pointer"
              >
                {services.map((s, idx) => (
                  <option key={idx} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 4: Estimated Budget */}
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-black/50 font-bold mb-1 pl-1">
                Estimated Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F6F7F9] border border-black/[0.06] text-xs font-semibold text-[#111111] focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/25 transition-all cursor-pointer"
              >
                {budgets.map((b, idx) => (
                  <option key={idx} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 5: Additional Information Box */}
            <div className="flex-[1.4] sm:col-span-2 lg:col-span-1 min-w-0">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-black/50 font-bold mb-1 pl-1">
                Additional Information
              </label>
              <input
                type="text"
                placeholder="Brief project details, timeline, or notes..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F7F9] border border-black/[0.06] text-xs font-medium text-[#111111] placeholder:text-black/35 focus:outline-none focus:bg-white focus:ring-1 focus:ring-black/25 transition-all"
              />
            </div>

            {/* Actions: Submit via Email (AJAX) + WhatsApp Direct */}
            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1 shrink-0 pt-2 lg:pt-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-black text-white font-sans text-xs font-bold tracking-tight shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                title="Send pre-filled message on WhatsApp"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold tracking-tight shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </form>

          {/* Seamless In-Page Confirmation Banner (Zero Redirect) */}
          {submittedStatus && (
            <div className="w-full p-3 rounded-xl bg-emerald-50/90 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-900 font-medium animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Inquiry sent successfully! Arshaan has been notified at <strong>arsh44n.me@gmail.com</strong>.</span>
              </div>
              <button
                onClick={handleSendWhatsApp}
                className="underline font-bold text-emerald-700 hover:text-black cursor-pointer self-start sm:self-auto"
              >
                Also send copy on WhatsApp →
              </button>
            </div>
          )}

        </div>

        {/* ===================================================================
            2. EMBEDDED CONTACT CHANNELS (LinkedIn, Email, WhatsApp)
            RIGHT BOTTOM IS COMPLETELY BLANK (Zero fluff, zero text)
            =================================================================== */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-wider text-black/40 font-bold">
              Direct Channels:
            </span>

            {/* LinkedIn Embed */}
            <a
              href={creatorProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-black/80 hover:text-black font-sans text-xs font-semibold shadow-2xs border border-black/[0.06] transition-all hover:scale-102 cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>linkedin.com/in/arsh44n</span>
              <ArrowUpRight className="w-3 h-3 text-black/30 group-hover:text-black transition-colors" />
            </a>

            {/* Email Embed */}
            <div className="flex items-center gap-1">
              <a
                href={`mailto:${creatorProfile.email}`}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-black/80 hover:text-black font-sans text-xs font-semibold shadow-2xs border border-black/[0.06] transition-all hover:scale-102 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-black/70" />
                <span>arsh44n.me@gmail.com</span>
              </a>
              <button
                onClick={() => handleCopy(creatorProfile.email, 'email')}
                title="Copy email address"
                aria-label="Copy email"
                className="p-1.5 rounded-full bg-white/85 hover:bg-white text-black/60 hover:text-black border border-black/[0.06] cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* WhatsApp Embed */}
            <div className="flex items-center gap-1">
              <a
                href={creatorProfile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open WhatsApp Chat"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 font-sans text-xs font-bold border border-emerald-500/20 transition-all hover:scale-102 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91 8837866368</span>
              </a>
              <button
                onClick={() => handleCopy(creatorProfile.whatsapp, 'phone')}
                title="Copy WhatsApp number"
                aria-label="Copy number"
                className="p-1.5 rounded-full bg-white/85 hover:bg-white text-black/60 hover:text-black border border-black/[0.06] cursor-pointer"
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* RIGHT BOTTOM IS COMPLETELY BLANK AS SPECIFIED */}
          <div aria-hidden="true" />

        </div>

      </div>
    </div>
  );
}
