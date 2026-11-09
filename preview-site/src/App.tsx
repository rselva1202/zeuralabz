import React, { useState, useMemo, useEffect } from 'react';
import componentsData from './data/components.json';
import { LiveComponentPreview } from './components/LiveComponentPreview';
import { GalaxyBackground } from './components/GalaxyBackground';

interface ComponentItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  bestFor: string[];
  theme: string;
  source?: 'zeuralabz-original' | 'react-bits' | 'magic-ui';
  componentName?: string;
  originalUrl?: string;
  previewUrl?: string;
  installCommand?: string;
}

const CATEGORIES = [
  'all',
  'backgrounds',
  'text-animations',
  'buttons',
  'cards',
  'heroes',
  'layouts',
  'forms',
  'animations',
  'loaders',
] as const;

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'backgrounds': { bg: '#FFDC58', text: '#000000', border: '#000000' },
  'text-animations': { bg: '#FF90E8', text: '#000000', border: '#000000' },
  'buttons': { bg: '#7FBCFF', text: '#000000', border: '#000000' },
  'cards': { bg: '#A3E635', text: '#000000', border: '#000000' },
  'heroes': { bg: '#FF6B35', text: '#000000', border: '#000000' },
  'layouts': { bg: '#B388FF', text: '#000000', border: '#000000' },
  'forms': { bg: '#67E8F9', text: '#000000', border: '#000000' },
  'animations': { bg: '#FF4911', text: '#FFFFFF', border: '#000000' },
  'loaders': { bg: '#BEF264', text: '#000000', border: '#000000' },
};

const ITEMS_PER_PAGE = 12;

interface ComponentCardProps {
  comp: ComponentItem;
  isCopied: boolean;
  animationMode: 'full' | 'lite' | 'off';
  onCopy: (text: string) => void;
  onOpenCode: (comp: ComponentItem) => void;
}

const ComponentCard = React.memo<ComponentCardProps>(({
  comp,
  isCopied,
  animationMode,
  onCopy,
  onOpenCode,
}) => {
  const catTheme = CATEGORY_COLORS[comp.category] || { bg: '#FFDC58', text: '#000', border: '#000' };

  return (
    <div className="group rounded-lg bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_#000] transition-all duration-150 flex flex-col overflow-hidden">
      {/* Top Preview Area (Framed Box with 3px black bottom border) */}
      <div className="h-48 bg-black relative flex items-center justify-center overflow-hidden border-b-[3px] border-black">
        {comp.source === 'react-bits' ? (
          <div className="w-full h-full bg-[#E0F2FF] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="w-10 h-10 bg-[#7FBCFF] border-[2px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-lg">
                ✨
              </span>
              <div>
                <div className="font-heading text-xs font-black text-black uppercase tracking-wide">
                  Official React Bits Demo
                </div>
                <div className="text-[10px] text-zinc-700 font-mono font-bold">
                  @react-bits/{comp.componentName || comp.name}-TS-TW
                </div>
              </div>
              <a
                href={comp.originalUrl || comp.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="neo-btn bg-[#7FBCFF] text-black px-3 py-1.5 text-xs font-heading font-black mt-1"
              >
                VIEW LIVE DEMO ➔
              </a>
            </div>
          </div>
        ) : comp.source === 'magic-ui' ? (
          <div className="w-full h-full bg-[#E6FFFA] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="w-10 h-10 bg-[#67E8F9] border-[2px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-lg">
                🪄
              </span>
              <div>
                <div className="font-heading text-xs font-black text-black uppercase tracking-wide">
                  Official Magic UI Demo
                </div>
                <div className="text-[10px] text-zinc-700 font-mono font-bold">
                  @magic-ui/{comp.slug}
                </div>
              </div>
              <a
                href={comp.originalUrl || comp.previewUrl || `https://magicui.design/docs/components/${comp.slug}`}
                target="_blank"
                rel="noreferrer"
                className="neo-btn bg-[#67E8F9] text-black px-3 py-1.5 text-xs font-heading font-black mt-1"
              >
                VIEW LIVE DEMO ➔
              </a>
            </div>
          </div>
        ) : (
          <LiveComponentPreview
            slug={comp.slug}
            category={comp.category}
            name={comp.name}
            lite={animationMode !== 'full'}
            animationMode={animationMode}
          />
        )}

        {/* Source badge (Top-Left) */}
        <span
          className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[2px] border-black shadow-[2px_2px_0px_#000] ${
            comp.source === 'react-bits'
              ? 'bg-[#7FBCFF] text-black'
              : comp.source === 'magic-ui'
              ? 'bg-[#67E8F9] text-black'
              : 'bg-[#FFDC58] text-black'
          }`}
        >
          {comp.source === 'react-bits'
            ? 'React Bits • MIT'
            : comp.source === 'magic-ui'
            ? 'Magic UI • MIT'
            : 'ZEURALABZ Original'}
        </span>

        {/* Live Preview Indicator Badge (Top-Right) */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-black uppercase bg-black text-white border-[2px] border-black shadow-[2px_2px_0px_#000]">
          {comp.source === 'react-bits' || comp.source === 'magic-ui' ? (
            <>
              <span className="w-1.5 h-1.5 bg-[#67E8F9]" />
              OFFICIAL
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 bg-[#A3E635] animate-pulse" />
              {animationMode === 'off' ? 'STATIC' : animationMode === 'lite' ? 'LITE' : '60 FPS'}
            </>
          )}
        </span>
      </div>

      {/* Middle: Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-black text-black group-hover:text-indigo-700 transition">
              {comp.name}
            </h3>
            <span className="text-[11px] text-zinc-600 font-mono font-bold bg-[#FFFDF5] border border-black px-1.5 py-0.5">
              {comp.slug}
            </span>
          </div>
          <p className="text-xs text-black font-medium mt-2 line-clamp-2 leading-relaxed">
            {comp.description}
          </p>

          {/* Best for tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span
              className="px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000]"
              style={{ backgroundColor: catTheme.bg, color: catTheme.text }}
            >
              {comp.category}
            </span>
            {comp.bestFor?.slice(0, 2).map((b) => (
              <span
                key={b}
                className="px-2 py-0.5 text-[10px] font-bold bg-[#FFFDF5] text-black border border-black"
              >
                ✓ {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-4 pt-3 border-t-[2px] border-black flex items-center justify-between gap-2">
          <button
            onClick={() =>
              onCopy(
                comp.source === 'react-bits'
                  ? `npx zeuralabz add ${comp.slug} --source react-bits`
                  : comp.source === 'magic-ui'
                  ? `npx zeuralabz add ${comp.slug} --source magic-ui`
                  : `npx zeuralabz add ${comp.slug} --source zeuralabz-original`
              )
            }
            className={`flex-1 py-2 px-3 text-xs font-mono font-black border-[2px] border-black shadow-[3px_3px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5 ${
              isCopied
                ? 'bg-[#A3E635] text-black font-black'
                : 'bg-black text-[#FFDC58] hover:bg-zinc-900'
            }`}
          >
            {isCopied ? (
              '✔ COPIED TO CLIPBOARD!'
            ) : (
              <>
                <span>$</span> npx zeuralabz add {comp.slug}{' '}
                {comp.source === 'react-bits'
                  ? '--source react-bits'
                  : comp.source === 'magic-ui'
                  ? '--source magic-ui'
                  : ''}
              </>
            )}
          </button>

          <button
            onClick={() => onOpenCode(comp)}
            className="neo-btn bg-[#FF90E8] text-black px-3 py-2 text-xs font-heading font-black"
            title="View code & usage"
          >
            CODE ➔
          </button>
        </div>
      </div>
    </div>
  );
});
ComponentCard.displayName = 'ComponentCard';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('typescript');
  const [rawSearchQuery, setRawSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAppendMode, setIsAppendMode] = useState<boolean>(false);
  const [animationMode, setAnimationMode] = useState<'full' | 'lite' | 'off'>('lite');

  // Debounce search input by 300ms to avoid lag during typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(rawSearchQuery);
      setCurrentPage(1);
      setIsAppendMode(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [rawSearchQuery]);

  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [activeTab, setActiveTab] = useState<'react' | 'html' | 'css'>('react');
  const [heroBg, setHeroBg] = useState<'aurora' | 'galaxy' | 'particles' | 'gradient'>('aurora');
  const [activePreset, setActivePreset] = useState<'dark-neon' | 'ocean' | 'dune'>('dark-neon');
  const [starCount, setStarCount] = useState<number>(48);

  const standalone = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('standalone') : null;

  // Fetch real GitHub star count
  useEffect(() => {
    fetch('https://api.github.com/repos/rselva1202/zeuralabz')
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  const filteredComponents = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    return (componentsData as ComponentItem[]).filter((c) => {
      const matchesSource =
        selectedSource === 'all' ||
        (selectedSource === 'react-bits' && c.source === 'react-bits') ||
        (selectedSource === 'magic-ui' && c.source === 'magic-ui') ||
        (selectedSource === 'zeuralabz-original' && (c.source === 'zeuralabz-original' || !c.source));
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return matchesSource && matchesCategory && matchesSearch;
    });
  }, [selectedSource, selectedCategory, debouncedQuery]);

  const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE) || 1;
  const visibleComponents = useMemo(() => {
    if (isAppendMode) {
      return filteredComponents.slice(0, currentPage * ITEMS_PER_PAGE);
    }
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredComponents.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredComponents, currentPage, isAppendMode]);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  const totalReactBits = useMemo(
    () => (componentsData as ComponentItem[]).filter((c) => c.source === 'react-bits').length,
    []
  );
  const totalMagicUI = useMemo(
    () => (componentsData as ComponentItem[]).filter((c) => c.source === 'magic-ui').length,
    []
  );
  const totalZeura = useMemo(
    () => (componentsData as ComponentItem[]).filter((c) => c.source === 'zeuralabz-original' || !c.source).length,
    []
  );
  const totalAll = totalReactBits + totalMagicUI + totalZeura;

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(text);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const sampleHeroCode = `import { AuroraBackground } from '@/components/zeuralabz/aurora';
import { SplitText } from '@/components/zeuralabz/split-text';
import { ShimmerButton } from '@/components/zeuralabz/shimmer';

export default function Hero() {
  return (
    <AuroraBackground className="min-h-screen flex flex-col items-center justify-center">
      <SplitText text="Websites that feel alive" className="text-6xl font-black" />
      <p className="mt-4 text-black font-bold">417 components. 1M+ combinations.</p>
      <ShimmerButton text="Explore Catalog ➔" className="mt-8 font-black uppercase" />
    </AuroraBackground>
  );
}`;

  // Standalone preview route handler for testing
  if (standalone === 'galaxy' || standalone === 'galaxy-fullscreen' || standalone === 'galaxy-before') {
    return (
      <div className="w-screen h-screen bg-[#FFFDF5] flex items-center justify-center p-8 neo-dots">
        <div className="w-[460px] bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] rounded-none overflow-hidden flex flex-col">
          <div className="bg-[#FFDC58] border-b-[3px] border-black px-4 py-2 flex items-center justify-between font-heading text-xs font-black">
            <span>ZEURALABZ • STANDALONE</span>
            <span className="bg-black text-white px-2 py-0.5 text-[10px]">LIVE</span>
          </div>
          <div className="h-64 bg-[#0a0e27] relative border-b-[3px] border-black overflow-hidden">
            <GalaxyBackground starCount={900} speed={0.7} armCount={3} glowIntensity={1.2} />
          </div>
          <div className="p-5 space-y-3 bg-white">
            <h3 className="font-heading text-lg font-black text-black">Spiral Galaxy Cosmic Canvas</h3>
            <p className="text-xs text-black font-medium">800+ stars, 3 logarithmic spiral arms, radiant stellar core.</p>
            <div className="pt-2 border-t-[2px] border-black flex justify-between items-center text-xs font-mono font-bold">
              <span>npx zeuralabz add galaxy</span>
              <span className="bg-[#A3E635] px-2 py-0.5 border border-black">READY</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black flex flex-col font-sans selection:bg-[#FFDC58] selection:text-black">
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (Sticky, Cream bg, 3px solid black border) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 w-full border-b-[3px] border-black bg-[#FFFDF5] shadow-[0px_4px_0px_#000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="w-10 h-10 bg-[#FFDC58] border-[3px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center text-lg font-black transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#000]">
                ⚡
              </span>
              <span className="font-heading text-2xl font-black tracking-tight text-black">
                ZEURA<span className="bg-[#FFDC58] px-1 py-0.5 border-[2px] border-black ml-0.5">LABZ</span>
              </span>
            </a>
            <span className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-black tracking-wider uppercase bg-black text-white border-[2px] border-black shadow-[2px_2px_0px_#FFDC58]">
              v1.1.0 • OPEN SOURCE
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-heading font-black uppercase text-black">
            <a href="#showcase" className="px-2 py-1 border-[2px] border-transparent hover:border-black hover:bg-[#FFDC58] hover:shadow-[3px_3px_0px_#000] transition">
              Showcase
            </a>
            <a href="#components" className="px-2 py-1 border-[2px] border-transparent hover:border-black hover:bg-[#FFDC58] hover:shadow-[3px_3px_0px_#000] transition">
              Components
            </a>
            <a href="#how-it-works" className="px-2 py-1 border-[2px] border-transparent hover:border-black hover:bg-[#FFDC58] hover:shadow-[3px_3px_0px_#000] transition">
              How it Works
            </a>
            <a href="#mcp" className="px-2 py-1 border-[2px] border-transparent hover:border-black hover:bg-[#FFDC58] hover:shadow-[3px_3px_0px_#000] transition">
              MCP & Skill
            </a>
            <a
              href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1 border-[2px] border-transparent hover:border-black hover:bg-[#FFDC58] hover:shadow-[3px_3px_0px_#000] transition"
            >
              Docs
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Chunky Neo-Brutalist Animations Mode Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-white border-[2px] border-black p-1 shadow-[3px_3px_0px_#000]">
              <span className="text-[10px] font-black uppercase px-1 text-black font-heading">⚡ ANIMATIONS:</span>
              {(['lite', 'full', 'off'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setAnimationMode(m)}
                  className={`px-2 py-0.5 text-[10px] font-black uppercase transition border-[2px] ${
                    animationMode === m
                      ? m === 'lite'
                        ? 'bg-[#FFDC58] text-black border-black shadow-[2px_2px_0px_#000]'
                        : m === 'full'
                        ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_#000]'
                        : 'bg-black text-white border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-transparent text-black border-transparent hover:border-black hover:bg-zinc-100'
                  }`}
                  title={`Motion mode: ${m}`}
                >
                  {m === 'lite' ? 'Lite' : m === 'full' ? 'ON' : 'OFF'}
                </button>
              ))}
            </div>

            {/* GitHub Stars Button */}
            <a
              href="https://github.com/rselva1202/zeuralabz"
              target="_blank"
              rel="noreferrer"
              className="neo-btn bg-white px-3 py-1.5 text-xs flex items-center gap-1.5"
            >
              <span className="font-heading font-black">GITHUB</span>
              <span className="text-amber-500 font-bold">★</span>
              <span className="bg-black text-white px-1.5 py-0.2 rounded-none text-[10px] font-mono font-bold">
                {starCount}
              </span>
            </a>

            {/* Main CLI Suggest CTA */}
            <button
              onClick={() => copyCommand('npx zeuralabz suggest')}
              className="neo-btn bg-[#FFDC58] px-3.5 py-1.5 text-xs flex items-center gap-2"
              title="Click to copy suggestion command"
            >
              <span className="font-mono font-black">$ npx zeuralabz suggest</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-heading uppercase">
                {copiedSlug === 'npx zeuralabz suggest' ? 'COPIED!' : 'COPY'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION (Cream bg, Neo-Dots, Rotated Stickers, Framed Preview) */}
      {/* ============================================================== */}
      <section id="hero" className="relative pt-12 pb-20 border-b-[3px] border-black neo-dots overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Pill & Rotated Sticker Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black text-white border-[2px] border-black shadow-[3px_3px_0px_#FFDC58] text-xs font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 bg-[#A3E635] border border-black animate-pulse" />
              NEW • ZEURALABZ 1.1 — {totalAll} COMPONENTS ({totalReactBits} REACT BITS + {totalMagicUI} MAGIC UI + {totalZeura} ORIGINALS)
            </div>

            {/* Sticker Badges */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="bg-[#FF90E8] text-black border-[3px] border-black shadow-[4px_4px_0px_#000] px-3 py-1 font-heading text-xs font-black uppercase rotate-[-3deg]">
                120+ ORIGINALS!
              </span>
              <span className="bg-[#FFDC58] text-black border-[3px] border-black shadow-[4px_4px_0px_#000] px-3 py-1 font-heading text-xs font-black uppercase rotate-[2deg]">
                417 COMPONENTS!
              </span>
              <span className="bg-[#A3E635] text-black border-[3px] border-black shadow-[4px_4px_0px_#000] px-3 py-1 font-heading text-xs font-black uppercase rotate-[-2deg]">
                100% FREE!
              </span>
            </div>
          </div>

          {/* Main Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (60% / 7 cols) */}
            <div className="lg:col-span-7">
              <h1 className="font-heading text-4xl sm:text-6xl font-black text-black leading-[1.05] tracking-tight">
                BEAUTIFUL ANIMATED UI FOR WEBSITES THAT{' '}
                <span className="bg-[#FFDC58] px-2 py-0.5 border-[3px] border-black shadow-[4px_4px_0px_#000] inline-block mt-1">
                  FEEL ALIVE
                </span>
                .
              </h1>
              <p className="mt-5 text-lg text-black font-semibold max-w-xl leading-relaxed">
                {totalAll} animated components and backgrounds for React across React Bits, Magic UI, and ZEURALABZ Originals. Tune them yourself, or hand them to your AI agent.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#components"
                  className="neo-btn bg-[#FFDC58] text-black font-heading text-sm px-6 py-3.5 flex items-center gap-2"
                >
                  <span>BROWSE COMPONENTS</span>
                  <span className="text-base font-black">➔</span>
                </a>
                <a
                  href="https://github.com/rselva1202/zeuralabz"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn bg-white text-black font-heading text-sm px-6 py-3.5 flex items-center gap-2"
                >
                  <span>STAR ON GITHUB</span>
                  <span className="text-amber-500 font-bold">★</span>
                </a>
              </div>
            </div>

            {/* Right Column Stats Box (40% / 5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] p-5">
                <div className="bg-black text-white px-3 py-1 font-heading text-xs font-black uppercase mb-4 flex justify-between items-center">
                  <span>LIBRARY TELEMETRY</span>
                  <span className="text-[#A3E635]">● ACTIVE</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-[#FFFDF5] border-[2px] border-black shadow-[3px_3px_0px_#000]">
                    <div className="font-heading text-3xl font-black text-black">{totalAll}</div>
                    <div className="text-[11px] font-black uppercase text-black mt-1">Total Components</div>
                  </div>
                  <div className="p-3.5 bg-[#7FBCFF] border-[2px] border-black shadow-[3px_3px_0px_#000]">
                    <div className="font-heading text-3xl font-black text-black">{totalReactBits}</div>
                    <div className="text-[11px] font-black uppercase text-black mt-1">React Bits (Linked)</div>
                  </div>
                  <div className="p-3.5 bg-[#67E8F9] border-[2px] border-black shadow-[3px_3px_0px_#000]">
                    <div className="font-heading text-3xl font-black text-black">{totalMagicUI}</div>
                    <div className="text-[11px] font-black uppercase text-black mt-1">Magic UI (Linked)</div>
                  </div>
                  <div className="p-3.5 bg-[#FF90E8] border-[2px] border-black shadow-[3px_3px_0px_#000]">
                    <div className="font-heading text-3xl font-black text-black">{totalZeura}</div>
                    <div className="text-[11px] font-black uppercase text-black mt-1">ZEURALABZ Original</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FRAMED LIVE BACKGROUND CANVAS BOX (Chunky neo-brutalist border + shadow) */}
          <div className="mt-12 bg-white border-[3px] border-black shadow-[8px_8px_0px_#000] overflow-hidden">
            {/* Window bar */}
            <div className="bg-[#FFDC58] border-b-[3px] border-black px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-heading text-xs font-black uppercase text-black">
                <span className="w-3 h-3 bg-red-500 border-[1.5px] border-black inline-block" />
                <span className="w-3 h-3 bg-yellow-400 border-[1.5px] border-black inline-block" />
                <span className="w-3 h-3 bg-green-500 border-[1.5px] border-black inline-block" />
                <span className="ml-2">LIVE CANVAS ENGINE PREVIEW: {heroBg.toUpperCase()}</span>
              </div>

              {/* Background switcher chunky buttons */}
              <div className="flex items-center gap-1.5 bg-white border-[2px] border-black p-1 shadow-[2px_2px_0px_#000]">
                <span className="text-[10px] font-black uppercase px-1.5 text-black">TRY ENGINE:</span>
                {(['aurora', 'galaxy', 'particles', 'gradient'] as const).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setHeroBg(bg)}
                    className={`px-2.5 py-1 text-xs font-heading font-black uppercase transition border-[2px] ${
                      heroBg === bg
                        ? 'bg-black text-[#FFDC58] border-black shadow-[2px_2px_0px_#000]'
                        : 'bg-white text-black border-transparent hover:border-black hover:bg-zinc-100'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Framed Canvas Stage */}
            <div className="h-64 sm:h-80 w-full relative bg-[#0a0e27] overflow-hidden flex items-center justify-center">
              {heroBg === 'aurora' && (
                <div className="absolute inset-0 opacity-80 overflow-hidden">
                  <div
                    className={`w-[140%] h-[150%] -top-1/4 -left-1/4 absolute rounded-full ${
                      activePreset === 'ocean'
                        ? 'bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-800'
                        : activePreset === 'dune'
                        ? 'bg-gradient-to-r from-amber-400 via-orange-600 to-rose-700'
                        : 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-600'
                    } animate-pulse transform rotate-6 scale-110`}
                  />
                </div>
              )}
              {heroBg === 'galaxy' && (
                <div className="absolute inset-0">
                  <GalaxyBackground starCount={900} speed={0.5} armCount={3} glowIntensity={1.1} />
                </div>
              )}
              {heroBg === 'particles' && (
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-cyan-400 border border-white animate-bounce" />
                  <div className="absolute top-1/2 left-2/3 w-5 h-5 rounded-full bg-yellow-400 border border-white animate-pulse" />
                  <div className="absolute top-3/4 left-1/4 w-4 h-4 rounded-full bg-pink-400 border border-white animate-ping" />
                </div>
              )}
              {heroBg === 'gradient' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-900 to-black opacity-80" />
              )}

              {/* Framed overlay badge */}
              <div className="relative z-10 bg-white/95 border-[3px] border-black shadow-[6px_6px_0px_#000] p-6 text-center max-w-md mx-4">
                <span className="bg-[#A3E635] text-black border-[2px] border-black px-2 py-0.5 text-[10px] font-heading font-black uppercase">
                  ACTIVE PREVIEW
                </span>
                <h3 className="font-heading text-2xl font-black uppercase text-black mt-2">
                  {heroBg === 'aurora'
                    ? 'Northern Aurora Wave'
                    : heroBg === 'galaxy'
                    ? 'Spiral Cosmic Galaxy'
                    : heroBg === 'particles'
                    ? 'Interactive Particle Web'
                    : 'Mesh Gradient Drift'}
                </h3>
                <p className="text-xs font-bold text-black mt-1">
                  Framed responsive canvas running at 30/60 FPS with zero scroll lag.
                </p>
                <div className="mt-4 pt-3 border-t-[2px] border-black flex items-center justify-between text-xs font-mono font-bold">
                  <span>$ npx zeuralabz add {heroBg}</span>
                  <button
                    onClick={() => copyCommand(`npx zeuralabz add ${heroBg}`)}
                    className="bg-[#FFDC58] text-black border-[2px] border-black px-2 py-0.5 hover:bg-yellow-400 font-heading"
                  >
                    {copiedSlug === `npx zeuralabz add ${heroBg}` ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SHOWCASE PANEL (Hero.jsx + Terminal + Presets) */}
      {/* ============================================================== */}
      <section id="showcase" className="py-20 border-b-[3px] border-black bg-[#FFF4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-[#FF90E8] text-black border-[2px] border-black px-3 py-1 font-heading text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
              LIVE CODE SYNTHESIS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-black mt-3">
              ZERO BOILERPLATE. COPY & SHIP.
            </h2>
            <p className="text-black font-semibold text-sm mt-2">
              Every component works independently in standard React, Vite, or Next.js apps.
            </p>
          </div>

          {/* Chunky Multi-Window Container */}
          <div className="bg-white border-[3px] border-black shadow-[10px_10px_0px_#000] overflow-hidden">
            {/* Window Topbar */}
            <div className="h-12 px-4 bg-[#FFDC58] border-b-[3px] border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-black" />
                <span className="font-heading text-xs font-black text-black ml-3">
                  ZEURALABZ-SHOWCASE-MATRIX.JSX
                </span>
              </div>
              <div className="text-[11px] font-mono font-bold text-black uppercase bg-white border border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                REACT 19 + TAILWIND V4
              </div>
            </div>

            {/* Window Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Code Editor (Hero.jsx) - 7 cols */}
              <div className="lg:col-span-7 p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black font-mono text-xs flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-[2px] border-black">
                    <span className="font-heading text-black font-black flex items-center gap-1.5 text-xs">
                      <span className="text-[#00C853]">⚛</span> Hero.jsx
                    </span>
                    <button
                      onClick={() => copyCommand(sampleHeroCode)}
                      className="neo-btn bg-[#FFDC58] text-black px-3 py-1 text-xs"
                    >
                      {copiedSlug === sampleHeroCode ? '✔ COPIED' : 'COPY CODE'}
                    </button>
                  </div>
                  <pre className="text-black overflow-x-auto leading-relaxed space-y-1 font-mono text-xs bg-[#FFFDF5] p-4 border-[2px] border-black">
                    {sampleHeroCode.split('\n').map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="text-zinc-400 select-none w-7 shrink-0 text-right pr-3 font-bold">{idx + 1}</span>
                        <span
                          className={
                            line.startsWith('import')
                              ? 'text-indigo-600 font-bold'
                              : line.includes('<AuroraBackground') || line.includes('<SplitText') || line.includes('<ShimmerButton')
                              ? 'text-rose-600 font-black'
                              : line.includes('return') || line.includes('export')
                              ? 'text-purple-700 font-bold'
                              : 'text-black font-semibold'
                          }
                        >
                          {line}
                        </span>
                      </div>
                    ))}
                  </pre>
                </div>
              </div>

              {/* Right Side: Terminal (top) + Presets (bottom) - 5 cols */}
              <div className="lg:col-span-5 flex flex-col divide-y-[3px] divide-black bg-[#FFFDF5]">
                {/* Right Top: Terminal Window */}
                <div className="p-5 font-mono text-xs bg-black text-white">
                  <div className="font-heading text-[#FFDC58] font-black mb-3 flex items-center gap-2 text-xs">
                    <span className="text-[#A3E635]">❯</span> TERMINAL WORKFLOW
                  </div>
                  <div className="space-y-1.5 bg-[#121212] p-3.5 border-[2px] border-zinc-800 text-[11px] font-mono">
                    <div className="text-[#FFDC58] font-bold">$ npx zeuralabz suggest</div>
                    <div className="text-zinc-400">✓ Scanning project structure...</div>
                    <div className="text-[#A3E635] font-bold">✓ Recommended 3 UI picks for your landing page:</div>
                    <div className="text-white pl-2">• Aurora Background [Yellow Accent]</div>
                    <div className="text-white pl-2">• Split Text Stagger [Pink Accent]</div>
                    <div className="text-white pl-2">• Shimmer Button [Blue Accent]</div>
                    <div className="text-[#67E8F9] mt-2 font-bold">$ npx zeuralabz add aurora</div>
                    <div className="text-zinc-400">✔ Installed into src/components/zeuralabz/aurora</div>
                  </div>
                </div>

                {/* Right Bottom: Presets Window */}
                <div className="p-5 bg-white">
                  <div className="font-heading text-xs font-black text-black mb-3 flex items-center justify-between uppercase">
                    <span>Aesthetic Tuning:</span>
                    <span className="bg-[#A3E635] text-black px-1.5 py-0.5 border border-black text-[10px]">LIVE TUNE</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dark-neon', name: 'Dark Neon', colors: 'Emerald + Cyan' },
                      { id: 'ocean', name: 'Ocean', colors: 'Aqua Wave' },
                      { id: 'dune', name: 'Dune', colors: 'Solar Amber' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setActivePreset(preset.id as any)}
                        className={`p-2.5 text-left border-[2px] transition ${
                          activePreset === preset.id
                            ? 'bg-[#FFDC58] border-black shadow-[3px_3px_0px_#000] font-black'
                            : 'bg-white border-black hover:bg-zinc-100 font-bold'
                        }`}
                      >
                        <div className="text-xs font-heading font-black text-black uppercase">{preset.name}</div>
                        <div className="text-[10px] text-zinc-700 mt-1">{preset.colors}</div>
                      </button>
                    ))}
                  </div>

                  {/* Preset Values Panel */}
                  <div className="mt-3 p-3 bg-[#FFFDF5] border-[2px] border-black text-[11px] font-mono text-black font-bold space-y-1 shadow-[2px_2px_0px_#000]">
                    <div className="flex justify-between">
                      <span>Amplitude:</span>
                      <span className="text-indigo-600">
                        {activePreset === 'ocean' ? '0.82 (Deep Surge)' : activePreset === 'dune' ? '0.64 (Warm Drift)' : '0.95 (High Energy)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cycle Speed:</span>
                      <span className="text-rose-600">
                        {activePreset === 'ocean' ? '12s smooth' : activePreset === 'dune' ? '18s relaxed' : '15s kinetic'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EXPLORE THE LIBRARY (Catalog, Filters, Search) */}
      {/* ============================================================== */}
      <section id="components" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between border-b-[3px] border-black pb-6">
          <div>
            <h2 className="font-heading text-3xl font-black uppercase text-black">Component Catalog</h2>
            <p className="text-xs text-black font-semibold mt-1">
              Every component rendered live with responsive code tabs and single-command installation.
            </p>
          </div>

          {/* Neo Search bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search components (e.g. aurora, bento, tilt, button)..."
              value={rawSearchQuery}
              onChange={(e) => setRawSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] text-xs font-bold text-black placeholder:text-zinc-500 focus:outline-none focus:shadow-[6px_6px_0px_#000] focus:bg-[#FFFDF5] transition"
            />
            {rawSearchQuery && (
              <button
                onClick={() => {
                  setRawSearchQuery('');
                  setCurrentPage(1);
                  setIsAppendMode(false);
                }}
                className="absolute right-3 top-3 text-black font-heading font-black text-xs hover:text-red-600"
              >
                ✕ CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Source Filter Row (Chunky Neo-Brutalist buttons) */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-2 border-t-[3px] border-black/10">
          <span className="font-heading text-xs font-black text-black mr-2 uppercase tracking-wider">
            SOURCE:
          </span>
          {[
            { id: 'all', label: `All Sources (${totalAll})` },
            { id: 'react-bits', label: `React Bits • MIT (${totalReactBits})` },
            { id: 'magic-ui', label: `Magic UI • MIT (${totalMagicUI})` },
            { id: 'zeuralabz-original', label: `ZEURALABZ Original (${totalZeura})` },
            { id: 'aceternity', label: 'Coming Soon: Aceternity', disabled: true },
          ].map((src) => (
            <button
              key={src.id}
              disabled={src.disabled}
              onClick={() => {
                if (!src.disabled) {
                  setSelectedSource(src.id);
                  setCurrentPage(1);
                  setIsAppendMode(false);
                }
              }}
              className={`px-3.5 py-1.5 text-xs font-heading font-black uppercase transition border-[3px] border-black ${
                src.disabled
                  ? 'opacity-40 cursor-not-allowed bg-zinc-200 text-zinc-500'
                  : selectedSource === src.id
                  ? src.id === 'react-bits'
                    ? 'bg-[#7FBCFF] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                    : src.id === 'magic-ui'
                    ? 'bg-[#67E8F9] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                    : src.id === 'zeuralabz-original'
                    ? 'bg-[#FF90E8] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                    : 'bg-[#FFDC58] text-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              {src.label}
            </button>
          ))}
        </div>

        {/* Category Filter Pills (Chunky Square Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 text-xs no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
                setIsAppendMode(false);
              }}
              className={`px-3 py-1.5 capitalize shrink-0 font-heading font-black text-xs transition border-[2px] border-black ${
                selectedCategory === cat
                  ? 'bg-[#FFDC58] text-black shadow-[3px_3px_0px_#000]'
                  : 'bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
          <span className="ml-auto shrink-0 font-heading text-xs font-black uppercase bg-black text-white px-2.5 py-1 border-[2px] border-black shadow-[2px_2px_0px_#FFDC58]">
            SHOWING {filteredComponents.length} OF {totalAll}
          </span>
        </div>

        {/* Second Row: "Install the source you need" */}
        <div className="mt-2 mb-8 p-3.5 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-heading font-black text-black uppercase">Install format you need:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'typescript', label: 'TypeScript', ext: '.tsx' },
              { id: 'javascript', label: 'JavaScript', ext: '.jsx' },
              { id: 'tailwind', label: 'Tailwind CSS', ext: 'v4' },
              { id: 'html', label: 'HTML + Pure CSS', ext: '.html' },
            ].map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`px-3 py-1 text-xs font-bold border-[2px] border-black transition ${
                  selectedFormat === fmt.id
                    ? 'bg-[#FFDC58] text-black shadow-[2px_2px_0px_#000] font-black'
                    : 'bg-[#FFFDF5] text-black hover:bg-zinc-100'
                }`}
              >
                {fmt.label} <span className="text-zinc-600 text-[10px]">({fmt.ext})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. COMPONENT GRID WITH LIVE PREVIEWS & PAGINATION */}
        {/* ============================================================== */}
        {filteredComponents.length === 0 ? (
          <div className="text-center py-24 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] p-8">
            <p className="font-heading text-xl font-black text-black">NO COMPONENTS MATCHED "{rawSearchQuery}"</p>
            <p className="text-xs text-black font-medium mt-1">Try searching for keywords like aurora, bento, card, or button.</p>
            <button
              onClick={() => {
                setRawSearchQuery('');
                setSelectedCategory('all');
                setSelectedSource('all');
                setCurrentPage(1);
                setIsAppendMode(false);
              }}
              className="mt-4 neo-btn bg-[#FFDC58] text-black px-4 py-2 text-xs"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleComponents.map((comp) => (
                <ComponentCard
                  key={comp.id}
                  comp={comp}
                  isCopied={copiedSlug === comp.slug}
                  animationMode={animationMode}
                  onCopy={copyCommand}
                  onOpenCode={setSelectedComponent}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 p-5 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-black font-heading font-black uppercase">
                  {isAppendMode ? (
                    <>
                      SHOWING 1–
                      <span className="bg-[#FFDC58] px-1 border border-black">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)}
                      </span>{' '}
                      OF{' '}
                      <span className="bg-[#FFDC58] px-1 border border-black">{filteredComponents.length}</span>{' '}
                      COMPONENTS (PAGES 1–{currentPage} OF {totalPages})
                    </>
                  ) : (
                    <>
                      SHOWING{' '}
                      <span className="bg-[#FFDC58] px-1 border border-black">
                        {filteredComponents.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>
                      –
                      <span className="bg-[#FFDC58] px-1 border border-black">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)}
                      </span>{' '}
                      OF{' '}
                      <span className="bg-[#FFDC58] px-1 border border-black">{filteredComponents.length}</span>{' '}
                      COMPONENTS (PAGE {currentPage} OF {totalPages})
                    </>
                  )}
                </div>

                {/* Progressive Load More & Load All buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {((isAppendMode && currentPage < totalPages) || (!isAppendMode && currentPage * ITEMS_PER_PAGE < filteredComponents.length)) && (
                    <button
                      onClick={() => {
                        setIsAppendMode(true);
                        setCurrentPage((p) => Math.min(p + 1, totalPages));
                      }}
                      className="neo-btn bg-[#FFDC58] text-black px-4 py-2 text-xs font-heading font-black flex items-center gap-1.5"
                    >
                      <span>LOAD MORE (12 MORE)</span>
                      <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-mono">
                        +{Math.min(ITEMS_PER_PAGE, filteredComponents.length - (isAppendMode ? currentPage * ITEMS_PER_PAGE : currentPage * ITEMS_PER_PAGE))}
                      </span>
                    </button>
                  )}

                  {((isAppendMode && currentPage < totalPages) || (!isAppendMode && totalPages > 1)) && (
                    <button
                      onClick={() => {
                        setIsAppendMode(true);
                        setCurrentPage(totalPages);
                      }}
                      title="May lag on older devices"
                      className="neo-btn bg-white text-black px-3 py-2 text-xs font-heading font-black"
                    >
                      LOAD ALL ({filteredComponents.length})
                    </button>
                  )}

                  {(currentPage > 1 || isAppendMode) && (
                    <button
                      onClick={() => {
                        setIsAppendMode(false);
                        setCurrentPage(1);
                        document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="neo-btn bg-white text-black px-3 py-2 text-xs font-heading font-black"
                    >
                      BACK TO FIRST 12
                    </button>
                  )}
                </div>
              </div>

              {/* Numeric Page Buttons [PREV] [1] [2] [3] ... [NEXT] */}
              {totalPages > 1 && (
                <div className="pt-4 border-t-[2px] border-black flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                      setIsAppendMode(false);
                      setCurrentPage((p) => Math.max(1, p - 1));
                      document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-xs font-heading font-black border-[2px] border-black transition ${
                      currentPage <= 1
                        ? 'opacity-30 cursor-not-allowed bg-zinc-200 text-zinc-500'
                        : 'bg-white text-black hover:bg-[#FFDC58] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5'
                    }`}
                  >
                    ◀ PREV
                  </button>

                  {pageNumbers.map((p, idx) =>
                    p === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 py-1 font-mono font-bold text-zinc-600">
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${p}`}
                        onClick={() => {
                          setIsAppendMode(false);
                          setCurrentPage(Number(p));
                          document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-9 h-9 text-xs font-heading font-black border-[2px] border-black flex items-center justify-center transition ${
                          !isAppendMode && currentPage === p
                            ? 'bg-[#FFDC58] text-black shadow-[3px_3px_0px_#000] -translate-x-0.5 -translate-y-0.5'
                            : 'bg-white text-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000]'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      setIsAppendMode(false);
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-xs font-heading font-black border-[2px] border-black transition ${
                      currentPage >= totalPages
                        ? 'opacity-30 cursor-not-allowed bg-zinc-200 text-zinc-500'
                        : 'bg-white text-black hover:bg-[#FFDC58] shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5'
                    }`}
                  >
                    NEXT ▶
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* ============================================================== */}
      {/* 6. BOTTOM SECTIONS: HOW IT WORKS & AI INTEGRATION */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-20 border-t-[3px] border-b-[3px] border-black bg-[#FFE9F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-[#FFDC58] text-black border-[2px] border-black px-3 py-1 font-heading text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
              AUTONOMOUS WORKFLOW
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-black mt-3">
              HOW ZEURALABZ SUGGEST WORKS
            </h2>
            <p className="text-black font-semibold text-sm mt-2">
              No manual hunting. Let the heuristic analyzer inspect your repo and recommend the 1 best match per section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] text-left">
              <div className="w-12 h-12 bg-[#FFDC58] border-[3px] border-black shadow-[3px_3px_0px_#000] text-black flex items-center justify-center font-heading font-black text-lg mb-4">
                01
              </div>
              <h3 className="font-heading text-base font-black text-black mb-2 uppercase">Scan Your Project</h3>
              <p className="text-xs text-black font-semibold leading-relaxed">
                Run <code className="bg-[#FFFDF5] border border-black px-1 py-0.5 font-mono text-black">npx zeuralabz suggest</code> in any React, Next.js, or Vite workspace.
              </p>
            </div>

            <div className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] text-left">
              <div className="w-12 h-12 bg-[#FF90E8] border-[3px] border-black shadow-[3px_3px_0px_#000] text-black flex items-center justify-center font-heading font-black text-lg mb-4">
                02
              </div>
              <h3 className="font-heading text-base font-black text-black mb-2 uppercase">Curated 1-Best-Pick</h3>
              <p className="text-xs text-black font-semibold leading-relaxed">
                ZEURALABZ determines your product persona (SaaS, Portfolio, Dashboard) and selects exactly 1 ideal component per section with reasoning.
              </p>
            </div>

            <div className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] text-left">
              <div className="w-12 h-12 bg-[#7FBCFF] border-[3px] border-black shadow-[3px_3px_0px_#000] text-black flex items-center justify-center font-heading font-black text-lg mb-4">
                03
              </div>
              <h3 className="font-heading text-base font-black text-black mb-2 uppercase">Direct Local Code</h3>
              <p className="text-xs text-black font-semibold leading-relaxed">
                Components install straight into your <code className="bg-[#FFFDF5] border border-black px-1 py-0.5 font-mono text-black">src/components/</code> directory. Zero lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tool Integration Cards */}
      <section id="mcp" className="py-20 border-b-[3px] border-black bg-[#E0F2FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-[#A3E635] text-black border-[2px] border-black px-3 py-1 font-heading text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
            MODEL CONTEXT PROTOCOL & SKILLS
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-black mt-3 mb-4">
            INSTALL IN YOUR AI WORKSPACE
          </h2>
          <p className="text-black font-semibold text-sm max-w-xl mx-auto mb-12">
            Native MCP tools and skills for Claude Code, Cursor, Windsurf, and Google Antigravity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between">
              <div>
                <span className="bg-[#FFDC58] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-black">
                  Claude Code / Desktop
                </span>
                <p className="text-xs text-black font-semibold mt-3">
                  Add the ZEURALABZ MCP server to enable autonomous design reviews and component installations.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border-[2px] border-black text-[11px] font-mono text-[#FFDC58] overflow-x-auto shadow-[3px_3px_0px_#000]">
{`"zeuralabz": {
  "command": "node",
  "args": ["mcp-server/index.js"]
}`}
              </pre>
            </div>

            <div className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between">
              <div>
                <span className="bg-[#67E8F9] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-black">
                  Antigravity / Gemini
                </span>
                <p className="text-xs text-black font-semibold mt-3">
                  Drop <code className="bg-[#FFFDF5] border border-black px-1">SKILL.md</code> into your skills folder to activate intelligent UI recommendations.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border-[2px] border-black text-[11px] font-mono text-[#A3E635] overflow-x-auto shadow-[3px_3px_0px_#000]">
{`// Tell Antigravity:
"Use ZEURALABZ to analyze my site
and install the best hero"`}
              </pre>
            </div>

            <div className="p-6 bg-white border-[3px] border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between">
              <div>
                <span className="bg-[#FF90E8] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-black">
                  Cursor & Windsurf
                </span>
                <p className="text-xs text-black font-semibold mt-3">
                  Connect via MCP server settings and query components straight from chat with <code className="bg-[#FFFDF5] border border-black px-1">@zeuralabz</code>.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border-[2px] border-black text-[11px] font-mono text-[#7FBCFF] overflow-x-auto shadow-[3px_3px_0px_#000]">
{`@zeuralabz suggest
@zeuralabz install aurora`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CODE MODAL (Chunky white dialog with 4px black border + 12px shadow) */}
      {/* ============================================================== */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-white border-[4px] border-black shadow-[12px_12px_0px_#000] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 bg-[#FFDC58] border-b-[3px] border-black flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-xl font-black text-black uppercase">{selectedComponent.name}</h3>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[2px] border-black shadow-[2px_2px_0px_#000] ${
                      selectedComponent.source === 'react-bits'
                        ? 'bg-[#7FBCFF] text-black'
                        : selectedComponent.source === 'magic-ui'
                        ? 'bg-[#67E8F9] text-black'
                        : 'bg-white text-black'
                    }`}
                  >
                    {selectedComponent.source === 'react-bits'
                      ? 'React Bits • MIT + Commons'
                      : selectedComponent.source === 'magic-ui'
                      ? 'Magic UI • MIT'
                      : 'ZEURALABZ Original'}
                  </span>
                </div>
                <p className="text-xs text-black font-mono font-bold mt-1">
                  {selectedComponent.source === 'react-bits'
                    ? `Official React Bits Registry • ${selectedComponent.componentName}-TS-TW`
                    : selectedComponent.source === 'magic-ui'
                    ? `Official Magic UI Registry • https://magicui.design/r/${selectedComponent.slug}.json`
                    : `components/${selectedComponent.category}/${selectedComponent.slug}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="w-9 h-9 bg-black text-white hover:bg-red-600 font-heading font-black text-sm flex items-center justify-center border-[2px] border-black shadow-[2px_2px_0px_#000] transition"
              >
                ✕
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex border-b-[3px] border-black px-6 pt-3 bg-[#FFFDF5] gap-3 text-xs font-bold">
              <button
                onClick={() => setActiveTab('react')}
                className={`pb-2 px-4 transition border-[2px] border-black font-heading font-black uppercase ${
                  activeTab === 'react'
                    ? 'bg-[#FFDC58] text-black shadow-[3px_3px_0px_#000]'
                    : 'bg-white text-black hover:bg-zinc-100'
                }`}
              >
                React ({selectedComponent.source === 'react-bits' || selectedComponent.source === 'magic-ui' ? 'TS + Tailwind' : 'TypeScript'})
              </button>
              {selectedComponent.source !== 'react-bits' && selectedComponent.source !== 'magic-ui' && (
                <>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`pb-2 px-4 transition border-[2px] border-black font-heading font-black uppercase ${
                      activeTab === 'html'
                        ? 'bg-[#FFDC58] text-black shadow-[3px_3px_0px_#000]'
                        : 'bg-white text-black hover:bg-zinc-100'
                    }`}
                  >
                    Pure HTML
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`pb-2 px-4 transition border-[2px] border-black font-heading font-black uppercase ${
                      activeTab === 'css'
                        ? 'bg-[#FFDC58] text-black shadow-[3px_3px_0px_#000]'
                        : 'bg-white text-black hover:bg-zinc-100'
                    }`}
                  >
                    Pure CSS
                  </button>
                </>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono bg-white">
              {/* Primary ZEURALABZ CLI Command */}
              <div className="flex items-center justify-between p-3.5 bg-black text-[#FFDC58] border-[3px] border-black shadow-[4px_4px_0px_#000]">
                <span className="font-bold">
                  $ npx zeuralabz add {selectedComponent.slug}
                  {selectedComponent.source === 'react-bits'
                    ? ' --source react-bits'
                    : selectedComponent.source === 'magic-ui'
                    ? ' --source magic-ui'
                    : ''}
                </span>
                <button
                  onClick={() =>
                    copyCommand(
                      `npx zeuralabz add ${selectedComponent.slug}${
                        selectedComponent.source === 'react-bits'
                          ? ' --source react-bits'
                          : selectedComponent.source === 'magic-ui'
                          ? ' --source magic-ui'
                          : ''
                      }`
                    )
                  }
                  className="px-3 py-1 bg-[#FFDC58] text-black hover:bg-yellow-400 font-heading font-black text-xs border border-black shadow-[2px_2px_0px_#FFF]"
                >
                  {copiedSlug ===
                  `npx zeuralabz add ${selectedComponent.slug}${
                    selectedComponent.source === 'react-bits'
                      ? ' --source react-bits'
                      : selectedComponent.source === 'magic-ui'
                      ? ' --source magic-ui'
                      : ''
                  }`
                    ? 'COPIED!'
                    : 'COPY'}
                </button>
              </div>

              {/* Official React Bits direct shadcn command + documentation link */}
              {selectedComponent.source === 'react-bits' && (
                <div className="p-4 bg-[#E0F2FF] border-[3px] border-black shadow-[4px_4px_0px_#000] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-black uppercase text-black">
                      Official React Bits Registry Command:
                    </span>
                    <a
                      href={selectedComponent.originalUrl || 'https://reactbits.dev'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-heading font-black"
                    >
                      VISIT REACTBITS.DEV ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-white bg-black p-2.5 border-[2px] border-black font-mono text-xs">
                    <code>{selectedComponent.installCommand || `npx shadcn@latest add @react-bits/${selectedComponent.componentName}-TS-TW`}</code>
                    <button
                      onClick={() =>
                        copyCommand(
                          selectedComponent.installCommand ||
                            `npx shadcn@latest add @react-bits/${selectedComponent.componentName}-TS-TW`
                        )
                      }
                      className="px-2 py-0.5 bg-[#FFDC58] text-black hover:bg-yellow-400 font-heading font-black text-xs shrink-0 ml-2 border border-black"
                    >
                      COPY
                    </button>
                  </div>
                  <p className="text-[11px] text-black font-sans font-medium pt-1">
                    Attribution: Created by David Haz (github.com/DavidHDev/react-bits). Free to use under MIT + Commons Clause.
                  </p>
                </div>
              )}

              {/* Official Magic UI direct shadcn command + documentation link */}
              {selectedComponent.source === 'magic-ui' && (
                <div className="p-4 bg-[#E6FFFA] border-[3px] border-black shadow-[4px_4px_0px_#000] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-black uppercase text-black">
                      Official Magic UI Registry Command:
                    </span>
                    <a
                      href={selectedComponent.originalUrl || `https://magicui.design/docs/components/${selectedComponent.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-800 hover:underline flex items-center gap-1 font-heading font-black"
                    >
                      VISIT MAGICUI.DESIGN ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-white bg-black p-2.5 border-[2px] border-black font-mono text-xs">
                    <code>{selectedComponent.installCommand || `npx shadcn@latest add https://magicui.design/r/${selectedComponent.slug}.json`}</code>
                    <button
                      onClick={() =>
                        copyCommand(
                          selectedComponent.installCommand ||
                            `npx shadcn@latest add https://magicui.design/r/${selectedComponent.slug}.json`
                        )
                      }
                      className="px-2 py-0.5 bg-[#FFDC58] text-black hover:bg-yellow-400 font-heading font-black text-xs shrink-0 ml-2 border border-black"
                    >
                      COPY
                    </button>
                  </div>
                  <p className="text-[11px] text-black font-sans font-medium pt-1">
                    Attribution: Created by Dillion Verma (github.com/magicuidesign/magicui). Free to use under MIT License.
                  </p>
                </div>
              )}

              {activeTab === 'react' && (
                <div>
                  <span className="font-heading text-xs font-black uppercase text-black block mb-1">React Usage:</span>
                  <pre className="p-4 bg-[#141414] text-white border-[3px] border-black overflow-x-auto leading-relaxed shadow-[4px_4px_0px_#000]">
{selectedComponent.source === 'react-bits'
  ? `import ${selectedComponent.componentName} from '@/components/${selectedComponent.componentName}';

export default function Example() {
  return (
    <div className="relative w-full h-[400px]">
      <${selectedComponent.componentName} />
    </div>
  );
}`
  : selectedComponent.source === 'magic-ui'
  ? `import { ${selectedComponent.componentName || selectedComponent.name.replace(/[^a-zA-Z0-9]/g, '')} } from "@/components/magic-ui/${selectedComponent.slug}";

export default function Example() {
  return (
    <div className="relative flex items-center justify-center p-8">
      <${selectedComponent.componentName || selectedComponent.name.replace(/[^a-zA-Z0-9]/g, '')} />
    </div>
  );
}`
  : `import { ${selectedComponent.componentName} } from './components/zeuralabz/${selectedComponent.slug}/${selectedComponent.componentName}';

export default function Example() {
  return <${selectedComponent.componentName} />;
}`}
                  </pre>
                </div>
              )}

              {activeTab === 'html' && selectedComponent.source !== 'react-bits' && selectedComponent.source !== 'magic-ui' && (
                <div>
                  <span className="font-heading text-xs font-black uppercase text-black block mb-1">Semantic HTML Structure:</span>
                  <pre className="p-4 bg-[#141414] text-white border-[3px] border-black overflow-x-auto leading-relaxed shadow-[4px_4px_0px_#000]">
{`<div class="zeura-${selectedComponent.slug}">
  <h2>${selectedComponent.name}</h2>
</div>`}
                  </pre>
                </div>
              )}

              {activeTab === 'css' && selectedComponent.source !== 'react-bits' && selectedComponent.source !== 'magic-ui' && (
                <div>
                  <span className="font-heading text-xs font-black uppercase text-black block mb-1">Standalone CSS Rules:</span>
                  <pre className="p-4 bg-[#141414] text-white border-[3px] border-black overflow-x-auto leading-relaxed shadow-[4px_4px_0px_#000]">
{`.zeura-${selectedComponent.slug} {
  position: relative;
  overflow: hidden;
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
  background-color: #FFFDF5;
  color: #000;
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t-[3px] border-black bg-[#FFFDF5] flex justify-end">
              <button
                onClick={() => setSelectedComponent(null)}
                className="neo-btn bg-black text-white px-5 py-2 text-xs font-heading font-black hover:bg-zinc-800"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. FOOTER (Black bg, 5px yellow top border, MIT attribution) */}
      {/* ============================================================== */}
      <footer className="border-t-[5px] border-[#FFDC58] bg-black text-white py-14 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-heading font-black text-[#FFDC58] text-base">ZEURALABZ</span>
              <span className="text-zinc-500">•</span>
              <span className="font-bold">{totalAll} animated components ({totalReactBits} React Bits + {totalMagicUI} Magic UI + {totalZeura} Originals)</span>
            </div>
            <div className="mt-1.5 text-zinc-400 font-medium">
              Crafted with care by{' '}
              <a href="https://github.com/rselva1202" target="_blank" rel="noreferrer" className="text-[#FFDC58] font-bold hover:underline">
                R. Selva
              </a>
              . Distributed under MIT License. Sources: React Bits (David Haz, MIT + Commons) & Magic UI (Dillion Verma, MIT).
            </div>
          </div>

          <div className="flex flex-wrap gap-4 font-heading font-black uppercase text-xs">
            <a href="https://github.com/rselva1202/zeuralabz" className="text-white hover:text-[#FFDC58] transition">GitHub</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/ATTRIBUTION.md" className="text-white hover:text-[#FFDC58] transition">Attribution</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md" className="text-white hover:text-[#FFDC58] transition">Installation</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/HOW-IT-WORKS.md" className="text-white hover:text-[#FFDC58] transition">Architecture</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/SKILL.md" className="text-white hover:text-[#FFDC58] transition">AI Skill</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
