import React from 'react';

export const ShinyText: React.FC<{ text?: string }> = ({ text = "Ultra High Performance" }) => {
  return (
    <h2 className="text-4xl font-black bg-[linear-gradient(110deg,#71717a,45%,#ffffff,55%,#71717a)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer">
      {text}
    </h2>
  );
};
