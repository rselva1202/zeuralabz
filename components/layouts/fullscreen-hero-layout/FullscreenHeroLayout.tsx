import React from 'react';

export const FullscreenHeroLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <section className="h-screen w-full flex items-center justify-center bg-black text-white p-6">{children}</section>;
};
