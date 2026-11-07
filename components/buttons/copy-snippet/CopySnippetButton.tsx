import React, { useState } from 'react';

export const CopySnippetButton: React.FC<{ code?: string }> = ({ code = "npx zeuralabz add aurora" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
      <span>{code}</span>
      <span className={copied ? 'text-emerald-400 font-bold' : 'text-zinc-500'}>{copied ? '✓ Copied' : '📋'}</span>
    </button>
  );
};
