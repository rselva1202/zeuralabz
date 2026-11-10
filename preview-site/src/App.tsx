import React, { useState, useMemo, useEffect } from 'react';
import componentsData from './data/components.json';
import { LiveComponentPreview } from './components/LiveComponentPreview';
import { PreviewRouter } from './previews/PreviewRouter';
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
  source?: 'zeuralabz-original' | 'react-bits' | 'magic-ui' | 'aceternity';
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
  return (
    <div
      className="group rounded-lg bg-[#1A1A1A] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] hover:shadow-[6px_6px_0px_#3B82F6] sm:hover:shadow-[8px_8px_0px_#3B82F6] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col overflow-hidden w-full max-w-full min-w-0"
    >
      {/* Top Preview Area (Framed Box with 3px white bottom border & PreviewRouter) */}
      <div className="h-44 sm:h-48 bg-black relative flex items-center justify-center overflow-hidden border-b-[3px] border-white w-full max-w-full">
        <PreviewRouter comp={comp} animationMode={animationMode} />
      </div>

      {/* Middle: Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#1A1A1A] w-full max-w-full min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-heading text-sm font-black text-white group-hover:text-[#3B82F6] transition truncate">
              {comp.name}
            </h3>
            <span className="text-[11px] text-[#93C5FD] font-mono font-bold bg-[#111111] border border-white/40 px-1.5 py-0.5 shrink-0">
              {comp.slug}
            </span>
          </div>
          <p className="text-xs text-[#CCCCCC] font-medium mt-2 line-clamp-2 leading-relaxed">
            {comp.description}
          </p>

          {/* Best for tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span
              className="px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[1.5px] border-white shadow-[1.5px_1.5px_0px_#2563EB] bg-[#1E293B] text-white"
            >
              {comp.category}
            </span>
            {comp.bestFor?.slice(0, 2).map((b) => (
              <span
                key={b}
                className="px-2 py-0.5 text-[10px] font-bold bg-[#111111] text-[#CCCCCC] border border-white/40"
              >
                ✓ {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-4 pt-3 border-t-[2px] border-white/30 flex flex-col xs:flex-row items-stretch sm:items-center justify-between gap-2">
          <button
            onClick={() =>
              onCopy(
                comp.source === 'react-bits'
                  ? `npx zeuralabz add ${comp.slug} --source react-bits`
                  : comp.source === 'magic-ui'
                  ? `npx zeuralabz add ${comp.slug} --source magic-ui`
                  : comp.source === 'aceternity'
                  ? `npx zeuralabz add ${comp.slug} --source aceternity`
                  : `npx zeuralabz add ${comp.slug} --source zeuralabz-original`
              )
            }
            className={`flex-1 py-2 px-3 text-[11px] sm:text-xs font-mono font-black border-[2px] border-white shadow-[2px_2px_0px_#2563EB] sm:shadow-[3px_3px_0px_#2563EB] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5 ${
              isCopied
                ? 'bg-emerald-500 text-black font-black'
                : 'bg-[#2563EB] text-white hover:bg-[#3B82F6]'
            }`}
          >
            {isCopied ? (
              '✔ COPIED!'
            ) : (
              <>
                <span className="text-[#93C5FD]">$</span> npx zeuralabz add {comp.slug}{' '}
                {comp.source === 'react-bits'
                  ? '--source react-bits'
                  : comp.source === 'magic-ui'
                  ? '--source magic-ui'
                  : comp.source === 'aceternity'
                  ? '--source aceternity'
                  : ''}
              </>
            )}
          </button>

          <button
            onClick={() => onOpenCode(comp)}
            className="neo-btn bg-white text-black border-[2px] border-white shadow-[2px_2px_0px_#2563EB] sm:shadow-[3px_3px_0px_#2563EB] px-3 py-2 text-xs font-heading font-black hover:bg-zinc-100"
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
        (selectedSource === 'aceternity' && c.source === 'aceternity') ||
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
  const totalAceternity = useMemo(
    () => (componentsData as ComponentItem[]).filter((c) => c.source === 'aceternity').length,
    []
  );
  const totalZeura = useMemo(
    () => (componentsData as ComponentItem[]).filter((c) => c.source === 'zeuralabz-original' || !c.source).length,
    []
  );
  const totalAll = totalReactBits + totalMagicUI + totalAceternity + totalZeura;

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
      <p className="mt-4 text-[#CCCCCC] font-bold">531 components. 1M+ combinations.</p>
      <ShimmerButton text="Explore Catalog ➔" className="mt-8 font-black uppercase" />
    </AuroraBackground>
  );
}`;

  // Standalone preview route handler for testing
  if (standalone === 'galaxy' || standalone === 'galaxy-fullscreen' || standalone === 'galaxy-before') {
    return (
      <div className="w-screen h-screen bg-[#0E0E0E] flex items-center justify-center p-4 sm:p-8 neo-dots max-w-full overflow-hidden">
        <div className="w-full max-w-[460px] bg-[#1A1A1A] border-[3px] border-white shadow-[6px_6px_0px_#2563EB] rounded-none overflow-hidden flex flex-col">
          <div className="bg-[#2563EB] border-b-[3px] border-white px-4 py-2 flex items-center justify-between font-heading text-xs font-black text-white">
            <span>ZEURALABZ • STANDALONE</span>
            <span className="bg-black text-white px-2 py-0.5 text-[10px]">LIVE</span>
          </div>
          <div className="h-64 bg-[#0a0e27] relative border-b-[3px] border-white overflow-hidden">
            <GalaxyBackground starCount={900} speed={0.7} armCount={3} glowIntensity={1.2} />
          </div>
          <div className="p-5 space-y-3 bg-[#1A1A1A] text-white">
            <h3 className="font-heading text-lg font-black text-white">Spiral Galaxy Cosmic Canvas</h3>
            <p className="text-xs text-[#CCCCCC] font-medium">800+ stars, 3 logarithmic spiral arms, radiant stellar core.</p>
            <div className="pt-2 border-t-[2px] border-white/40 flex justify-between items-center text-xs font-mono font-bold">
              <span className="text-[#3B82F6]">npx zeuralabz add galaxy</span>
              <span className="bg-[#2563EB] text-white px-2 py-0.5 border border-white">READY</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-sans selection:bg-[#2563EB] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (Sticky, Dark bg #111111, 3px solid white border) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 w-full border-b-[3px] border-white bg-[#111111] shadow-[0px_4px_0px_#2563EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Left Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2563EB] border-[3px] border-white shadow-[3px_3px_0px_#2563EB] flex items-center justify-center text-base sm:text-lg font-black text-white transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#3B82F6]">
                ⚡
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
                ZEURA<span className="bg-[#2563EB] text-white px-1 py-0.5 border-[2px] border-white ml-0.5">LABZ</span>
              </span>
            </a>
            <span className="hidden lg:inline-block px-2.5 py-1 text-[10px] font-black tracking-wider uppercase bg-black text-white border-[2px] border-white shadow-[2px_2px_0px_#2563EB]">
              v1.2.0 • OPEN SOURCE
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-heading font-black uppercase text-white">
            <a href="#showcase" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2563EB] hover:text-white hover:shadow-[3px_3px_0px_#2563EB] transition">
              Showcase
            </a>
            <a href="#components" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2563EB] hover:text-white hover:shadow-[3px_3px_0px_#2563EB] transition">
              Components
            </a>
            <a href="#how-it-works" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2563EB] hover:text-white hover:shadow-[3px_3px_0px_#2563EB] transition">
              How it Works
            </a>
            <a href="#mcp" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2563EB] hover:text-white hover:shadow-[3px_3px_0px_#2563EB] transition">
              MCP & Skill
            </a>
            <a
              href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2563EB] hover:text-white hover:shadow-[3px_3px_0px_#2563EB] transition"
            >
              Docs
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Chunky Neo-Brutalist Animations Mode Switcher (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-[#1A1A1A] border-[2px] border-white p-1 shadow-[3px_3px_0px_#2563EB]">
              <span className="text-[10px] font-black uppercase px-1 text-white font-heading">⚡ ANIMATIONS:</span>
              {(['lite', 'full', 'off'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setAnimationMode(m)}
                  className={`px-2 py-0.5 text-[10px] font-black uppercase transition border-[2px] ${
                    animationMode === m
                      ? m === 'lite'
                        ? 'bg-[#2563EB] text-white border-white shadow-[2px_2px_0px_#FFFFFF]'
                        : m === 'full'
                        ? 'bg-emerald-500 text-black border-white shadow-[2px_2px_0px_#FFFFFF]'
                        : 'bg-black text-white border-white shadow-[2px_2px_0px_#2563EB]'
                      : 'bg-transparent text-white border-transparent hover:border-white hover:bg-zinc-800'
                  }`}
                  title={`Motion mode: ${m}`}
                >
                  {m === 'lite' ? 'Lite' : m === 'full' ? 'ON' : 'OFF'}
                </button>
              ))}
            </div>

            {/* GitHub Stars Button (Desktop) */}
            <a
              href="https://github.com/rselva1202/zeuralabz"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex neo-btn bg-white text-black px-3 py-1.5 text-xs items-center gap-1.5 border-[3px] border-white shadow-[3px_3px_0px_#2563EB]"
            >
              <span className="font-heading font-black">GITHUB</span>
              <span className="text-amber-500 font-bold">★</span>
              <span className="bg-black text-white px-1.5 py-0.2 text-[10px] font-mono font-bold">
                {starCount}
              </span>
            </a>

            {/* Main CLI Suggest CTA */}
            <button
              onClick={() => copyCommand('npx zeuralabz suggest')}
              className="neo-btn bg-[#2563EB] text-white px-2.5 sm:px-3.5 py-1.5 text-xs flex items-center gap-1.5 sm:gap-2 border-[2px] sm:border-[3px] border-white shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#3B82F6]"
              title="Click to copy suggestion command"
            >
              <span className="font-mono font-black text-[11px] sm:text-xs">$ suggest</span>
              <span className="hidden xs:inline-block text-[9px] sm:text-[10px] bg-black text-white px-1.5 py-0.5 font-heading uppercase">
                {copiedSlug === 'npx zeuralabz suggest' ? 'COPIED!' : 'COPY'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 border-[2px] border-white bg-[#1A1A1A] text-white flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#2563EB] hover:bg-zinc-800 active:translate-x-0.5 active:translate-y-0.5 shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-[#111111] border-t-[2px] border-white p-4 space-y-3 font-heading text-xs font-black uppercase shadow-2xl">
            <div className="flex flex-col gap-2">
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-white/20 bg-[#1A1A1A] text-white hover:bg-[#2563EB]"
              >
                Showcase
              </a>
              <a
                href="#components"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-white/20 bg-[#1A1A1A] text-white hover:bg-[#2563EB]"
              >
                Components ({totalAll})
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-white/20 bg-[#1A1A1A] text-white hover:bg-[#2563EB]"
              >
                How it Works
              </a>
              <a
                href="#mcp"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-white/20 bg-[#1A1A1A] text-white hover:bg-[#2563EB]"
              >
                MCP & AI Skills
              </a>
              <a
                href="https://github.com/rselva1202/zeuralabz"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-white/20 bg-[#1A1A1A] text-white flex items-center justify-between"
              >
                <span>Star on GitHub</span>
                <span className="text-amber-400">★ {starCount}</span>
              </a>
            </div>

            <div className="pt-2 border-t border-white/20 flex items-center justify-between">
              <span className="text-[10px] text-zinc-400">ANIMATIONS:</span>
              <div className="flex gap-1">
                {(['lite', 'full', 'off'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setAnimationMode(m)}
                    className={`px-2 py-1 text-[10px] font-black uppercase border border-white ${
                      animationMode === m ? 'bg-[#2563EB] text-white' : 'bg-black text-zinc-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION (Dark bg #0E0E0E, Neo-Dots, Responsive Badges) */}
      {/* ============================================================== */}
      <section id="hero" className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 border-b-[3px] border-white bg-[#0E0E0E] neo-dots overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-full">
          {/* Top Pill & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 w-full max-w-full">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-[#181818] text-white border-[2px] border-white shadow-[3px_3px_0px_#2563EB] text-[11px] sm:text-xs font-bold uppercase tracking-wider max-w-full whitespace-normal leading-relaxed">
              <span className="w-2.5 h-2.5 bg-emerald-500 border border-black animate-pulse shrink-0" />
              <span>NEW • ZEURALABZ 1.2 — {totalAll} COMPONENTS ({totalReactBits} REACT BITS + {totalMagicUI} MAGIC UI + {totalAceternity} ACETERNITY + {totalZeura} ORIGINALS)</span>
            </div>

            {/* Clean, Non-overflowing 2-Sticker Setup (Electric Blue & White) */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="bg-[#2563EB] text-white border-[3px] border-white shadow-[3px_3px_0px_#FFFFFF] px-3 py-1 font-heading text-xs font-black uppercase">
                {totalAll} COMPONENTS!
              </span>
              <span className="bg-white text-black border-[3px] border-white shadow-[3px_3px_0px_#2563EB] px-3 py-1 font-heading text-xs font-black uppercase">
                100% OPEN SOURCE
              </span>
            </div>
          </div>

          {/* Main Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-full">
            {/* Left Column (60% / 7 cols) */}
            <div className="lg:col-span-7 w-full max-w-full min-w-0">
              <h1 className="font-heading text-[clamp(2rem,7vw,3.75rem)] font-black text-white leading-[1.08] tracking-tight break-words hyphens-auto max-w-full">
                BEAUTIFUL ANIMATED UI FOR WEBSITES THAT{' '}
                <span className="bg-[#2563EB] text-white px-2 py-0.5 border-[3px] border-white shadow-[4px_4px_0px_#FFFFFF] sm:shadow-[6px_6px_0px_#FFFFFF] inline-block mt-1 max-w-full">
                  FEEL ALIVE
                </span>
                .
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#CCCCCC] font-semibold max-w-xl leading-relaxed">
                {totalAll} animated components and backgrounds for React across React Bits, Magic UI, Aceternity UI, and ZEURALABZ Originals. Tune them yourself, or hand them to your AI agent.
              </p>

              {/* CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#components"
                  className="neo-btn bg-[#2563EB] text-white font-heading text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 flex items-center justify-center gap-2 border-[3px] border-white shadow-[4px_4px_0px_#FFFFFF] hover:bg-[#3B82F6]"
                >
                  <span>BROWSE COMPONENTS</span>
                  <span className="text-base font-black">➔</span>
                </a>
                <a
                  href="https://github.com/rselva1202/zeuralabz"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn bg-white text-black font-heading text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-3.5 flex items-center justify-center gap-2 border-[3px] border-white shadow-[4px_4px_0px_#2563EB] hover:bg-zinc-100"
                >
                  <span>STAR ON GITHUB</span>
                  <span className="text-amber-500 font-bold">★</span>
                </a>
              </div>
            </div>

            {/* Right Column Stats Box (40% / 5 cols) - Clean Dark Neo-Brutalist, NO Rainbow */}
            <div className="lg:col-span-5 w-full max-w-full min-w-0">
              <div className="bg-[#1A1A1A] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[8px_8px_0px_#2563EB] p-4 sm:p-5 w-full max-w-full">
                <div className="bg-black text-white px-3 py-1 font-heading text-xs font-black uppercase mb-4 flex justify-between items-center border-[2px] border-white/40">
                  <span>LIBRARY TELEMETRY</span>
                  <span className="text-emerald-400">● ACTIVE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-full">
                  <div className="col-span-1 sm:col-span-2 p-3.5 bg-[#141414] border-[2px] border-white shadow-[3px_3px_0px_#2563EB] flex items-center justify-between">
                    <div>
                      <div className="font-heading text-3xl font-black text-white">{totalAll}</div>
                      <div className="text-[11px] font-black uppercase text-[#CCCCCC] mt-0.5">Total Components Curated</div>
                    </div>
                    <span className="bg-[#2563EB] text-white text-[10px] font-heading font-black px-2 py-1 border border-white shrink-0">
                      4 SOURCES
                    </span>
                  </div>
                  <div className="p-3 bg-[#141414] border-[2px] border-white shadow-[3px_3px_0px_#2563EB]">
                    <div className="font-heading text-2xl font-black text-white">{totalReactBits}</div>
                    <div className="text-[10px] font-black uppercase text-[#CCCCCC] mt-0.5">React Bits (Linked)</div>
                  </div>
                  <div className="p-3 bg-[#141414] border-[2px] border-white shadow-[3px_3px_0px_#2563EB]">
                    <div className="font-heading text-2xl font-black text-white">{totalMagicUI}</div>
                    <div className="text-[10px] font-black uppercase text-[#CCCCCC] mt-0.5">Magic UI (Linked)</div>
                  </div>
                  <div className="p-3 bg-[#141414] border-[2px] border-white shadow-[3px_3px_0px_#2563EB]">
                    <div className="font-heading text-2xl font-black text-white">{totalAceternity}</div>
                    <div className="text-[10px] font-black uppercase text-[#CCCCCC] mt-0.5">Aceternity UI (Linked)</div>
                  </div>
                  <div className="p-3 bg-[#141414] border-[2px] border-white shadow-[3px_3px_0px_#2563EB]">
                    <div className="font-heading text-2xl font-black text-white">{totalZeura}</div>
                    <div className="text-[10px] font-black uppercase text-[#CCCCCC] mt-0.5">ZEURALABZ Original</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FRAMED LIVE BACKGROUND CANVAS BOX */}
          <div className="mt-8 sm:mt-12 bg-[#1A1A1A] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[8px_8px_0px_#2563EB] overflow-hidden w-full max-w-full">
            {/* Window bar */}
            <div className="bg-[#2563EB] border-b-[3px] border-white px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-white">
              <div className="flex items-center gap-2 font-heading text-xs font-black uppercase text-white">
                <span className="w-3 h-3 bg-red-500 border-[1.5px] border-black inline-block" />
                <span className="w-3 h-3 bg-amber-400 border-[1.5px] border-black inline-block" />
                <span className="w-3 h-3 bg-emerald-500 border-[1.5px] border-black inline-block" />
                <span className="ml-2">LIVE CANVAS ENGINE: {heroBg.toUpperCase()}</span>
              </div>

              {/* Background switcher wrap buttons */}
              <div className="flex flex-wrap items-center gap-1.5 bg-black border-[2px] border-white p-1 shadow-[2px_2px_0px_#FFFFFF] max-w-full">
                <span className="text-[10px] font-black uppercase px-1 text-white">TRY ENGINE:</span>
                {(['aurora', 'galaxy', 'particles', 'gradient'] as const).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setHeroBg(bg)}
                    className={`px-2 py-0.5 text-xs font-heading font-black uppercase transition border-[2px] ${
                      heroBg === bg
                        ? 'bg-[#2563EB] text-white border-white shadow-[2px_2px_0px_#FFFFFF]'
                        : 'bg-transparent text-white border-transparent hover:border-white hover:bg-zinc-800'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Framed Canvas Stage */}
            <div className="h-60 sm:h-80 w-full relative bg-[#0a0e27] overflow-hidden flex items-center justify-center max-w-full">
              {heroBg === 'aurora' && (
                <div className="absolute inset-0 opacity-80 overflow-hidden pointer-events-none">
                  <div
                    className={`w-[120%] h-[120%] -top-[10%] -left-[10%] absolute rounded-full ${
                      activePreset === 'ocean'
                        ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500'
                        : activePreset === 'dune'
                        ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-blue-700'
                        : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600'
                    } animate-pulse transform rotate-6 scale-105`}
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
                  <div className="absolute top-1/2 left-2/3 w-5 h-5 rounded-full bg-blue-500 border border-white animate-pulse" />
                  <div className="absolute top-3/4 left-1/4 w-4 h-4 rounded-full bg-indigo-400 border border-white animate-ping" />
                </div>
              )}
              {heroBg === 'gradient' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-indigo-950 to-black opacity-80" />
              )}

              {/* Framed overlay badge */}
              <div className="relative z-10 bg-[#181818]/95 border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] p-4 sm:p-6 text-center max-w-[calc(100%-2rem)] sm:max-w-md mx-3 sm:mx-4">
                <span className="bg-[#2563EB] text-white border-[2px] border-white px-2 py-0.5 text-[10px] font-heading font-black uppercase">
                  ACTIVE PREVIEW
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white mt-2">
                  {heroBg === 'aurora'
                    ? 'Northern Aurora Wave'
                    : heroBg === 'galaxy'
                    ? 'Spiral Cosmic Galaxy'
                    : heroBg === 'particles'
                    ? 'Interactive Particle Web'
                    : 'Mesh Gradient Drift'}
                </h3>
                <p className="text-xs font-bold text-[#CCCCCC] mt-1">
                  Framed responsive canvas running at 30/60 FPS with zero scroll lag.
                </p>
                <div className="mt-4 pt-3 border-t-[2px] border-white/40 flex flex-col xs:flex-row items-center justify-between gap-2 text-xs font-mono font-bold">
                  <span className="text-[#93C5FD] truncate max-w-full">$ npx zeuralabz add {heroBg}</span>
                  <button
                    onClick={() => copyCommand(`npx zeuralabz add ${heroBg}`)}
                    className="bg-[#2563EB] text-white border-[2px] border-white px-2.5 py-0.5 hover:bg-[#3B82F6] font-heading font-black shrink-0"
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
      <section id="showcase" className="py-12 sm:py-20 border-b-[3px] border-white bg-[#111111] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="bg-[#2563EB] text-white border-[2px] border-white px-3 py-1 font-heading text-xs font-black uppercase shadow-[3px_3px_0px_#FFFFFF]">
              LIVE CODE SYNTHESIS
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white mt-3">
              ZERO BOILERPLATE. COPY & SHIP.
            </h2>
            <p className="text-[#CCCCCC] font-semibold text-xs sm:text-sm mt-2">
              Every component works independently in standard React, Vite, or Next.js apps.
            </p>
          </div>

          {/* Chunky Multi-Window Container */}
          <div className="bg-[#1A1A1A] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[10px_10px_0px_#2563EB] overflow-hidden w-full max-w-full">
            {/* Window Topbar */}
            <div className="h-auto py-2.5 px-3 sm:px-4 bg-[#2563EB] border-b-[3px] border-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-black" />
                <span className="font-heading text-xs font-black text-white ml-2">
                  ZEURALABZ-SHOWCASE-MATRIX.JSX
                </span>
              </div>
              <div className="text-[11px] font-mono font-bold text-white uppercase bg-black border border-white px-2 py-0.5 shadow-[2px_2px_0px_#000]">
                REACT 19 + TAILWIND V4
              </div>
            </div>

            {/* Window Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-full min-w-0">
              {/* Left Code Editor (Hero.jsx) - 7 cols */}
              <div className="lg:col-span-7 p-4 sm:p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-white font-mono text-xs flex flex-col justify-between bg-[#141414] min-w-0 max-w-full overflow-hidden">
                <div className="w-full max-w-full min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-[2px] border-white/40">
                    <span className="font-heading text-white font-black flex items-center gap-1.5 text-xs">
                      <span className="text-[#3B82F6]">⚛</span> Hero.jsx
                    </span>
                    <button
                      onClick={() => copyCommand(sampleHeroCode)}
                      className="neo-btn bg-[#2563EB] text-white border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] px-3 py-1 text-xs hover:bg-[#3B82F6]"
                    >
                      {copiedSlug === sampleHeroCode ? '✔ COPIED' : 'COPY CODE'}
                    </button>
                  </div>
                  <pre className="text-white overflow-x-auto leading-relaxed space-y-1 font-mono text-xs bg-[#0A0A0A] p-3 sm:p-4 border-[2px] border-white/40 max-w-full min-w-0">
                    {sampleHeroCode.split('\n').map((line, idx) => (
                      <div key={idx} className="flex min-w-0">
                        <span className="text-zinc-500 select-none w-6 sm:w-7 shrink-0 text-right pr-2 sm:pr-3 font-bold">{idx + 1}</span>
                        <span
                          className={
                            line.startsWith('import')
                              ? 'text-[#93C5FD] font-bold'
                              : line.includes('<AuroraBackground') || line.includes('<SplitText') || line.includes('<ShimmerButton')
                              ? 'text-white font-black'
                              : line.includes('return') || line.includes('export')
                              ? 'text-cyan-400 font-bold'
                              : 'text-[#CCCCCC] font-semibold'
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
              <div className="lg:col-span-5 flex flex-col divide-y-[3px] divide-white bg-[#181818] min-w-0 max-w-full">
                {/* Right Top: Terminal Window */}
                <div className="p-4 sm:p-5 font-mono text-xs bg-black text-white w-full max-w-full overflow-hidden">
                  <div className="font-heading text-[#3B82F6] font-black mb-3 flex items-center gap-2 text-xs">
                    <span className="text-emerald-400">❯</span> TERMINAL WORKFLOW
                  </div>
                  <div className="space-y-1.5 bg-[#0D0D0D] p-3 sm:p-3.5 border-[2px] border-zinc-700 text-[11px] font-mono overflow-x-auto max-w-full">
                    <div className="text-[#93C5FD] font-bold">$ npx zeuralabz suggest</div>
                    <div className="text-zinc-400">✓ Scanning project structure...</div>
                    <div className="text-emerald-400 font-bold">✓ Recommended 3 UI picks for your landing page:</div>
                    <div className="text-white pl-2">• Aurora Background [Blue Accent]</div>
                    <div className="text-white pl-2">• Split Text Stagger [White Accent]</div>
                    <div className="text-white pl-2">• Shimmer Button [Cobalt Accent]</div>
                    <div className="text-[#3B82F6] mt-2 font-bold">$ npx zeuralabz add aurora</div>
                    <div className="text-zinc-400">✔ Installed into src/components/zeuralabz/aurora</div>
                  </div>
                </div>

                {/* Right Bottom: Presets Window */}
                <div className="p-4 sm:p-5 bg-[#141414] w-full max-w-full">
                  <div className="font-heading text-xs font-black text-white mb-3 flex items-center justify-between uppercase">
                    <span>Aesthetic Tuning:</span>
                    <span className="bg-[#2563EB] text-white px-1.5 py-0.5 border border-white text-[10px]">LIVE TUNE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-full">
                    {[
                      { id: 'dark-neon', name: 'Dark Cobalt', colors: 'Blue + Slate' },
                      { id: 'ocean', name: 'Ocean Surge', colors: 'Deep Aqua' },
                      { id: 'dune', name: 'Cyber Indigo', colors: 'Night Sky' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setActivePreset(preset.id as any)}
                        className={`p-2.5 text-left border-[2px] transition ${
                          activePreset === preset.id
                            ? 'bg-[#2563EB] text-white border-white shadow-[2px_2px_0px_#FFFFFF] font-black'
                            : 'bg-[#1A1A1A] text-white border-white/60 hover:bg-zinc-800 font-bold'
                        }`}
                      >
                        <div className="text-xs font-heading font-black uppercase">{preset.name}</div>
                        <div className="text-[10px] text-[#CCCCCC] mt-1">{preset.colors}</div>
                      </button>
                    ))}
                  </div>

                  {/* Preset Values Panel */}
                  <div className="mt-3 p-3 bg-[#0A0A0A] border-[2px] border-white/40 text-[11px] font-mono text-white font-bold space-y-1 shadow-[2px_2px_0px_#2563EB]">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Amplitude:</span>
                      <span className="text-[#93C5FD]">
                        {activePreset === 'ocean' ? '0.82 (Deep Surge)' : activePreset === 'dune' ? '0.64 (Warm Drift)' : '0.95 (High Energy)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Cycle Speed:</span>
                      <span className="text-white">
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
      <section id="components" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between border-b-[3px] border-white pb-6 w-full max-w-full">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">Component Catalog</h2>
            <p className="text-xs text-[#CCCCCC] font-semibold mt-1">
              Every component rendered live with responsive code tabs and single-command installation.
            </p>
          </div>

          {/* Neo Search bar */}
          <div className="relative w-full md:w-80 lg:w-96">
            <input
              type="text"
              placeholder="Search components (e.g. aurora, bento, button)..."
              value={rawSearchQuery}
              onChange={(e) => setRawSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#1A1A1A] border-[3px] border-white shadow-[3px_3px_0px_#2563EB] sm:shadow-[4px_4px_0px_#2563EB] text-xs font-bold text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB] transition max-w-full"
            />
            {rawSearchQuery && (
              <button
                onClick={() => {
                  setRawSearchQuery('');
                  setCurrentPage(1);
                  setIsAppendMode(false);
                }}
                className="absolute right-3 top-2.5 sm:top-3 text-[#93C5FD] font-heading font-black text-xs hover:text-white"
              >
                ✕ CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Source Filter Row */}
        <div className="flex flex-wrap items-center gap-2 pt-4 sm:pt-6 pb-2 border-t-[3px] border-white/20 w-full max-w-full">
          <span className="font-heading text-xs font-black text-white mr-2 uppercase tracking-wider">
            SOURCE:
          </span>
          {[
            { id: 'all', label: `All Sources (${totalAll})` },
            { id: 'react-bits', label: `React Bits (${totalReactBits})` },
            { id: 'magic-ui', label: `Magic UI (${totalMagicUI})` },
            { id: 'aceternity', label: `Aceternity UI (${totalAceternity})` },
            { id: 'zeuralabz-original', label: `ZEURALABZ Original (${totalZeura})` },
          ].map((src) => (
            <button
              key={src.id}
              onClick={() => {
                setSelectedSource(src.id);
                setCurrentPage(1);
                setIsAppendMode(false);
              }}
              className={`px-3 py-1.5 text-xs font-heading font-black uppercase transition border-[2px] sm:border-[3px] border-white ${
                selectedSource === src.id
                  ? 'bg-[#2563EB] text-white shadow-[3px_3px_0px_#FFFFFF] sm:shadow-[4px_4px_0px_#FFFFFF] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-[#1A1A1A] text-white hover:bg-zinc-800 shadow-[2px_2px_0px_#2563EB]'
              }`}
            >
              {src.label}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 text-xs no-scrollbar w-full max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
                setIsAppendMode(false);
              }}
              className={`px-3 py-1.5 capitalize shrink-0 font-heading font-black text-xs transition border-[2px] border-white ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF]'
                  : 'bg-[#1A1A1A] text-white hover:bg-zinc-800 shadow-[2px_2px_0px_#2563EB]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
          <span className="ml-auto shrink-0 font-heading text-xs font-black uppercase bg-black text-[#93C5FD] px-2.5 py-1 border-[2px] border-white shadow-[2px_2px_0px_#2563EB]">
            SHOWING {filteredComponents.length} OF {totalAll}
          </span>
        </div>

        {/* Second Row: Format selector */}
        <div className="mt-2 mb-6 sm:mb-8 p-3 sm:p-3.5 bg-[#181818] border-[3px] border-white shadow-[3px_3px_0px_#2563EB] sm:shadow-[4px_4px_0px_#2563EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs w-full max-w-full">
          <span className="font-heading font-black text-white uppercase">Install format you need:</span>
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
                className={`px-3 py-1 text-xs font-bold border-[2px] border-white transition ${
                  selectedFormat === fmt.id
                    ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#FFFFFF] font-black'
                    : 'bg-[#141414] text-white hover:bg-zinc-800'
                }`}
              >
                {fmt.label} <span className="text-zinc-400 text-[10px]">({fmt.ext})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. COMPONENT GRID WITH LIVE PREVIEWS & PAGINATION */}
        {/* ============================================================== */}
        {filteredComponents.length === 0 ? (
          <div className="text-center py-16 sm:py-24 bg-[#1A1A1A] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] p-6 sm:p-8 w-full max-w-full">
            <p className="font-heading text-lg sm:text-xl font-black text-white">NO COMPONENTS MATCHED "{rawSearchQuery}"</p>
            <p className="text-xs text-[#CCCCCC] font-medium mt-1">Try searching for keywords like aurora, bento, card, or button.</p>
            <button
              onClick={() => {
                setRawSearchQuery('');
                setSelectedCategory('all');
                setSelectedSource('all');
                setCurrentPage(1);
                setIsAppendMode(false);
              }}
              className="mt-4 neo-btn bg-[#2563EB] text-white px-4 py-2 text-xs border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#3B82F6]"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full max-w-full">
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
            <div className="mt-8 sm:mt-12 p-4 sm:p-5 bg-[#1A1A1A] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] flex flex-col gap-4 text-white w-full max-w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-white font-heading font-black uppercase">
                  {isAppendMode ? (
                    <>
                      SHOWING 1–
                      <span className="bg-[#2563EB] text-white px-1 border border-black">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)}
                      </span>{' '}
                      OF{' '}
                      <span className="bg-[#2563EB] text-white px-1 border border-black">{filteredComponents.length}</span>{' '}
                      COMPONENTS (PAGES 1–{currentPage} OF {totalPages})
                    </>
                  ) : (
                    <>
                      SHOWING{' '}
                      <span className="bg-[#2563EB] text-white px-1 border border-black">
                        {filteredComponents.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>
                      –
                      <span className="bg-[#2563EB] text-white px-1 border border-black">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)}
                      </span>{' '}
                      OF{' '}
                      <span className="bg-[#2563EB] text-white px-1 border border-black">{filteredComponents.length}</span>{' '}
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
                      className="neo-btn bg-[#2563EB] text-white px-3 sm:px-4 py-2 text-xs font-heading font-black flex items-center gap-1.5 border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#3B82F6]"
                    >
                      <span>LOAD MORE</span>
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
                      className="neo-btn bg-white text-black px-3 py-2 text-xs font-heading font-black border-[2px] border-white shadow-[2px_2px_0px_#2563EB] sm:shadow-[3px_3px_0px_#2563EB]"
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
                      className="neo-btn bg-white text-black px-3 py-2 text-xs font-heading font-black border-[2px] border-white shadow-[2px_2px_0px_#2563EB] sm:shadow-[3px_3px_0px_#2563EB]"
                    >
                      FIRST 12
                    </button>
                  )}
                </div>
              </div>

              {/* Numeric Page Buttons [PREV] [1] [2] [3] ... [NEXT] */}
              {totalPages > 1 && (
                <div className="pt-4 border-t-[2px] border-white/30 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                      setIsAppendMode(false);
                      setCurrentPage((p) => Math.max(1, p - 1));
                      document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 text-xs font-heading font-black border-[2px] border-white transition ${
                      currentPage <= 1
                        ? 'opacity-30 cursor-not-allowed bg-zinc-800 text-zinc-500'
                        : 'bg-white text-black hover:bg-[#2563EB] hover:text-white shadow-[2px_2px_0px_#2563EB] active:translate-x-0.5 active:translate-y-0.5'
                    }`}
                  >
                    ◀ PREV
                  </button>

                  {pageNumbers.map((p, idx) =>
                    p === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 py-1 font-mono font-bold text-zinc-400">
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
                        className={`w-8 h-8 sm:w-9 sm:h-9 text-xs font-heading font-black border-[2px] border-white flex items-center justify-center transition ${
                          !isAppendMode && currentPage === p
                            ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF] -translate-x-0.5 -translate-y-0.5'
                            : 'bg-[#141414] text-white hover:bg-zinc-800 shadow-[2px_2px_0px_#2563EB]'
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
                    className={`px-3 py-1.5 text-xs font-heading font-black border-[2px] border-white transition ${
                      currentPage >= totalPages
                        ? 'opacity-30 cursor-not-allowed bg-zinc-800 text-zinc-500'
                        : 'bg-white text-black hover:bg-[#2563EB] hover:text-white shadow-[2px_2px_0px_#2563EB] active:translate-x-0.5 active:translate-y-0.5'
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
      <section id="how-it-works" className="py-12 sm:py-20 border-t-[3px] border-b-[3px] border-white bg-[#181818] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="bg-[#2563EB] text-white border-[2px] border-white px-3 py-1 font-heading text-xs font-black uppercase shadow-[3px_3px_0px_#FFFFFF]">
              AUTONOMOUS WORKFLOW
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white mt-3">
              HOW ZEURALABZ SUGGEST WORKS
            </h2>
            <p className="text-[#CCCCCC] font-semibold text-xs sm:text-sm mt-2">
              No manual hunting. Let the heuristic analyzer inspect your repo and recommend the 1 best match per section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
            <div className="p-5 sm:p-6 bg-[#141414] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] text-left w-full max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563EB] border-[3px] border-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF] text-white flex items-center justify-center font-heading font-black text-base sm:text-lg mb-4">
                01
              </div>
              <h3 className="font-heading text-base font-black text-white mb-2 uppercase">Scan Your Project</h3>
              <p className="text-xs text-[#CCCCCC] font-semibold leading-relaxed">
                Run <code className="bg-[#0A0A0A] border border-white/40 px-1 py-0.5 font-mono text-[#93C5FD]">npx zeuralabz suggest</code> in any React, Next.js, or Vite workspace.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#141414] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] text-left w-full max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563EB] border-[3px] border-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF] text-white flex items-center justify-center font-heading font-black text-base sm:text-lg mb-4">
                02
              </div>
              <h3 className="font-heading text-base font-black text-white mb-2 uppercase">Curated 1-Best-Pick</h3>
              <p className="text-xs text-[#CCCCCC] font-semibold leading-relaxed">
                ZEURALABZ determines your product persona (SaaS, Portfolio, Dashboard) and selects exactly 1 ideal component per section with reasoning.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#141414] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] text-left w-full max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563EB] border-[3px] border-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF] text-white flex items-center justify-center font-heading font-black text-base sm:text-lg mb-4">
                03
              </div>
              <h3 className="font-heading text-base font-black text-white mb-2 uppercase">Direct Local Code</h3>
              <p className="text-xs text-[#CCCCCC] font-semibold leading-relaxed">
                Components install straight into your <code className="bg-[#0A0A0A] border border-white/40 px-1 py-0.5 font-mono text-[#93C5FD]">src/components/</code> directory. Zero lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tool Integration Cards */}
      <section id="mcp" className="py-12 sm:py-20 border-b-[3px] border-white bg-[#111111] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full max-w-full">
          <span className="bg-[#2563EB] text-white border-[2px] border-white px-3 py-1 font-heading text-xs font-black uppercase shadow-[3px_3px_0px_#FFFFFF]">
            MODEL CONTEXT PROTOCOL & SKILLS
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-white mt-3 mb-4">
            INSTALL IN YOUR AI WORKSPACE
          </h2>
          <p className="text-[#CCCCCC] font-semibold text-xs sm:text-sm max-w-xl mx-auto mb-8 sm:mb-12">
            Native MCP tools and skills for Claude Code, Cursor, Windsurf, and Google Antigravity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-full">
            <div className="p-5 sm:p-6 bg-[#181818] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] flex flex-col justify-between w-full max-w-full">
              <div>
                <span className="bg-[#2563EB] text-white px-2 py-0.5 font-heading text-xs font-black uppercase border border-white">
                  Claude Code / Desktop
                </span>
                <p className="text-xs text-[#CCCCCC] font-semibold mt-3">
                  Add the ZEURALABZ MCP server to enable autonomous design reviews and component installations.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border-[2px] border-white/60 text-[11px] font-mono text-[#93C5FD] overflow-x-auto shadow-[3px_3px_0px_#2563EB] max-w-full">
{`"zeuralabz": {
  "command": "node",
  "args": ["mcp-server/index.js"]
}`}
              </pre>
            </div>

            <div className="p-5 sm:p-6 bg-[#181818] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] flex flex-col justify-between w-full max-w-full">
              <div>
                <span className="bg-[#2563EB] text-white px-2 py-0.5 font-heading text-xs font-black uppercase border border-white">
                  Antigravity / Gemini
                </span>
                <p className="text-xs text-[#CCCCCC] font-semibold mt-3">
                  Drop <code className="bg-[#0A0A0A] border border-white/40 px-1 text-[#93C5FD]">SKILL.md</code> into your skills folder to activate intelligent UI recommendations.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border-[2px] border-white/60 text-[11px] font-mono text-emerald-400 overflow-x-auto shadow-[3px_3px_0px_#2563EB] max-w-full">
{`// Tell Antigravity:
"Use ZEURALABZ to analyze my site
and install the best hero"`}
              </pre>
            </div>

            <div className="p-5 sm:p-6 bg-[#181818] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] sm:shadow-[6px_6px_0px_#2563EB] flex flex-col justify-between w-full max-w-full">
              <div>
                <span className="bg-[#2563EB] text-white px-2 py-0.5 font-heading text-xs font-black uppercase border border-white">
                  Cursor & Windsurf
                </span>
                <p className="text-xs text-[#CCCCCC] font-semibold mt-3">
                  Connect via MCP server settings and query components straight from chat with <code className="bg-[#0A0A0A] border border-white/40 px-1 text-[#93C5FD]">@zeuralabz</code>.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border-[2px] border-white/60 text-[11px] font-mono text-[#93C5FD] overflow-x-auto shadow-[3px_3px_0px_#2563EB] max-w-full">
{`@zeuralabz suggest
@zeuralabz install aurora`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CODE MODAL */}
      {/* ============================================================== */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-[#1A1A1A] border-[4px] border-white shadow-[6px_6px_0px_#2563EB] sm:shadow-[12px_12px_0px_#2563EB] overflow-hidden flex flex-col max-h-[90vh] mx-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#2563EB] border-b-[3px] border-white flex items-center justify-between text-white">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading text-lg sm:text-xl font-black text-white uppercase truncate">{selectedComponent.name}</h3>
                  <span
                    className="px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[2px] border-white shadow-[2px_2px_0px_#000] bg-[#111111] text-white shrink-0"
                  >
                    {selectedComponent.source === 'react-bits'
                      ? 'React Bits • MIT + Commons'
                      : selectedComponent.source === 'magic-ui'
                      ? 'Magic UI • MIT'
                      : selectedComponent.source === 'aceternity'
                      ? 'Aceternity UI • MIT'
                      : 'ZEURALABZ Original'}
                  </span>
                </div>
                <p className="text-xs text-white/90 font-mono font-bold mt-1 truncate">
                  {selectedComponent.source === 'react-bits'
                    ? `Official React Bits Registry • ${selectedComponent.componentName}-TS-TW`
                    : selectedComponent.source === 'magic-ui'
                    ? `Official Magic UI Registry • https://magicui.design/r/${selectedComponent.slug}.json`
                    : selectedComponent.source === 'aceternity'
                    ? `Official Aceternity Registry • @aceternity/${selectedComponent.slug}`
                    : `components/${selectedComponent.category}/${selectedComponent.slug}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white hover:bg-zinc-800 font-heading font-black text-sm flex items-center justify-center border-[2px] border-white shadow-[2px_2px_0px_#000] transition shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex border-b-[3px] border-white px-4 sm:px-6 pt-3 bg-[#111111] gap-2 sm:gap-3 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setActiveTab('react')}
                className={`pb-2 px-3 sm:px-4 transition border-[2px] border-white font-heading font-black uppercase shrink-0 ${
                  activeTab === 'react'
                    ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF]'
                    : 'bg-[#1A1A1A] text-white hover:bg-zinc-800'
                }`}
              >
                React ({selectedComponent.source === 'react-bits' || selectedComponent.source === 'magic-ui' || selectedComponent.source === 'aceternity' ? 'TS + Tailwind' : 'TypeScript'})
              </button>
              {selectedComponent.source !== 'react-bits' && selectedComponent.source !== 'magic-ui' && selectedComponent.source !== 'aceternity' && (
                <>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`pb-2 px-3 sm:px-4 transition border-[2px] border-white font-heading font-black uppercase shrink-0 ${
                      activeTab === 'html'
                        ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF]'
                        : 'bg-[#1A1A1A] text-white hover:bg-zinc-800'
                    }`}
                  >
                    Pure HTML
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`pb-2 px-3 sm:px-4 transition border-[2px] border-white font-heading font-black uppercase shrink-0 ${
                      activeTab === 'css'
                        ? 'bg-[#2563EB] text-white shadow-[2px_2px_0px_#FFFFFF] sm:shadow-[3px_3px_0px_#FFFFFF]'
                        : 'bg-[#1A1A1A] text-white hover:bg-zinc-800'
                    }`}
                  >
                    Pure CSS
                  </button>
                </>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs font-mono bg-[#141414]">
              {/* Primary ZEURALABZ CLI Command */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 p-3 sm:p-3.5 bg-black text-[#93C5FD] border-[3px] border-white shadow-[3px_3px_0px_#2563EB]">
                <span className="font-bold truncate">
                  $ npx zeuralabz add {selectedComponent.slug}
                  {selectedComponent.source === 'react-bits'
                    ? ' --source react-bits'
                    : selectedComponent.source === 'magic-ui'
                    ? ' --source magic-ui'
                    : selectedComponent.source === 'aceternity'
                    ? ' --source aceternity'
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
                          : selectedComponent.source === 'aceternity'
                          ? ' --source aceternity'
                          : ''
                      }`
                    )
                  }
                  className="px-3 py-1 bg-[#2563EB] text-white hover:bg-[#3B82F6] font-heading font-black text-xs border border-white shadow-[2px_2px_0px_#FFFFFF] shrink-0"
                >
                  {copiedSlug ===
                  `npx zeuralabz add ${selectedComponent.slug}${
                    selectedComponent.source === 'react-bits'
                      ? ' --source react-bits'
                      : selectedComponent.source === 'magic-ui'
                      ? ' --source magic-ui'
                      : selectedComponent.source === 'aceternity'
                      ? ' --source aceternity'
                      : ''
                  }`
                    ? 'COPIED!'
                    : 'COPY'}
                </button>
              </div>

              {/* Official React Bits direct command */}
              {selectedComponent.source === 'react-bits' && (
                <div className="p-4 bg-[#0B1528] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-black uppercase text-white">
                      Official React Bits Registry Command:
                    </span>
                    <a
                      href={selectedComponent.originalUrl || 'https://reactbits.dev'}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#93C5FD] hover:underline flex items-center gap-1 font-heading font-black"
                    >
                      VISIT REACTBITS.DEV ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-white bg-black p-2.5 border-[2px] border-white/60 font-mono text-xs">
                    <code className="truncate">{selectedComponent.installCommand || `npx shadcn@latest add @react-bits/${selectedComponent.componentName}-TS-TW`}</code>
                    <button
                      onClick={() =>
                        copyCommand(
                          selectedComponent.installCommand ||
                            `npx shadcn@latest add @react-bits/${selectedComponent.componentName}-TS-TW`
                        )
                      }
                      className="px-2 py-0.5 bg-[#2563EB] text-white hover:bg-[#3B82F6] font-heading font-black text-xs shrink-0 ml-2 border border-white"
                    >
                      COPY
                    </button>
                  </div>
                  <p className="text-[11px] text-[#CCCCCC] font-sans font-medium pt-1">
                    Attribution: Created by David Haz (github.com/DavidHDev/react-bits). Free to use under MIT + Commons Clause.
                  </p>
                </div>
              )}

              {/* Official Magic UI direct command */}
              {selectedComponent.source === 'magic-ui' && (
                <div className="p-4 bg-[#0B1528] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-black uppercase text-white">
                      Official Magic UI Registry Command:
                    </span>
                    <a
                      href={selectedComponent.originalUrl || `https://magicui.design/docs/components/${selectedComponent.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#93C5FD] hover:underline flex items-center gap-1 font-heading font-black"
                    >
                      VISIT MAGICUI.DESIGN ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-white bg-black p-2.5 border-[2px] border-white/60 font-mono text-xs">
                    <code className="truncate">{selectedComponent.installCommand || `npx shadcn@latest add https://magicui.design/r/${selectedComponent.slug}.json`}</code>
                    <button
                      onClick={() =>
                        copyCommand(
                          selectedComponent.installCommand ||
                            `npx shadcn@latest add https://magicui.design/r/${selectedComponent.slug}.json`
                        )
                      }
                      className="px-2 py-0.5 bg-[#2563EB] text-white hover:bg-[#3B82F6] font-heading font-black text-xs shrink-0 ml-2 border border-white"
                    >
                      COPY
                    </button>
                  </div>
                  <p className="text-[11px] text-[#CCCCCC] font-sans font-medium pt-1">
                    Attribution: Created by Dillion Verma (github.com/magicuidesign/magicui). Free to use under MIT License.
                  </p>
                </div>
              )}

              {/* Official Aceternity UI direct command */}
              {selectedComponent.source === 'aceternity' && (
                <div className="p-4 bg-[#0B1528] border-[3px] border-white shadow-[4px_4px_0px_#2563EB] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xs font-black uppercase text-white">
                      Official Aceternity Registry Command:
                    </span>
                    <a
                      href={selectedComponent.originalUrl || `https://ui.aceternity.com/components/${selectedComponent.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#93C5FD] hover:underline flex items-center gap-1 font-heading font-black"
                    >
                      VISIT UI.ACETERNITY.COM ↗
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-white bg-black p-2.5 border-[2px] border-white/60 font-mono text-xs">
                    <code className="truncate">{selectedComponent.installCommand || `npx shadcn@latest add @aceternity/${selectedComponent.slug}`}</code>
                    <button
                      onClick={() =>
                        copyCommand(
                          selectedComponent.installCommand ||
                            `npx shadcn@latest add @aceternity/${selectedComponent.slug}`
                        )
                      }
                      className="px-2 py-0.5 bg-[#2563EB] text-white hover:bg-[#3B82F6] font-heading font-black text-xs shrink-0 ml-2 border border-white"
                    >
                      COPY
                    </button>
                  </div>
                  <p className="text-[11px] text-[#CCCCCC] font-sans font-medium pt-1">
                    Attribution: Created by Manu Arora (ui.aceternity.com). Free to use under MIT / Aceternity terms.
                  </p>
                </div>
              )}

              {activeTab === 'react' && (
                <div>
                  <span className="font-heading text-xs font-black uppercase text-white block mb-1">React Usage:</span>
                  <pre className="p-3 sm:p-4 bg-[#0A0A0A] text-white border-[3px] border-white/60 overflow-x-auto leading-relaxed shadow-[3px_3px_0px_#2563EB] max-w-full">
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
  : selectedComponent.source === 'aceternity'
  ? `import { ${selectedComponent.componentName || 'Component'} } from "@/components/ui/${selectedComponent.slug}";

export default function Example() {
  return (
    <div className="relative flex items-center justify-center p-8">
      <${selectedComponent.componentName || 'Component'} />
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

              {activeTab === 'html' && selectedComponent.source !== 'react-bits' && selectedComponent.source !== 'magic-ui' && selectedComponent.source !== 'aceternity' && (
                <div>
                  <span className="font-heading text-xs font-black uppercase text-white block mb-1">Semantic HTML Structure:</span>
                  <pre className="p-3 sm:p-4 bg-[#0A0A0A] text-white border-[3px] border-white/60 overflow-x-auto leading-relaxed shadow-[3px_3px_0px_#2563EB] max-w-full">
{`<div class="zeura-${selectedComponent.slug}">
  <h2>${selectedComponent.name}</h2>
</div>`}
                  </pre>
                </div>
              )}

              {activeTab === 'css' && selectedComponent.source !== 'react-bits' && selectedComponent.source !== 'magic-ui' && selectedComponent.source !== 'aceternity' && (
                <div>
                  <span className="font-heading text-xs font-black uppercase text-white block mb-1">Standalone CSS Rules:</span>
                  <pre className="p-3 sm:p-4 bg-[#0A0A0A] text-white border-[3px] border-white/60 overflow-x-auto leading-relaxed shadow-[3px_3px_0px_#2563EB] max-w-full">
{`.zeura-${selectedComponent.slug} {
  position: relative;
  overflow: hidden;
  border: 3px solid #FFF;
  box-shadow: 6px 6px 0px #2563EB;
  background-color: #1A1A1A;
  color: #FFF;
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t-[3px] border-white bg-[#111111] flex justify-end">
              <button
                onClick={() => setSelectedComponent(null)}
                className="neo-btn bg-[#2563EB] text-white px-5 py-2 text-xs font-heading font-black hover:bg-[#3B82F6] border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. FOOTER (Black bg, 4px blue top border, MIT attribution) */}
      {/* ============================================================== */}
      <footer className="border-t-[4px] border-[#2563EB] bg-black text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 text-xs w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left w-full max-w-full">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-heading font-black text-[#2563EB] text-base">ZEURALABZ</span>
              <span className="text-zinc-500">•</span>
              <span className="font-bold">{totalAll} animated components ({totalReactBits} React Bits + {totalMagicUI} Magic UI + {totalAceternity} Aceternity + {totalZeura} Originals)</span>
            </div>
            <div className="mt-1.5 text-[#CCCCCC] font-medium">
              Crafted with care by{' '}
              <a href="https://github.com/rselva1202" target="_blank" rel="noreferrer" className="text-[#3B82F6] font-bold hover:underline">
                R. Selva
              </a>
              . Distributed under MIT License. Sources: React Bits (David Haz, MIT + Commons), Magic UI (Dillion Verma, MIT), & Aceternity UI (Manu Arora, MIT).
            </div>
          </div>

          <div className="flex flex-wrap gap-4 font-heading font-black uppercase text-xs justify-center sm:justify-end">
            <a href="https://github.com/rselva1202/zeuralabz" className="text-white hover:text-[#3B82F6] transition">GitHub</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/ATTRIBUTION.md" className="text-white hover:text-[#3B82F6] transition">Attribution</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md" className="text-white hover:text-[#3B82F6] transition">Installation</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/HOW-IT-WORKS.md" className="text-white hover:text-[#3B82F6] transition">Architecture</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/SKILL.md" className="text-white hover:text-[#3B82F6] transition">AI Skill</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
