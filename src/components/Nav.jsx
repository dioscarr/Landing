import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useSession } from './authHooks';

const Nav = () => {
  const navigate = useNavigate();
  const session = useSession();

  const handleSignIn = async () => {
    // Third-party OAuth authentication with GitHub
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + (import.meta.env.BASE_URL || '/') + 'dashboard'
      }
    });
    if (error) {
      alert('Sign in error: ' + error.message);
    }
  };

  const gotoDashboard = () => navigate('/dashboard');

  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">Dioscar Rodriguez</a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
          <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
          <a href="#experience" className="opacity-80 hover:opacity-100">Experience</a>
          <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
          {session ? (
            <button onClick={gotoDashboard} className="ml-2 rounded bg-white/10 border border-white/20 px-3 py-1.5 hover:bg-white/20">Dashboard</button>
          ) : (
            <button onClick={handleSignIn} className="ml-2 rounded bg-blue-600 text-white px-3 py-1.5 hover:bg-blue-500">Sign In</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
