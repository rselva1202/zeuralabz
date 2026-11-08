import React, { useEffect, useRef } from 'react';

export interface GalaxyProps {
  /**
   * Number of stars in the spiral galaxy simulation (default: 900).
   */
  starCount?: number;
  /**
   * Orbital rotation speed multiplier (default: 0.6).
   */
  speed?: number;
  /**
   * Density scaling for star distribution (default: 1.0).
   */
  density?: number;
  /**
   * Palette of cosmic stellar colors.
   */
  colors?: string[];
  /**
   * Intensity of glowing nebula & stellar core (default: 1.2).
   */
  glowIntensity?: number;
  /**
   * Number of primary spiral arms (default: 3).
   */
  armCount?: number;
  /**
   * Twinkle frequency speed multiplier (default: 1.0).
   */
  twinkleSpeed?: number;
  /**
   * Optional custom CSS class name for container.
   */
  className?: string;
  /**
   * Optional children rendered in foreground over cosmic canvas.
   */
  children?: React.ReactNode;
}

interface Star {
  radiusRatio: number;
  angle: number;
  armIndex: number;
  angularScatter: number;
  radialScatter: number;
  size: number;
  color: string;
  baseAlpha: number;
  twinklePhase: number;
  twinkleFreq: number;
  hasGlow: boolean;
  orbitRate: number;
}

const DEFAULT_COLORS = [
  '#ffffff', // Core brilliant white
  '#fef08a', // Warm stellar gold
  '#38bdf8', // Ionized cyan
  '#818cf8', // Electric indigo
  '#c084fc', // Deep cosmic purple
  '#f472b6', // Stellar emission magenta/pink
];

export const GalaxyBackground: React.FC<GalaxyProps> = ({
  starCount = 900,
  speed = 0.6,
  density = 1.0,
  colors = DEFAULT_COLORS,
  glowIntensity = 1.2,
  armCount = 3,
  twinkleSpeed = 1.0,
  className = '',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Generate stellar particles
    const effectiveStarCount = Math.max(800, Math.floor(starCount * density));
    const stars: Star[] = [];

    for (let i = 0; i < effectiveStarCount; i++) {
      // 25% Bulge/Core stars, 65% Spiral Arm stars, 10% Halo/Background stars
      const typeRand = Math.random();
      let radiusRatio: number;
      let armIndex = Math.floor(Math.random() * armCount);
      let angularScatter = 0;
      let radialScatter = 0;
      let size = Math.random() * 1.4 + 0.6;
      let hasGlow = false;
      let color = colors[Math.floor(Math.random() * colors.length)];
      let baseAlpha = Math.random() * 0.5 + 0.45;

      if (typeRand < 0.25) {
        // Central Galactic Bulge: dense core cluster
        radiusRatio = Math.pow(Math.random(), 2.2) * 0.18;
        angularScatter = (Math.random() - 0.5) * Math.PI * 2;
        size = Math.random() * 2.0 + 1.2;
        hasGlow = Math.random() < 0.65;
        color = Math.random() < 0.5 ? '#ffffff' : Math.random() < 0.8 ? '#fef08a' : '#a5f3fc';
        baseAlpha = Math.random() * 0.35 + 0.65;
      } else if (typeRand < 0.9) {
        // Spiral Arms: logarithmic twist with gaussian-like dispersion
        radiusRatio = 0.12 + Math.pow(Math.random(), 0.95) * 0.88;
        const scatterWidth = 0.28 * (radiusRatio + 0.25);
        angularScatter = (Math.random() + Math.random() - 1) * scatterWidth;
        radialScatter = (Math.random() - 0.5) * 0.08;

        // Color graded by radial distance
        if (radiusRatio < 0.35) {
          color = Math.random() < 0.6 ? '#38bdf8' : '#818cf8';
        } else if (radiusRatio < 0.7) {
          color = Math.random() < 0.6 ? '#c084fc' : '#e879f9';
        } else {
          color = Math.random() < 0.5 ? '#f472b6' : '#93c5fd';
        }

        hasGlow = Math.random() < 0.25;
        if (hasGlow) size += 0.5;
      } else {
        // Cosmic Halo / Dust Stars
        radiusRatio = Math.random() * 1.15;
        angularScatter = (Math.random() - 0.5) * Math.PI * 2;
        size = Math.random() * 0.8 + 0.4;
        baseAlpha = Math.random() * 0.3 + 0.2;
        color = '#cbd5e1';
      }

      // Keplerian-inspired differential orbital velocity
      const orbitRate = 1 / Math.sqrt(radiusRatio * 4 + 0.4);

      stars.push({
        radiusRatio,
        angle: (armIndex * (Math.PI * 2)) / armCount,
        armIndex,
        angularScatter,
        radialScatter,
        size,
        color,
        baseAlpha,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleFreq: Math.random() * 1.8 + 0.8,
        hasGlow,
        orbitRate,
      });
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    let globalRotation = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 64) * 0.001;
      lastTime = currentTime;

      globalRotation += deltaTime * 0.12 * speed;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep Navy Cosmic Base Fill
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.48;

      // 1. Multi-Chromatic Volumetric Nebula Dust Clouds
      const coreRadius = Math.max(30, maxRadius * 0.35);
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.45 * glowIntensity})`);
      coreGradient.addColorStop(0.2, `rgba(168, 85, 247, ${0.35 * glowIntensity})`);
      coreGradient.addColorStop(0.5, `rgba(56, 189, 248, ${0.22 * glowIntensity})`);
      coreGradient.addColorStop(0.8, `rgba(99, 102, 241, ${0.12 * glowIntensity})`);
      coreGradient.addColorStop(1, 'rgba(10, 14, 39, 0)');

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Spiral Arm Ambient Nebula Cloud
      const armCloudRadius = maxRadius * 0.95;
      const armGradient = ctx.createRadialGradient(cx, cy, coreRadius * 0.5, cx, cy, armCloudRadius);
      armGradient.addColorStop(0, `rgba(192, 132, 252, ${0.15 * glowIntensity})`);
      armGradient.addColorStop(0.4, `rgba(244, 114, 182, ${0.12 * glowIntensity})`);
      armGradient.addColorStop(0.7, `rgba(56, 189, 248, ${0.08 * glowIntensity})`);
      armGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = armGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, armCloudRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render 800+ Dynamic Spiral Galaxy Stars
      // 3D cosmic perspective: galaxy disk viewed with a gentle 32° tilt
      const pitchRatio = 0.76;
      const twistFactor = 3.6; // Logarithmic spiral tightness

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Differential rotation: inner stars orbit slightly faster
        const dynamicAngle =
          star.angle +
          globalRotation * star.orbitRate +
          star.angularScatter +
          Math.pow(star.radiusRatio, 0.72) * twistFactor;

        const effectiveRadius = Math.max(0, (star.radiusRatio + star.radialScatter) * maxRadius);

        // Elliptical coordinate projection (3D galactic disc inclination)
        const x = cx + Math.cos(dynamicAngle) * effectiveRadius;
        const y = cy + Math.sin(dynamicAngle) * (effectiveRadius * pitchRatio);

        // Twinkle luminance calculation
        const twinkle =
          0.65 + 0.35 * Math.sin(currentTime * 0.003 * star.twinkleFreq * twinkleSpeed + star.twinklePhase);
        const alpha = Math.min(1, Math.max(0.1, star.baseAlpha * twinkle));

        ctx.save();
        ctx.globalAlpha = alpha;

        if (star.hasGlow) {
          ctx.shadowBlur = 8 * glowIntensity;
          ctx.shadowColor = star.color;
        }

        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 3. Central Supermassive Stellar Core Burst
      ctx.save();
      ctx.shadowBlur = 18 * glowIntensity;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 28 * glowIntensity;
      ctx.shadowColor = '#a855f7';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [starCount, speed, density, colors, glowIntensity, armCount, twinkleSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[220px] overflow-hidden bg-[#0a0e27] ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, #111742 0%, #0a0e27 70%, #060817 100%)',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
      {children && <div className="relative z-10 w-full h-full pointer-events-auto">{children}</div>}
    </div>
  );
};

export const Galaxy = GalaxyBackground;
export default GalaxyBackground;
