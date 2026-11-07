import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  const [sec, setSec] = useState(59);
  useEffect(() => {
    const timer = setInterval(() => setSec((p) => (p > 0 ? p - 1 : 59)), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex gap-2">
      {[{ val: '14', l: 'Days' }, { val: '08', l: 'Hours' }, { val: sec < 10 ? `0${sec}` : sec, l: 'Secs' }].map((b, i) => (
        <div key={i} className="w-14 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
          <div className="font-mono text-xl font-bold text-emerald-400">{b.val}</div>
          <div className="text-[10px] text-zinc-500 uppercase">{b.l}</div>
        </div>
      ))}
    </div>
  );
};
