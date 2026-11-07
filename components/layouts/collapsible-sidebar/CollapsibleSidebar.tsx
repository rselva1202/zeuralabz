import React, { useState } from 'react';

export const CollapsibleSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`${collapsed ? 'w-16' : 'w-56'} h-80 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between transition-all`}>
      <button onClick={() => setCollapsed(!collapsed)} className="text-xs text-zinc-400 self-end mb-4">
        {collapsed ? '→' : '← Collapse'}
      </button>
      <nav className="space-y-2 text-xs text-zinc-300">
        {['🏠 Home', '🧩 Components', '⚙️ Settings'].map((t) => (
          <div key={t} className="p-2 hover:bg-zinc-900 rounded-lg cursor-pointer truncate">{collapsed ? t.split(' ')[0] : t}</div>
        ))}
      </nav>
    </aside>
  );
};
