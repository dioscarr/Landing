import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SkillsBento from './components/SkillsBento';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import { useSession } from './components/authHooks';

const Protected = ({ children }) => {
  const session = useSession();
  if (session === undefined) return null; // can render a loader if desired
  return session ? children : <Navigate to="/" replace />;
};

const LandingPage = () => (
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
      <section id="education" className="py-16">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <Education />
      </section>
      <section id="contact" className="py-16">
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <ContactForm />
      </section>
    </main>
    <Footer />
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route
      path="/dashboard"
      element={
        <Protected>
          <Dashboard />
        </Protected>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;