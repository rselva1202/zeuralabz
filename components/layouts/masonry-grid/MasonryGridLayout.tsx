import React from 'react';

export const MasonryGridLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto p-6">{children}</div>;
};
