import React, { useEffect, useState } from 'react';

export default function Background3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#EAEAEA]">
      {/* 3D Soft Studio Radial Keylight (Follows cursor smoothly) */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute -top-[20%] -left-[10%] w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.95)_0%,rgba(242,242,245,0.75)_50%,rgba(226,226,230,0.5)_100%)]"
      />

      {/* Floating 3D Depth Shadow Plane (Floor Occlusion) */}
      <div
        style={{
          transform: `rotateX(60deg) translate3d(0, 180px, -40px) scale(1.4)`,
        }}
        className="absolute bottom-[-15%] inset-x-[5%] h-[400px] rounded-[100px] bg-gradient-to-t from-black/[0.04] to-transparent blur-3xl opacity-60"
      />

      {/* Subtle Architectural Crosshairs (+) */}
      <div className="absolute top-6 left-6 font-mono text-xs text-black/20 font-light">+</div>
      <div className="absolute top-6 right-6 font-mono text-xs text-black/20 font-light">+</div>
      <div className="absolute bottom-6 left-6 font-mono text-xs text-black/20 font-light">+</div>
      <div className="absolute bottom-6 right-6 font-mono text-xs text-black/20 font-light">+</div>
    </div>
  );
}
