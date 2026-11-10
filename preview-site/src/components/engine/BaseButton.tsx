import React, { useState, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue, type HTMLMotionProps } from 'framer-motion';

export type ButtonVariant =
  | 'gradient'
  | 'neon'
  | 'magnetic'
  | 'shimmer'
  | '3d'
  | 'outline-fill'
  | 'loading'
  | 'icon'
  | 'social'
  | 'glass-btn'
  | 'glow'
  | 'pill'
  | 'arrow'
  | 'play'
  | 'download';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps extends Omit<HTMLMotionProps<'button'>, 'color'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  text?: string;
  subtext?: string;
  interactiveDemo?: boolean;
}

// Inline SVGs for self-contained portability (no external icon dependencies)
const Icons = {
  Spinner: () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
  Check: () => (
    <svg className="h-4 w-4 text-emerald-400 -ml-1 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="h-4 w-4 ml-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Download: () => (
    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Play: () => (
    <svg className="h-4 w-4 fill-current mr-1.5" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Pause: () => (
    <svg className="h-4 w-4 fill-current mr-1.5" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="h-4 w-4 text-amber-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  GitHub: () => (
    <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'gradient',
  size = 'md',
  color,
  loading: controlledLoading,
  icon,
  children,
  text,
  subtext,
  interactiveDemo = true,
  className = '',
  style = {},
  onClick,
  ...rest
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [internalLoading, setInternalLoading] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Magnetic motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 220, mass: 0.1 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant !== 'magnetic' || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * 0.4;
      const distanceY = (e.clientY - centerY) * 0.4;
      mouseX.set(distanceX);
      mouseY.set(distanceY);
    },
    [variant, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (variant === 'magnetic') {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [variant, mouseX, mouseY]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount((c) => c + 1);

    // Interactive variant reactions
    if (interactiveDemo) {
      if (variant === 'loading') {
        setInternalLoading(true);
        setTimeout(() => setInternalLoading(false), 1800);
      } else if (variant === 'download') {
        setDownloadState('downloading');
        setTimeout(() => {
          setDownloadState('done');
          setTimeout(() => setDownloadState('idle'), 2000);
        }, 1200);
      } else if (variant === 'play') {
        setIsPlaying((p) => !p);
      }
    }

    if (onClick) onClick(e);
  };

  // Determine size styling
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-xs tracking-wide',
    md: 'px-5 py-2.5 text-sm tracking-wide',
    lg: 'px-7 py-3.5 text-base tracking-wide font-semibold'
  };

  const currentLoading = controlledLoading ?? internalLoading;

  // Render variant-specific content & styles
  const defaultLabels: Record<ButtonVariant, string> = {
    gradient: 'Iridescent Flow',
    neon: 'Cyber Neon Pulse',
    magnetic: 'Cursor Gravity',
    shimmer: 'Specular Shimmer',
    '3d': '3D Tactile Push',
    'outline-fill': 'Prism Sweep',
    loading: currentLoading ? 'Synthesizing...' : 'Async Action',
    icon: 'Creative Spark',
    social: 'GitHub Star',
    'glass-btn': 'Liquid Glass',
    glow: 'Ambient Radiant Glow',
    pill: 'Sleek Capsule',
    arrow: 'Launch Matrix',
    play: isPlaying ? 'Playing Stream' : 'Play Video',
    download:
      downloadState === 'downloading'
        ? 'Downloading...'
        : downloadState === 'done'
        ? 'Package Saved!'
        : 'Download Asset'
  };

  const displayText = text || children || defaultLabels[variant];

  // Specific content icons
  let renderIcon = icon;
  if (!renderIcon) {
    if (variant === 'loading' && currentLoading) {
      renderIcon = <Icons.Spinner />;
    } else if (variant === 'download') {
      renderIcon = downloadState === 'done' ? <Icons.Check /> : <Icons.Download />;
    } else if (variant === 'play') {
      renderIcon = isPlaying ? <Icons.Pause /> : <Icons.Play />;
    } else if (variant === 'icon') {
      renderIcon = <Icons.Sparkles />;
    } else if (variant === 'social') {
      renderIcon = <Icons.GitHub />;
    }
  }

  // Base motion props
  const motionProps =
    variant === 'magnetic'
      ? { style: { x: magneticX, y: magneticY, ...style } }
      : { style };

  // Generate Variant-Specific Presentation
  switch (variant) {
    case 'gradient':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className={`relative group overflow-hidden rounded-xl font-bold text-white shadow-lg cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          {/* Animated flowing gradient border */}
          <span className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 opacity-80 blur-[2px] group-hover:opacity-100 group-hover:blur-md transition-all duration-500 animate-pulse" />
          <span className="relative z-10 flex items-center justify-center gap-2 rounded-[10px] bg-gradient-to-r from-[#0d1230] via-[#161c47] to-[#11173d] px-5 py-2.5 transition-colors duration-300 group-hover:bg-opacity-80">
            {renderIcon}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent font-extrabold tracking-tight">
              {displayText}
            </span>
            {subtext && <span className="text-[10px] text-cyan-300/80 font-normal ml-1">({subtext})</span>}
          </span>
        </motion.button>
      );

    case 'neon':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={`relative group rounded-xl font-bold transition-all duration-300 cursor-pointer border-2 border-emerald-400 text-emerald-300 bg-[#030906] ${sizeClasses[size]} ${className}`}
          style={{
            boxShadow: isHovered
              ? '0 0 25px rgba(52,211,153,0.7), inset 0 0 15px rgba(52,211,153,0.4)'
              : '0 0 12px rgba(52,211,153,0.4), inset 0 0 6px rgba(52,211,153,0.2)',
            textShadow: '0 0 8px rgba(52,211,153,0.8)',
            ...style
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {renderIcon}
            <span className="tracking-wide uppercase text-xs font-black">{displayText}</span>
          </span>
        </motion.button>
      );

    case 'magnetic':
      return (
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.92 }}
          onClick={handleClick}
          className={`relative rounded-xl font-bold text-white bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 border border-indigo-400/40 shadow-[0_8px_25px_rgba(79,70,229,0.45)] cursor-pointer select-none transition-shadow duration-300 ${sizeClasses[size]} ${className}`}
          style={{ x: magneticX, y: magneticY, ...style }}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
            <span className="text-cyan-300 text-sm">🧲</span>
            <span className="font-extrabold">{displayText}</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full text-indigo-100 font-mono">
              {isHovered ? 'Active' : 'Hover'}
            </span>
          </span>
        </motion.button>
      );

    case 'shimmer':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className={`relative group overflow-hidden rounded-full font-semibold text-white bg-[#0f1426] border border-cyan-500/40 shadow-[0_4px_20px_rgba(6,182,212,0.25)] cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          {/* Continuous & Hover Light Beam Shimmer Sweep */}
          <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent -skew-x-12" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2.5s_infinite] -skew-x-12" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-cyan-400">✧</span>
            <span className="tracking-wide text-cyan-50 font-bold">{displayText}</span>
            <span className="text-cyan-400 text-xs transition-transform duration-300 group-hover:translate-x-1">➔</span>
          </span>
        </motion.button>
      );

    case '3d':
      return (
        <motion.button
          ref={buttonRef}
          whileTap={{ y: 5 }}
          onClick={handleClick}
          className={`relative rounded-xl font-extrabold text-white cursor-pointer select-none ${sizeClasses[size]} ${className}`}
          style={{
            backgroundColor: '#4f46e5',
            boxShadow: '0 6px 0 #312e81, 0 10px 20px rgba(0,0,0,0.5)',
            ...style
          }}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-amber-300">✦</span>
            <span className="tracking-wider uppercase text-xs">{displayText}</span>
            {clickCount > 0 && (
              <span className="bg-indigo-900/80 text-[10px] px-1.5 py-0.2 rounded-full border border-indigo-400/30">
                +{clickCount}
              </span>
            )}
          </span>
        </motion.button>
      );

    case 'outline-fill':
      return (
        <motion.button
          ref={buttonRef}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={`relative group overflow-hidden rounded-xl font-bold cursor-pointer border-2 border-indigo-500 bg-transparent text-indigo-300 ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          {/* Curtain Fill Sliding from Left to Right */}
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white font-extrabold">
            {renderIcon}
            <span>{displayText}</span>
            <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
          </span>
        </motion.button>
      );

    case 'loading':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: currentLoading ? 1 : 1.02 }}
          whileTap={{ scale: currentLoading ? 1 : 0.98 }}
          onClick={handleClick}
          disabled={currentLoading}
          className={`relative rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.35)] cursor-pointer disabled:cursor-wait transition-all ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {renderIcon}
            <span className="tracking-wide">{displayText}</span>
            {!currentLoading && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-blue-100 font-mono">
                Click
              </span>
            )}
          </span>
        </motion.button>
      );

    case 'icon':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className={`relative group rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 shadow-[0_4px_20px_rgba(249,115,22,0.35)] cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
              {renderIcon}
            </span>
            <span>{displayText}</span>
          </span>
        </motion.button>
      );

    case 'social':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={`relative group rounded-xl font-semibold text-white bg-[#161b22] border border-[#30363d] hover:border-gray-500 shadow-md cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {renderIcon}
            <span>{displayText}</span>
            <span className="text-[11px] font-mono bg-[#21262d] px-2 py-0.5 rounded-full border border-[#30363d] text-amber-300">
              ★ {1420 + clickCount}
            </span>
          </span>
        </motion.button>
      );

    case 'glass-btn':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.14)' }}
          whileTap={{ scale: 0.96 }}
          onClick={handleClick}
          className={`relative rounded-2xl font-bold text-white border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.37)] cursor-pointer backdrop-blur-xl ${sizeClasses[size]} ${className}`}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03))',
            ...style
          }}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-cyan-300">✦</span>
            <span className="tracking-wide text-white drop-shadow-md">{displayText}</span>
          </span>
        </motion.button>
      );

    case 'glow':
      return (
        <div className="relative inline-flex items-center justify-center group">
          {/* Ambient Diffused Glow Pulsing Behind Button */}
          <div
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-70 blur-lg group-hover:opacity-100 group-hover:blur-xl transition duration-500"
            style={{ filter: 'blur(14px)' }}
          />
          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className={`relative rounded-xl font-bold text-white bg-[#0c1024] border border-cyan-400/40 cursor-pointer ${sizeClasses[size]} ${className}`}
            {...motionProps}
            {...rest}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-100 font-extrabold">{displayText}</span>
            </span>
          </motion.button>
        </div>
      );

    case 'pill':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`relative rounded-full font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 border border-violet-400/40 shadow-[0_0_20px_rgba(139,92,246,0.35)] cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>{displayText}</span>
            <span className="text-xs bg-white/20 rounded-full w-4 h-4 flex items-center justify-center">
              ●
            </span>
          </span>
        </motion.button>
      );

    case 'arrow':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={`relative group rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_4px_20px_rgba(79,70,229,0.35)] cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>{displayText}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              <Icons.ArrowRight />
            </span>
          </span>
        </motion.button>
      );

    case 'play':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className={`relative group rounded-full font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.35)] cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          {/* Ripple Pulse Rings */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {renderIcon}
            <span>{displayText}</span>
          </span>
        </motion.button>
      );

    case 'download':
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={`relative group overflow-hidden rounded-xl font-bold text-white ${
            downloadState === 'done'
              ? 'bg-emerald-600 border-emerald-400 shadow-[0_4px_20px_rgba(16,185,129,0.4)]'
              : 'bg-gradient-to-r from-sky-600 to-indigo-600 border-sky-400/40 shadow-[0_4px_20px_rgba(2,132,199,0.35)]'
          } border cursor-pointer transition-colors duration-300 ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          {downloadState === 'downloading' && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="absolute inset-0 bg-white/20"
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {renderIcon}
            <span>{displayText}</span>
          </span>
        </motion.button>
      );

    default:
      return (
        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleClick}
          className={`relative rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md cursor-pointer ${sizeClasses[size]} ${className}`}
          {...motionProps}
          {...rest}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {renderIcon}
            <span>{displayText}</span>
          </span>
        </motion.button>
      );
  }
};

export default BaseButton;
