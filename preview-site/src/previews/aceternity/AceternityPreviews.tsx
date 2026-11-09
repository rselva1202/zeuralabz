/**
 * Source: Aceternity UI • MIT • https://ui.aceternity.com
 * Author: Manu Arora (https://github.com/manuarora700)
 * Rendered live inside ZEURALABZ preview cards
 */

import React, { useState, useEffect, useRef } from 'react';

interface PreviewProps {
  slug: string;
  lite?: boolean;
}

export const AceternityPreview: React.FC<PreviewProps> = ({ slug, lite = true }) => {
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

  // 1. 3D CARD EFFECT
  if (slug === '3d-card-effect' || slug.includes('3d-card')) {
    const tiltX = (mousePos.y - 0.5) * -30;
    const tiltY = (mousePos.x - 0.5) * 30;
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full bg-[#080B14] flex items-center justify-center p-4"
        style={{ perspective: '800px' }}
      >
        <div
          className="w-44 h-28 rounded-xl bg-gradient-to-br from-zinc-900 to-black border-2 border-[#E11D48]/60 p-3 shadow-2xl transition-transform duration-75 flex flex-col justify-between"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{ transform: 'translateZ(20px)' }}>
            <span className="text-[10px] font-heading font-black text-[#E11D48] uppercase tracking-wider">
              3D PERSPECTIVE
            </span>
            <div className="text-xs font-black text-white mt-0.5">ACETERNITY CARD</div>
          </div>
          <div className="flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
            <span className="text-[8px] font-mono text-zinc-400">Hover to rotate</span>
            <span className="px-2 py-0.5 rounded bg-[#E11D48] text-white font-mono text-[8px] font-bold">
              3D POP
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. BACKGROUND BEAMS & BEAMS WITH COLLISION
  if (slug.includes('beam') || slug === 'background-beams' || slug === 'background-lines') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                              linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Laser beams */}
        {[0, 1, 2, 3].map((b) => {
          const progress = ((frame * 2.5 + b * 45) % 180) / 180;
          const left = 15 + b * 22;
          const y = progress * 130 - 20;
          return (
            <div
              key={b}
              className="absolute w-[2px] bg-gradient-to-b from-transparent via-[#E11D48] to-white"
              style={{
                left: `${left}%`,
                top: `${y}%`,
                height: '50px',
                boxShadow: '0 0 10px #E11D48',
                opacity: Math.sin(progress * Math.PI),
              }}
            />
          );
        })}
        <span className="relative z-10 text-[9px] font-mono font-bold text-white bg-black/80 px-2.5 py-1 border border-[#E11D48]/70">
          BEAMS & COLLISIONS
        </span>
      </div>
    );
  }

  // 3. SPARKLES
  if (slug === 'sparkles' || slug.includes('sparkle') || slug === 'dotted-glow-background') {
    const sCount = lite ? 20 : 35;
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#060810] flex items-center justify-center">
        {Array.from({ length: sCount }).map((_, i) => {
          const flicker = Math.sin(frame * 0.1 + i * 1.5);
          const x = (i * 29) % 94 + 3;
          const y = (i * 47) % 90 + 5;
          const size = (i % 3) + 1.5;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: i % 3 === 0 ? '#E11D48' : '#FFFFFF',
                boxShadow: `0 0 8px ${i % 3 === 0 ? '#E11D48' : '#FFF'}`,
                opacity: 0.2 + (flicker + 1) * 0.4,
              }}
            />
          );
        })}
        <div className="relative z-10 font-heading text-sm font-black text-white tracking-widest text-center">
          <span className="text-[#E11D48]">✨</span> SPARKLES CANVAS
        </div>
      </div>
    );
  }

  // 4. LAMP EFFECT
  if (slug === 'lamp-effect' || slug.includes('lamp')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#05070E] flex flex-col items-center justify-end pb-4">
        {/* Conical light cone */}
        <div
          className="absolute -top-10 w-48 h-36 opacity-80"
          style={{
            background: 'conic-gradient(from 135deg at 50% 0%, transparent 0deg, #E11D48 45deg, #FF2B2B 90deg, transparent 90deg)',
            filter: 'blur(16px)',
          }}
        />
        <div className="w-24 h-1 bg-[#E11D48] rounded-full shadow-[0_0_15px_#E11D48] absolute top-2" />
        <div className="relative z-10 text-center">
          <div className="font-heading text-xs font-black tracking-widest text-white uppercase">
            LAMP HEADLINE
          </div>
          <div className="text-[9px] text-rose-300 font-mono">Conical Glow</div>
        </div>
      </div>
    );
  }

  // 5. WAVY BACKGROUND
  if (slug === 'wavy-background' || slug.includes('wave')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#050711] flex items-center justify-center">
        <svg className="w-full h-full absolute inset-0 opacity-70" viewBox="0 0 400 200" preserveAspectRatio="none">
          {[0, 1, 2].map((idx) => {
            const shift = frame * 0.08 + idx * 2;
            const y1 = 100 + Math.sin(shift) * 35;
            const y2 = 100 + Math.cos(shift + 1) * 35;
            const y3 = 100 + Math.sin(shift + 2) * 35;
            const d = `M 0,${y1} Q 100,${y2} 200,${y1} T 400,${y3}`;
            const stroke = idx === 0 ? '#E11D48' : idx === 1 ? '#FF90E8' : '#7FBCFF';
            return (
              <path
                key={idx}
                d={d}
                fill="none"
                stroke={stroke}
                strokeWidth={3}
                opacity={0.8}
              />
            );
          })}
        </svg>
        <span className="relative z-10 text-[9px] font-heading font-black tracking-widest text-white uppercase bg-black/80 px-2.5 py-1 border border-[#E11D48]/50">
          WAVY SINES
        </span>
      </div>
    );
  }

  // 6. AURORA BACKGROUND
  if (slug === 'aurora-background' || slug.includes('aurora')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
        <div
          className="absolute inset-[-20%] opacity-60 blur-3xl transition-transform"
          style={{
            background: `radial-gradient(circle at ${40 + Math.sin(frame * 0.04) * 20}% 30%, #E11D48, transparent 40%),
                         radial-gradient(circle at ${60 + Math.cos(frame * 0.03) * 20}% 60%, #9F1239, transparent 50%),
                         radial-gradient(circle at 50% 50%, #4338CA, transparent 60%)`,
            transform: `scale(${1 + Math.sin(frame * 0.05) * 0.1})`,
          }}
        />
        <span className="relative z-10 text-[10px] font-heading font-black tracking-widest text-white uppercase bg-black/60 px-3 py-1 border border-white/20">
          AURORA GLOW
        </span>
      </div>
    );
  }

  // 7. VORTEX
  if (slug === 'vortex' || slug.includes('vortex')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#05060D] flex items-center justify-center">
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2 + frame * 0.06;
          const r = 10 + i * 3.5;
          const x = 50 + Math.cos(angle) * r;
          const y = 50 + Math.sin(angle) * r;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '3px',
                height: '3px',
                backgroundColor: i % 2 === 0 ? '#E11D48' : '#FF90E8',
                boxShadow: `0 0 6px ${i % 2 === 0 ? '#E11D48' : '#FF90E8'}`,
              }}
            />
          );
        })}
        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#E11D48] relative z-10" />
      </div>
    );
  }

  // 8. CARD SPOTLIGHT
  if (slug === 'card-spotlight' || slug.includes('spotlight')) {
    const spotX = mousePos.x * 100;
    const spotY = mousePos.y * 100;
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full bg-[#080B14] flex items-center justify-center p-4"
      >
        <div
          className="w-44 h-28 rounded-xl border border-white/10 relative p-3 flex flex-col justify-between overflow-hidden"
          style={{
            background: `radial-gradient(150px circle at ${spotX}% ${spotY}%, rgba(225,29,72,0.4), rgba(10,10,15,0.95))`,
          }}
        >
          <span className="text-[10px] font-heading font-black text-[#E11D48] uppercase">SPOTLIGHT CARD</span>
          <span className="text-[8px] font-mono text-zinc-400">Hover inside card</span>
        </div>
      </div>
    );
  }

  // 9. TYPEWRITER EFFECT
  if (slug === 'typewriter-effect' || slug.includes('typewriter')) {
    const text = 'Build modern websites fast.';
    const charsToShow = Math.floor((frame * 0.2) % (text.length + 10));
    const isBlink = Math.floor(frame * 0.1) % 2 === 0;
    return (
      <div className="w-full h-full bg-[#0A0D18] flex items-center justify-center p-4">
        <div className="font-heading text-xs font-black text-white tracking-wide flex items-center">
          {text.slice(0, charsToShow)}
          <span className={`w-2 h-3.5 bg-[#E11D48] inline-block ml-0.5 ${isBlink ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    );
  }

  // 10. FLOATING DOCK
  if (slug === 'floating-dock' || slug.includes('dock')) {
    const icons = ['⚡', '💎', '🔥', '🚀', '⭐'];
    return (
      <div className="w-full h-full bg-[#060810] flex items-center justify-center p-4">
        <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/5 border border-white/15 backdrop-blur shadow-2xl">
          {icons.map((icon, i) => {
            const hoverScale = Math.sin(frame * 0.08 + i) * 0.2 + 1;
            return (
              <div
                key={i}
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs transition-transform"
                style={{ transform: `scale(${hoverScale})` }}
              >
                {icon}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // DEFAULT ACETERNITY AMBIENT STAGE
  const spotX = mousePos.x * 100;
  const spotY = mousePos.y * 100;
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden bg-[#070913] flex flex-col items-center justify-center p-4"
    >
      <div
        className="absolute w-40 h-40 rounded-full blur-2xl opacity-35 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, #E11D48 0%, transparent 70%)`,
          left: `${spotX - 50}%`,
          top: `${spotY - 50}%`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
        <span className="w-9 h-9 rounded-md bg-[#E11D48] border-2 border-white shadow-[2px_2px_0px_#FF2B2B] flex items-center justify-center text-white text-sm font-black">
          🔺
        </span>
        <div className="font-heading text-xs font-black uppercase text-white tracking-wide">
          {slug.replace(/-/g, ' ')}
        </div>
        <div className="text-[9px] text-rose-300 font-mono font-bold">
          @aceternity • LIVE DEMO
        </div>
      </div>
    </div>
  );
};

export default AceternityPreview;

