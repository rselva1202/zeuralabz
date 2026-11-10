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
        rootMargin: '120px', // Preload slightly before scrolling into view
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const source = comp.source || 'zeuralabz-original';

  const getSourceDisplayName = () => {
    switch (source) {
      case 'react-bits':
        return 'React Bits';
      case 'magic-ui':
        return 'Magic UI';
      case 'aceternity':
        return 'Aceternity';
      default:
        return 'Original';
    }
  };

  const getAttribution = () => {
    switch (source) {
      case 'react-bits':
        return 'React Bits • MIT + Commons';
      case 'magic-ui':
        return 'Magic UI • MIT';
      case 'aceternity':
        return 'Aceternity UI • MIT';
      default:
        return 'ZEURALABZ Original • MIT';
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#0A0D14]">
      {/* Minimal Top Live Badge: ONE small badge per card in mint, plain text, no box */}
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse inline-block" />
        <span className="text-[10px] font-mono font-bold text-[#2DD4BF] uppercase tracking-wider">
          LIVE • {getSourceDisplayName()}
        </span>
      </div>

      {/* Subtle Bottom Attribution */}
      <div className="absolute bottom-1.5 right-2 z-20 pointer-events-none">
        <span className="text-[9px] font-mono font-medium text-zinc-400 bg-black/70 px-1.5 py-0.5 rounded border border-white/10">
          {getAttribution()}
        </span>
      </div>

      {/* Preview Content */}
      {animationMode === 'off' ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#11131F] text-zinc-400 p-4 text-center">
          <span className="text-xl mb-1">⏸️</span>
          <span className="text-xs font-mono font-bold text-zinc-300">ANIMATIONS PAUSED</span>
          <span className="text-[10px] text-zinc-500 mt-0.5">Toggle animations in header</span>
        </div>
      ) : !isVisible ? (
        // Off-screen placeholder to save CPU / GPU
        <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="w-full h-full bg-[#0A0D14] flex items-center justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-[#2DD4BF] border-t-transparent animate-spin" />
            </div>
          }
        >
          {source === 'react-bits' ? (
            <ReactBitsPreview key={`react-bits-${comp.slug}`} slug={comp.slug} lite={animationMode === 'lite'} />
          ) : source === 'magic-ui' ? (
            <MagicUIPreview key={`magic-ui-${comp.slug}`} slug={comp.slug} lite={animationMode === 'lite'} />
          ) : source === 'aceternity' ? (
            <AceternityPreview key={`aceternity-${comp.slug}`} slug={comp.slug} lite={animationMode === 'lite'} />
          ) : (
            <LiveComponentPreview
              key={`zeuralabz-${comp.slug}`}
              slug={comp.slug}
              category={comp.category}
              name={comp.name}
              lite={animationMode === 'lite'}
              animationMode={animationMode}
            />
          )}
        </Suspense>
      )}
    </div>
  );
};

export default PreviewRouter;
