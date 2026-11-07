import React from 'react';

export const DashboardLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:block">Sidebar</aside>
      <main className="flex-1 p-8">{children || <p>Dashboard Content</p>}</main>
    </div>
  );
};
