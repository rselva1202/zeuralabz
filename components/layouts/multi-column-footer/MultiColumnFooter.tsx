import React from 'react';

export const MultiColumnFooter: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-12 px-6 text-zinc-400 text-xs">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div>
          <span className="font-extrabold text-white text-base">ZEURALABZ</span>
          <p className="text-[11px] text-zinc-500 mt-2">Next-gen UI design system for zeura-coders.</p>
        </div>
        <div>
          <h5 className="font-bold text-white uppercase mb-2">Components</h5>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Backgrounds</a></li>
            <li><a href="#" className="hover:text-white">Heroes</a></li>
            <li><a href="#" className="hover:text-white">Buttons</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white uppercase mb-2">Tools</h5>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">AI Analyzer</a></li>
            <li><a href="#" className="hover:text-white">MCP Server</a></li>
            <li><a href="#" className="hover:text-white">CLI Tool</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white uppercase mb-2">License</h5>
          <p className="text-[11px] text-zinc-500">MIT Open Source. Free for commercial projects.</p>
        </div>
      </div>
    </footer>
  );
};
