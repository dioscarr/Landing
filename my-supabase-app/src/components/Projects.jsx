import React from 'react';

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

const Projects = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {projects.map((p, i) => (
      <a key={i} href={p.link} target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition block">
        <h3 className="font-semibold">{p.title}</h3>
        <p className="text-sm opacity-70">{p.org}</p>
        <p className="text-sm mt-2 opacity-90">{p.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t, j) => (
            <span key={j} className="text-xs px-2 py-1 rounded bg-white/10 border border-white/10">{t}</span>
          ))}
        </div>
      </a>
    ))}
  </div>
);

export default Projects;
