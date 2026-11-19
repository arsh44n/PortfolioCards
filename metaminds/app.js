/**
 * METAMINDS CYBERNETIC DARK LUXURY ENGINE - RUNTIME ENGINE (v2.0)
 * Integrating patterns from town-team & capsule:
 * 1. Dual-curtain luxury preloader with percentage counter & hero entrance
 * 2. 120 FPS custom follower cursor with contextual magnetic tags (VIEW, DRAG, START, CHAT, SEND)
 * 3. Lenis smooth inertial scrolling + GSAP ScrollTrigger scrollerProxy sync & anchor gliding
 * 4. Dynamic cursor-proximity 1px gradient border illumination ([glow-border])
 * 5. Magnetic capsule navbar with active ScrollSpy indicators
 * 6. Interactive mouse-following radial spotlight masks (.interactive-section)
 * 7. SplitType text stagger scroll reveals ([text-split])
 * 8. Auto-cycling 3-month roadmap tabs with viewport pausing
 * 9. Pinned sticky process timeline progression
 * 10. Swiper 11 auto-width snap showcase carousel
 * 11. Minimalist FAQ accordion engine
 * 12. B2B enterprise lead sanitization & consumer email modal gate
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. LENIS SMOOTH INERTIAL SCROLL & GSAP SCROLLTRIGGER SYNC
     ========================================================================== */
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.3,
    });
    window.lenis = lenis;

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Smooth Anchor Navigation via Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      });
    });
  }

  /* ==========================================================================
     2. DUAL-CURTAIN LUXURY PRELOADER & HERO ENTRANCE (From town-team)
     ========================================================================== */
  const curtainBlack = document.getElementById('curtainBlack');
  const curtainGray = document.getElementById('curtainGray');
  const curtainBar = document.getElementById('curtainBar');
  const curtainCounter = document.getElementById('curtainCounter');

  if (curtainBlack && curtainGray && curtainBar && curtainCounter) {
    let progress = 0;
    const intervalTime = 16;
    const increment = 2.2;

    const timer = setInterval(() => {
      progress += increment + Math.random() * 2.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        curtainBar.style.width = '100%';
        curtainCounter.textContent = '100%';

        // Curtain Lift Sequence
        setTimeout(() => {
          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({
              onComplete: () => {
                curtainBlack.style.display = 'none';
                curtainGray.style.display = 'none';
              }
            });

            tl.to(curtainBlack, {
              yPercent: -100,
              duration: 0.75,
              ease: 'expo.inOut'
            })
            .to(curtainGray, {
              yPercent: -100,
              duration: 0.8,
              ease: 'expo.inOut'
            }, '<0.08')
            .from('#mainNavbar', {
              y: -50,
              opacity: 0,
              duration: 0.85,
              ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-pill-badge', {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            }, '-=0.6')
            .from('.hero-title', {
              y: 35,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
            }, '-=0.5')
            .from('.hero-description', {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-cta-group', {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-visual-frame', {
              scale: 0.9,
              opacity: 0,
              duration: 1.0,
              ease: 'expo.out'
            }, '-=0.7')
            .from('.hero-trust-bar', {
              y: 15,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            }, '-=0.4');
          } else {
            curtainBlack.style.display = 'none';
            curtainGray.style.display = 'none';
          }
        }, 120);
      } else {
        curtainBar.style.width = `${progress}%`;
        curtainCounter.textContent = `${Math.floor(progress)}%`;
      }
    }, intervalTime);
  }

  /* ==========================================================================
     3. 120 FPS CUSTOM LUXURY FOLLOWER CURSOR (From town-team)
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  if (customCursor && typeof gsap !== 'undefined') {
    const xTo = gsap.quickTo(customCursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const yTo = gsap.quickTo(customCursor, 'y', { duration: 0.15, ease: 'power2.out' });

    window.addEventListener('mousemove', (e) => {
      customCursor.style.opacity = '1';
      xTo(e.clientX);
      yTo(e.clientY);
    });

    document.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
    });

    // Hover detection for contextual cursor expansion & text badges
    const hoverTargets = document.querySelectorAll('a, button, .cursoreffect, .button-stroke, .tab-pill-btn, .faq-header');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        const text = el.getAttribute('data-cursor');
        if (text) {
          customCursor.classList.add('active-hover-text');
          customCursor.textContent = text;
        } else {
          customCursor.classList.add('active-hover');
        }
      });

      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('active-hover');
        customCursor.classList.remove('active-hover-text');
        customCursor.textContent = '';
      });
    });
  }

  /* ==========================================================================
     4. DYNAMIC CURSOR-PROXIMITY 1PX GRADIENT BORDER ILLUMINATION ([glow-border])
     ========================================================================== */
  const glowWrappers = document.querySelectorAll('[glow-border="wrapper"]');
  glowWrappers.forEach(wrapper => {
    const cards = wrapper.querySelectorAll('[glow-border="card"]');
    wrapper.addEventListener('mousemove', (e) => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--cursor-x', `${x.toFixed(1)}px`);
        card.style.setProperty('--cursor-y', `${y.toFixed(1)}px`);
      });
    });
  });

  /* ==========================================================================
     5. MAGNETIC CAPSULE NAVBAR & SCROLLSPY
     ========================================================================== */
  const navbarCapsule = document.querySelector('.navbar-capsule');
  if (navbarCapsule && typeof gsap !== 'undefined') {
    navbarCapsule.addEventListener('mousemove', (e) => {
      const rect = navbarCapsule.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pullX = (e.clientX - centerX) * 0.12;
      const pullY = (e.clientY - centerY) * 0.12;
      gsap.to(navbarCapsule, { x: pullX, y: pullY, duration: 0.3, ease: 'power2.out' });
    });

    navbarCapsule.addEventListener('mouseleave', () => {
      gsap.to(navbarCapsule, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  }

  // ScrollSpy for Nav Links
  const spySections = ['hero', 'about', 'services', 'timeline', 'work', 'faqs'];
  spySections.forEach(id => {
    const section = document.getElementById(id);
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (section && navLink && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveNavLink(navLink),
        onEnterBack: () => setActiveNavLink(navLink)
      });
    }
  });

  function setActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  }

  /* ==========================================================================
     6. MODULE 3: REAL-TIME MOUSE-FOLLOWING SPOTLIGHT (.interactive-section)
     ========================================================================== */
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

  /* ==========================================================================
     7. MODULE 5: SPLITTYPE + GSAP SCROLL STAGGER ([text-split])
     ========================================================================== */
  if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
    const splitElements = document.querySelectorAll('[text-split]');

    splitElements.forEach(el => {
      new SplitType(el, {
        types: 'words',
        tagName: 'span'
      });

      const words = el.querySelectorAll('.word');
      gsap.set(words, { opacity: 0, x: '1.2em' });

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(words, {
              opacity: 1,
              x: '0em',
              duration: 0.65,
              ease: 'power2.out',
              stagger: 0.03
            });
          }
        });
      } else {
        gsap.to(words, { opacity: 1, x: '0em', duration: 0.65 });
      }
    });
  }

  /* ==========================================================================
     8. MODULE 6: AUTO-CYCLING 3-MONTH ROADMAP TABS
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-pill-btn');
  const tabPanes = document.querySelectorAll('.tab-pane-content');
  let currentTabIndex = 0;
  let tabInterval = null;
  let tabsVisible = true;

  function switchTab(index) {
    tabButtons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    tabPanes.forEach((pane, i) => {
      pane.classList.toggle('active', i === index);
    });
    currentTabIndex = index;
  }

  function startTabLoop() {
    stopTabLoop();
    tabInterval = setInterval(() => {
      if (!tabsVisible) return;
      const nextIndex = (currentTabIndex + 1) % tabButtons.length;
      switchTab(nextIndex);
    }, 5000);
  }

  function stopTabLoop() {
    if (tabInterval) clearInterval(tabInterval);
  }

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      switchTab(idx);
      startTabLoop();
    });
  });

  const tabsContainer = document.querySelector('.tabs-container');
  if (tabsContainer && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(([entry]) => {
      tabsVisible = entry.isIntersecting;
      if (tabsVisible) startTabLoop();
      else stopTabLoop();
    }, { threshold: 0.4 });
    observer.observe(tabsContainer);
  } else {
    startTabLoop();
  }

  /* ==========================================================================
     9. MODULE 7: PINNED STICKY PROCESS TIMELINE STEP PROGRESSION
     ========================================================================== */
  const stepItems = document.querySelectorAll('.timeline-step-item');
  if (stepItems.length > 0 && typeof ScrollTrigger !== 'undefined') {
    stepItems.forEach((step, idx) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 65%',
        end: 'bottom 40%',
        onEnter: () => activateStep(idx),
        onEnterBack: () => activateStep(idx)
      });
    });

    function activateStep(index) {
      stepItems.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
    }
  }

  /* ==========================================================================
     10. MODULE 8: SWIPER 11 AUTO-WIDTH SNAP SHOWCASE
     ========================================================================== */
  if (typeof Swiper !== 'undefined') {
    const swiperContainer = document.querySelector('.showcase-swiper');
    if (swiperContainer) {
      new Swiper(swiperContainer, {
        slidesPerView: 'auto',
        spaceBetween: 24,
        loop: true,
        speed: 700,
        centeredSlides: false,
        navigation: {
          nextEl: '.slider-arrow-next',
          prevEl: '.slider-arrow-prev',
        }
      });
    }
  }

  /* ==========================================================================
     11. MODULE 9: MINIMALIST FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  /* ==========================================================================
     12. MODULE 10: B2B LEAD SANITIZATION & CONSUMER EMAIL GATE
     ========================================================================== */
  const phoneInputs = document.querySelectorAll('.contact-number');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
  });

  const nameInputs = document.querySelectorAll('.name-field');
  nameInputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^a-zA-Z\s'-]/g, '');
    });
  });

  const blockedEmailDomains = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@rediffmail.com', '@outlook.com'];
  const contactForms = document.querySelectorAll('.sales-form');
  const popup = document.getElementById('customSalesPopup');
  const closePopupBtn = document.getElementById('closeSalesPopup');

  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput) {
        const val = emailInput.value.trim().toLowerCase();
        const isBlocked = blockedEmailDomains.some(d => val.endsWith(d));
        if (isBlocked) {
          e.preventDefault();
          if (popup) popup.style.display = 'flex';
        }
      }
    });
  });

  if (closePopupBtn && popup) {
    closePopupBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }

});
