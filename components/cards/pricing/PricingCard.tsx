import React from 'react';

export const PricingCard: React.FC<{ tier?: string; price?: string }> = ({
  tier = "Pro Developer",
  price = "$29"
}) => {
  return (
    <div className="relative w-80 rounded-2xl bg-zinc-900 border-2 border-emerald-500/60 p-6 shadow-2xl flex flex-col justify-between">
      <div className="absolute -top-3.5 right-6 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full uppercase">
        Most Popular
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">{tier}</h4>
        <div className="flex items-baseline gap-1 my-4">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          <span className="text-zinc-400 text-sm">/month</span>
        </div>
        <ul className="space-y-3 text-sm text-zinc-300">
          <li>✓ Unlimited Component Exports</li>
          <li>✓ Framer Motion & GSAP Included</li>
          <li>✓ Visual Page Builder Access</li>
        </ul>
      </div>
      <button className="w-full mt-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors">
        Start Free Trial
      </button>
    </div>
  );
};
