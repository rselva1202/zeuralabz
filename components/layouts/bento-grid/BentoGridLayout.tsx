import React from 'react';

export const BentoGridLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-6">{children}</div>;
};
