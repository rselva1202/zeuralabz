import React, { useState, useEffect } from 'react';

export const TypewriterText: React.FC<{ words?: string[] }> = ({ words = ["Beautiful UI", "Smooth Motion", "Modern Design"] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timer = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 120);
    return () => clearTimeout(timer);
  }, [subIndex, index, reverse, words]);

  return (
    <div className="font-mono text-3xl font-bold text-white flex items-center">
      <span>Built for </span>
      <span className="text-emerald-400 ml-2">{words[index].substring(0, subIndex)}</span>
      <span className="animate-pulse text-emerald-400">|</span>
    </div>
  );
};
