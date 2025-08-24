import React, { useState } from 'react';
import Modal from './Modal';

const Role = ({ role, org, period, bullets, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition"
  >
    <h3 className="font-semibold">{role} · {org}</h3>
    <p className="text-sm opacity-70 mb-2">{period}</p>
    <ul className="list-disc pl-5 text-sm space-y-1 opacity-90">
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </button>
);

const Experience = () => {
  const [active, setActive] = useState(null);
  const roles = [
    {
      role: 'Programmer',
      org: 'McNeil and Company',
      period: 'Jul 2020 – Present',
      bullets: [
        'Prompt engineering with contextual sources for higher quality AI outputs',
        'Cloud apps with modern patterns and secure practices',
        'Tailwind CSS for Blazor UI; migrated Sybase Anywhere → MSSQL',
        'EF adoption and SQL query optimization',
        'Blazor upgrades (.NET 8/9), interactive modes, server-side C# refactors',
      ],
    },
    {
      role: 'Lead Software Engineer',
      org: 'Third Mind Inc',
      period: 'May 2016 – Mar 2020',
      bullets: [
        'Full-stack delivery across multiple industries',
        'Introduced React to legacy stacks; built extranet app (ASP.NET Core + React)',
        'Contract generation via Open XML and template system',
      ],
    },
    {
      role: 'Full Stack Web Developer',
      org: 'Clever Design',
      period: 'Oct 2015 – May 2016',
      bullets: ['C#/ASP.NET stack, Bootstrap responsive sites, CMS builds, security testing'],
    },
    {
      role: 'Web Developer',
      org: 'Pointer Security',
      period: 'Jul 2014 – Oct 2015',
      bullets: ['ASP.NET MVC5, Knockout.js, SignalR, MSSQL design, Bootstrap UI'],
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {roles.map((r, i) => (
          <Role key={i} {...r} onClick={() => setActive(r)} />
        ))}
      </div>
      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active ? `${active.role} · ${active.org}` : ''}>
        {active && (
          <div className="space-y-2">
            <p className="text-sm text-white/70">{active.period}</p>
            <ul className="list-disc pl-5 space-y-1 text-white/90">
              {active.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Experience;
