import React from 'react';

const Card = ({ title, items }) => (
  <div className="rounded-xl border border-white/10 p-4 bg-white/5">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">{items}</p>
  </div>
);

const SkillsBento = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card title="AI/GenAI" items="Copilot, OpenAI, Claude, Power Automate (AI)" />
    <Card title="Front-End" items="React, JS/TS, Node, HTML5, CSS/SCSS, Bootstrap, Blazor, Angular, Backbone" />
    <Card title="Back-End" items=".NET (5/6/8/9), ASP.NET, Core, MVC, PHP, Rails" />
    <Card title="Databases" items="SQL Server, MySQL, Sybase Anywhere" />
    <Card title="APIs" items="REST, SOAP, AJAX, JSON" />
    <Card title="Tools" items="Git/GitHub, Docker, TFS, Testing, Design Patterns, DevOps" />
  </div>
);

export default SkillsBento;
