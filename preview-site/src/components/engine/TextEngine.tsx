import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type TextAnimationType =
  | 'split'
  | 'typewriter'
  | 'gradient'
  | 'blur'
  | 'scramble'
  | 'shiny'
  | 'rotating'
  | 'counter'
  | 'bounce'
  | 'fade-up'
  | 'glitch'
  | 'neon'
  | 'wave'
  | 'reveal'
  | 'marquee';

export interface TextEngineProps {
  /**
   * The animation archetype to render.
   */
  type?: TextAnimationType;
  /**
   * Primary text string to animate.
   */
  text?: string;
  /**
   * Words list for 'rotating' or word cycle modes.
   */
  words?: string[];
  /**
   * Target number for 'counter' mode.
   */
  targetNumber?: number;
  /**
   * Speed multiplier (default: 1.0).
   */
  speed?: number;
  /**
   * Stagger delay between characters/words in seconds (default: 0.04).
   */
  delay?: number;
  /**
   * Primary color or CSS gradient (default: '#ffffff').
   */
  color?: string;
  /**
   * Font size CSS value (default: '2.25rem').
   */
  fontSize?: string;
  /**
   * Font weight CSS value (default: '800').
   */
  fontWeight?: string | number;
  /**
   * Optional custom CSS class name.
   */
  className?: string;
  /**
   * Optional inline styles.
   */
  style?: React.CSSProperties;
  /**
   * Whether to loop the animation continuously (default: true).
   */
  loop?: boolean;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________10101001';

export const TextEngine: React.FC<TextEngineProps> = ({
  type = 'split',
  text = 'ZEURALABZ',
  words = ['CREATIVE', 'POWERFUL', 'DYNAMIC', 'FUTURISTIC'],
  targetNumber = 9840,
  speed = 1.0,
  delay = 0.04,
  color = '#ffffff',
  fontSize = '2.25rem',
  fontWeight = '800',
  className = '',
  style,
  loop = true,
}) => {
  // Loop key for resetting animations
  const [cycleKey, setCycleKey] = useState(0);

  // Typewriter state
  const [typedChars, setTypedChars] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Rotating words state
  const [wordIndex, setWordIndex] = useState(0);

  // Scramble text state
  const [scrambleText, setScrambleText] = useState(text);

  // Counter state
  const [counterVal, setCounterVal] = useState(0);

  // 1. Loop ticker for discrete animations
  useEffect(() => {
    if (!loop) return;
    if (type === 'split' || type === 'blur' || type === 'fade-up' || type === 'reveal') {
      const interval = setInterval(() => {
        setCycleKey((prev) => prev + 1);
      }, (3500 / speed));
      return () => clearInterval(interval);
    }
  }, [type, speed, loop]);

  // 2. Typewriter Effect Loop
  useEffect(() => {
    if (type !== 'typewriter') return;
    let timeout: ReturnType<typeof setTimeout>;
    const full = text;

    if (!isDeleting && typedChars.length < full.length) {
      timeout = setTimeout(() => {
        setTypedChars(full.slice(0, typedChars.length + 1));
      }, (110 / speed));
    } else if (!isDeleting && typedChars.length === full.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, (1600 / speed));
    } else if (isDeleting && typedChars.length > 0) {
      timeout = setTimeout(() => {
        setTypedChars(full.slice(0, typedChars.length - 1));
      }, (60 / speed));
    } else if (isDeleting && typedChars.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, (400 / speed));
    }

    return () => clearTimeout(timeout);
  }, [type, typedChars, isDeleting, text, speed]);

  // 3. Rotating Words Loop
  useEffect(() => {
    if (type !== 'rotating') return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, (2200 / speed));
    return () => clearInterval(interval);
  }, [type, words.length, speed]);

  // 4. Matrix Code Scramble Loop
  useEffect(() => {
    if (type !== 'scramble') return;
    let iteration = 0;
    const original = text;
    let interval: ReturnType<typeof setInterval>;

    const startScramble = () => {
      iteration = 0;
      interval = setInterval(() => {
        setScrambleText(
          original
            .split('')
            .map((_char, index) => {
              if (index < iteration) {
                return original[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );

        if (iteration >= original.length) {
          clearInterval(interval);
          if (loop) {
            setTimeout(startScramble, (2000 / speed));
          }
        }
        iteration += 1 / 3;
      }, (35 / speed));
    };

    startScramble();
    return () => clearInterval(interval);
  }, [type, text, speed, loop]);

  // 5. Counter Roll Loop
  useEffect(() => {
    if (type !== 'counter') return;
    let start = 0;
    const stepTime = 30 / speed;
    const duration = 1800 / speed;
    const totalSteps = duration / stepTime;
    const increment = targetNumber / totalSteps;

    const runCounter = () => {
      start = 0;
      const interval = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setCounterVal(targetNumber);
          clearInterval(interval);
          if (loop) {
            setTimeout(runCounter, (2200 / speed));
          }
        } else {
          setCounterVal(Math.floor(start));
        }
      }, stepTime);
    };

    runCounter();
  }, [type, targetNumber, speed, loop]);

  const containerStyle: React.CSSProperties = {
    fontSize,
    fontWeight,
    color,
    ...style,
  };

  return (
    <div
      className={`relative w-full h-full min-h-[160px] flex items-center justify-center p-6 select-none overflow-hidden ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, #111742 0%, #0a0e27 75%, #060817 100%)',
      }}
    >
      {/* 1. SPLIT TEXT: Letters stagger in with spring bounce */}
      {type === 'split' && (
        <div key={cycleKey} className="flex flex-wrap justify-center gap-x-3 gap-y-1" style={containerStyle}>
          {text.split(' ').map((word, wIdx) => (
            <span key={wIdx} className="inline-flex overflow-hidden">
              {word.split('').map((char, cIdx) => (
                <motion.span
                  key={cIdx}
                  initial={{ y: '120%', opacity: 0, rotate: 10 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: (wIdx * 4 + cIdx) * (delay / speed),
                    type: 'spring',
                    stiffness: 160,
                    damping: 12,
                  }}
                  className="inline-block text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </div>
      )}

      {/* 2. TYPEWRITER: Terminal typing with blinking neon cursor */}
      {type === 'typewriter' && (
        <div className="font-mono flex items-center justify-center tracking-tight" style={containerStyle}>
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">{typedChars}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-[3px] h-[1em] ml-1 bg-white shadow-[0_0_12px_#38bdf8]"
          />
        </div>
      )}

      {/* 3. GRADIENT TEXT: Continuous fluid color wave */}
      {type === 'gradient' && (
        <span
          className="font-black tracking-tight text-transparent bg-clip-text animate-gradient-flow text-center"
          style={{
            ...containerStyle,
            backgroundImage:
              'linear-gradient(135deg, #38bdf8 0%, #818cf8 25%, #ec4899 50%, #fef08a 75%, #38bdf8 100%)',
            backgroundSize: '300% 300%',
            animation: `gradientFlow ${4 / speed}s ease infinite`,
          }}
        >
          {text}
          <style>{`
            @keyframes gradientFlow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </span>
      )}

      {/* 4. BLUR TEXT: Letters emerge from heavy blur to sharp 4K */}
      {type === 'blur' && (
        <div key={cycleKey} className="flex flex-wrap justify-center gap-x-2" style={containerStyle}>
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ filter: 'blur(20px)', opacity: 0, y: 15 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{
                delay: i * (0.05 / speed),
                duration: 0.6 / speed,
                ease: 'easeOut',
              }}
              className="inline-block text-white drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      )}

      {/* 5. SCRAMBLE TEXT: Cyberpunk matrix decoding effect */}
      {type === 'scramble' && (
        <span
          className="font-mono font-bold tracking-wider text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.7)] text-center"
          style={containerStyle}
        >
          {scrambleText}
        </span>
      )}

      {/* 6. SHINY TEXT: Specular metallic light beam sweep */}
      {type === 'shiny' && (
        <span
          className="relative font-black tracking-tight overflow-hidden text-center"
          style={containerStyle}
        >
          <span className="text-zinc-300 drop-shadow-md">{text}</span>
          <span
            className="absolute inset-0 block pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              mixBlendMode: 'color-dodge',
              animation: `shinySweep ${2.2 / speed}s infinite`,
            }}
          />
          <style>{`
            @keyframes shinySweep {
              0% { transform: translateX(-150%) skewX(-20deg); }
              100% { transform: translateX(150%) skewX(-20deg); }
            }
          `}</style>
        </span>
      )}

      {/* 7. ROTATING WORDS: 3D perspective word tumbling */}
      {type === 'rotating' && (
        <div className="flex items-center justify-center [perspective:800px]" style={containerStyle}>
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ rotateX: 90, opacity: 0, y: 20 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: -90, opacity: 0, y: -20 }}
              transition={{ duration: 0.5 / speed, ease: 'easeInOut' }}
              className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}

      {/* 8. COUNTER ROLL: Animated statistical numbers rolling up */}
      {type === 'counter' && (
        <div className="font-mono font-black flex items-center justify-center tracking-tight" style={containerStyle}>
          <span className="text-indigo-400 mr-2 text-2xl">+</span>
          <span className="text-white drop-shadow-[0_0_25px_rgba(99,102,241,0.8)]">
            {counterVal.toLocaleString()}
          </span>
          <span className="text-emerald-400 text-lg ml-2 font-sans font-bold">▲</span>
        </div>
      )}

      {/* 9. BOUNCE LETTERS: Elastic trampoline leap */}
      {type === 'bounce' && (
        <div className="flex flex-wrap justify-center" style={containerStyle}>
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -18, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2 / speed,
                delay: i * (0.08 / speed),
                ease: 'easeInOut',
              }}
              className="inline-block font-black text-amber-300 drop-shadow-[0_0_20px_rgba(252,211,77,0.6)]"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      )}

      {/* 10. FADE UP TEXT: Cinematic upward drift with tracking glow */}
      {type === 'fade-up' && (
        <div key={cycleKey} className="overflow-hidden text-center" style={containerStyle}>
          <motion.div
            initial={{ y: 40, opacity: 0, letterSpacing: '0.2em' }}
            animate={{ y: 0, opacity: 1, letterSpacing: '0.02em' }}
            transition={{ duration: 0.9 / speed, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-transparent bg-clip-text bg-gradient-to-t from-white via-slate-100 to-indigo-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            {text}
          </motion.div>
        </div>
      )}

      {/* 11. GLITCH TEXT: Chromatic aberration RGB displacement */}
      {type === 'glitch' && (
        <div className="relative font-black tracking-wider text-white text-center" style={containerStyle}>
          <span className="relative z-10">{text}</span>
          <span
            className="absolute inset-0 text-cyan-400 pointer-events-none select-none z-0"
            style={{
              animation: `glitchCyan ${1.8 / speed}s infinite linear alternate-reverse`,
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-rose-500 pointer-events-none select-none z-0"
            style={{
              animation: `glitchRose ${1.5 / speed}s infinite linear alternate-reverse`,
            }}
          >
            {text}
          </span>
          <style>{`
            @keyframes glitchCyan {
              0% { transform: translate(0); }
              20% { transform: translate(-3px, 2px); }
              40% { transform: translate(-2px, -2px); }
              60% { transform: translate(3px, 1px); }
              80% { transform: translate(-1px, 2px); }
              100% { transform: translate(0); }
            }
            @keyframes glitchRose {
              0% { transform: translate(0); }
              20% { transform: translate(3px, -2px); }
              40% { transform: translate(2px, 2px); }
              60% { transform: translate(-3px, -1px); }
              80% { transform: translate(2px, -1px); }
              100% { transform: translate(0); }
            }
          `}</style>
        </div>
      )}

      {/* 12. NEON TEXT: High-voltage atmospheric neon glow */}
      {type === 'neon' && (
        <span
          className="font-black tracking-wide text-cyan-200 text-center"
          style={{
            ...containerStyle,
            textShadow:
              '0 0 7px #fff, 0 0 14px #38bdf8, 0 0 28px #38bdf8, 0 0 50px #818cf8, 0 0 80px #6366f1',
            animation: `neonFlicker ${3 / speed}s infinite`,
          }}
        >
          {text}
          <style>{`
            @keyframes neonFlicker {
              0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                opacity: 1;
                filter: brightness(1.2);
              }
              20%, 24%, 55% {
                opacity: 0.6;
                filter: brightness(0.8);
              }
            }
          `}</style>
        </span>
      )}

      {/* 13. WAVE TEXT: Sinusoidal undulating letters */}
      {type === 'wave' && (
        <div className="flex flex-wrap justify-center" style={containerStyle}>
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8 / speed,
                delay: i * (0.1 / speed),
                ease: 'easeInOut',
              }}
              className="inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      )}

      {/* 14. REVEAL TEXT: Accent color bar mask reveal */}
      {type === 'reveal' && (
        <div key={cycleKey} className="relative overflow-hidden inline-block" style={containerStyle}>
          <motion.div
            initial={{ x: '-101%' }}
            animate={{ x: '101%' }}
            transition={{ duration: 1.2 / speed, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0 z-20 bg-gradient-to-r from-indigo-500 to-pink-500"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 / speed, duration: 0.3 }}
            className="relative z-10 font-black text-white drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]"
          >
            {text}
          </motion.span>
        </div>
      )}

      {/* 15. MARQUEE TEXT: Infinite horizontal ribbon */}
      {type === 'marquee' && (
        <div className="w-full overflow-hidden whitespace-nowrap flex" style={containerStyle}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 10 / speed,
              ease: 'linear',
            }}
            className="flex gap-8 font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 shrink-0"
          >
            <span>{text} • {text} • {text} • {text} •</span>
            <span>{text} • {text} • {text} • {text} •</span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TextEngine;
