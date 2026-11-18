import React, { useRef, useState, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CardScrollTrack({ projects, onSelectProject }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update scroll boundaries & active card indicator
  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Compute approximate active card
    const cardWidth = 340; // average card + gap
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, idx)));
  }, [projects.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Smooth scroll left / right
  const scroll = (direction) => {
    if (!trackRef.current) return;
    const step = 360; // Card width + gap
    trackRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  // Wheel horizontal scrolling
  const handleWheel = (e) => {
    if (!trackRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      trackRef.current.scrollLeft += e.deltaY * 0.9;
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col justify-center my-auto py-2 z-10 overflow-hidden">
      {/* LEFT CHEVRON FLOATING CONTROL */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Previous Projects"
        className={`absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-[#111111] shadow-lg border border-black/10 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          canScrollLeft
            ? 'opacity-100 hover:scale-105 active:scale-95 hover:bg-white'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      {/* RIGHT CHEVRON FLOATING CONTROL */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Next Projects"
        className={`absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-[#111111] shadow-lg border border-black/10 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          canScrollRight
            ? 'opacity-100 hover:scale-105 active:scale-95 hover:bg-white'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>

      {/* HORIZONTAL CARDS SCROLL TRACK */}
      <div
        ref={trackRef}
        onWheel={handleWheel}
        className="w-full flex items-center gap-5 sm:gap-7 md:gap-8 px-6 sm:px-12 md:px-16 overflow-x-auto no-scrollbar scroll-smooth py-6 select-none"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {projects.map((project, idx) => (
          <div key={project.id} style={{ scrollSnapAlign: 'center' }}>
            <ProjectCard
              project={project}
              index={idx}
              onSelect={onSelectProject}
            />
          </div>
        ))}
      </div>

      {/* BOTTOM TRACK TELEMETRY & PAGINATION DOTS */}
      <div className="flex items-center justify-between px-6 sm:px-12 md:px-16 mt-1 select-none">
        {/* Subtle scroll hint */}
        <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest hidden sm:inline-block">
          ← Drag or Scroll Cards →
        </span>

        {/* Progress Pills */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 bg-[#111111]'
                  : 'w-1.5 bg-black/15'
              }`}
            />
          ))}
        </div>

        {/* Current / Total Indicator */}
        <div className="font-mono text-[10px] text-black/50 font-semibold tracking-wider hidden sm:inline-block">
          0{activeIndex + 1} / 0{projects.length}
        </div>
      </div>
    </div>
  );
}
