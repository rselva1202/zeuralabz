import React from 'react';

export const SidebarLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="flex min-h-screen bg-black text-white">{children}</div>;
};
