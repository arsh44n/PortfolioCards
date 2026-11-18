import React, { useState } from 'react';

export default function ProjectCard({ project, onSelect }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative w-[310px] sm:w-[350px] md:w-[370px] shrink-0 bg-white/90 backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.13),0_2px_6px_rgba(0,0,0,0.03)] cursor-pointer select-none flex flex-col justify-between"
    >
      {/* ===================================================================
          1. VISUAL FILLS THE CARD (Edge-to-Edge with Smooth Perspective)
          =================================================================== */}
      <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-100 flex items-center justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-106"
          loading="eager"
        />

        {/* Subtle glassmorphic sheen overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* ===================================================================
          2. BOTTOM TITLE & CATEGORY (Zero Extra Text, No Explore Button)
          =================================================================== */}
      <div className="p-5 sm:p-6 flex flex-col gap-2.5 bg-white">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-black/45 tracking-wider uppercase">
            {project.category}
          </span>
          <h3 className="font-sans font-extrabold text-lg sm:text-xl text-[#111111] tracking-tight group-hover:text-black transition-colors mt-0.5 truncate">
            {project.title}
          </h3>
        </div>

        {/* Soft Rounded Pill Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {project.pills.map((pill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-black/70 font-sans text-[10px] sm:text-[11px] font-medium tracking-tight shrink-0 group-hover:bg-[#EBECEF] transition-colors"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
