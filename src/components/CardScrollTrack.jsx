import React, { useRef, useState, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CardScrollTrack({ projects, onSelectProject }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update scroll boundaries
  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

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
    const step = 380;
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
    <div className="relative w-full flex-1 flex flex-col justify-center my-auto py-4 z-10 overflow-hidden">
      {/* FLOATING LEFT CHEVRON */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Previous Projects"
        className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-300 cursor-pointer ${
          canScrollLeft
            ? 'opacity-100 hover:scale-105 active:scale-95 hover:bg-white'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      {/* FLOATING RIGHT CHEVRON */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Next Projects"
        className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all duration-300 cursor-pointer ${
          canScrollRight
            ? 'opacity-100 hover:scale-105 active:scale-95 hover:bg-white'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>

      {/* HORIZONTAL CARDS TRACK */}
      <div
        ref={trackRef}
        onWheel={handleWheel}
        className="w-full flex items-center gap-6 sm:gap-8 md:gap-10 px-8 sm:px-14 md:px-20 overflow-x-auto no-scrollbar scroll-smooth py-8 select-none"
        style={{ scrollSnapType: 'x proximity' }}
      >
        {projects.map((project) => (
          <div key={project.id} style={{ scrollSnapAlign: 'center' }}>
            <ProjectCard
              project={project}
              onSelect={onSelectProject}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
