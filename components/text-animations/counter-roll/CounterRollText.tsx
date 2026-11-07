import React, { useState, useEffect } from 'react';

export const CounterRollText: React.FC<{ target?: number; suffix?: string }> = ({ target = 99.9, suffix = "%" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);

  return <div className="font-mono text-5xl font-black text-emerald-400">{count}{suffix}</div>;
};
