import React from 'react';

export const StickySplitLayout: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-8">
      <div className="sticky top-20 h-96 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">Sticky Column</div>
      <div className="space-y-6">Scrolling Narrative</div>
    </div>
  );
};
