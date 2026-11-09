/**
 * Source: React Bits • MIT + Commons Clause • https://reactbits.dev
 * Author: David Haz (https://github.com/DavidHDev/react-bits)
 * Rendered live inside ZEURALABZ preview cards
 */

import React, { useState, useEffect, useRef } from 'react';

interface PreviewProps {
  slug: string;
  lite?: boolean;
}

export const ReactBitsPreview: React.FC<PreviewProps> = ({ slug, lite = true }) => {
  const [frame, setFrame] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const loop = (now: number) => {
      // 30fps cap for grid preview smoothness
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

  // 1. AURORA
  if (slug === 'aurora' || slug.includes('aurora')) {
    const shift = (frame * 1.5) % 360;
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#0A0D18] flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-75 blur-2xl transition-transform duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.05) * 20}% ${40 + Math.cos(frame * 0.04) * 20}%, #00F5D4, transparent 50%),
                         radial-gradient(circle at ${70 - Math.cos(frame * 0.05) * 25}% ${60 + Math.sin(frame * 0.03) * 20}%, #7928CA, transparent 55%),
                         radial-gradient(circle at ${30 + Math.sin(frame * 0.03) * 20}% ${70 - Math.sin(frame * 0.04) * 20}%, #FF0080, transparent 45%)`,
            transform: `scale(1.2) rotate(${shift * 0.1}deg)`,
          }}
        />
        <div className="relative z-10 font-heading text-xs uppercase font-black text-white/90 tracking-widest px-3 py-1 bg-black/40 border border-white/20 shadow-md">
          AURORA SHADER
        </div>
      </div>
    );
  }

  // 2. PARTICLES
  if (slug === 'particles' || slug.includes('particle')) {
    const pCount = lite ? 20 : 35;
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="w-full h-full relative overflow-hidden bg-[#070913] flex items-center justify-center"
      >
        {Array.from({ length: pCount }).map((_, i) => {
          const angle = (i / pCount) * Math.PI * 2 + frame * 0.02;
          const radius = 25 + (i % 5) * 15 + Math.sin(frame * 0.03 + i) * 8;
          const px = 50 + Math.cos(angle) * (radius * 0.8) + (mousePos.x - 0.5) * 15;
          const py = 50 + Math.sin(angle) * radius + (mousePos.y - 0.5) * 15;
          const size = 2 + (i % 3);
          return (
            <div
              key={i}
              className="absolute rounded-full transition-transform"
              style={{
                left: `${px}%`,
                top: `${py}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: i % 2 === 0 ? '#00F5D4' : '#FF90E8',
                boxShadow: `0 0 6px ${i % 2 === 0 ? '#00F5D4' : '#FF90E8'}`,
                opacity: 0.8,
              }}
            />
          );
        })}
        <span className="relative z-10 text-[10px] font-mono font-bold tracking-wider text-cyan-300 uppercase bg-black/60 px-2 py-0.5 border border-cyan-500/30">
          ● CONNECTED PARTICLES
        </span>
      </div>
    );
  }

  // 3. SPLIT TEXT
  if (slug === 'split-text' || slug.includes('split')) {
    const letters = "REACT BITS".split("");
    return (
      <div className="w-full h-full bg-[#0E111C] flex items-center justify-center overflow-hidden">
        <div className="flex gap-1">
          {letters.map((char, idx) => {
            const wave = Math.sin((frame * 0.15) - idx * 0.4);
            const translateY = wave * 8;
            const color = wave > 0 ? '#7FBCFF' : '#FF90E8';
            return (
              <span
                key={idx}
                className="font-heading text-lg font-black inline-block tracking-wider"
                style={{
                  transform: `translateY(${translateY}px)`,
                  color: char === " " ? "transparent" : color,
                  textShadow: wave > 0 ? '0 0 10px rgba(127,188,255,0.7)' : 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. WAVES
  if (slug === 'waves' || slug.includes('wave')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#0A0D18] flex items-center justify-center">
        <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 400 200" preserveAspectRatio="none">
          {[0, 1, 2, 3].map((layer) => {
            const offset = frame * (0.05 + layer * 0.02);
            const p1 = 100 + Math.sin(offset) * 35;
            const p2 = 100 + Math.cos(offset + 1) * 35;
            const p3 = 100 + Math.sin(offset + 2) * 35;
            const d = `M 0,${p1} Q 100,${p2} 200,${p1} T 400,${p3} L 400,200 L 0,200 Z`;
            const fill = layer === 0 ? '#1E1B4B' : layer === 1 ? '#312E81' : layer === 2 ? '#4338CA' : '#6366F1';
            return <path key={layer} d={d} fill={fill} opacity={0.4 + layer * 0.15} />;
          })}
        </svg>
        <span className="relative z-10 text-[10px] font-heading font-black uppercase tracking-widest text-indigo-200 bg-black/60 px-2.5 py-1 border border-indigo-400/40">
          UNDULATING WAVES
        </span>
      </div>
    );
  }

  // 5. TRUE FOCUS / SPOTLIGHT
  if (slug === 'true-focus' || slug === 'spotlight-card' || slug.includes('focus')) {
    const words = ["FOCUSED", "PRECISION", "DYNAMIC"];
    const activeWord = words[Math.floor((frame * 0.03) % words.length)];
    return (
      <div className="w-full h-full bg-[#0D1117] flex flex-col items-center justify-center relative p-4">
        <div className="relative p-3 border border-emerald-500/40 bg-black/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <div className="font-heading text-sm font-black text-emerald-400 tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            {activeWord}
          </div>
          {/* Reticle brackets */}
          <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400" />
        </div>
      </div>
    );
  }

  // 6. SHINY TEXT / GRADIENT TEXT
  if (slug === 'shiny-text' || slug.includes('shiny') || slug.includes('gradient-text')) {
    const shinePos = (frame * 2) % 200;
    return (
      <div className="w-full h-full bg-[#090C15] flex items-center justify-center p-4">
        <div
          className="font-heading text-base font-black uppercase tracking-wider text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(110deg, #64748B 0%, #FFFFFF ${shinePos - 50}%, #7FBCFF ${shinePos}%, #64748B ${shinePos + 50}%)`,
          }}
        >
          METALLIC SHINE
        </div>
      </div>
    );
  }

  // 7. DECRYPTED / SCRAMBLE TEXT
  if (slug === 'decrypted-text' || slug.includes('decrypt') || slug === 'scramble-text') {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const target = "AUTHENTICATED";
    const progress = Math.floor((frame * 0.15) % (target.length + 8));
    const displayed = target
      .split("")
      .map((c, i) => (i < progress ? c : chars[Math.floor((frame + i * 3) % chars.length)]))
      .join("");
    return (
      <div className="w-full h-full bg-[#0A0D14] flex flex-col items-center justify-center p-4 font-mono">
        <div className="text-[10px] text-zinc-500 mb-1">CYBER RESOLVE</div>
        <div className="text-xs font-black text-cyan-400 tracking-wider bg-cyan-950/40 px-2.5 py-1 border border-cyan-500/40">
          {displayed}
        </div>
      </div>
    );
  }

  // 8. TILTED CARD / BOUNCE CARDS
  if (slug === 'tilted-card' || slug === 'bounce-cards' || slug.includes('tilt')) {
    const tiltX = Math.sin(frame * 0.05) * 12;
    const tiltY = Math.cos(frame * 0.04) * 12;
    return (
      <div className="w-full h-full bg-[#090D1A] flex items-center justify-center p-4" style={{ perspective: '600px' }}>
        <div
          className="w-28 h-20 bg-gradient-to-tr from-indigo-600 to-pink-500 border-2 border-white shadow-xl flex flex-col items-center justify-center transition-transform"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <span className="text-[10px] font-heading font-black text-white uppercase" style={{ transform: 'translateZ(15px)' }}>
            3D TILT
          </span>
          <span className="text-[8px] font-mono text-white/80" style={{ transform: 'translateZ(10px)' }}>
            INTERACTIVE
          </span>
        </div>
      </div>
    );
  }

  // 9. HYPERSPEED / STAR WARP
  if (slug === 'hyperspeed' || slug.includes('speed') || slug.includes('warp')) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const travel = ((frame * 3 + i * 15) % 150) / 100;
          const x = 50 + Math.cos(angle) * (travel * 60);
          const y = 50 + Math.sin(angle) * (travel * 60);
          const len = travel * 25;
          return (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${len}px`,
                height: '1.5px',
                transform: `rotate(${angle + Math.PI}rad)`,
                opacity: travel,
              }}
            />
          );
        })}
        <span className="relative z-10 text-[9px] font-mono font-bold text-white bg-black/80 px-2 py-0.5 border border-cyan-400/50">
          HYPERSPEED WARP
        </span>
      </div>
    );
  }

  // DEFAULT REACT BITS INTERACTIVE AMBIENT STAGE
  const hue = (frame * 1.2) % 360;
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full h-full relative overflow-hidden bg-[#0A0E1A] flex flex-col items-center justify-center p-4"
    >
      <div
        className="absolute w-36 h-36 rounded-full blur-2xl opacity-40 transition-all duration-300"
        style={{
          background: `radial-gradient(circle, hsl(${hue}, 80%, 60%) 0%, transparent 70%)`,
          left: `${mousePos.x * 100 - 45}%`,
          top: `${mousePos.y * 100 - 45}%`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
        <span className="w-9 h-9 rounded-md bg-[#7FBCFF] border-2 border-white shadow-[2px_2px_0px_#E11D48] flex items-center justify-center text-black text-sm font-black">
          ✨
        </span>
        <div className="font-heading text-xs font-black uppercase text-white tracking-wide">
          {slug.replace(/-/g, ' ')}
        </div>
        <div className="text-[9px] text-cyan-300 font-mono font-bold">
          @react-bits • LIVE DEMO
        </div>
      </div>
    </div>
  );
};

export default ReactBitsPreview;

