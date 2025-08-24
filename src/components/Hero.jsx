import React from 'react';

const Hero = () => (
  <section id="home" className="relative py-20">
    <div className="absolute inset-0 -z-10 opacity-30" aria-hidden>
      <div className="mx-auto h-64 w-64 rounded-full blur-3xl bg-cyan-500/40 translate-x-24 -translate-y-16" />
      <div className="mx-auto h-64 w-64 rounded-full blur-3xl bg-indigo-500/40 -translate-x-24 translate-y-16" />
    </div>
    <div className="container mx-auto px-4 text-center">
      <p className="uppercase tracking-widest text-sm text-slate-400">Dioscar Rodriguez</p>
      <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">Software Engineer</h1>
      <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
        Visionary, bilingual problem solver across the full SDLC. Building robust, scalable cloud apps with
        AI-assisted workflows and modern web frameworks.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="#contact" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition">Contact</a>
  <a href="https://github.com/dioscarr" target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-500 transition">GitHub</a>
  <a href="https://dioscarr.github.io/RodriguezDioscar/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded bg-slate-700 text-white/90 hover:bg-slate-600 transition">Resume</a>
      </div>
    </div>
  </section>
);

export default Hero;
