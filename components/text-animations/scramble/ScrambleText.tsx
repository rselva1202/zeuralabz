import React, { useState } from 'react';

export const ScrambleText: React.FC<{ text?: string }> = ({ text = "INITIALIZE_SYSTEM" }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________01";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
  };

  return (
    <h3 onMouseEnter={scramble} className="font-mono text-3xl font-bold text-emerald-400 cursor-pointer select-none">
      {displayText}
    </h3>
  );
};
