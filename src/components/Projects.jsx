import React, { useState } from 'react';
import Modal from './Modal';

const projects = [
  {
    title: 'Cloud Applications Suite',
    org: 'McNeil & Co.',
    desc: 'Robust, scalable, and secure cloud applications; AI-assisted workflows; EF and SQL optimizations.',
    link: 'https://dioscarr.github.io/RodriguezDioscar/',
    tags: ['.NET', 'Blazor', 'Tailwind', 'SQL Server']
  },
  {
    title: 'Extranet Web App',
    org: 'Third Mind Inc',
    desc: 'ASP.NET Core 3.1 backend with React front-end; auth and modern UI/UX updates.',
    link: 'https://dioscarr.github.io/RodriguezDioscar/',
    tags: ['ASP.NET Core', 'React', 'Open XML']
  },
  {
    title: 'Contract Generator',
    org: 'Third Mind Inc',
    desc: 'Template-driven HTML → Word docs via Open XML with variable replacement.',
    link: 'https://dioscarr.github.io/RodriguezDioscar/',
    tags: ['Open XML', 'C#', 'Templates']
  }
];

const Projects = () => {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(p)}
            className="text-left group rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition block"
          >
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm opacity-70">{p.org}</p>
            <p className="text-sm mt-2 opacity-90">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t, j) => (
                <span key={j} className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active && (
          <div className="space-y-4">
            <p className="text-sm text-white/80">{active.org}</p>
            <p className="leading-relaxed text-white/90">{active.desc}</p>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-white/10 to-transparent border border-white/10 text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-white/50">Opens in new tab</span>
              <a
                href={active.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              >
                Visit project ↗
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Projects;
