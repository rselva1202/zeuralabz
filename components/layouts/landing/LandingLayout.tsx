import React from 'react';

export const LandingLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">{children || <p>Landing Page Layout Shell</p>}</main>
    </div>
  );
};
