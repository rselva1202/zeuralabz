/**
 * Source: Magic UI • MIT • https://magicui.design
 * Author: Dillion Verma (https://github.com/magicuidesign/magicui)
 * Rendered live inside ZEURALABZ preview cards
 */

import React, { useState, useEffect, useRef } from 'react';

interface PreviewProps {
  slug: string;
  lite?: boolean;
}

export const MagicUIPreview: React.FC<PreviewProps> = ({ slug, lite = true }) => {
  const [frame, setFrame] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const loop = (now: number) => {
      if (now - lastTime > (lite ? 33 : 16)) {
        setFrame((f) => (f + 1) % 1000);
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [lite]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // 1. MAGIC CARD
  if (slug === 'magic-card' || slug.includes('card')) {
    const spotX = mousePos.x * 100;
    const spotY = mousePos.y * 100;
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full relative overflow-hidden bg-[#0A0D18] flex items-center justify-center p-4"
      >
        <div
          className="w-44 h-28 rounded-xl border border-white/20 relative p-3 flex flex-col justify-between overflow-hidden shadow-2xl transition-all"
          style={{
            background: `radial-gradient(180px circle at ${spotX}% ${spotY}%, rgba(225,29,72,0.35), rgba(15,23,42,0.95))`,
            borderColor: `rgba(225,29,72,${0.3 + Math.sin(frame * 0.05) * 0.2})`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="w-6 h-6 rounded-md bg-[#E11D48] text-white flex items-center justify-center text-xs font-black shadow-sm">
              M
            </span>
            <span className="text-[9px] font-mono font-bold text-rose-300">HOVER ME</span>
          </div>
          <div>
            <div className="text-xs font-heading font-black text-white">MAGIC CARD</div>
            <div className="text-[9px] text-zinc-400">Mouse spotlight tracking</div>
          </div>
        </div>
      </div>
    );
  }

  // 2. MARQUEE
  if (slug === 'marquee' || slug.includes('marquee')) {
    const items = ['✨ ANIMATION', '⚡ FAST', '🔥 SHADCN', '💎 BOLD', '🚀 REACT'];
    const offset = (frame * 1.5) % 300;
    return (
      <div className="w-full h-full bg-[#080B14] flex flex-col justify-center gap-2 overflow-hidden px-2">
        <div
          className="flex gap-2 whitespace-nowrap"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {[...items, ...items, ...items].map((text, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono font-black text-rose-300 uppercase shadow-sm"
            >
              {text}
            </span>
          ))}
        </div>
        <div
          className="flex gap-2 whitespace-nowrap"
          style={{ transform: `translateX(${offset - 150}px)` }}
        >
          {[...items, ...items, ...items].reverse().map((text, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-md bg-[#E11D48]/15 border border-[#E11D48]/30 text-xs font-mono font-black text-white uppercase shadow-sm"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // 3. BORDER BEAM
  if (slug === 'border-beam' || slug.includes('beam')) {
    const angle = (frame * 2.5) % 360;
    return (
      <div className="w-full h-full bg-[#090C15] flex items-center justify-center p-4">
        <div className="relative w-40 h-24 rounded-lg p-[2px] overflow-hidden">
          {/* Rotating beam */}
          <div
            className="absolute inset-[-100%] transition-transform"
            style={{
              background: `conic-gradient(from ${angle}deg at 50% 50%, transparent 0deg, transparent 270deg, #E11D48 320deg, #FF90E8 360deg)`,
            }}
          />
          <div className="relative w-full h-full bg-[#0D111E] rounded-md flex flex-col items-center justify-center p-2 z-10 border border-white/10">
            <span className="text-[10px] font-heading font-black tracking-wider text-white">
              BORDER BEAM
            </span>
            <span className="text-[8px] font-mono text-rose-400 mt-1">CONIC RAY</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. SHIMMER BUTTON
  if (slug === 'shimmer-button' || slug.includes('shimmer')) {
    const sweep = (frame * 3) % 240;
    return (
      <div className="w-full h-full bg-[#070A12] flex items-center justify-center p-4">
        <button className="relative px-6 py-2.5 rounded-full overflow-hidden border-2 border-[#E11D48] bg-black shadow-[0_0_20px_rgba(225,29,72,0.4)] group">
          <div
            className="absolute inset-0 w-8 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg]"
            style={{ left: `${sweep - 40}px` }}
          />
          <span className="relative z-10 font-heading text-xs font-black tracking-widest text-white uppercase flex items-center gap-1.5">
            ✨ SHIMMER BTN
          </span>
        </button>
      </div>
    );
  }

  // 5. RETRO GRID
  if (slug === 'retro-grid' || slug.includes('grid')) {
    const gridY = (frame * 1.2) % 40;
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#0A0614] flex items-center justify-center" style={{ perspective: '300px' }}>
        <div
          className="absolute inset-0 origin-bottom"
          style={{
            transform: 'rotateX(60deg)',
            backgroundImage: `linear-gradient(to right, rgba(225,29,72,0.3) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(225,29,72,0.3) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: `0px ${gridY}px`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0A0614]/50 to-[#0A0614]" />
        <span className="relative z-10 text-[10px] font-heading font-black tracking-widest text-rose-300 bg-black/80 px-2.5 py-1 border border-rose-500/50">
          RETRO GRID 80s
        </span>
      </div>
    );
  }

  // 6. METEORS
  if (slug === 'meteors' || slug.includes('meteor')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#05070E] flex items-center justify-center">
        {Array.from({ length: 6 }).map((_, i) => {
          const travel = ((frame * 2.5 + i * 40) % 200) / 100;
          const left = 10 + i * 16;
          const top = -20 + travel * 120;
          return (
            <div
              key={i}
              className="absolute w-[2px] bg-gradient-to-b from-white via-rose-400 to-transparent"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                height: '40px',
                transform: 'rotate(-45deg)',
                opacity: 1 - travel * 0.7,
              }}
            />
          );
        })}
        <span className="relative z-10 text-[10px] font-mono font-bold text-rose-200 bg-black/70 px-2 py-0.5 border border-rose-500/40">
          ☄️ METEOR SHOWER
        </span>
      </div>
    );
  }

  // 7. RIPPLE
  if (slug === 'ripple' || slug.includes('ripple')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#070913] flex items-center justify-center">
        {[0, 1, 2, 3].map((r) => {
          const size = ((frame * 1.5 + r * 35) % 140) * 1.8;
          const opacity = Math.max(0, 1 - size / 250);
          return (
            <div
              key={r}
              className="absolute rounded-full border border-[#E11D48] transition-all"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity * 0.7,
              }}
            />
          );
        })}
        <div className="w-3.5 h-3.5 rounded-full bg-[#E11D48] shadow-[0_0_12px_#E11D48] relative z-10" />
      </div>
    );
  }

  // 8. NUMBER TICKER
  if (slug === 'number-ticker' || slug.includes('ticker') || slug.includes('number')) {
    const val = Math.floor((frame * 2.8) % 9999);
    return (
      <div className="w-full h-full bg-[#080B14] flex flex-col items-center justify-center p-4">
        <div className="text-[10px] font-mono text-zinc-400 mb-1">TOTAL COMMITS</div>
        <div className="text-2xl font-heading font-black text-[#E11D48] tracking-widest font-mono">
          {val.toLocaleString()}
        </div>
      </div>
    );
  }

  // 9. WORD ROTATE
  if (slug === 'word-rotate' || slug.includes('morphing-text') || slug.includes('rotate')) {
    const words = ['BEAUTIFUL', 'POWERFUL', 'MODERN', 'REACTIVE'];
    const idx = Math.floor((frame * 0.03) % words.length);
    return (
      <div className="w-full h-full bg-[#080B14] flex flex-col items-center justify-center p-4">
        <div className="text-[10px] font-mono text-zinc-400 mb-1">ANIMATED COPY</div>
        <div className="text-sm font-heading font-black text-rose-400 tracking-wider">
          {words[idx]}
        </div>
      </div>
    );
  }

  // 10. WARP BACKGROUND / TUNNEL
  if (slug === 'warp-background' || slug.includes('warp')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
        {[0, 1, 2, 3, 4].map((i) => {
          const step = ((frame * 2 + i * 25) % 125) / 125;
          const w = step * 180;
          const h = step * 110;
          return (
            <div
              key={i}
              className="absolute border border-rose-500 rounded-lg"
              style={{
                width: `${w}px`,
                height: `${h}px`,
                opacity: step,
              }}
            />
          );
        })}
        <span className="relative z-10 text-[9px] font-mono font-bold text-white bg-black/80 px-2 py-0.5 border border-rose-500/60">
          WARP TUNNEL
        </span>
      </div>
    );
  }

  // DEFAULT MAGIC UI AMBIENT STAGE
  const spotX = mousePos.x * 100;
  const spotY = mousePos.y * 100;
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden bg-[#0A0D18] flex flex-col items-center justify-center p-4"
    >
      <div
        className="absolute w-40 h-40 rounded-full blur-2xl opacity-30 transition-all pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, #E11D48 0%, transparent 70%)`,
          left: `${spotX - 50}%`,
          top: `${spotY - 50}%`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
        <span className="w-9 h-9 rounded-md bg-[#E11D48] border-2 border-white shadow-[2px_2px_0px_#FF2B2B] flex items-center justify-center text-white text-sm font-black">
          ⚡
        </span>
        <div className="font-heading text-xs font-black uppercase text-white tracking-wide">
          {slug.replace(/-/g, ' ')}
        </div>
        <div className="text-[9px] text-rose-300 font-mono font-bold">
          @magic-ui • LIVE DEMO
        </div>
      </div>
    </div>
  );
};

export default MagicUIPreview;

