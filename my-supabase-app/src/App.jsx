import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SkillsBento from './components/SkillsBento';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Nav />
      <main className="container mx-auto px-4">
        <Hero />
        <section id="projects" className="py-16">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <Projects />
        </section>
        <section id="skills" className="py-16">
          <SkillsBento />
        </section>
        <section id="experience" className="py-16">
          <Experience />
        </section>
        <section id="contact" className="py-16">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;