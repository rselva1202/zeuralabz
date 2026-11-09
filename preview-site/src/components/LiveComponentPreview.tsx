import React, { useState, useEffect } from 'react';
import { CanvasEngine, BackgroundType } from './engine/CanvasEngine';
import { TextEngine, TextAnimationType } from './engine/TextEngine';
import { BaseButton, type ButtonVariant } from './engine/BaseButton';

interface LiveComponentPreviewProps {
  slug: string;
  category: string;
  name: string;
}

const buttonSlugToVariant: Record<string, ButtonVariant> = {
  'gradient': 'gradient',
  'neon': 'neon',
  'magnetic': 'magnetic',
  'shimmer': 'shimmer',
  '3d': '3d',
  'outline-fill': 'outline-fill',
  'loading': 'loading',
  'icon': 'icon',
  'icon-morph': 'icon',
  'social': 'social',
  'cyber-glitch': 'social',
  'glass-btn': 'glass-btn',
  'glow': 'glow',
  'border-beam': 'glow',
  'pill': 'pill',
  'ripple': 'pill',
  'arrow': 'arrow',
  'swipe-arrow': 'arrow',
  'play': 'play',
  'confetti': 'play',
  'download': 'download',
  'copy-snippet': 'download',
};

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

  // ==================== TEXT ANIMATIONS (Text Engine) ====================
  if (category === 'text-animations') {
    const validTextMap: Record<string, { type: TextAnimationType; text?: string; fontSize?: string }> = {
      'split-text': { type: 'split', text: 'ZEURALABZ', fontSize: '2.4rem' },
      typewriter: { type: 'typewriter', text: 'Next-Gen UI Systems', fontSize: '1.75rem' },
      'gradient-text': { type: 'gradient', text: 'Fluid Chromatic Energy', fontSize: '2rem' },
      'blur-text': { type: 'blur', text: 'Crystalline Focus', fontSize: '2.2rem' },
      scramble: { type: 'scramble', text: 'SYSTEM_OVERRIDE_01', fontSize: '1.65rem' },
      shiny: { type: 'shiny', text: 'METALLIC SHEEN', fontSize: '2.2rem' },
      'rotating-words': { type: 'rotating', text: 'FUTURISTIC', fontSize: '2.2rem' },
      'counter-roll': { type: 'counter', fontSize: '2.5rem' },
      'bounce-letters': { type: 'bounce', text: 'BOUNCING ENERGY', fontSize: '2rem' },
      'underline-draw': { type: 'bounce', text: 'BOUNCING ENERGY', fontSize: '2rem' },
      'fade-up': { type: 'fade-up', text: 'CINEMATIC SCALE', fontSize: '2.2rem' },
      'word-swap': { type: 'fade-up', text: 'CINEMATIC SCALE', fontSize: '2.2rem' },
      glitch: { type: 'glitch', text: 'CYBER_ANOMALY', fontSize: '2.2rem' },
      'glitch-text': { type: 'glitch', text: 'CYBER_ANOMALY', fontSize: '2.2rem' },
      'neon-text': { type: 'neon', text: 'ELECTRIC GLOW', fontSize: '2.2rem' },
      'glow-headline': { type: 'neon', text: 'ELECTRIC GLOW', fontSize: '2.2rem' },
      'wave-text': { type: 'wave', text: 'OCEANIC RHYTHM', fontSize: '2rem' },
      'wave-motion': { type: 'wave', text: 'OCEANIC RHYTHM', fontSize: '2rem' },
      'reveal-text': { type: 'reveal', text: 'UNVEILED BEAUTY', fontSize: '2.2rem' },
      'mask-reveal': { type: 'reveal', text: 'UNVEILED BEAUTY', fontSize: '2.2rem' },
      'marquee-text': { type: 'marquee', text: 'ZEURALABZ • DESIGN MATRIX', fontSize: '1.75rem' },
    };

    const cfg = validTextMap[slug] || { type: 'split', text: name, fontSize: '2rem' };

    return (
      <div className="relative w-full h-full overflow-hidden">
        <TextEngine
          type={cfg.type}
          text={cfg.text}
          fontSize={cfg.fontSize}
          speed={1.0}
        />
      </div>
    );
  }

  // ==================== BUTTONS ====================
  if (category === 'buttons') {
    const variant = buttonSlugToVariant[slug] || 'gradient';
    return (
      <div className="w-full h-full min-h-[160px] flex items-center justify-center p-6 bg-gradient-to-b from-[#0f1433] to-[#0a0e27] overflow-hidden select-none">
        <BaseButton
          variant={variant}
          size="md"
          interactiveDemo={true}
        />
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

