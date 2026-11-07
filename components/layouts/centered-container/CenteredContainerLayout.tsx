import React from 'react';

export const CenteredContainerLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="max-w-2xl mx-auto px-6 py-16 text-white">{children}</div>;
};
