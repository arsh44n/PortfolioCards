# Metaminds Studio: Comprehensive Engineering & Architectural Deep Dive

**Target URL:** `https://www.metaminds.studio/ai-mumbai`  
**Archetype:** Cybernetic Luxury / Deep Tech B2B Agency  
**Target Audience:** Enterprise founders, CTOs, and global innovators seeking AI automation & intelligent web development.

---

## 1. Executive Summary & Tech Stack Overview

Metaminds Studio achieves its ultra-premium aesthetic not through complex WebGL/Three.js 3D shaders, but through **masterful DOM composition, modern CSS hardware-accelerated transforms, high-performance typography choreography, and carefully layered ambient lighting**.

### Verified Runtime Stack
- **Smooth Inertial Scrolling:** Lenis (`lenis-smooth` / `@studio-freight/lenis`) running on `requestAnimationFrame` for buttery smooth mouse wheel momentum.
- **Scroll Choreography:** GreenSock `GSAP 3.11.3` + `ScrollTrigger 3.11.3` managing pinned sections, scrubbed progress indicators, and text reveal timelines.
- **Typography Splitting:** `SplitType` (`split-type.js`) for character and word node splitting without layout shift.
- **Dynamic Touch/Snap Sliders:** `Swiper 11` configured with `slidesPerView: "auto"` for viewport-proportional `30vw` cards.
- **Micro-Lottie Animations:** `@dotlottie/player-component@2.7.12` for compressed vector icons (phone, glowing orb, FAQ chevrons).
- **Video Orchestration:** Native HTML5 `<video>` for background looping ambient textures + Vimeo Player API for multi-video interactive modals.
- **Webflow Engine:** Base CMS/layout grid running Webflow CSS utility architecture (`.w-nav`, `.w-tab`, `.container-large`).

---

## 2. Spatial Grid & Page Hierarchy

The page is architected into 14 distinct functional zones:

| Section | ID / Class | Key Visual & Interactive Mechanics |
|---|---|---|
| **0. Global Ambient** | `.whatsappp-wrap`, `.global-styles` | Floating frosted glass WhatsApp CTA pill (`bottom-right`, `z-index: 100`) + Lenis scroll container |
| **1. Floating Capsule Nav** | `.navbarr.w-nav` | Centered floating pill with `backdrop-filter: blur(10px)`, `border: 1px solid rgba(255,255,255,0.08)`, and logo |
| **2. Hero Section** | `#sechero`, `.section_hero` | Right-anchored high-res 3D smartphone video, left-anchored clamped typography (`min(9.74vh, 4.75rem)`), `Global` badge, and enterprise logo trust strip |
| **3. Interactive Mouse Spotlight** | `.interactive-section.is-hero` | Real-time mouse position tracking (`--x`, `--y`) driving a 650px radial gradient glow |
| **4. About Mission** | `#sec-about`, `.about_sction-wrap` | SplitType word-by-word slide-in typography stagger with power2 ease |
| **5. AI Capabilities & Features** | `#sec-services`, `.section_h-features` | Glowing gradient border cards (`.glowing-wrapper`) with multi-stop neon outlines |
| **6. 3-Month AI Roadmap** | `#sec-what-we-do`, `.work-section_wrap` | Automated rotating tabbed system (`setupTabLoop`) with 5000ms interval and IntersectionObserver pause |
| **7. Process Timeline** | `#sec-timeline`, `.section-timeline--mumbai` | Pinned sticky scroll (`position: sticky; top: 3.75rem`), vertical progress line with dashed connectors and step counter pills |
| **8. Portfolio Work Showcase** | `#our-work`, `.section_our-work` | Swiper 11 carousel with `30vw` cards, snapping physics, and video thumbnail modal triggers |
| **9. Why Us Bento Grid** | `#sec-why-us`, `.section_why-us` | Asymmetric bento cards with neon purple/magenta back-glow and metallic silver headings |
| **10. Video Testimonials** | `#sec-testimonal`, `.section_testimonial-text` | Swiper slider (`.slider-two`) featuring verified video interviews and client quotes |
| **11. Commercial Engagement Models** | `.section-engagement-model` | Transparent agency pricing tiers and pod deployment breakdown |
| **12. High-Impact CTA** | `#sec-cta`, `.section_cta` | Full-viewport interactive spotlight card with metallic chrome headline |
| **13. FAQ Accordion** | `#sec-faqs`, `.section_faqs` | Minimalist border-bottom expandable accordion with Lottie rotation and schema markup |
| **14. Infinite Marquee Footer** | `#sec-footer`, `.footer_wrapper.less` | Oversized 128px typography marquee ("Talk to an expert!") looping continuously |

---

## 3. Lighting, Atmosphere & Glow Formulas

The secret to why this design feels so distinct from generic dark-mode websites is **ambient back-lighting and gradient perimeter masking**.

### 1. Dual Accent Color Tension
Generic sites use a single blue or purple. Metaminds pairs **Electric Indigo (`#373782` / `#6d6dff`)** with **Cyber Magenta (`#ff00e5`)**:
```css
/* Ambient Card Glow */
background: linear-gradient(
  153deg,
  rgba(255, 0, 229, 0.75) 0%,
  rgba(14, 16, 15, 0.8) 24%,
  rgba(0, 0, 0, 1) 50%,
  rgba(52, 24, 206, 0.8) 75%,
  rgba(0, 240, 255, 0.6) 100%
);
```

### 2. The 1px Glowing Border Technique
Instead of standard `border: 1px solid #333`, cards utilize an inset gradient mask:
```css
.card-border-glow {
  position: relative;
  border-radius: 20px;
  background: #0d0f18;
}
.card-border-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 21px;
  background: linear-gradient(135deg, rgba(255,0,229,0.5), transparent 40%, rgba(109,109,255,0.6));
  z-index: -1;
}
```

### 3. Mouse-Following Interactive Spotlight
The JavaScript updates CSS variables on mouse move:
```javascript
section.addEventListener('mousemove', (e) => {
  const rect = section.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  bgElement.style.setProperty('--x', `${x}%`);
  bgElement.style.setProperty('--y', `${y}%`);
  bgElement.style.opacity = '1';
});
```
Rendered in CSS via:
```css
.interactive-bg {
  background: radial-gradient(
    650px circle at var(--x, 50%) var(--y, 50%),
    rgba(109, 109, 255, 0.18),
    rgba(255, 0, 229, 0.05) 40%,
    transparent 70%
  );
}
```

---

## 4. Typography Choreography & SplitType GSAP Pipeline

### Viewport Height Clamping Formula
To ensure headlines never overflow on shorter laptops (e.g. MacBook Air 13" with 800px vertical height), titles use `min()` viewport height formulas:
```css
.heading-hero {
  font-size: min(9.74vh, 4.75rem); /* Clamps dynamically to viewport height */
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 600;
}
```

### Word Stagger Entrance
```javascript
let typeSplit = new SplitType("[text-split]", {
  types: "words, chars",
  tagName: "span"
});

$("[words-slide-from-right]").each(function () {
  let tl = gsap.timeline({ paused: true });
  tl.from($(this).find(".word"), {
    opacity: 0,
    x: "1em",
    duration: 0.6,
    ease: "power2.out",
    stagger: { amount: 0.25 }
  });

  ScrollTrigger.create({
    trigger: this,
    start: "top 75%",
    once: true,
    onEnter: () => tl.play()
  });
});
```

---

## 5. Enterprise B2B Lead Sanitization & Gate

Metaminds prevents spam and low-quality consumer leads directly in the browser:
1. **Contact Number Whitelist**: Cleans non-digits on input and limits length to 10 digits (`value.replace(/\D/g, '').slice(0, 10)`).
2. **Name Field Regex**: Restricts characters to standard alphabet and hyphens (`value.replace(/[^a-zA-Z\s'-]/g, '')`).
3. **Consumer Email Gate**: Submissions with `@gmail.com`, `@hotmail.com`, `@yahoo.com`, or `@rediffmail.com` are blocked, immediately triggering `#customSalesPopup` prompting the prospect to submit a corporate email.
