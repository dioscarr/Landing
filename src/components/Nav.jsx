import React from 'react';

const Nav = () => (
  <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10">
    <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
      <a href="#home" className="font-semibold tracking-tight">Dioscar Rodriguez</a>
      <div className="flex gap-6 text-sm">
  <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
  <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
        <a href="#experience" className="opacity-80 hover:opacity-100">Experience</a>
        <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
      </div>
    </nav>
  </header>
);

export default Nav;
