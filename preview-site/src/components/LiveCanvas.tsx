import React, { useEffect, useRef } from 'react';

export type CanvasEngineType = 'aurora' | 'galaxy' | 'particles' | 'gradient';

interface LiveCanvasProps {
  engine: CanvasEngineType;
  lite?: boolean;
  className?: string;
}

export const LiveCanvas: React.FC<LiveCanvasProps> = ({
  engine,
  lite = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isRunning = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particle data depending on engine
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      armIndex?: number;
      radiusRatio?: number;
      angularScatter?: number;
      radialScatter?: number;
      freq?: number;
      phase?: number;
    }> = [];

    if (engine === 'galaxy') {
      const count = lite ? 200 : 700;
      const colors = ['#FFFFFF', '#E879F9', '#C084FC', '#A855F7', '#2DD4BF', '#FDF4FF'];
      for (let i = 0; i < count; i++) {
        const radiusRatio = Math.pow(Math.random(), 0.65);
        particles.push({
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: Math.random() < 0.15 ? Math.random() * 2 + 1.2 : Math.random() * 1.2 + 0.6,
          alpha: Math.random() * 0.7 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          armIndex: Math.floor(Math.random() * 3),
          radiusRatio,
          angularScatter: (Math.random() - 0.5) * 0.45,
          radialScatter: (Math.random() - 0.5) * 0.12,
          freq: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    } else if (engine === 'particles') {
      const count = lite ? 35 : 75;
      const colors = ['#2DD4BF', '#14B8A6', '#5EEAD4', '#99F6E4', '#FFFFFF'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.0015,
          vy: (Math.random() - 0.5) * 0.0015,
          radius: Math.random() * 2.2 + 1.2,
          alpha: Math.random() * 0.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    let startTime = performance.now();
    let lastFrame = startTime;

    const render = (now: number) => {
      if (!isRunning) return;

      const elapsed = (now - startTime) * 0.001;
      const delta = Math.min((now - lastFrame) * 0.001, 0.1);
      lastFrame = now;

      // 1. CLEAR FRAME
      ctx.clearRect(0, 0, width, height);

      // BASE BACKGROUND
      ctx.fillStyle = '#0E0E0E';
      ctx.fillRect(0, 0, width, height);

      // 2. ENGINE SPECIFIC RENDER
      if (engine === 'aurora') {
        // === AURORA: FLOWING GREEN/MINT CURTAINS ===
        const layers = 4;
        const mintColors = ['#2DD4BF', '#14B8A6', '#10B981', '#06B6D4'];

        for (let l = 0; l < layers; l++) {
          const col = mintColors[l % mintColors.length];
          const yBase = height * (0.35 + l * 0.14);

          const grad = ctx.createLinearGradient(0, yBase - 90, width, yBase + 120);
          grad.addColorStop(0, col);
          grad.addColorStop(0.5, mintColors[(l + 1) % mintColors.length]);
          grad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(0, height);
          ctx.lineTo(0, yBase);

          const step = lite ? 20 : 12;
          for (let x = 0; x <= width; x += step) {
            const wave1 = Math.sin(x * 0.006 + elapsed * (0.9 + l * 0.3) + l) * 45;
            const wave2 = Math.cos(x * 0.012 - elapsed * 0.5 + l * 1.5) * 25;
            ctx.lineTo(x, yBase + wave1 + wave2);
          }

          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // Ambient vertical light rays
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (let i = 0; i < 5; i++) {
          const rx = ((i * 0.22 + elapsed * 0.04) % 1) * width;
          const rayGrad = ctx.createLinearGradient(rx, 0, rx + 40, height);
          rayGrad.addColorStop(0, 'transparent');
          rayGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.18)');
          rayGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = rayGrad;
          ctx.fillRect(rx - 25, 0, 70, height);
        }
        ctx.restore();
      } else if (engine === 'galaxy') {
        // === GALAXY: SPIRAL STARS + RADIANT PURPLE CORE ===
        const cx = width / 2;
        const cy = height / 2;
        const maxRadius = Math.min(width, height) * 0.44;
        const pitchRatio = 0.58;
        const globalAngle = elapsed * 0.25;

        // Core glow
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * 0.35);
        coreGrad.addColorStop(0, 'rgba(232, 121, 249, 0.45)');
        coreGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.2)');
        coreGrad.addColorStop(1, 'transparent');
        ctx.save();
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, maxRadius * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Stars
        for (let i = 0; i < particles.length; i++) {
          const s = particles[i];
          const dynamicAngle =
            (s.armIndex! * Math.PI * 2) / 3 +
            globalAngle +
            s.angularScatter! +
            Math.pow(s.radiusRatio!, 0.75) * 3.8;

          const effRadius = Math.max(0, (s.radiusRatio! + (s.radialScatter || 0)) * maxRadius);
          const x = cx + Math.cos(dynamicAngle) * effRadius;
          const y = cy + Math.sin(dynamicAngle) * (effRadius * pitchRatio);
          const twinkle = 0.7 + 0.3 * Math.sin(elapsed * 3 * s.freq! + s.phase!);

          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0.1, s.alpha * twinkle));
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(x, y, s.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Stellar Core Center Burst
        ctx.save();
        ctx.shadowBlur = 16;
        ctx.shadowColor = '#FFFFFF';
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (engine === 'particles') {
        // === PARTICLES: CONNECTED DOTS NETWORK ===
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
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Connect nearby dots with dynamic lines
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = px - p2.x * width;
            const dy = py - p2.y * height;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = Math.min(width, height) * 0.28;

            if (dist < maxDist) {
              ctx.save();
              ctx.strokeStyle = '#2DD4BF';
              ctx.globalAlpha = (1 - dist / maxDist) * 0.45;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(p2.x * width, p2.y * height);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      } else if (engine === 'gradient') {
        // === GRADIENT: ANIMATED ORBITING RADIAL MESH BLOBS ===
        const cx = width / 2;
        const cy = height / 2;
        const rad = Math.max(width, height) * 0.52;
        const colors = [
          '#0F766E', // Deep Teal
          '#1E1B4B', // Deep Indigo
          '#312E81', // Violet Indigo
          '#2DD4BF', // Mint Bright
        ];

        for (let i = 0; i < 4; i++) {
          const gx = cx + Math.sin(elapsed * 0.7 + (i * Math.PI) / 2) * (width * 0.32);
          const gy = cy + Math.cos(elapsed * 0.8 + (i * Math.PI) / 2) * (height * 0.28);

          const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
          grad.addColorStop(0, colors[i]);
          grad.addColorStop(1, 'transparent');

          ctx.save();
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Guaranteed Clean Cleanup when engine unmounts/switches
    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, width, height);
    };
  }, [engine, lite]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ display: 'block', background: '#0E0E0E' }}
    />
  );
};

export default LiveCanvas;
