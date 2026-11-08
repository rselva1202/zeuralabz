import React, { useState, useEffect } from 'react';
import { CanvasEngine, BackgroundType } from './engine/CanvasEngine';

interface LiveComponentPreviewProps {
  slug: string;
  category: string;
  name: string;
}

export const LiveComponentPreview: React.FC<LiveComponentPreviewProps> = ({ slug, category, name }) => {
  const [toggleState, setToggleState] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [rating, setRating] = useState(4);
  const [counter, setCounter] = useState(1280);

  const fullText = "Build faster with AI.";
  useEffect(() => {
    if (slug === 'typewriter') {
      const interval = setInterval(() => {
        setTypedIndex((prev) => (prev >= fullText.length ? 0 : prev + 1));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [slug]);

  const words = ['Adaptive', 'Performant', 'Sensory', 'Next-Gen'];
  useEffect(() => {
    if (slug === 'rotating-words' || slug === 'word-swap') {
      const interval = setInterval(() => {
        setActiveWordIndex((prev) => (prev + 1) % words.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [slug]);

  useEffect(() => {
    if (slug === 'counter-roll') {
      const interval = setInterval(() => {
        setCounter((prev) => (prev > 1400 ? 1280 : prev + 17));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [slug]);

  // ==================== BACKGROUNDS (Canvas Engine) ====================
  if (category === 'backgrounds') {
    const validMap: Record<string, BackgroundType> = {
      aurora: 'aurora',
      galaxy: 'galaxy',
      particles: 'particles',
      dots: 'dots',
      starfield: 'starfield',
      liquid: 'liquid',
      grid: 'grid',
      mesh: 'mesh',
      circuit: 'mesh',
      noise: 'noise',
      beam: 'beam',
      hexagon: 'hexagon',
      'hex-mesh': 'hexagon',
      waves: 'waves',
      lines: 'waves',
      gradient: 'gradient',
      nebula: 'nebula',
      clouds: 'nebula',
      fireflies: 'fireflies',
      vignette: 'fireflies',
    };
    const bgType = validMap[slug] || 'galaxy';

    return (
      <div className="relative w-full h-full overflow-hidden">
        <CanvasEngine type={bgType} speed={0.8} glow={1.25} />
      </div>
    );
  }

  // ==================== TEXT ANIMATIONS ====================
  if (category === 'text-animations') {
    if (slug === 'split-text') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <div className="flex gap-1">
            {"ZEURALABZ".split('').map((char, i) => (
              <span
                key={i}
                className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 inline-block animate-bounce"
                style={{ animationDelay: `${i * 120}ms`, animationDuration: '1.4s' }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      );
    }
    if (slug === 'typewriter') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4 font-mono">
          <span className="text-sm text-cyan-400 font-bold">
            {fullText.slice(0, typedIndex)}
            <span className="animate-pulse text-white">|</span>
          </span>
        </div>
      );
    }
    if (slug === 'gradient-text') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-pulse">
            Fluid Radiance
          </span>
        </div>
      );
    }
    if (slug === 'shiny') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <span className="relative text-xl font-bold text-zinc-400 overflow-hidden">
            Luminescent Sheen
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[shimmer_2s_infinite] -skew-x-12" />
          </span>
        </div>
      );
    }
    if (slug === 'rotating-words' || slug === 'word-swap') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4 font-mono">
          <span className="text-xs text-zinc-500 mr-2">Architecture:</span>
          <span className="text-sm font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800 transition-all duration-300">
            {words[activeWordIndex]}
          </span>
        </div>
      );
    }
    if (slug === 'counter-roll') {
      return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4">
          <span className="text-2xl font-black font-mono text-emerald-400">{counter.toLocaleString()}+</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Live Telemetry</span>
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4">
        <span className="text-sm font-bold text-zinc-200 tracking-wide">{name}</span>
      </div>
    );
  }

  // ==================== BUTTONS ====================
  if (category === 'buttons') {
    if (slug === 'shimmer') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <button className="relative px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-white font-medium text-xs overflow-hidden group hover:border-zinc-500 transition shadow-lg">
            <span className="relative z-10 flex items-center gap-1.5">
              Shimmer Button <span className="text-cyan-400">➔</span>
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
          </button>
        </div>
      );
    }
    if (slug === 'neon') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <button className="px-5 py-2 rounded-xl bg-black border-2 border-emerald-400 text-emerald-400 font-bold text-xs shadow-[0_0_15px_rgba(52,211,153,0.5)] hover:bg-emerald-400 hover:text-black transition duration-300">
            Cyber Neon
          </button>
        </div>
      );
    }
    if (slug === 'magnetic' || slug === '3d') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-[0_5px_0_#3730a3] active:translate-y-1 active:shadow-[0_1px_0_#3730a3] transition-all">
            3D Tactile Push
          </button>
        </div>
      );
    }
    if (slug === 'glass-btn') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-medium text-xs transition">
            Frosted Glass
          </button>
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-black flex items-center justify-center p-4">
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-xs shadow-md">
          {name}
        </button>
      </div>
    );
  }

  // ==================== CARDS ====================
  if (category === 'cards') {
    if (slug === 'glass') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <div className="w-48 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl text-left">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs mb-2">⚡</div>
            <div className="text-xs font-bold text-white">Glass Specular</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Frosted acrylic depth</div>
          </div>
        </div>
      );
    }
    if (slug === 'pricing') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-3">
          <div className="w-44 p-3 rounded-xl bg-zinc-900 border border-indigo-500/40 text-center">
            <span className="text-[9px] uppercase tracking-wider text-indigo-400 font-bold">Pro Tier</span>
            <div className="text-lg font-black text-white mt-0.5">$29<span className="text-xs font-normal text-zinc-400">/mo</span></div>
            <div className="text-[9px] text-emerald-400 mt-1">✓ 1M+ Combinations</div>
          </div>
        </div>
      );
    }
    if (slug === 'tilt') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4 [perspective:300px]">
          <div className="w-44 p-3 rounded-xl bg-gradient-to-tr from-zinc-900 to-zinc-800 border border-zinc-700 [transform:rotateX(10deg)_rotateY(-15deg)] hover:[transform:rotateX(0deg)_rotateY(0deg)] transition duration-300 shadow-xl">
            <div className="text-xs font-bold text-white">3D Gyroscope</div>
            <div className="text-[10px] text-zinc-400 mt-0.5">Interactive hover tilt</div>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-black flex items-center justify-center p-4">
        <div className="w-44 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-left">
          <div className="text-xs font-bold text-zinc-200">{name}</div>
          <div className="text-[10px] text-zinc-500 mt-1">Interactive layout primitive</div>
        </div>
      </div>
    );
  }

  // ==================== FORMS ====================
  if (category === 'forms') {
    if (slug === 'toggle') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <button
            onClick={() => setToggleState(!toggleState)}
            className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 border ${
              toggleState ? 'bg-indigo-600 border-indigo-400' : 'bg-zinc-800 border-zinc-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                toggleState ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      );
    }
    if (slug === 'search') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <div className="w-48 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-between text-xs text-zinc-400">
            <span>Search docs...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700">⌘K</kbd>
          </div>
        </div>
      );
    }
    if (slug === 'otp') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <div className="flex gap-1.5">
            {[4, 9, 2, '•'].map((val, i) => (
              <div key={i} className="w-7 h-9 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono font-bold text-sm text-white">
                {val}
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  // ==================== LOADERS ====================
  if (category === 'loaders') {
    if (slug === 'spinner') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 border-r-cyan-400 animate-spin" />
        </div>
      );
    }
    if (slug === 'dots') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4 gap-1.5">
          {[0, 150, 300].map((delay, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      );
    }
    if (slug === 'skeleton') {
      return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 gap-2 w-44">
          <div className="w-full h-3 rounded bg-zinc-800 animate-pulse" />
          <div className="w-3/4 h-2.5 rounded bg-zinc-800 animate-pulse" />
          <div className="w-1/2 h-2.5 rounded bg-zinc-800 animate-pulse" />
        </div>
      );
    }
  }

  // ==================== ANIMATIONS ====================
  if (category === 'animations') {
    if (slug === 'star-rating') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center p-4 gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-lg transition transform hover:scale-125 ${
                star <= rating ? 'text-amber-400' : 'text-zinc-700'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      );
    }
    if (slug === 'marquee') {
      return (
        <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden p-2">
          <div className="flex gap-4 animate-[marquee_5s_linear_infinite] whitespace-nowrap text-xs font-mono text-zinc-400">
            <span>◆ NEXT.JS</span>
            <span>◆ VITE</span>
            <span>◆ TAILWIND</span>
            <span>◆ MOTION</span>
          </div>
        </div>
      );
    }
  }

  // ==================== HEROES & LAYOUTS ====================
  if (category === 'heroes' || category === 'layouts') {
    return (
      <div className="w-full h-full bg-black p-3 flex flex-col items-center justify-center">
        <div className="w-48 h-24 rounded-lg border border-zinc-800 bg-zinc-950 p-2 flex flex-col justify-between overflow-hidden relative shadow-inner">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded bg-zinc-800" />
              <div className="w-4 h-1 rounded bg-zinc-800" />
            </div>
          </div>
          <div className="space-y-1 text-center py-1">
            <div className="w-16 h-2 rounded bg-white/70 mx-auto" />
            <div className="w-24 h-1.5 rounded bg-zinc-700 mx-auto" />
          </div>
          <div className="w-12 h-2.5 rounded-full bg-indigo-500 mx-auto" />
        </div>
      </div>
    );
  }

  // Default Fallback
  return (
    <div className="w-full h-full bg-zinc-950 flex items-center justify-center p-4">
      <span className="text-xs font-mono text-indigo-400 font-medium px-3 py-1 rounded bg-indigo-950/40 border border-indigo-900">
        {name}
      </span>
    </div>
  );
};

