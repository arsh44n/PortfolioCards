/**
 * METAMINDS CYBERNETIC DARK LUXURY ENGINE - RUNTIME CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. LENIS SMOOTH INERTIAL SCROLL
     ========================================================================== */
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

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
  }

  /* ==========================================================================
     2. DYNAMIC CURSOR-TRACKING SPOTLIGHT (.interactive-section)
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
     3. SPLITTYPE + GSAP SCROLL STAGGER REVEAL
     ========================================================================== */
  if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
    const splitElements = document.querySelectorAll('[text-split]');

    splitElements.forEach(el => {
      const typeSplit = new SplitType(el, {
        types: 'words',
        tagName: 'span'
      });

      const words = el.querySelectorAll('.word');
      gsap.set(words, { opacity: 0, x: '1em' });

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
     4. STICKY PROCESS TIMELINE STEP PROGRESSION
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
     5. SWIPER 11 AUTO-WIDTH SNAP SHOWCASE
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
        },
        pagination: {
          el: '.slider-pagination-dots',
          clickable: true,
        }
      });
    }
  }

  /* ==========================================================================
     6. AUTO-CYCLING INTERACTIVE TABS
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
     7. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ==========================================================================
     8. B2B FORM SANITIZATION & CONSUMER EMAIL GATE
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
