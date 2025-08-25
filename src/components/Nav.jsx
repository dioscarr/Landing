import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './authHooks';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from './Modal';

const Nav = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { loginWithRedirect, logout } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleEmailSignIn = async () => {
    // Use Auth0 Universal Login (no magic-link here). If you need passwordless, enable it in Auth0 and we can wire it up.
    const redirectTo = window.location.origin + (import.meta.env.BASE_URL || '/') + 'dashboard';
    await loginWithRedirect({ authorizationParams: { screen_hint: 'signup', redirect_uri: redirectTo } });
    setOpen(false);
  };

  const handleGoogleLogin = async () => {
    const redirectTo = window.location.origin + (import.meta.env.BASE_URL || '/') + 'dashboard';
    await loginWithRedirect({ authorizationParams: { connection: 'google-oauth2', redirect_uri: redirectTo } });
    setOpen(false);
  };

  const handleLogout = async () => {
    logout({ logoutParams: { returnTo: window.location.origin + (import.meta.env.BASE_URL || '/') } });
    navigate('/');
  };

  const gotoDashboard = () => navigate('/dashboard');

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10">
        <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Dioscar Rodriguez</a>
          <div className="flex items-center gap-4 text-sm">
            <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
            <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
            <a href="#experience" className="opacity-80 hover:opacity-100">Experience</a>
            <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
            {session ? (
              <>
                <button onClick={gotoDashboard} className="ml-2 rounded bg-white/10 border border-white/20 px-3 py-1.5 hover:bg-white/20">Dashboard</button>
                <button onClick={handleLogout} className="ml-2 rounded bg-red-700 text-white px-3 py-1.5 hover:bg-red-600">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => setOpen(true)} className="ml-2 rounded bg-blue-600 text-white px-3 py-1.5 hover:bg-blue-500">Sign in</button>
              </>
            )}
          </div>
        </nav>
      </header>

      <Modal open={open} onClose={() => setOpen(false)} title="Sign in">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-white/80">Choose a sign-in method:</p>
          <div className="flex gap-2">
            <button onClick={handleEmailSignIn} className="flex-1 rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-500">Sign in with Email</button>
            <button onClick={handleGoogleLogin} className="flex-1 rounded bg-red-600 text-white px-4 py-2 hover:bg-red-500">Sign in with Google</button>
          </div>
          <div className="text-sm text-white/60">Authentication is powered by Auth0.</div>
        </div>
      </Modal>
    </>
  );
};

export default Nav;
