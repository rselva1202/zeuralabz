import React, { useState } from 'react';

export const FileUpload: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      className={`w-80 p-8 rounded-2xl border-2 border-dashed text-center transition-colors cursor-pointer ${
        dragOver ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
      }`}
    >
      <div className="text-3xl mb-2">📁</div>
      <p className="text-sm font-semibold text-white">Drag & drop files here</p>
      <p className="text-xs text-zinc-500 mt-1">PNG, JPG or SVG up to 10MB</p>
    </div>
  );
};
