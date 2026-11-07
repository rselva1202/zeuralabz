import React, { useState, useEffect, useMemo } from 'react';
import componentsData from './data/components.json';
import themesData from './data/themes.json';
import { LiveComponentPreview } from './components/LiveComponentPreview';

interface ComponentItem {
  id: string;
  name: string;
  slug: string;
  componentName: string;
  category: string;
  description: string;
  tags: string[];
  bestFor: string[];
  deps: string[];
  files: string[];
  previewUrl: string;
  theme: string;
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
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('typescript');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
  const [activeTab, setActiveTab] = useState<'react' | 'html' | 'css'>('react');
  const [heroBg, setHeroBg] = useState<'aurora' | 'galaxy' | 'particles' | 'gradient'>('aurora');
  const [activePreset, setActivePreset] = useState<'dark-neon' | 'ocean' | 'dune'>('dark-neon');
  const [starCount, setStarCount] = useState<number>(48);

  // Fetch real GitHub star count
  useEffect(() => {
    fetch('https://api.github.com/repos/rselva1202/vibe-ui')
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  const filteredComponents = useMemo(() => {
    return (componentsData as ComponentItem[]).filter((c) => {
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlug(text);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const sampleHeroCode = `import { AuroraBackground } from '@vibe-ui/aurora';
import { SplitText } from '@vibe-ui/split-text';
import { ShimmerButton } from '@vibe-ui/shimmer';

export default function Hero() {
  return (
    <AuroraBackground className="min-h-screen flex flex-col items-center justify-center">
      <SplitText text="Websites that feel alive" className="text-6xl font-bold" />
      <p className="mt-4 text-zinc-400">120 components. 1M+ combinations.</p>
      <ShimmerButton text="Explore Catalog ➔" className="mt-8" />
    </AuroraBackground>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP NAVBAR (Sticky, dark, blur) */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-sm shadow-lg shadow-indigo-500/25">
                ✨
              </span>
              <span className="text-xl font-black tracking-tight text-white">
                Vibe<span className="text-indigo-400">UI</span>
              </span>
            </a>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-900 text-zinc-400 border border-zinc-800">
              v1.0.0 • Open Source
            </span>
          </div>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
            <a href="#hero" className="hover:text-white transition">Showcase</a>
            <a href="#components" className="hover:text-white transition">Components</a>
            <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
            <a href="#mcp" className="hover:text-white transition">MCP & Skill</a>
            <a href="https://github.com/rselva1202/vibe-ui/blob/main/docs/INSTALL.md" target="_blank" rel="noreferrer" className="hover:text-white transition">Docs</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* GitHub Stars Button */}
            <a
              href="https://github.com/rselva1202/vibe-ui"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 transition"
            >
              <span>GitHub</span>
              <span className="text-amber-400">★</span>
              <span className="text-zinc-500 text-[11px]">{starCount}</span>
            </a>

            {/* CLI Suggest CTA */}
            <button
              onClick={() => copyCommand('npx vibe-ui suggest')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md shadow-indigo-600/30"
              title="Click to copy suggestion command"
            >
              <span>$ npx vibe-ui suggest</span>
              <span className="text-[10px] bg-indigo-700/80 px-1.5 py-0.5 rounded font-sans uppercase">
                {copiedSlug === 'npx vibe-ui suggest' ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (Full width, LIVE background) */}
      <section id="hero" className="relative pt-16 pb-20 overflow-hidden border-b border-zinc-800/80">
        {/* Dynamic LIVE Background Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          {heroBg === 'aurora' && (
            <div className="absolute inset-0 opacity-40 blur-3xl overflow-hidden">
              <div className={`w-[140%] h-[150%] -top-1/4 -left-1/4 absolute rounded-full ${
                activePreset === 'ocean' ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-800' :
                activePreset === 'dune' ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-rose-700' :
                'bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600'
              } animate-pulse transform rotate-6 scale-110`} />
            </div>
          )}
          {heroBg === 'galaxy' && (
            <div className="absolute inset-0 opacity-40 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl animate-spin duration-1000" />
            </div>
          )}
          {heroBg === 'particles' && (
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-cyan-400 blur-[2px] animate-bounce" />
              <div className="absolute top-1/2 left-2/3 w-4 h-4 rounded-full bg-indigo-400 blur-[2px] animate-pulse" />
              <div className="absolute top-3/4 left-1/4 w-3 h-3 rounded-full bg-purple-400 blur-[2px] animate-ping" />
            </div>
          )}
          {heroBg === 'gradient' && (
            <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-indigo-900/40 via-purple-900/30 to-black" />
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_80%)]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill & Background Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              New • VibeUI 1.0 — 120 components, 1M+ combinations
            </div>

            {/* Live background switcher */}
            <div className="flex items-center gap-1.5 bg-black/80 border border-zinc-800 p-1 rounded-xl text-xs backdrop-blur-md">
              <span className="text-zinc-500 px-2 text-[11px] font-medium">Try background:</span>
              {(['aurora', 'galaxy', 'particles', 'gradient'] as const).map((bg) => (
                <button
                  key={bg}
                  onClick={() => setHeroBg(bg)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition text-xs font-medium ${
                    heroBg === bg
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Main Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column (60% / 7 cols) */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-2xl">
                Beautiful animated UI for websites that <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">feel alive</span>.
              </h1>
              <p className="mt-5 text-lg text-zinc-400 max-w-xl font-light leading-relaxed">
                120 animated components and backgrounds for React. Tune them yourself, or hand them to your AI agent.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#components"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-sm transition flex items-center gap-2 shadow-lg shadow-white/10"
                >
                  Browse components <span className="text-indigo-600">➔</span>
                </a>
                <a
                  href="https://github.com/rselva1202/vibe-ui"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold text-sm transition flex items-center gap-2"
                >
                  <span>Star on GitHub</span>
                  <span className="text-amber-400">★</span>
                </a>
              </div>
            </div>

            {/* Right Column Stats Box (40% / 5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl shadow-2xl grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                  <div className="text-3xl font-black text-white">120+</div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">Base Components</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                  <div className="text-3xl font-black text-indigo-400">20</div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">Aesthetic Themes</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                  <div className="text-3xl font-black text-cyan-400">1M+</div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">Combinations</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
                  <div className="text-3xl font-black text-emerald-400">100%</div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">Free & Open Source</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. SHOWCASE PANEL (Hero.jsx + Terminal + Presets) */}
          <div className="mt-14 rounded-2xl bg-[#111111] border border-zinc-800 shadow-2xl overflow-hidden">
            {/* Window Topbar */}
            <div className="h-11 px-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-zinc-400 ml-2">vibe-ui-showcase-matrix</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500">Live Preview & Code Synthesizer</div>
            </div>

            {/* Window Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Code Editor (Hero.jsx) - 7 cols */}
              <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-zinc-800 font-mono text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/60">
                    <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
                      <span className="text-cyan-400">⚛</span> Hero.jsx
                    </span>
                    <button
                      onClick={() => copyCommand(sampleHeroCode)}
                      className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition"
                    >
                      {copiedSlug === sampleHeroCode ? '✔ Copied Code' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-zinc-300 overflow-x-auto leading-relaxed space-y-1">
                    {sampleHeroCode.split('\n').map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="text-zinc-600 select-none w-7 shrink-0 text-right pr-3">{idx + 1}</span>
                        <span className={
                          line.startsWith('import') ? 'text-indigo-400' :
                          line.includes('<AuroraBackground') || line.includes('<SplitText') || line.includes('<ShimmerButton') ? 'text-cyan-300 font-bold' :
                          line.includes('return') || line.includes('export') ? 'text-purple-400' : 'text-zinc-300'
                        }>
                          {line}
                        </span>
                      </div>
                    ))}
                  </pre>
                </div>
              </div>

              {/* Right Side: Terminal (top) + Presets (bottom) - 5 cols */}
              <div className="lg:col-span-5 flex flex-col divide-y divide-zinc-800 bg-[#0d0d0d]">
                {/* Right Top: Terminal Window */}
                <div className="p-5 font-mono text-xs">
                  <div className="text-zinc-400 font-semibold mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">❯</span> Terminal
                  </div>
                  <div className="space-y-1.5 text-zinc-300 bg-black/70 p-3.5 rounded-xl border border-zinc-800">
                    <div className="text-indigo-400">$ npx vibe-ui suggest</div>
                    <div className="text-zinc-400 text-[11px]">✓ Scanning project structure...</div>
                    <div className="text-emerald-400 text-[11px]">✓ Found 3 best components for your landing page:</div>
                    <div className="text-zinc-400 pl-3 text-[11px]">• Aurora Background</div>
                    <div className="text-zinc-400 pl-3 text-[11px]">• Split Character Hero</div>
                    <div className="text-zinc-400 pl-3 text-[11px]">• Frosted Glass Card</div>
                    <div className="text-cyan-400 mt-2 text-[11px]">$ npx vibe-ui add aurora</div>
                    <div className="text-zinc-500 text-[10px]">✔ Installed into src/components/vibe-ui/aurora</div>
                  </div>
                </div>

                {/* Right Bottom: Presets Window */}
                <div className="p-5">
                  <div className="text-xs font-semibold text-zinc-400 mb-3 flex items-center justify-between">
                    <span>Aesthetic Presets:</span>
                    <span className="text-[11px] text-zinc-500 font-mono">Live Tune</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dark-neon', name: 'Dark Neon', colors: 'Emerald + Cyan' },
                      { id: 'ocean', name: 'Ocean', colors: 'Bioluminescent Aqua' },
                      { id: 'dune', name: 'Dune Sunset', colors: 'Solar Amber Flare' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setActivePreset(preset.id as any)}
                        className={`p-2.5 rounded-xl text-left border transition ${
                          activePreset === preset.id
                            ? 'bg-indigo-950/80 border-indigo-500 shadow-md'
                            : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{preset.name}</div>
                        <div className="text-[10px] text-zinc-400 mt-1">{preset.colors}</div>
                      </button>
                    ))}
                  </div>

                  {/* Preset Values Panel */}
                  <div className="mt-3 p-3 rounded-xl bg-black/50 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Amplitude:</span>
                      <span className="text-cyan-400">{activePreset === 'ocean' ? '0.82 (Deep Surge)' : activePreset === 'dune' ? '0.64 (Warm Drift)' : '0.95 (High Energy)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cycle Speed:</span>
                      <span className="text-indigo-400">{activePreset === 'ocean' ? '12s smooth' : activePreset === 'dune' ? '18s relaxed' : '15s kinetic'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE THE LIBRARY SECTION */}
      <section id="components" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between border-b border-zinc-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Component Catalog</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Every component rendered live with responsive code tabs and single-command installation.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search components (e.g. aurora, shimmer, tilt)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-zinc-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 text-xs no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full capitalize shrink-0 font-medium transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
          <span className="text-zinc-500 ml-auto shrink-0 text-xs font-mono font-medium">
            Showing {filteredComponents.length} components
          </span>
        </div>

        {/* Second Row: "Install the source you need" */}
        <div className="mt-2 mb-8 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-zinc-400 font-medium">Install the source you need:</span>
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
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                  selectedFormat === fmt.id
                    ? 'bg-zinc-800 border-indigo-500 text-white shadow-sm'
                    : 'bg-black/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {fmt.label} <span className="text-zinc-500 text-[10px]">({fmt.ext})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. COMPONENT GRID WITH LIVE PREVIEWS */}
        {filteredComponents.length === 0 ? (
          <div className="text-center py-24 text-zinc-500">
            <p className="text-base">No components matched "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((comp) => {
              const isCopied = copiedSlug === comp.slug;
              return (
                <div
                  key={comp.id}
                  className="group rounded-2xl bg-[#141414] border border-zinc-800 hover:border-zinc-600 transition duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
                >
                  {/* Top 45%: LIVE COMPONENT RENDER */}
                  <div className="h-48 bg-black relative flex items-center justify-center overflow-hidden border-b border-zinc-800/80">
                    <LiveComponentPreview slug={comp.slug} category={comp.category} name={comp.name} />

                    {/* Category pill */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-black/70 text-zinc-300 border border-zinc-700/80 backdrop-blur-md">
                      {comp.category}
                    </span>

                    {/* Live Preview indicator */}
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Preview
                    </span>
                  </div>

                  {/* Middle: Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition">
                          {comp.name}
                        </h3>
                        <span className="text-[11px] text-zinc-500 font-mono">{comp.slug}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-light">
                        {comp.description}
                      </p>

                      {/* Best for tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {comp.bestFor?.slice(0, 3).map((b) => (
                          <span
                            key={b}
                            className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800"
                          >
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => copyCommand(`npx vibe-ui add ${comp.slug}`)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-medium transition flex items-center justify-center gap-1.5 ${
                          isCopied
                            ? 'bg-emerald-500 text-black font-bold'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                        }`}
                      >
                        {isCopied ? (
                          '✔ Copied to clipboard!'
                        ) : (
                          <>
                            <span className="text-zinc-500">$</span> npx vibe-ui add {comp.slug}
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedComponent(comp)}
                        className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-medium transition"
                        title="View code & usage"
                      >
                        Code ➔
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. BOTTOM SECTIONS: HOW IT WORKS & AI INTEGRATION */}
      <section id="how-it-works" className="py-20 border-t border-zinc-800/80 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Autonomous Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">How VibeUI Suggest Works</h2>
            <p className="text-zinc-400 text-sm mt-3">
              No manual hunting. Let the heuristic analyzer inspect your repo and recommend the 1 best match per section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-black border border-zinc-800 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Scan Your Project</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Run <code className="text-indigo-300 bg-zinc-900 px-1 py-0.5 rounded font-mono">npx vibe-ui suggest</code> in any React, Next.js, or Vite workspace.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-zinc-800 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Curated 1-Best-Pick</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                VibeUI determines your product persona (SaaS, Portfolio, Dashboard) and selects exactly 1 ideal component for each part with why explanations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black border border-zinc-800 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Direct Local Code</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Source files copy straight into your <code className="text-indigo-300 bg-zinc-900 px-1 py-0.5 rounded font-mono">src/components/vibe-ui/</code> folder. Zero npm dependency lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tool Integration Cards */}
      <section id="mcp" className="py-20 border-t border-zinc-800/80 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Model Context Protocol</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-4">Install in your AI Workspace</h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-12">
            Native MCP tools and skills for Claude Code, Cursor, Windsurf, and Google Antigravity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400">Claude Code / Desktop</span>
                <p className="text-xs text-zinc-400 mt-2">
                  Add the VibeUI MCP server to enable autonomous design reviews and component installations.
                </p>
              </div>
              <pre className="mt-4 p-3 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto">
{`"vibe-ui": {
  "command": "node",
  "args": ["mcp-server/index.js"]
}`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400">Antigravity / Gemini</span>
                <p className="text-xs text-zinc-400 mt-2">
                  Drop <code className="text-white">SKILL.md</code> into your skills folder to activate intelligent UI recommendations.
                </p>
              </div>
              <pre className="mt-4 p-3 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto">
{`// Tell Antigravity:
"Use VibeUI to analyze my site
and install the best hero"`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400">Cursor & Windsurf</span>
                <p className="text-xs text-zinc-400 mt-2">
                  Connect via MCP server settings and query components straight from chat with <code className="text-white">@vibe-ui</code>.
                </p>
              </div>
              <pre className="mt-4 p-3 rounded-xl bg-black border border-zinc-800 text-[11px] font-mono text-zinc-300 overflow-x-auto">
{`@vibe-ui suggest
@vibe-ui install aurora`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Code Modal with Preview / React / HTML+CSS Tabs */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedComponent.name}</h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">components/{selectedComponent.category}/{selectedComponent.slug}</p>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex border-b border-zinc-800 px-6 pt-2 bg-zinc-900/50 gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTab('react')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'react' ? 'border-indigo-500 text-white font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                React (TypeScript)
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'html' ? 'border-indigo-500 text-white font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Pure HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`pb-2.5 transition border-b-2 ${
                  activeTab === 'css' ? 'border-indigo-500 text-white font-bold' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Pure CSS
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black border border-zinc-800 text-indigo-400">
                <span>npx vibe-ui add {selectedComponent.slug}</span>
                <button
                  onClick={() => copyCommand(`npx vibe-ui add ${selectedComponent.slug}`)}
                  className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-white text-[11px]"
                >
                  {copiedSlug === `npx vibe-ui add ${selectedComponent.slug}` ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {activeTab === 'react' && (
                <div>
                  <span className="text-zinc-500 block mb-1 font-sans">React Usage:</span>
                  <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-zinc-300 overflow-x-auto leading-relaxed">
{`import { ${selectedComponent.componentName} } from './components/vibe-ui/${selectedComponent.slug}/${selectedComponent.componentName}';

export default function Example() {
  return <${selectedComponent.componentName} />;
}`}
                  </pre>
                </div>
              )}

              {activeTab === 'html' && (
                <div>
                  <span className="text-zinc-500 block mb-1 font-sans">Semantic HTML Structure:</span>
                  <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-zinc-300 overflow-x-auto leading-relaxed">
{`<div class="vibe-${selectedComponent.slug}">
  <h2>${selectedComponent.name}</h2>
</div>`}
                  </pre>
                </div>
              )}

              {activeTab === 'css' && (
                <div>
                  <span className="text-zinc-500 block mb-1 font-sans">Standalone CSS Rules:</span>
                  <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-zinc-300 overflow-x-auto leading-relaxed">
{`.vibe-${selectedComponent.slug} {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background-color: #09090b;
  color: #f4f4f5;
}`}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex justify-end">
              <button
                onClick={() => setSelectedComponent(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FOOTER */}
      <footer className="border-t border-zinc-900 bg-black py-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-bold text-white text-sm">VibeUI</span>
              <span className="text-zinc-600">•</span>
              <span>120 animated components for React</span>
            </div>
            <div className="mt-1">
              Crafted with care by{' '}
              <a href="https://github.com/rselva1202" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                R. Selva
              </a>
              . Distributed under the MIT License.
            </div>
          </div>

          <div className="flex gap-6 font-medium">
            <a href="https://github.com/rselva1202/vibe-ui" className="hover:text-white transition">GitHub</a>
            <a href="https://github.com/rselva1202/vibe-ui/blob/main/docs/INSTALL.md" className="hover:text-white transition">Installation</a>
            <a href="https://github.com/rselva1202/vibe-ui/blob/main/docs/HOW-IT-WORKS.md" className="hover:text-white transition">Architecture</a>
            <a href="https://github.com/rselva1202/vibe-ui/blob/main/SKILL.md" className="hover:text-white transition">AI Skill</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
