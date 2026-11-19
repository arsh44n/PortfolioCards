# Metaminds Animation & Interaction Patterns Guide

This document provides production-ready code, configurations, and lifecycle rules for every interactive and animated component on the Metaminds website.

---

## Pattern 1: Lenis Smooth Inertial Scrolling

Lenis provides frictionless wheel momentum without compromising native scroll accessibility.

### Installation / CDN
```html
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
```

### Setup & GSAP ScrollTrigger Synchronization
```javascript
// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
});

// Sync Lenis scroll with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

---

## Pattern 2: Interactive Mouse Spotlight Tracker

Reactivity follows cursor coordinates over sections with `.interactive-section`.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const interactiveSections = document.querySelectorAll('.interactive-section');

  interactiveSections.forEach(section => {
    const bgElement = section.querySelector('.interactive-bg');
    if (!bgElement) return;

    let rafId = null;

    section.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 100;

        bgElement.style.setProperty('--x', `${relX.toFixed(2)}%`);
        bgElement.style.setProperty('--y', `${relY.toFixed(2)}%`);
        bgElement.style.opacity = '1';
      });
    });

    section.addEventListener('mouseleave', () => {
      bgElement.style.opacity = '0';
    });
  });
});
```

---

## Pattern 3: SplitType + GSAP Text Reveal Pipeline

Splits headers into `.word` spans and animates them on scroll trigger.

```html
<h2 class="heading-split" text-split words-slide-from-right>
  With an in-house team of AI developers and machine learning specialists.
</h2>
```

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // 1. Split text elements
  const typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // 2. Animate elements with words-slide-from-right
  document.querySelectorAll("[words-slide-from-right]").forEach(el => {
    const words = el.querySelectorAll(".word");
    
    gsap.set(words, { opacity: 0, x: "1.2em" });

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          x: "0em",
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.03
        });
      }
    });
  });
});
```

---

## Pattern 4: Pinned Sticky Process Timeline

The timeline is pinned while cards scroll sequentially on the right side.

```javascript
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: ".section-timeline--mumbai",
  start: "top top",
  end: "bottom bottom",
  pin: ".sticky-sec.h-timeline",
  pinSpacing: false
});

// Animate timeline steps as they scroll into view
document.querySelectorAll(".timeline__content-3").forEach((step, idx) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top center",
    end: "bottom center",
    onEnter: () => activateStep(idx),
    onEnterBack: () => activateStep(idx)
  });
});

function activateStep(idx) {
  document.querySelectorAll(".timeline__content-3").forEach((s, i) => {
    s.classList.toggle("is-active", i === idx);
  });
}
```

---

## Pattern 5: Swiper 11 Auto-Width Snap Showcase

```javascript
const workSlider = new Swiper('.slider-three', {
  wrapperClass: 'swiper-wrapper-2',
  slideClass: 'swiper-slide-sa',
  slidesPerView: "auto",      // Crucial: allows CSS 30vw to dictate width
  spaceBetween: 24,
  loop: true,
  speed: 700,
  centeredSlides: false,
  watchSlidesProgress: true,
  keyboard: { enabled: true },
  navigation: {
    nextEl: '.slider-three-next',
    prevEl: '.slider-three-prev',
  },
  pagination: {
    el: '.slider-three-pagination',
    clickable: true,
  }
});
```

---

## Pattern 6: Auto-Cycling Interactive Tabs

```javascript
function initAutoTabLoop(tabsMenuSelector, tabBtnSelector, intervalMs = 5000, containerSelector = null) {
  let timer = null;
  let isVisible = true;

  function clickNextTab() {
    if (!isVisible) return;
    const menu = document.querySelector(tabsMenuSelector);
    if (!menu) return;
    const current = menu.querySelector('.w--current') || menu.children[0];
    const next = current.nextElementSibling || menu.children[0];
    if (next) next.click();
    startLoop();
  }

  function startLoop() {
    clearTimeout(timer);
    timer = setTimeout(clickNextTab, intervalMs);
  }

  function stopLoop() {
    clearTimeout(timer);
  }

  if (containerSelector) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) startLoop();
      else stopLoop();
    }, { threshold: 0.5 });

    const container = document.querySelector(containerSelector);
    if (container) observer.observe(container);
  } else {
    startLoop();
  }

  // Reset timer on manual click
  document.querySelectorAll(tabBtnSelector).forEach(btn => {
    btn.addEventListener('click', () => {
      startLoop();
    });
  });
}
```

---

## Pattern 7: Infinite Smooth Marquee Ticker

```html
<div class="footer_cta">
  <div class="marquee-track">
    <div class="marquee-content">
      <span>TALK TO AN EXPERT! • </span>
      <span>TALK TO AN EXPERT! • </span>
      <span>TALK TO AN EXPERT! • </span>
    </div>
    <div class="marquee-content" aria-hidden="true">
      <span>TALK TO AN EXPERT! • </span>
      <span>TALK TO AN EXPERT! • </span>
      <span>TALK TO AN EXPERT! • </span>
    </div>
  </div>
</div>
```

```css
.footer_cta {
  overflow: hidden;
  position: relative;
  width: 100%;
}

.marquee-track {
  display: flex;
  width: max-content;
}

.marquee-content {
  display: flex;
  white-space: nowrap;
  animation: marquee-anim 28s linear infinite;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(48px, 9vw, 128px);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
}

@keyframes marquee-anim {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track:hover .marquee-content {
  animation-play-state: paused;
}
```

---

## Pattern 8: Sticky Scroll Scale & Flythrough Project Grid (`.work-section_wrap`)

One of the signature visual moments on the Metaminds website is the **cinematic scroll zoom grid**:
1. The parent container (`.work-section_wrap`) is set to an expanded height (`~200vh` to `2200px`).
2. The inner stage (`.section_h-work`) is locked to `position: sticky; top: 0; height: 100vh; overflow: hidden;`.
3. As the user scrolls through the 2000px distance:
   - A multi-column project showcase grid scales down from `scale3d(1.6, 1.6, 1)` to `scale3d(1.0, 1.0, 1)`.
   - A frosted blur vignette (`.work_blur-wrap`) translates down (`translate3d(0, 30vh, 0)`) and fades (`opacity: 1 -> 0`).
   - The effect feels like a smooth camera dolly zooming into the work gallery.

### Implementation Blueprint
```html
<div class="scroll-zoom-parent">
  <div class="scroll-zoom-stage">
    <div class="zoom-grid" id="zoomGrid">
      <div class="grid-col"><img src="project1.jpg"><img src="project2.jpg"></div>
      <div class="grid-col"><img src="project3.jpg"><img src="project4.jpg"></div>
      <div class="grid-col"><img src="project5.jpg"><img src="project6.jpg"></div>
    </div>
    <div class="zoom-blur-overlay" id="zoomOverlay"></div>
  </div>
</div>
```

```javascript
gsap.registerPlugin(ScrollTrigger);

const zoomTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-zoom-parent",
    start: "top top",
    end: "bottom bottom",
    scrub: 1, // smooth scrub lagging slightly behind scroll
    pin: true
  }
});

zoomTl
  .fromTo("#zoomGrid", 
    { scale: 1.6 }, 
    { scale: 1.0, ease: "none" }
  )
  .fromTo("#zoomOverlay", 
    { opacity: 1, y: 0 }, 
    { opacity: 0, y: "25vh", ease: "none" }, 
    0
  );
```
