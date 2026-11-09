import React, { useEffect, useRef, useState } from 'react';

export type BackgroundType =
  | 'aurora'
  | 'galaxy'
  | 'particles'
  | 'dots'
  | 'starfield'
  | 'liquid'
  | 'grid'
  | 'mesh'
  | 'noise'
  | 'beam'
  | 'hexagon'
  | 'waves'
  | 'gradient'
  | 'nebula'
  | 'fireflies'
  | 'custom';

export interface CanvasEngineProps {
  /**
   * The visual background archetype to render.
   */
  type?: BackgroundType;
  /**
   * Target particle/element count (defaults to 800+ for galaxy/starfield, 140+ for particles).
   */
  particleCount?: number;
  /**
   * Alias for particleCount (useful for astronomical/galaxy backgrounds).
   */
  starCount?: number;
  /**
   * Global animation speed multiplier (default: 1.0).
   */
  speed?: number;
  /**
   * Color palette used for rendering the visual elements.
   */
  colors?: string[];
  /**
   * Density multiplier for particle/geometry generation (default: 1.0).
   */
  density?: number;
  /**
   * Glow bloom intensity multiplier for shadows and radial highlights (default: 1.2).
   */
  glow?: number;
  /**
   * Alias for glow intensity.
   */
  glowIntensity?: number;
  /**
   * Optional number of spiral arms (for galaxy/geometry).
   */
  armCount?: number;
  /**
   * Background base fill color (default: '#0a0e27').
   */
  backgroundColor?: string;
  /**
   * Optional custom CSS class name for outer wrapper.
   */
  className?: string;
  /**
   * Optional custom inline styles for outer wrapper.
   */
  style?: React.CSSProperties;
  /**
   * Optional children rendered in foreground over canvas.
   */
  children?: React.ReactNode;
  /**
   * Optional custom render callback for 'custom' type.
   */
  onRender?: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void;
  /**
   * Lite preview mode for high-performance grid rendering (20% particles, 30fps max, 0 shadowBlur).
   */
  lite?: boolean;
  /**
   * Whether the component is visible in viewport. If false, pauses animation completely.
   */
  isVisible?: boolean;
  /**
   * Maximum FPS to render (default: lite ? 30 : 60).
   */
  maxFps?: number;
}

export const CanvasEngine: React.FC<CanvasEngineProps> = ({
  type = 'galaxy',
  particleCount,
  starCount,
  speed = 1.0,
  colors,
  density = 1.0,
  glow = 1.2,
  glowIntensity,
  armCount = 3,
  backgroundColor = '#0a0e27',
  className = '',
  style,
  children,
  onRender,
  lite = false,
  isVisible = true,
  maxFps,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);

  // IntersectionObserver to pause when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: '120px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const effectiveGlow = lite ? 0.3 : (glowIntensity ?? glow);
  const effectiveCount = starCount ?? particleCount;

  useEffect(() => {
    if (!isInViewport || isVisible === false) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2);

    // Determine actual particle count based on type (20% in lite mode)
    const defaultCount = lite
      ? (type === 'galaxy' || type === 'starfield'
          ? 150
          : type === 'particles' || type === 'mesh'
          ? 30
          : type === 'dots'
          ? 120
          : type === 'fireflies'
          ? 25
          : 120)
      : (type === 'galaxy' || type === 'starfield'
          ? 850
          : type === 'particles' || type === 'mesh'
          ? 130
          : type === 'dots'
          ? 600
          : type === 'fireflies'
          ? 120
          : 800);

    const count = Math.max(
      lite ? 15 : (type === 'particles' ? 60 : 200),
      Math.floor((effectiveCount ?? defaultCount) * density)
    );

    // Default color palettes per mode
    const defaultPalettes: Record<BackgroundType, string[]> = {
      aurora: ['#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#10b981'],
      galaxy: ['#ffffff', '#fef08a', '#38bdf8', '#818cf8', '#c084fc', '#f472b6'],
      particles: ['#38bdf8', '#818cf8', '#c084fc', '#ffffff'],
      dots: ['#38bdf8', '#818cf8', '#6366f1'],
      starfield: ['#ffffff', '#fef08a', '#a5f3fc', '#e0e7ff', '#c7d2fe'],
      liquid: ['#ec4899', '#f43f5e', '#8b5cf6', '#6366f1', '#fb923c'],
      grid: ['#06b6d4', '#6366f1', '#a855f7'],
      mesh: ['#38bdf8', '#818cf8', '#c084fc'],
      noise: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'],
      beam: ['#06b6d4', '#6366f1', '#ec4899'],
      hexagon: ['#06b6d4', '#38bdf8', '#818cf8', '#a855f7'],
      waves: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'],
      gradient: ['#312e81', '#4c1d95', '#0c4a6e', '#701a75', '#1e1b4b'],
      nebula: ['#c084fc', '#f472b6', '#38bdf8', '#818cf8', '#fef08a'],
      fireflies: ['#fef08a', '#84cc16', '#22c55e', '#38bdf8', '#facc15'],
      custom: ['#38bdf8', '#818cf8', '#c084fc'],
    };

    const activeColors = colors && colors.length > 0 ? colors : defaultPalettes[type] || defaultPalettes.galaxy;

    // Simulation entities state
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      phase: number;
      freq: number;
      aux?: number;
      armIndex?: number;
      angularScatter?: number;
      radialScatter?: number;
      orbitRate?: number;
      radiusRatio?: number;
      hasGlow?: boolean;
    }> = [];

    // Initialize particles based on archetype
    for (let i = 0; i < count; i++) {
      if (type === 'galaxy') {
        const typeRand = Math.random();
        let radiusRatio: number;
        const armIndex = Math.floor(Math.random() * armCount);
        let angularScatter = 0;
        let radialScatter = 0;
        let size = Math.random() * 1.5 + 0.6;
        let hasGlow = false;
        let color = activeColors[Math.floor(Math.random() * activeColors.length)];
        let alpha = Math.random() * 0.5 + 0.45;

        if (typeRand < 0.25) {
          // Central Bulge
          radiusRatio = Math.pow(Math.random(), 2.2) * 0.18;
          angularScatter = (Math.random() - 0.5) * Math.PI * 2;
          size = Math.random() * 2.2 + 1.2;
          hasGlow = Math.random() < 0.65;
          color = Math.random() < 0.5 ? '#ffffff' : Math.random() < 0.8 ? '#fef08a' : '#a5f3fc';
          alpha = Math.random() * 0.35 + 0.65;
        } else if (typeRand < 0.9) {
          // Spiral Arms
          radiusRatio = 0.12 + Math.pow(Math.random(), 0.95) * 0.88;
          const scatterWidth = 0.28 * (radiusRatio + 0.25);
          angularScatter = (Math.random() + Math.random() - 1) * scatterWidth;
          radialScatter = (Math.random() - 0.5) * 0.08;
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
          // Halo
          radiusRatio = Math.random() * 1.15;
          angularScatter = (Math.random() - 0.5) * Math.PI * 2;
          size = Math.random() * 0.8 + 0.4;
          alpha = Math.random() * 0.3 + 0.2;
          color = '#cbd5e1';
        }

        particles.push({
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: size,
          color,
          alpha,
          phase: Math.random() * Math.PI * 2,
          freq: Math.random() * 1.8 + 0.8,
          armIndex,
          angularScatter,
          radialScatter,
          orbitRate: 1 / Math.sqrt(radiusRatio * 4 + 0.4),
          radiusRatio,
          hasGlow,
        });
      } else if (type === 'starfield') {
        particles.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04,
          radius: Math.random() * 1.8 + 0.5,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          alpha: Math.random() * 0.6 + 0.4,
          phase: Math.random() * Math.PI * 2,
          freq: Math.random() * 2.0 + 0.5,
          aux: Math.random() * 0.8 + 0.2, // z depth
          hasGlow: Math.random() < 0.2,
        });
      } else if (type === 'particles' || type === 'mesh') {
        particles.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.2 + 1.2,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          alpha: Math.random() * 0.4 + 0.6,
          phase: Math.random() * Math.PI * 2,
          freq: 1,
        });
      } else if (type === 'fireflies') {
        particles.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2.8 + 1.2,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          alpha: Math.random() * 0.5 + 0.5,
          phase: Math.random() * Math.PI * 2,
          freq: Math.random() * 2.5 + 1.0,
        });
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const actualDpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * actualDpr);
      canvas.height = Math.floor(height * actualDpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);

    const targetFps = lite ? 30 : (maxFps ?? 60);
    const frameInterval = 1000 / targetFps;
    let lastRenderTime = performance.now();
    let lastTime = performance.now();
    let globalAngle = 0;

    const render = (currentTime: number) => {
      const elapsedSinceLastRender = currentTime - lastRenderTime;
      if (elapsedSinceLastRender < frameInterval) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastRenderTime = currentTime - (elapsedSinceLastRender % frameInterval);

      const delta = Math.min(currentTime - lastTime, 64) * 0.001;
      lastTime = currentTime;
      globalAngle += delta * speed * 0.15;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep Navy Base Fill
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const t = currentTime * 0.001 * speed;

      if (type === 'custom' && onRender) {
        onRender(ctx, width, height, t);
      } else if (type === 'galaxy') {
        // ========== 1. GALAXY RENDERER ==========
        const maxRadius = Math.min(width, height) * 0.48;
        const pitchRatio = 0.76;

        // Nebula Clouds
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(30, maxRadius * 0.35));
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * effectiveGlow})`);
        coreGrad.addColorStop(0.2, `rgba(168, 85, 247, ${0.35 * effectiveGlow})`);
        coreGrad.addColorStop(0.5, `rgba(56, 189, 248, ${0.22 * effectiveGlow})`);
        coreGrad.addColorStop(1, 'rgba(10, 14, 39, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(30, maxRadius * 0.35), 0, Math.PI * 2);
        ctx.fill();

        const armGrad = ctx.createRadialGradient(cx, cy, maxRadius * 0.2, cx, cy, maxRadius * 0.95);
        armGrad.addColorStop(0, `rgba(192, 132, 252, ${0.15 * effectiveGlow})`);
        armGrad.addColorStop(0.4, `rgba(244, 114, 182, ${0.12 * effectiveGlow})`);
        armGrad.addColorStop(0.7, `rgba(56, 189, 248, ${0.08 * effectiveGlow})`);
        armGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = armGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, maxRadius * 0.95, 0, Math.PI * 2);
        ctx.fill();

        // 800+ Stars
        for (let i = 0; i < particles.length; i++) {
          const s = particles[i];
          const dynamicAngle =
            (s.armIndex! * Math.PI * 2) / armCount +
            globalAngle * (s.orbitRate || 1) +
            s.angularScatter! +
            Math.pow(s.radiusRatio!, 0.72) * 3.6;

          const effRadius = Math.max(0, (s.radiusRatio! + (s.radialScatter || 0)) * maxRadius);
          const x = cx + Math.cos(dynamicAngle) * effRadius;
          const y = cy + Math.sin(dynamicAngle) * (effRadius * pitchRatio);
          const twinkle = 0.65 + 0.35 * Math.sin(t * 3 * s.freq + s.phase);

          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0.1, s.alpha * twinkle));
          if (s.hasGlow) {
            ctx.shadowBlur = 8 * effectiveGlow;
            ctx.shadowColor = s.color;
          }
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(x, y, s.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Core Center Burst
        ctx.save();
        ctx.shadowBlur = 20 * effectiveGlow;
        ctx.shadowColor = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (type === 'aurora') {
        // ========== 2. AURORA RENDERER ==========
        const layers = 4;
        for (let l = 0; l < layers; l++) {
          const col1 = activeColors[l % activeColors.length];
          const col2 = activeColors[(l + 1) % activeColors.length];
          const yBase = height * (0.35 + l * 0.12);

          const grad = ctx.createLinearGradient(0, yBase - 80, width, yBase + 120);
          grad.addColorStop(0, col1);
          grad.addColorStop(0.5, col2);
          grad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = 0.35 * effectiveGlow;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(0, height);
          ctx.lineTo(0, yBase);

          for (let x = 0; x <= width; x += 15) {
            const wave1 = Math.sin(x * 0.005 + t * (0.8 + l * 0.3) + l) * 45;
            const wave2 = Math.cos(x * 0.012 - t * 0.6 + l * 2) * 25;
            ctx.lineTo(x, yBase + wave1 + wave2);
          }

          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let i = 0; i < 6; i++) {
          const bx = ((i * 0.18 + t * 0.03) % 1) * width;
          const beamGrad = ctx.createLinearGradient(bx, 0, bx + 60, height);
          beamGrad.addColorStop(0, 'transparent');
          beamGrad.addColorStop(0.5, `rgba(56, 189, 248, ${0.18 * effectiveGlow})`);
          beamGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = beamGrad;
          ctx.fillRect(bx - 30, 0, 80, height);
        }
        ctx.restore();
      } else if (type === 'particles') {
        // ========== 3. PARTICLES NETWORK RENDERER ==========
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * delta * 60;
          p.y += p.vy * delta * 60;

          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1;
          if (p.y > 1) p.y = 0;

          const px = p.x * width;
          const py = p.y * height;

          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 6 * effectiveGlow;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = px - p2.x * width;
            const dy = py - p2.y * height;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = Math.min(width, height) * 0.24;

            if (dist < maxDist) {
              ctx.save();
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = (1 - dist / maxDist) * 0.35 * effectiveGlow;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2.x * width, p2.y * height);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      } else if (type === 'starfield') {
        // ========== 4. STARFIELD RENDERER ==========
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x = (p.x + p.vx * delta * 20 * (p.aux || 1) + 1) % 1;
          p.y = (p.y + p.vy * delta * 20 * (p.aux || 1) + 1) % 1;

          const px = p.x * width;
          const py = p.y * height;
          const twinkle = 0.6 + 0.4 * Math.sin(t * 3 * p.freq + p.phase);

          ctx.save();
          ctx.globalAlpha = Math.min(1, p.alpha * twinkle);
          if (p.hasGlow) {
            ctx.shadowBlur = 8 * effectiveGlow;
            ctx.shadowColor = p.color;
          }
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.radius * (p.aux || 1), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (type === 'dots') {
        // ========== 5. REACTIVE DOT MATRIX RENDERER ==========
        const spacing = 24;
        const cols = Math.ceil(width / spacing);
        const rows = Math.ceil(height / spacing);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const dx = c * spacing;
            const dy = r * spacing;
            const distCenter = Math.sqrt((dx - cx) * (dx - cx) + (dy - cy) * (dy - cy));
            const ripple = Math.sin(distCenter * 0.04 - t * 3) * 0.5 + 0.5;

            ctx.save();
            ctx.fillStyle = activeColors[Math.floor(ripple * activeColors.length) % activeColors.length];
            ctx.globalAlpha = 0.2 + ripple * 0.65;
            ctx.beginPath();
            ctx.arc(dx, dy, 1.2 + ripple * 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      } else if (type === 'liquid') {
        // ========== 6. LIQUID LAVA METABALLS RENDERER ==========
        const blobCount = 6;
        for (let b = 0; b < blobCount; b++) {
          const ang = t * 0.8 + (b * Math.PI * 2) / blobCount;
          const bx = cx + Math.cos(ang * 0.7) * (width * 0.28) + Math.sin(t * 0.5 + b) * 30;
          const by = cy + Math.sin(ang * 0.9) * (height * 0.25) + Math.cos(t * 0.4 + b) * 25;
          const bRadius = 60 + Math.sin(t * 1.2 + b) * 20;

          const grad = ctx.createRadialGradient(bx, by, 0, bx, by, bRadius * 1.8);
          grad.addColorStop(0, activeColors[b % activeColors.length]);
          grad.addColorStop(0.5, activeColors[(b + 1) % activeColors.length]);
          grad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = 0.45 * effectiveGlow;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(bx, by, bRadius * 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (type === 'grid') {
        // ========== 7. 3D PERSPECTIVE RETRO GRID RENDERER ==========
        const horizonY = height * 0.42;

        const horizGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 80);
        horizGrad.addColorStop(0, 'transparent');
        horizGrad.addColorStop(0.4, `rgba(99, 102, 241, ${0.45 * effectiveGlow})`);
        horizGrad.addColorStop(0.7, `rgba(6, 182, 212, ${0.35 * effectiveGlow})`);
        horizGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = horizGrad;
        ctx.fillRect(0, horizonY - 50, width, 120);

        ctx.save();
        ctx.strokeStyle = activeColors[0];
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.35 * effectiveGlow;

        const lineCount = 20;
        for (let i = -lineCount; i <= lineCount; i++) {
          const xBottom = cx + i * 50;
          ctx.beginPath();
          ctx.moveTo(cx + i * 4, horizonY);
          ctx.lineTo(xBottom, height);
          ctx.stroke();
        }

        const horizLines = 14;
        const gridOffset = (t * 40) % 30;
        for (let h = 0; h < horizLines; h++) {
          const progress = Math.pow(h / horizLines, 2.2);
          const y = horizonY + progress * (height - horizonY) + gridOffset * progress;
          if (y < height) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }
        }
        ctx.restore();
      } else if (type === 'mesh') {
        // ========== 8. GEOMETRIC MESH / CONSTELLATION RENDERER ==========
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx * delta * 50;
          p.y += p.vy * delta * 50;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1;
          if (p.y > 1) p.y = 0;

          const px = p.x * width;
          const py = p.y * height;

          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(px - p2.x * width, py - p2.y * height);
            if (dist < 110) {
              ctx.save();
              ctx.strokeStyle = activeColors[(i + j) % activeColors.length];
              ctx.globalAlpha = (1 - dist / 110) * 0.4 * effectiveGlow;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2.x * width, p2.y * height);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      } else if (type === 'noise') {
        // ========== 9. ANIMATED CHROMATIC NOISE RENDERER ==========
        const ambientGrad = ctx.createLinearGradient(0, 0, width, height);
        ambientGrad.addColorStop(0, 'rgba(49, 46, 129, 0.4)');
        ambientGrad.addColorStop(0.5, 'rgba(124, 58, 237, 0.35)');
        ambientGrad.addColorStop(1, 'rgba(14, 116, 144, 0.35)');
        ctx.fillStyle = ambientGrad;
        ctx.fillRect(0, 0, width, height);

        const grainStep = 4;
        for (let x = 0; x < width; x += grainStep) {
          for (let y = 0; y < height; y += grainStep) {
            const rand = Math.sin(x * 12.9898 + y * 78.233 + t * 45) * 43758.5453;
            const val = Math.floor((rand - Math.floor(rand)) * 255);
            if (val > 180) {
              ctx.fillStyle = `rgba(${val}, ${val}, 255, 0.12)`;
              ctx.fillRect(x, y, grainStep, grainStep);
            }
          }
        }
      } else if (type === 'beam') {
        // ========== 10. CONIC BORDER BEAM RENDERER ==========
        const beamAngle = t * 2;
        const beamGrad = ctx.createConicGradient(beamAngle, cx, cy);
        beamGrad.addColorStop(0, activeColors[0]);
        beamGrad.addColorStop(0.25, activeColors[1] || activeColors[0]);
        beamGrad.addColorStop(0.5, activeColors[2] || activeColors[0]);
        beamGrad.addColorStop(1, activeColors[0]);

        ctx.save();
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 4 * effectiveGlow;
        ctx.shadowBlur = 18 * effectiveGlow;
        ctx.shadowColor = activeColors[0];
        ctx.strokeRect(16, 16, width - 32, height - 32);

        const rayX = cx + Math.cos(beamAngle) * (width * 0.45);
        const rayY = cy + Math.sin(beamAngle) * (height * 0.45);
        const rayGrad = ctx.createRadialGradient(rayX, rayY, 0, rayX, rayY, 140);
        rayGrad.addColorStop(0, `rgba(56, 189, 248, ${0.4 * effectiveGlow})`);
        rayGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = rayGrad;
        ctx.beginPath();
        ctx.arc(rayX, rayY, 140, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (type === 'hexagon') {
        // ========== 11. CYBER HEXAGON HONEYCOMB RENDERER ==========
        const hexSize = 28;
        const hexH = hexSize * Math.sqrt(3);
        const cols = Math.ceil(width / (hexSize * 1.5)) + 1;
        const rows = Math.ceil(height / hexH) + 1;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const hx = c * hexSize * 1.5;
            const hy = r * hexH + (c % 2 === 1 ? hexH / 2 : 0);
            const dist = Math.hypot(hx - cx, hy - cy);
            const wave = Math.sin(dist * 0.03 - t * 2.5);

            ctx.save();
            ctx.beginPath();
            for (let a = 0; a < 6; a++) {
              const angle = (Math.PI / 3) * a;
              const px = hx + Math.cos(angle) * (hexSize - 2);
              const py = hy + Math.sin(angle) * (hexSize - 2);
              if (a === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();

            ctx.strokeStyle = activeColors[Math.abs(Math.floor(wave * activeColors.length)) % activeColors.length];
            ctx.lineWidth = wave > 0.4 ? 2 : 0.8;
            ctx.globalAlpha = 0.15 + (wave > 0 ? wave * 0.5 : 0) * effectiveGlow;
            if (wave > 0.5) {
              ctx.shadowBlur = 10 * effectiveGlow;
              ctx.shadowColor = ctx.strokeStyle;
              ctx.fillStyle = ctx.strokeStyle;
              ctx.globalAlpha = 0.12;
              ctx.fill();
            }
            ctx.stroke();
            ctx.restore();
          }
        }
      } else if (type === 'waves') {
        // ========== 12. SINUSOIDAL NEON WAVES RENDERER ==========
        const waveCount = 5;
        for (let w = 0; w < waveCount; w++) {
          ctx.save();
          ctx.strokeStyle = activeColors[w % activeColors.length];
          ctx.lineWidth = 2.2;
          ctx.shadowBlur = 12 * effectiveGlow;
          ctx.shadowColor = activeColors[w % activeColors.length];
          ctx.globalAlpha = 0.55 * effectiveGlow;

          ctx.beginPath();
          const yCenter = cy + (w - 2) * 24;
          for (let x = 0; x <= width; x += 8) {
            const y =
              yCenter +
              Math.sin(x * 0.008 + t * (1.2 + w * 0.4) + w * 1.5) * (35 + w * 8) +
              Math.cos(x * 0.016 - t * 0.8 + w) * 15;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();
        }
      } else if (type === 'gradient') {
        // ========== 13. ANIMATED RADIAL MESH GRADIENT ==========
        for (let i = 0; i < 4; i++) {
          const gx = cx + Math.sin(t * 0.6 + (i * Math.PI) / 2) * (width * 0.32);
          const gy = cy + Math.cos(t * 0.8 + (i * Math.PI) / 2) * (height * 0.28);
          const rad = Math.max(width, height) * 0.45;

          const gGrad = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
          gGrad.addColorStop(0, activeColors[i % activeColors.length]);
          gGrad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = 0.45 * effectiveGlow;
          ctx.fillStyle = gGrad;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      } else if (type === 'nebula') {
        // ========== 14. VOLUMETRIC COSMIC NEBULA RENDERER ==========
        const cloudCount = 5;
        for (let i = 0; i < cloudCount; i++) {
          const nx = cx + Math.sin(t * 0.3 + i * 1.4) * (width * 0.25);
          const ny = cy + Math.cos(t * 0.4 + i * 1.2) * (height * 0.22);
          const nRad = Math.max(width, height) * (0.35 + (i % 2) * 0.15);

          const nGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nRad);
          nGrad.addColorStop(0, activeColors[i % activeColors.length]);
          nGrad.addColorStop(0.5, activeColors[(i + 1) % activeColors.length]);
          nGrad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = 0.32 * effectiveGlow;
          ctx.fillStyle = nGrad;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }

        for (let s = 0; s < 180; s++) {
          const sx = (Math.sin(s * 99 + 1) * 0.5 + 0.5) * width;
          const sy = (Math.cos(s * 77 + 2) * 0.5 + 0.5) * height;
          const tw = Math.sin(t * 2 + s) * 0.5 + 0.5;
          ctx.save();
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.2 + tw * 0.6;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.8 + tw * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (type === 'fireflies') {
        // ========== 15. BIOLUMINESCENT FIREFLIES RENDERER ==========
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x = (p.x + p.vx * delta * 20 + 1) % 1;
          p.y = (p.y + p.vy * delta * 20 + 1) % 1;

          const px = p.x * width;
          const py = p.y * height;
          const pulse = Math.sin(t * 3 * p.freq + p.phase) * 0.5 + 0.5;

          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.25 + pulse * 0.75;
          ctx.shadowBlur = (12 + pulse * 14) * effectiveGlow;
          ctx.shadowColor = p.color;

          ctx.beginPath();
          ctx.arc(px, py, p.radius * (0.8 + pulse * 0.6), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [type, effectiveCount, speed, colors, density, effectiveGlow, armCount, backgroundColor, onRender, isInViewport, isVisible, lite, maxFps]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[200px] overflow-hidden bg-[#0a0e27] ${className}`}
      style={{
        background: 'radial-gradient(ellipse at center, #111742 0%, #0a0e27 70%, #060817 100%)',
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
      {children && <div className="relative z-10 w-full h-full pointer-events-auto">{children}</div>}
    </div>
  );
};

export default CanvasEngine;
