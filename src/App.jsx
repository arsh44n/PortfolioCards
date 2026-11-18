import React, { useState, useEffect, useRef } from 'react';
import Background3D from './components/Background3D';
import Header from './components/Header';
import CardScrollTrack from './components/CardScrollTrack';
import ContactBar from './components/ContactBar';
import ProjectModal from './components/ProjectModal';
import AboutModal from './components/AboutModal';
import { projects as allProjects } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const trackContainerRef = useRef(null);

  // Preload all project captures into browser memory cache
  useEffect(() => {
    allProjects.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, []);

  const handleScrollToWorks = () => {
    const el = document.getElementById('card-track-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative w-screen min-h-screen overflow-x-hidden overflow-y-auto lg:overflow-hidden lg:h-screen flex flex-col justify-between bg-white text-[#111111] select-none">
      {/* 3D Celestial 10-Million Density Particle Matrix Canvas */}
      <Background3D />

      {/* Top Header with Word-by-Word Interactive "Visit my selected work" */}
      <Header
        onOpenAbout={() => setIsAboutOpen(true)}
        onScrollToWorks={handleScrollToWorks}
      />

      {/* Center 3D Project Cards Stage */}
      <div id="card-track-section" className="relative z-10 flex-1 flex flex-col justify-center">
        <CardScrollTrack
          projects={allProjects}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      </div>

      {/* Horizontal Contact Us Form & Direct Social Embeds */}
      <ContactBar />

      {/* Bottom Minimal Studio Bar */}
      <footer className="relative z-20 w-full px-8 sm:px-14 py-2 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-black/35 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-2">
          <span>+</span>
          <span>ARSHAAN // SELECTED WORKS</span>
        </div>
        <div className="flex items-center gap-2">
          <span>EST. 2026 • 10M POINT CLOUD</span>
          <span>+</span>
        </div>
      </footer>

      {/* Expanded Project Inspection UI Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* About Creator Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </main>
  );
}
