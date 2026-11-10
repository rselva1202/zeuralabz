import React, { useState, useMemo, useEffect } from 'react';
import componentsData from './data/components.json';
import { PreviewRouter } from './previews/PreviewRouter';
import { LiveCanvas, CanvasEngineType } from './components/LiveCanvas';

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
      className="group rounded-[6px] bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] hover:shadow-[4px_4px_0px_#14B8A6] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col overflow-hidden w-full max-w-full min-w-0"
    >
      {/* Top Preview Area: 180px, no extra inner border, PreviewRouter filling top */}
      <div className="h-44 sm:h-48 bg-[#0A0D14] relative flex items-center justify-center overflow-hidden border-b-[2px] border-white w-full max-w-full">
        <PreviewRouter comp={comp} animationMode={animationMode} />
      </div>

      {/* Details Area: spacious, minimal, clean */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#161616] w-full max-w-full min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-heading text-sm font-black text-white group-hover:text-[#2DD4BF] transition truncate">
              {comp.name}
            </h3>
            <span className="text-[10px] text-[#2DD4BF] font-mono font-bold bg-black/60 border border-white/20 px-1.5 py-0.5 shrink-0">
              {comp.slug}
            </span>
          </div>
          <p className="text-xs text-[#CCCCCC] font-normal mt-2 line-clamp-2 leading-relaxed">
            {comp.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-white/30 bg-black/60 text-[#CCCCCC]">
              {comp.category}
            </span>
            {comp.bestFor?.slice(0, 1).map((b) => (
              <span key={b} className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-black/40 border border-white/10">
                ✓ {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions: 1 shadow only, mint install button */}
        <div className="mt-5 pt-3 border-t border-[#2A2A2A] flex items-center justify-between gap-2">
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
            className={`flex-1 py-2 px-3 text-[11px] font-mono font-bold border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] transition active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-1.5 truncate ${
              isCopied
                ? 'bg-emerald-400 text-black font-black'
                : 'bg-[#2DD4BF] text-black hover:bg-[#14B8A6] font-black'
            }`}
          >
            {isCopied ? '✔ COPIED' : `$ npx zeuralabz add ${comp.slug}`}
          </button>

          <button
            onClick={() => onOpenCode(comp)}
            className="bg-white text-black border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF] px-3 py-2 text-xs font-heading font-black hover:bg-zinc-200 transition shrink-0"
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
  const [activeEngine, setActiveEngine] = useState<CanvasEngineType>('aurora');
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
      <div className="w-screen h-screen bg-[#0E0E0E] flex items-center justify-center p-4 sm:p-8 max-w-full overflow-hidden">
        <div className="w-full max-w-[460px] bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] overflow-hidden flex flex-col">
          <div className="bg-[#111111] border-b-[2px] border-white px-4 py-2.5 flex items-center justify-between font-heading text-xs font-black text-white">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 bg-[#2DD4BF] text-black border border-white flex items-center justify-center text-[10px]">Z</span>
              ZEURALABZ • STANDALONE
            </span>
            <span className="bg-[#2DD4BF] text-black px-2 py-0.5 text-[10px] font-mono font-bold">LIVE</span>
          </div>
          <div className="h-64 bg-[#0E0E0E] relative border-b-[2px] border-white overflow-hidden">
            <LiveCanvas engine="galaxy" lite={false} />
          </div>
          <div className="p-5 space-y-3 bg-[#161616] text-white">
            <h3 className="font-heading text-lg font-black text-white">Spiral Galaxy Cosmic Canvas</h3>
            <p className="text-xs text-[#CCCCCC] font-normal">700+ stars, 3 logarithmic spiral arms, radiant purple stellar core.</p>
            <div className="pt-2 border-t border-[#2A2A2A] flex justify-between items-center text-xs font-mono font-bold">
              <span className="text-[#2DD4BF]">npx zeuralabz add galaxy</span>
              <span className="bg-[#2DD4BF] text-black px-2 py-0.5 border border-white text-[10px]">READY</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-sans selection:bg-[#2DD4BF] selection:text-black w-full max-w-full overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR (Sticky, Minimal Dark #111111, 2px solid white border) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 w-full border-b-[2px] border-white bg-[#111111] shadow-[0px_2px_0px_#2DD4BF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Left Brand: Mint Square with Black Z + ZEURALABZ in ONE word */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <span className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2DD4BF] border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] flex items-center justify-center font-heading text-lg sm:text-xl font-black text-black transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                Z
              </span>
              <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
                ZEURALABZ
              </span>
            </a>
            <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-black text-zinc-300 border border-white/40">
              v1.2.0 • OPEN SOURCE
            </span>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-heading font-black uppercase text-white">
            <a href="#showcase" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2DD4BF] hover:text-black transition">
              Showcase
            </a>
            <a href="#components" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2DD4BF] hover:text-black transition">
              Components
            </a>
            <a href="#how-it-works" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2DD4BF] hover:text-black transition">
              How it Works
            </a>
            <a href="#mcp" className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2DD4BF] hover:text-black transition">
              MCP & Skill
            </a>
            <a
              href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md"
              target="_blank"
              rel="noreferrer"
              className="px-2 py-1 border-[2px] border-transparent hover:border-white hover:bg-[#2DD4BF] hover:text-black transition"
            >
              Docs
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Minimal Animations Mode Switcher (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 bg-[#161616] border-[2px] border-white p-1 shadow-[2px_2px_0px_#2DD4BF]">
              <span className="text-[10px] font-mono font-bold uppercase px-1 text-zinc-300">ANIMATIONS:</span>
              {(['lite', 'full', 'off'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setAnimationMode(m)}
                  className={`px-2 py-0.5 text-[10px] font-heading font-black uppercase transition border-[2px] ${
                    animationMode === m
                      ? 'bg-[#2DD4BF] text-black border-white shadow-[1px_1px_0px_#FFFFFF]'
                      : 'bg-transparent text-white border-transparent hover:border-white hover:bg-zinc-800'
                  }`}
                  title={`Motion mode: ${m}`}
                >
                  {m === 'full' ? 'ON' : m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* GitHub Stars Button */}
            <a
              href="https://github.com/rselva1202/zeuralabz"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-zinc-800 border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF] text-xs font-heading font-black uppercase transition shrink-0"
            >
              <span>GITHUB</span>
              <span className="text-amber-400">★</span>
              <span className="font-mono text-[11px] text-[#2DD4BF]">{starCount}</span>
            </a>

            {/* AI Suggest CLI button */}
            <button
              onClick={() => copyCommand('npx zeuralabz suggest')}
              className="neo-btn bg-[#2DD4BF] text-black px-3 sm:px-4 py-1.5 text-xs font-heading font-black tracking-wide border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#14B8A6] flex items-center gap-1 shrink-0"
              title="Copy heuristic analyzer command"
            >
              <span>SUGGEST</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 bg-[#161616] border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF] flex items-center justify-center text-white hover:bg-zinc-800 text-lg font-black transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-[2px] border-white bg-[#111111] px-4 py-4 space-y-3">
            <nav className="flex flex-col space-y-2 text-xs font-heading font-black uppercase">
              <a
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border-[2px] border-white/30 bg-[#161616] hover:bg-[#2DD4BF] hover:text-black transition"
              >
                Showcase
              </a>
              <a
                href="#components"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border-[2px] border-white/30 bg-[#161616] hover:bg-[#2DD4BF] hover:text-black transition"
              >
                Components ({totalAll})
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border-[2px] border-white/30 bg-[#161616] hover:bg-[#2DD4BF] hover:text-black transition"
              >
                How it Works
              </a>
              <a
                href="#mcp"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border-[2px] border-white/30 bg-[#161616] hover:bg-[#2DD4BF] hover:text-black transition"
              >
                MCP & AI Skills
              </a>
              <a
                href="https://github.com/rselva1202/zeuralabz"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-[2px] border-white/30 bg-[#161616] hover:bg-[#2DD4BF] hover:text-black transition flex items-center justify-between"
              >
                <span>Star on GitHub</span>
                <span className="text-amber-400">★ {starCount}</span>
              </a>
            </nav>

            {/* Mobile Animation Mode Selector */}
            <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 font-bold uppercase">ANIMATIONS:</span>
              <div className="flex gap-1">
                {(['lite', 'full', 'off'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setAnimationMode(m)}
                    className={`px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[2px] ${
                      animationMode === m
                        ? 'bg-[#2DD4BF] text-black border-white shadow-[1px_1px_0px_#FFFFFF]'
                        : 'bg-black text-white border-zinc-700'
                    }`}
                  >
                    {m === 'full' ? 'FULL' : m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION (Minimal Neo-Brutalist, Clean, Whitespace) */}
      {/* ============================================================== */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white neo-dots overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto w-full max-w-full">
          {/* Top Row: Hero Headline & Minimal Single Telemetry Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full max-w-full">
            {/* Left Column: Headline, Subtitle, CTA Buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-6 w-full max-w-full min-w-0">
              {/* Plain Single Banner Line: NO floating stickers, NO rotated badges */}
              <div className="inline-block bg-[#161616] border-[2px] border-white px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase text-zinc-300 shadow-[2px_2px_0px_#2DD4BF]">
                <span className="text-[#2DD4BF] mr-2">●</span>
                NEW • ZEURALABZ 1.2 — 531 COMPONENTS
              </div>

              {/* Minimal Neo-Brutalist Headline */}
              <h1 className="font-heading text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.08] font-black tracking-tight text-white uppercase break-words hyphens-auto">
                BEAUTIFUL ANIMATED UI FOR WEBSITES THAT{' '}
                <span className="inline-block bg-[#2DD4BF] text-black px-3 py-1 border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] mt-2">
                  FEEL ALIVE.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#CCCCCC] font-normal max-w-2xl leading-relaxed">
                531 animated components and backgrounds for React across React Bits, Magic UI, Aceternity UI, and ZEURALABZ Originals. Tune them yourself, or hand them to your AI agent.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#components"
                  className="neo-btn bg-[#2DD4BF] text-black border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#14B8A6] px-6 py-3.5 text-xs sm:text-sm font-heading font-black tracking-wider text-center"
                >
                  BROWSE COMPONENTS ➔
                </a>
                <a
                  href="https://github.com/rselva1202/zeuralabz"
                  target="_blank"
                  rel="noreferrer"
                  className="neo-btn bg-[#161616] text-white border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] hover:bg-zinc-800 px-6 py-3.5 text-xs sm:text-sm font-heading font-black tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <span>STAR ON GITHUB</span>
                  <span className="text-amber-400">★</span>
                </a>
              </div>
            </div>

            {/* Right Column: ONE SINGLE Minimal Telemetry Box (5 cols) */}
            <div className="lg:col-span-5 w-full max-w-full">
              <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 sm:p-6 flex flex-col justify-between w-full max-w-full">
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#2A2A2A]">
                  <span className="font-heading text-xs font-black uppercase text-white tracking-wider">
                    LIBRARY TELEMETRY
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#2DD4BF]">
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                {/* Total stat row */}
                <div className="py-4 border-b border-[#2A2A2A] flex items-center justify-between">
                  <div>
                    <div className="font-heading text-4xl sm:text-5xl font-black text-white leading-none">
                      {totalAll}
                    </div>
                    <div className="text-[11px] font-mono text-[#CCCCCC] mt-1 uppercase tracking-wider">
                      TOTAL COMPONENTS CURATED
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-heading font-black uppercase bg-[#2DD4BF] text-black border border-white">
                    4 SOURCES
                  </span>
                </div>

                {/* 4 source stats: clean 2x2 grid, NO nested cards, NO inner borders, thin 1px divider */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="font-heading text-2xl font-black text-white">{totalReactBits}</div>
                    <div className="text-[11px] font-mono text-[#CCCCCC] mt-0.5">React Bits (Linked)</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl font-black text-white">{totalMagicUI}</div>
                    <div className="text-[11px] font-mono text-[#CCCCCC] mt-0.5">Magic UI (Linked)</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl font-black text-white">{totalAceternity}</div>
                    <div className="text-[11px] font-mono text-[#CCCCCC] mt-0.5">Aceternity UI (Linked)</div>
                  </div>
                  <div>
                    <div className="font-heading text-2xl font-black text-white">{totalZeura}</div>
                    <div className="text-[11px] font-mono text-[#CCCCCC] mt-0.5">ZEURALABZ Original</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Live Canvas Engine Box: 2px white border, 3px mint shadow */}
          <div className="mt-10 sm:mt-14 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] overflow-hidden w-full max-w-full">
            {/* Top Control Header: thin 1px bottom border, clean dark bg, no colored chunky bar */}
            <div className="border-b border-[#2A2A2A] bg-[#111111] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-heading text-xs font-black uppercase text-white tracking-wider">
                  CANVAS ENGINE: <span className="text-[#2DD4BF]">{activeEngine.toUpperCase()}</span>
                </span>
              </div>

              {/* Engine Switcher Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1">TRY ENGINE:</span>
                {(['aurora', 'galaxy', 'particles', 'gradient'] as const).map((eng) => (
                  <button
                    key={eng}
                    onClick={() => setActiveEngine(eng)}
                    className={`px-3 py-1 text-xs font-heading font-black uppercase transition border-[2px] ${
                      activeEngine === eng
                        ? 'bg-[#2DD4BF] text-black border-white shadow-[2px_2px_0px_#FFFFFF]'
                        : 'bg-[#161616] text-white border-white/60 hover:border-white hover:bg-zinc-800'
                    }`}
                  >
                    {eng}
                  </button>
                ))}
              </div>
            </div>

            {/* Framed Canvas Stage: Unobscured, responsive, 100% visible */}
            <div className="h-64 sm:h-96 w-full relative bg-[#0E0E0E] overflow-hidden">
              <LiveCanvas key={activeEngine} engine={activeEngine} lite={animationMode === 'lite'} />

              {/* Sleek Minimal Info Tag in bottom corner - doesn't block the canvas! */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 bg-black/85 backdrop-blur-md border border-white/30 px-3 py-2 text-left">
                <div className="text-[10px] font-mono font-bold text-[#2DD4BF] uppercase tracking-wider">
                  ● LIVE • {activeEngine.toUpperCase()}
                </div>
                <div className="font-heading text-xs sm:text-sm font-black text-white mt-0.5">
                  {activeEngine === 'aurora'
                    ? 'Northern Aurora Wave'
                    : activeEngine === 'galaxy'
                    ? 'Spiral Cosmic Galaxy'
                    : activeEngine === 'particles'
                    ? 'Interactive Particle Web'
                    : 'Mesh Gradient Drift'}
                </div>
              </div>

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                <button
                  onClick={() => copyCommand(`npx zeuralabz add ${activeEngine}`)}
                  className="bg-[#2DD4BF] text-black border-[2px] border-white px-3 py-1.5 text-xs font-mono font-black shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#14B8A6] transition"
                >
                  {copiedSlug === `npx zeuralabz add ${activeEngine}` ? '✔ COPIED' : `$ npx zeuralabz add ${activeEngine}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SHOWCASE PANEL (Hero.jsx + Terminal + Presets) */}
      {/* ============================================================== */}
      <section id="showcase" className="py-14 sm:py-20 border-b-[2px] border-white bg-[#111111] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="bg-[#2DD4BF] text-black border-[2px] border-white px-3 py-1 font-heading text-xs font-black uppercase shadow-[2px_2px_0px_#FFFFFF]">
              LIVE CODE SYNTHESIS
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white mt-3">
              ZERO BOILERPLATE. COPY & SHIP.
            </h2>
            <p className="text-[#CCCCCC] font-normal text-xs sm:text-sm mt-2">
              Every component works independently in standard React, Vite, or Next.js apps.
            </p>
          </div>

          {/* Minimal Multi-Window Container: 2px white border, 3px mint shadow */}
          <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] overflow-hidden w-full max-w-full">
            {/* Window Topbar */}
            <div className="py-2.5 px-4 bg-[#111111] border-b-[2px] border-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-heading text-xs font-black text-white ml-2">
                  ZEURALABZ-SHOWCASE-MATRIX.JSX
                </span>
              </div>
              <div className="text-[11px] font-mono font-bold text-white uppercase bg-black border border-white/40 px-2 py-0.5">
                REACT 19 + TAILWIND V4
              </div>
            </div>

            {/* Window Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-full min-w-0">
              {/* Left Code Editor (Hero.jsx) - 7 cols */}
              <div className="lg:col-span-7 p-4 sm:p-6 border-b-[2px] lg:border-b-0 lg:border-r-[2px] border-white font-mono text-xs flex flex-col justify-between bg-[#141414] min-w-0 max-w-full overflow-hidden">
                <div className="w-full max-w-full min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2A2A2A]">
                    <span className="font-heading text-white font-black flex items-center gap-1.5 text-xs">
                      <span className="text-[#2DD4BF]">⚛</span> Hero.jsx
                    </span>
                    <button
                      onClick={() => copyCommand(sampleHeroCode)}
                      className="neo-btn bg-[#2DD4BF] text-black border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] px-3 py-1 text-xs hover:bg-[#14B8A6]"
                    >
                      {copiedSlug === sampleHeroCode ? '✔ COPIED' : 'COPY CODE'}
                    </button>
                  </div>
                  <pre className="text-white overflow-x-auto leading-relaxed space-y-1 font-mono text-xs bg-[#0A0A0A] p-3 sm:p-4 border border-[#2A2A2A] max-w-full min-w-0">
                    {sampleHeroCode.split('\n').map((line, idx) => (
                      <div key={idx} className="flex min-w-0">
                        <span className="text-zinc-500 select-none w-6 sm:w-7 shrink-0 text-right pr-2 sm:pr-3 font-bold">{idx + 1}</span>
                        <span
                          className={
                            line.startsWith('import')
                              ? 'text-[#2DD4BF] font-bold'
                              : line.includes('<AuroraBackground') || line.includes('<SplitText') || line.includes('<ShimmerButton')
                              ? 'text-white font-black'
                              : line.includes('return') || line.includes('export')
                              ? 'text-cyan-400 font-bold'
                              : 'text-[#CCCCCC] font-normal'
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
              <div className="lg:col-span-5 flex flex-col divide-y-[2px] divide-white bg-[#161616] min-w-0 max-w-full">
                {/* Right Top: Terminal Window */}
                <div className="p-4 sm:p-5 font-mono text-xs bg-black text-white w-full max-w-full overflow-hidden">
                  <div className="font-heading text-[#2DD4BF] font-black mb-3 flex items-center gap-2 text-xs">
                    <span className="text-emerald-400">❯</span> TERMINAL WORKFLOW
                  </div>
                  <div className="space-y-1.5 bg-[#0D0D0D] p-3 sm:p-3.5 border border-[#2A2A2A] text-[11px] font-mono overflow-x-auto max-w-full">
                    <div className="text-[#2DD4BF] font-bold">$ npx zeuralabz suggest</div>
                    <div className="text-zinc-400">✓ Scanning project structure...</div>
                    <div className="text-emerald-400 font-bold">✓ Recommended 3 UI picks for your landing page:</div>
                    <div className="text-white pl-2">• Aurora Background [Mint Accent]</div>
                    <div className="text-white pl-2">• Split Text Stagger [White Accent]</div>
                    <div className="text-white pl-2">• Shimmer Button [Teal Accent]</div>
                    <div className="text-[#2DD4BF] mt-2 font-bold">$ npx zeuralabz add aurora</div>
                    <div className="text-zinc-400">✔ Installed into src/components/zeuralabz/aurora</div>
                  </div>
                </div>

                {/* Right Bottom: Presets Window */}
                <div className="p-4 sm:p-5 bg-[#141414] w-full max-w-full">
                  <div className="font-heading text-xs font-black text-white mb-3 flex items-center justify-between uppercase">
                    <span>Aesthetic Tuning:</span>
                    <span className="bg-[#2DD4BF] text-black px-1.5 py-0.5 border border-white text-[10px] font-bold">LIVE TUNE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-full">
                    {[
                      { id: 'dark-neon', name: 'Dark Mint', colors: 'Mint + Teal' },
                      { id: 'ocean', name: 'Ocean Surge', colors: 'Deep Aqua' },
                      { id: 'dune', name: 'Cyber Indigo', colors: 'Night Sky' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setActivePreset(preset.id as any)}
                        className={`p-2.5 text-left border-[2px] transition ${
                          activePreset === preset.id
                            ? 'bg-[#2DD4BF] text-black border-white shadow-[2px_2px_0px_#FFFFFF] font-black'
                            : 'bg-[#161616] text-white border-white/60 hover:bg-zinc-800 font-bold'
                        }`}
                      >
                        <div className="text-xs font-heading font-black uppercase">{preset.name}</div>
                        <div className="text-[10px] text-[#CCCCCC] mt-1">{preset.colors}</div>
                      </button>
                    ))}
                  </div>

                  {/* Preset Values Panel */}
                  <div className="mt-3 p-3 bg-[#0A0A0A] border border-[#2A2A2A] text-[11px] font-mono text-white font-bold space-y-1 shadow-[2px_2px_0px_#2DD4BF]">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Amplitude:</span>
                      <span className="text-[#2DD4BF]">
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
      <section id="components" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between border-b-[2px] border-white pb-6 w-full max-w-full">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">Component Catalog</h2>
            <p className="text-xs text-[#CCCCCC] font-normal mt-1">
              Every component rendered live with responsive code tabs and single-command installation.
            </p>
          </div>

          {/* Neo Search bar: 2px white border, 3px mint shadow */}
          <div className="relative w-full md:w-80 lg:w-96">
            <input
              type="text"
              placeholder="Search components (e.g. aurora, bento, button)..."
              value={rawSearchQuery}
              onChange={(e) => setRawSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] text-xs font-bold text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#2DD4BF] transition max-w-full"
            />
            {rawSearchQuery && (
              <button
                onClick={() => {
                  setRawSearchQuery('');
                  setCurrentPage(1);
                  setIsAppendMode(false);
                }}
                className="absolute right-3 top-2.5 sm:top-3 text-[#2DD4BF] font-heading font-black text-xs hover:text-white"
              >
                ✕ CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Source Filter Row */}
        <div className="flex flex-wrap items-center gap-2 pt-4 sm:pt-6 pb-2 border-t border-[#2A2A2A] w-full max-w-full">
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
              className={`px-3 py-1.5 text-xs font-heading font-black uppercase transition border-[2px] border-white ${
                selectedSource === src.id
                  ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-[#161616] text-white hover:bg-zinc-800 shadow-[2px_2px_0px_#2DD4BF]'
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
                  ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF]'
                  : 'bg-[#161616] text-white hover:bg-zinc-800 shadow-[2px_2px_0px_#2DD4BF]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
          <span className="ml-auto shrink-0 font-heading text-xs font-black uppercase bg-black text-[#2DD4BF] px-2.5 py-1 border border-white/40 shadow-[2px_2px_0px_#2DD4BF]">
            SHOWING {filteredComponents.length} OF {totalAll}
          </span>
        </div>

        {/* Second Row: Format selector */}
        <div className="mt-2 mb-6 sm:mb-8 p-3 sm:p-3.5 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs w-full max-w-full">
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
                    ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF] font-black'
                    : 'bg-[#111111] text-white hover:bg-zinc-800'
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
          <div className="text-center py-16 sm:py-24 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 sm:p-8 w-full max-w-full">
            <p className="font-heading text-lg sm:text-xl font-black text-white">NO COMPONENTS MATCHED "{rawSearchQuery}"</p>
            <p className="text-xs text-[#CCCCCC] font-normal mt-1">Try searching for keywords like aurora, bento, card, or button.</p>
            <button
              onClick={() => {
                setRawSearchQuery('');
                setSelectedCategory('all');
                setSelectedSource('all');
                setCurrentPage(1);
                setIsAppendMode(false);
              }}
              className="mt-4 neo-btn bg-[#2DD4BF] text-black px-4 py-2 text-xs border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#14B8A6]"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full">
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
            <div className="mt-8 sm:mt-12 p-4 sm:p-5 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] flex flex-col gap-4 text-white w-full max-w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-white font-heading font-black uppercase">
                  {isAppendMode ? (
                    <>
                      SHOWING 1–
                      <span className="bg-[#2DD4BF] text-black px-1 border border-black">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)}
                      </span>{' '}
                      OF{' '}
                      <span className="bg-[#2DD4BF] text-black px-1 border border-black">{filteredComponents.length}</span>{' '}
                      COMPONENTS (PAGES 1–{currentPage} OF {totalPages})
                    </>
                  ) : (
                    <>
                      SHOWING{' '}
                      <span className="bg-[#2DD4BF] text-black px-1 border border-black">
                        {filteredComponents.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                      </span>
                      –
                      <span className="bg-[#2DD4BF] text-black px-1 border border-black">
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)}
                      </span>{' '}
                      OF{' '}
                      <span className="bg-[#2DD4BF] text-black px-1 border border-black">{filteredComponents.length}</span>{' '}
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
                      className="neo-btn bg-[#2DD4BF] text-black px-3 sm:px-4 py-2 text-xs font-heading font-black flex items-center gap-1.5 border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#14B8A6]"
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
                      className="neo-btn bg-white text-black px-3 py-2 text-xs font-heading font-black border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF]"
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
                      className="neo-btn bg-white text-black px-3 py-2 text-xs font-heading font-black border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF]"
                    >
                      FIRST 12
                    </button>
                  )}
                </div>
              </div>

              {/* Numeric Page Buttons [PREV] [1] [2] [3] ... [NEXT] */}
              {totalPages > 1 && (
                <div className="pt-4 border-t border-[#2A2A2A] flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
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
                        : 'bg-white text-black hover:bg-[#2DD4BF] hover:text-black shadow-[2px_2px_0px_#2DD4BF] active:translate-x-0.5 active:translate-y-0.5'
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
                            ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF] -translate-x-0.5 -translate-y-0.5'
                            : 'bg-[#141414] text-white hover:bg-zinc-800 shadow-[2px_2px_0px_#2DD4BF]'
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
                        : 'bg-white text-black hover:bg-[#2DD4BF] hover:text-black shadow-[2px_2px_0px_#2DD4BF] active:translate-x-0.5 active:translate-y-0.5'
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
      <section id="how-it-works" className="py-14 sm:py-20 border-t-[2px] border-b-[2px] border-white bg-[#111111] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="bg-[#2DD4BF] text-black border-[2px] border-white px-3 py-1 font-heading text-xs font-black uppercase shadow-[2px_2px_0px_#FFFFFF]">
              AUTONOMOUS WORKFLOW
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white mt-3">
              HOW ZEURALABZ SUGGEST WORKS
            </h2>
            <p className="text-[#CCCCCC] font-normal text-xs sm:text-sm mt-2">
              No manual hunting. Let the heuristic analyzer inspect your repo and recommend the 1 best match per section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full">
            <div className="p-5 sm:p-6 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] text-left w-full max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2DD4BF] border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] text-black flex items-center justify-center font-heading font-black text-base sm:text-lg mb-4">
                01
              </div>
              <h3 className="font-heading text-base font-black text-white mb-2 uppercase">Scan Your Project</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed">
                Run <code className="bg-[#0A0A0A] border border-white/40 px-1 py-0.5 font-mono text-[#2DD4BF]">npx zeuralabz suggest</code> in any React, Next.js, or Vite workspace.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] text-left w-full max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2DD4BF] border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] text-black flex items-center justify-center font-heading font-black text-base sm:text-lg mb-4">
                02
              </div>
              <h3 className="font-heading text-base font-black text-white mb-2 uppercase">Curated 1-Best-Pick</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed">
                ZEURALABZ determines your product persona (SaaS, Portfolio, Dashboard) and selects exactly 1 ideal component per section with reasoning.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] text-left w-full max-w-full">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2DD4BF] border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] text-black flex items-center justify-center font-heading font-black text-base sm:text-lg mb-4">
                03
              </div>
              <h3 className="font-heading text-base font-black text-white mb-2 uppercase">Direct Local Code</h3>
              <p className="text-xs text-[#CCCCCC] font-normal leading-relaxed">
                Components install straight into your <code className="bg-[#0A0A0A] border border-white/40 px-1 py-0.5 font-mono text-[#2DD4BF]">src/components/</code> directory. Zero lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tool Integration Cards */}
      <section id="mcp" className="py-14 sm:py-20 border-b-[2px] border-white bg-[#0E0E0E] w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full max-w-full">
          <span className="bg-[#2DD4BF] text-black border-[2px] border-white px-3 py-1 font-heading text-xs font-black uppercase shadow-[2px_2px_0px_#FFFFFF]">
            MODEL CONTEXT PROTOCOL & SKILLS
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-white mt-3 mb-4">
            INSTALL IN YOUR AI WORKSPACE
          </h2>
          <p className="text-[#CCCCCC] font-normal text-xs sm:text-sm max-w-xl mx-auto mb-8 sm:mb-12">
            Native MCP tools and skills for Claude Code, Cursor, Windsurf, and Google Antigravity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-full">
            <div className="p-5 sm:p-6 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] flex flex-col justify-between w-full max-w-full">
              <div>
                <span className="bg-[#2DD4BF] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-white">
                  Claude Code / Desktop
                </span>
                <p className="text-xs text-[#CCCCCC] font-normal mt-3">
                  Add the ZEURALABZ MCP server to enable autonomous design reviews and component installations.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border border-white/40 text-[11px] font-mono text-[#2DD4BF] overflow-x-auto shadow-[2px_2px_0px_#2DD4BF] max-w-full">
{`"zeuralabz": {
  "command": "node",
  "args": ["mcp-server/index.js"]
}`}
              </pre>
            </div>

            <div className="p-5 sm:p-6 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] flex flex-col justify-between w-full max-w-full">
              <div>
                <span className="bg-[#2DD4BF] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-white">
                  Antigravity / Gemini
                </span>
                <p className="text-xs text-[#CCCCCC] font-normal mt-3">
                  Drop <code className="bg-[#0A0A0A] border border-white/40 px-1 text-[#2DD4BF]">SKILL.md</code> into your skills folder to activate intelligent UI recommendations.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border border-white/40 text-[11px] font-mono text-emerald-400 overflow-x-auto shadow-[2px_2px_0px_#2DD4BF] max-w-full">
{`// Tell Antigravity:
"Use ZEURALABZ to analyze my site
and install the best hero"`}
              </pre>
            </div>

            <div className="p-5 sm:p-6 bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] flex flex-col justify-between w-full max-w-full">
              <div>
                <span className="bg-[#2DD4BF] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-white">
                  Cursor & Windsurf
                </span>
                <p className="text-xs text-[#CCCCCC] font-normal mt-3">
                  Connect via MCP server settings and query components straight from chat with <code className="bg-[#0A0A0A] border border-white/40 px-1 text-[#2DD4BF]">@zeuralabz</code>.
                </p>
              </div>
              <pre className="mt-4 p-3 bg-black border border-white/40 text-[11px] font-mono text-[#2DD4BF] overflow-x-auto shadow-[2px_2px_0px_#2DD4BF] max-w-full">
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
          <div className="w-full max-w-3xl bg-[#161616] border-[2px] border-white shadow-[4px_4px_0px_#2DD4BF] overflow-hidden flex flex-col max-h-[90vh] mx-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#2DD4BF] border-b-[2px] border-white flex items-center justify-between text-black">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading text-lg sm:text-xl font-black text-black uppercase truncate">{selectedComponent.name}</h3>
                  <span
                    className="px-2 py-0.5 text-[10px] font-heading font-black uppercase border border-black bg-black text-white shrink-0"
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
                <p className="text-xs text-black/80 font-mono font-bold mt-1 truncate">
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
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black text-white hover:bg-zinc-800 font-heading font-black text-sm flex items-center justify-center border border-white shadow-[2px_2px_0px_#000] transition shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex border-b-[2px] border-white px-4 sm:px-6 pt-3 bg-[#111111] gap-2 sm:gap-3 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setActiveTab('react')}
                className={`pb-2 px-3 sm:px-4 transition border-[2px] border-white font-heading font-black uppercase shrink-0 ${
                  activeTab === 'react'
                    ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF]'
                    : 'bg-[#161616] text-white hover:bg-zinc-800'
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
                        ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF]'
                        : 'bg-[#161616] text-white hover:bg-zinc-800'
                    }`}
                  >
                    Pure HTML
                  </button>
                  <button
                    onClick={() => setActiveTab('css')}
                    className={`pb-2 px-3 sm:px-4 transition border-[2px] border-white font-heading font-black uppercase shrink-0 ${
                      activeTab === 'css'
                        ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF]'
                        : 'bg-[#161616] text-white hover:bg-zinc-800'
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
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2 p-3 sm:p-3.5 bg-black text-[#2DD4BF] border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF]">
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
                      selectedComponent.source === 'react-bits'
                        ? `npx zeuralabz add ${selectedComponent.slug} --source react-bits`
                        : selectedComponent.source === 'magic-ui'
                        ? `npx zeuralabz add ${selectedComponent.slug} --source magic-ui`
                        : selectedComponent.source === 'aceternity'
                        ? `npx zeuralabz add ${selectedComponent.slug} --source aceternity`
                        : `npx zeuralabz add ${selectedComponent.slug}`
                    )
                  }
                  className="bg-[#2DD4BF] text-black font-heading font-black px-2.5 py-1 text-xs hover:bg-[#14B8A6] border border-white shrink-0"
                >
                  {copiedSlug ? '✔ COPIED' : 'COPY'}
                </button>
              </div>

              {/* Source-specific Direct shadcn Command */}
              {selectedComponent.source === 'react-bits' && selectedComponent.installCommand && (
                <div className="p-3 bg-black/60 border border-zinc-700 text-zinc-300">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Direct official registry command:</div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[#2DD4BF] text-[11px] truncate">{selectedComponent.installCommand}</code>
                    <button
                      onClick={() => copyCommand(selectedComponent.installCommand!)}
                      className="px-2 py-0.5 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600 text-[10px] shrink-0"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              )}

              {selectedComponent.source === 'magic-ui' && (
                <div className="p-3 bg-black/60 border border-zinc-700 text-zinc-300">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Direct official Magic UI command:</div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[#2DD4BF] text-[11px] truncate">
                      npx shadcn@latest add "https://magicui.design/r/{selectedComponent.slug}.json"
                    </code>
                    <button
                      onClick={() => copyCommand(`npx shadcn@latest add "https://magicui.design/r/${selectedComponent.slug}.json"`)}
                      className="px-2 py-0.5 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600 text-[10px] shrink-0"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              )}

              {selectedComponent.source === 'aceternity' && (
                <div className="p-3 bg-black/60 border border-zinc-700 text-zinc-300">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Direct official Aceternity UI command:</div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[#2DD4BF] text-[11px] truncate">
                      npx shadcn@latest add "https://ui.aceternity.com/r/{selectedComponent.slug}.json"
                    </code>
                    <button
                      onClick={() => copyCommand(`npx shadcn@latest add "https://ui.aceternity.com/r/${selectedComponent.slug}.json"`)}
                      className="px-2 py-0.5 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-600 text-[10px] shrink-0"
                    >
                      COPY
                    </button>
                  </div>
                </div>
              )}

              {/* Code display */}
              {activeTab === 'react' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                    <span>// Example usage in your React / Next.js app:</span>
                    <button
                      onClick={() =>
                        copyCommand(`import { ${selectedComponent.componentName || selectedComponent.name.replace(/\\s+/g, '')} } from '@/components/zeuralabz/${selectedComponent.slug}';

export default function Demo() {
  return (
    <div className="p-8">
      <${selectedComponent.componentName || selectedComponent.name.replace(/\\s+/g, '')} />
    </div>
  );
}`)
                      }
                      className="text-[#2DD4BF] hover:underline"
                    >
                      Copy Usage
                    </button>
                  </div>
                  <pre className="p-4 bg-black border border-zinc-700 text-zinc-200 overflow-x-auto leading-relaxed">
{`import { ${selectedComponent.componentName || selectedComponent.name.replace(/\\s+/g, '')} } from '@/components/zeuralabz/${selectedComponent.slug}';

export default function Demo() {
  return (
    <div className="p-8 flex items-center justify-center min-h-[300px]">
      <${selectedComponent.componentName || selectedComponent.name.replace(/\\s+/g, '')} />
    </div>
  );
}`}
                  </pre>
                </div>
              )}

              {activeTab === 'html' && (
                <div className="space-y-2">
                  <span className="text-zinc-400 text-[11px]">// Pure Semantic HTML representation:</span>
                  <pre className="p-4 bg-black border border-zinc-700 text-zinc-200 overflow-x-auto leading-relaxed">
{`<!-- ZEURALABZ: ${selectedComponent.name} -->
<div class="zeura-${selectedComponent.slug}" role="region" aria-label="${selectedComponent.name}">
  <div class="zeura-content">
    <h3>${selectedComponent.name}</h3>
    <p>${selectedComponent.description}</p>
  </div>
</div>`}
                  </pre>
                </div>
              )}

              {activeTab === 'css' && (
                <div className="space-y-2">
                  <span className="text-zinc-400 text-[11px]">// Standard CSS Variables & Theme Classes:</span>
                  <pre className="p-4 bg-black border border-zinc-700 text-zinc-200 overflow-x-auto leading-relaxed">
{`.zeura-${selectedComponent.slug} {
  --zeura-accent: #2DD4BF;
  --zeura-bg: #0E0E0E;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFFFFF;
  box-shadow: 3px 3px 0px #2DD4BF;
  background-color: #161616;
  color: #FFF;
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t-[2px] border-white bg-[#111111] flex justify-end">
              <button
                onClick={() => setSelectedComponent(null)}
                className="neo-btn bg-[#2DD4BF] text-black px-5 py-2 text-xs font-heading font-black hover:bg-[#14B8A6] border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 8. FOOTER (Black bg, 2px mint top border, MIT attribution) */}
      {/* ============================================================== */}
      <footer className="border-t-[2px] border-[#2DD4BF] bg-black text-white py-12 px-4 sm:px-6 lg:px-8 text-xs w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left w-full max-w-full">
          <div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <span className="w-6 h-6 bg-[#2DD4BF] border border-white flex items-center justify-center font-heading text-xs font-black text-black">
                Z
              </span>
              <span className="font-heading font-black text-white text-base tracking-tight">
                ZEURALABZ
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-medium text-zinc-400">
                {totalAll} animated components ({totalReactBits} React Bits + {totalMagicUI} Magic UI + {totalAceternity} Aceternity + {totalZeura} Originals)
              </span>
            </div>
            <div className="mt-2 text-[#CCCCCC] font-normal">
              Crafted with care by{' '}
              <a href="https://github.com/rselva1202" target="_blank" rel="noreferrer" className="text-[#2DD4BF] font-bold hover:underline">
                R. Selva
              </a>
              . Distributed under MIT License. Sources: React Bits (David Haz, MIT + Commons), Magic UI (Dillion Verma, MIT), & Aceternity UI (Manu Arora, MIT).
            </div>
          </div>

          <div className="flex flex-wrap gap-4 font-heading font-black uppercase text-xs justify-center sm:justify-end">
            <a href="https://github.com/rselva1202/zeuralabz" className="text-white hover:text-[#2DD4BF] transition">GitHub</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/ATTRIBUTION.md" className="text-white hover:text-[#2DD4BF] transition">Attribution</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md" className="text-white hover:text-[#2DD4BF] transition">Installation</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/HOW-IT-WORKS.md" className="text-white hover:text-[#2DD4BF] transition">Architecture</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/SKILL.md" className="text-white hover:text-[#2DD4BF] transition">AI Skill</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
