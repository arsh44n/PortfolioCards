import React, { useEffect, useRef } from 'react';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth inertial interpolation
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 1. Generate 3D Star / Dust Field (Inspired by Image 3 Celestial Nebula)
    const particleCount = Math.min(380, Math.floor((width * height) / 3200));
    let particles = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: (Math.random() - 0.5) * width * 1.8,
          y: (Math.random() - 0.5) * height * 1.8,
          z: Math.random() * 1000 + 100, // Depth
          size: Math.random() * 2.2 + 0.6,
          baseAlpha: Math.random() * 0.7 + 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };
    initParticles();

    // 2. Generate Volumetric Cosmic Clouds (White / Silver Ethereal Nebula)
    const cloudCount = 14;
    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 600 + 200,
        radius: Math.random() * 320 + 220,
        driftSpeedX: (Math.random() - 0.5) * 0.15,
        driftSpeedY: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.35 + 0.2,
      });
    }

    const fov = 750;
    let time = 0;

    // Render 60/120fps Animation Loop
    const render = () => {
      time += 0.012;

      // Smooth camera interpolation towards cursor
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with crisp modern white / soft pearl studio base
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Deep atmospheric gradient fill (Zero harsh division, continuous pure space)
      const bgGrad = ctx.createRadialGradient(
        width / 2 + mouse.x * 80,
        height / 2 + mouse.y * 80,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.9
      );
      bgGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      bgGrad.addColorStop(0.45, 'rgba(247, 247, 250, 0.98)');
      bgGrad.addColorStop(0.8, 'rgba(238, 238, 242, 0.95)');
      bgGrad.addColorStop(1, 'rgba(228, 228, 234, 0.92)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Volumetric Cosmic Clouds
      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        c.x += c.driftSpeedX;
        c.y += c.driftSpeedY;

        // Wrap boundaries
        if (c.x < -width) c.x = width;
        if (c.x > width) c.x = -width;
        if (c.y < -height) c.y = height;
        if (c.y > height) c.y = -height;

        const scale = fov / (fov + c.z);
        const screenX = width / 2 + (c.x - mouse.x * 90) * scale;
        const screenY = height / 2 + (c.y - mouse.y * 90) * scale;
        const screenRadius = c.radius * scale;

        const cloudGrad = ctx.createRadialGradient(
          screenX,
          screenY,
          0,
          screenX,
          screenY,
          screenRadius
        );
        cloudGrad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha * 0.9})`);
        cloudGrad.addColorStop(0.5, `rgba(242, 244, 248, ${c.alpha * 0.5})`);
        cloudGrad.addColorStop(0.85, `rgba(230, 232, 238, ${c.alpha * 0.15})`);
        cloudGrad.addColorStop(1, 'rgba(225, 227, 235, 0)');

        ctx.fillStyle = cloudGrad;
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render 3D Celestial Stars & Glowing Cosmic Dust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Perspective 3D calculation with cursor parallax
        const scale = fov / (fov + p.z);
        const screenX = width / 2 + (p.x - mouse.x * 120) * scale;
        const screenY = height / 2 + (p.y - mouse.y * 120) * scale;
        const size = p.size * scale;

        if (screenX >= -10 && screenX <= width + 10 && screenY >= -10 && screenY <= height + 10) {
          const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.25 + 0.75;
          const alpha = p.baseAlpha * pulse;

          // Glowing White Star Halo
          ctx.beginPath();
          ctx.arc(screenX, screenY, size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 190, 210, ${alpha * 0.25})`;
          ctx.fill();

          // Intense Star Core
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 110, 130, ${alpha * 0.65})`;
          ctx.fill();
        }
      }

      // Interactive Cursor Dynamic Light Bloom (Spotlight through White Nebula)
      const cursorX = width / 2 + mouse.x * (width / 2.2);
      const cursorY = height / 2 + mouse.y * (height / 2.2);
      const cursorGrad = ctx.createRadialGradient(
        cursorX,
        cursorY,
        0,
        cursorX,
        cursorY,
        450
      );
      cursorGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      cursorGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
      cursorGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = cursorGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-white">
      {/* 3D Celestial Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle Ethereal Vignette across Viewport Edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(220,222,230,0.35)_100%)] pointer-events-none" />
    </div>
  );
}
