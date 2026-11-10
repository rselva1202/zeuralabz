import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { LiveComponentPreview } from '../components/LiveComponentPreview';

const ReactBitsPreview = lazy(() => import('./react-bits/ReactBitsPreviews'));
const MagicUIPreview = lazy(() => import('./magic-ui/MagicUIPreviews'));
const AceternityPreview = lazy(() => import('./aceternity/AceternityPreviews'));

export interface PreviewItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  source?: 'zeuralabz-original' | 'react-bits' | 'magic-ui' | 'aceternity';
  componentName?: string;
  originalUrl?: string;
  previewUrl?: string;
  license?: string;
}

interface PreviewRouterProps {
  comp: PreviewItem;
  animationMode: 'full' | 'lite' | 'off';
}

export const PreviewRouter: React.FC<PreviewRouterProps> = ({ comp, animationMode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Viewport intersection observer to eliminate off-screen animation lag
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        rootMargin: '100px', // Preload slightly before scrolling into view
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const source = comp.source || 'zeuralabz-original';

  const getSourceBadge = () => {
    switch (source) {
      case 'react-bits':
        return { label: '● LIVE • React Bits', bg: 'bg-[#1E293B]', text: 'text-[#93C5FD]', border: 'border-[#3B82F6]' };
      case 'magic-ui':
        return { label: '● LIVE • Magic UI', bg: 'bg-[#1E293B]', text: 'text-[#93C5FD]', border: 'border-[#3B82F6]' };
      case 'aceternity':
        return { label: '● LIVE • Aceternity UI', bg: 'bg-[#2563EB]', text: 'text-white', border: 'border-white' };
      default:
        return { label: '● LIVE • ZEURALABZ', bg: 'bg-[#2563EB]', text: 'text-white', border: 'border-white' };
    }
  };

  const getAttribution = () => {
    switch (source) {
      case 'react-bits':
        return 'Source: React Bits • MIT + Commons';
      case 'magic-ui':
        return 'Source: Magic UI • MIT';
      case 'aceternity':
        return 'Source: Aceternity UI • MIT';
      default:
        return 'Source: ZEURALABZ Original • MIT';
    }
  };

  const badge = getSourceBadge();

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#0A0D14]">
      {/* Top Live Badge */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider ${badge.bg} ${badge.text} border border-white shadow-[2px_2px_0px_#000000]`}
        >
          {badge.label}
        </span>
      </div>

      {/* Bottom Attribution */}
      <div className="absolute bottom-1 right-2 z-20 pointer-events-none">
        <span className="text-[8px] font-mono font-bold text-white/50 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
          {getAttribution()}
        </span>
      </div>

      {/* Preview Content */}
      {animationMode === 'off' ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#11131F] text-zinc-400 p-4 text-center">
          <span className="text-xl mb-1">⏸️</span>
          <span className="text-xs font-mono font-bold text-zinc-300">ANIMATIONS PAUSED</span>
          <span className="text-[10px] text-zinc-500 mt-0.5">Toggle animations ON in header</span>
        </div>
      ) : !isVisible ? (
        // Off-screen placeholder to save CPU / GPU
        <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center">
          <span className="w-3 h-3 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
            </div>
          }
        >
          {source === 'react-bits' ? (
            <ReactBitsPreview slug={comp.slug} lite={animationMode === 'lite'} />
          ) : source === 'magic-ui' ? (
            <MagicUIPreview slug={comp.slug} lite={animationMode === 'lite'} />
          ) : source === 'aceternity' ? (
            <AceternityPreview slug={comp.slug} lite={animationMode === 'lite'} />
          ) : (
            <LiveComponentPreview comp={comp as any} animationMode={animationMode} />
          )}
        </Suspense>
      )}
    </div>
  );
};

export default PreviewRouter;
