import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import { Sparkles } from 'lucide-react';

const Card = ({ title, items, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition"
  >
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">{items}</p>
  </button>
);

const SkillsBento = () => {
  const [active, setActive] = useState(null);
  const skills = useMemo(() => ([
    { title: 'AI/GenAI', items: 'Copilot, OpenAI, Claude, Power Automate (AI)' },
    { title: 'Front-End', items: 'React, JS/TS, Node, HTML5, CSS/SCSS, Bootstrap, Blazor, Angular, Backbone' },
    { title: 'Back-End', items: '.NET (5/6/8/9), ASP.NET, Core, MVC, PHP, Rails' },
    { title: 'Databases', items: 'SQL Server, MySQL, Sybase Anywhere' },
    { title: 'APIs', items: 'REST, SOAP, AJAX, JSON' },
    { title: 'Tools', items: 'Git/GitHub, Docker, TFS, Testing, Design Patterns, DevOps' },
  ]), []);

  const activeTags = useMemo(() => active?.items?.split(',').map(s => s.trim()).filter(Boolean) || [], [active]);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s, i) => (
          <Card key={i} title={s.title} items={s.items} onClick={() => setActive(s)} />
        ))}
      </div>
  <Modal open={Boolean(active)} onClose={() => setActive(null)} title={<span className="inline-flex items-center gap-2"><Sparkles size={16}/> {active?.title}</span>}>
        {Boolean(activeTags.length) && (
          <div className="flex flex-wrap gap-2">
            {activeTags.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-white/10 to-transparent border border-white/10 text-white/90"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default SkillsBento;
