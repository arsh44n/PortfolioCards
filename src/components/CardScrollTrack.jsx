import React, { useRef, useState, useEffect, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CardScrollTrack({ projects, onSelectProject }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

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

  // Smooth scroll left / right on desktop buttons
  const scroll = (direction) => {
    if (!trackRef.current) return;
    const step = 380;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  // Wheel horizontal scrolling with smooth acceleration
  const handleWheel = (e) => {
    if (!trackRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      trackRef.current.scrollLeft += e.deltaY * 0.95;
    }
  };

  // Ultra-smooth Mouse Drag Scrolling for Desktop
  const handleMouseDown = (e) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeftState(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.35;
    if (Math.abs(walk) > 4) {
      setHasDragged(true);
    }
    trackRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full max-w-full min-w-0 flex-1 flex flex-col justify-center my-auto py-2 sm:py-4 z-10 overflow-hidden">
      {/* FLOATING LEFT CHEVRON — HIDDEN ON MOBILE to avoid card overlap */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Previous Projects"
        className={`hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xl text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.1)] items-center justify-center transition-all duration-300 cursor-pointer ${
          canScrollLeft
            ? 'opacity-100 hover:scale-105 active:scale-95 hover:bg-white'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>

      {/* FLOATING RIGHT CHEVRON — HIDDEN ON MOBILE to avoid card overlap */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Next Projects"
        className={`hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-xl text-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.1)] items-center justify-center transition-all duration-300 cursor-pointer ${
          canScrollRight
            ? 'opacity-100 hover:scale-105 active:scale-95 hover:bg-white'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>

      {/* HORIZONTAL CARDS TRACK: Free-momentum touch sensitive + smooth drag */}
      <div
        ref={trackRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorX: 'contain',
          cursor: isDragging ? 'grabbing' : 'default',
        }}
        className="w-full max-w-full min-w-0 flex items-center gap-4 sm:gap-7 md:gap-9 px-4 sm:px-12 md:px-20 overflow-x-auto no-scrollbar py-3 sm:py-5 select-none"
      >
        {projects.map((project) => (
          <div key={project.id} className="shrink-0">
            <ProjectCard
              project={project}
              onSelect={(p) => {
                // If user was dragging across, don't trigger modal click
                if (!hasDragged) {
                  onSelectProject(p);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
