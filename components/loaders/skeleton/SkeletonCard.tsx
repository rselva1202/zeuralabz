import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="w-80 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 animate-pulse">
      <div className="h-32 bg-zinc-800 rounded-xl" />
      <div className="h-4 bg-zinc-800 rounded w-3/4" />
      <div className="h-3 bg-zinc-800 rounded w-1/2" />
    </div>
  );
};
