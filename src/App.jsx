import React, { useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import Header from './components/Header';
import CardScrollTrack from './components/CardScrollTrack';
import ProjectModal from './components/ProjectModal';
import AboutModal from './components/AboutModal';
import { projects as allProjects } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Preload all project captures into browser memory cache
  useEffect(() => {
    allProjects.forEach((p) => {
      if (p.image) {
        const img = new Image();
        img.src = p.image;
      }
    });
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col justify-between bg-white text-[#111111] select-none">
      {/* 3D Celestial White Interactive Nebula Canvas */}
      <Background3D />

      {/* Top Header */}
      <Header onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Center 3D Project Cards Stage */}
      <CardScrollTrack
        projects={allProjects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Bottom Minimal Studio Bar (No dividing border, unified depth) */}
      <footer className="relative z-20 w-full px-8 sm:px-14 py-3 flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-black/35 uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-2">
          <span>+</span>
          <span>ARSHAAN // SELECTED WORKS</span>
        </div>
        <div className="flex items-center gap-2">
          <span>EST. 2026</span>
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
