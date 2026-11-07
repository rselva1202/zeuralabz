import React from 'react';

export const MultiColumnLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">{children}</div>;
};
