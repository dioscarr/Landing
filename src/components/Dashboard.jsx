import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const links = [
  { label: 'Portfolio', href: 'https://dioscarr.github.io/Landing/' },
  { label: 'Resume', href: 'https://dioscarr.github.io/RodriguezDioscar/' },
  // add more repo pages here as needed
];

const Dashboard = () => {
  const { logout } = useAuth0();
  const handleSignOut = async () => {
    logout({ logoutParams: { returnTo: window.location.origin + (import.meta.env.BASE_URL || '/') } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10">
        <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-semibold tracking-tight">Utility Dashboard</h1>
          <button onClick={handleSignOut} className="text-sm px-3 py-1.5 rounded bg-white/10 border border-white/20 hover:bg-white/20">Sign out</button>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-10">
        <p className="text-white/80 mb-4">Main navigation menu to GitHub Pages repos:</p>
        <ul className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5">
          {links.map((l, i) => (
            <li key={i}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 hover:bg-white/10"
              >
                <span>{l.label}</span>
                <span className="text-xs text-white/50">opens ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
