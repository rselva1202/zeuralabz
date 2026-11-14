import React, { useState, useEffect, useMemo } from 'react';
import { LiveCanvas, CanvasEngineType } from './components/LiveCanvas';

export default function App() {
  const [animationMode, setAnimationMode] = useState<'full' | 'lite' | 'off'>('lite');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeEngine, setActiveEngine] = useState<CanvasEngineType>('aurora');
  const [starCount, setStarCount] = useState<number>(48);

  // Generator State
  const [genComponent, setGenComponent] = useState('aurora');
  const [genTheme, setGenTheme] = useState('ocean');
  const [genAnimation, setGenAnimation] = useState('float');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const generatedStyleName = useMemo(() => {
    return `${genComponent}-${genTheme}-${genAnimation}`;
  }, [genComponent, genTheme, genAnimation]);

  const generatedCommand = useMemo(() => {
    return `npx zeuralabz add ${genComponent} --theme ${genTheme} --animation ${genAnimation}`;
  }, [genComponent, genTheme, genAnimation]);

  const engineDescriptions: Record<CanvasEngineType, string> = {
    aurora: 'Organic fluid wave illumination with dynamic multi-stop mint/cyan gradients.',
    galaxy: '700+ particles orbiting in 3 logarithmic spiral arms with galactic core glow.',
    particles: 'Floating neural particle network with real-time distance-based interconnects.',
    gradient: 'Orbital chromatic mesh with fluid continuous canvas morphing.',
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col font-sans selection:bg-[#2DD4BF] selection:text-black overflow-x-hidden max-w-full">
      {/* ============================================================== */}
      {/* 1. NAVBAR (Sticky, Dark, 2px White Bottom Border) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md border-b-[2px] border-white w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <span className="w-8 h-8 bg-[#2DD4BF] text-black border border-white flex items-center justify-center font-heading text-sm font-black shadow-[2px_2px_0px_#FFFFFF] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition">
              Z
            </span>
            <span className="font-heading font-black text-white text-lg tracking-tight">
              ZEURALABZ
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-black text-[#2DD4BF] border border-white/20">
              SKILL v1.2
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-heading font-black uppercase tracking-wider text-zinc-300">
            <a href="#what-is-it" className="hover:text-[#2DD4BF] transition">What is it?</a>
            <a href="#how-it-works" className="hover:text-[#2DD4BF] transition">How it works</a>
            <a href="#whats-it-for" className="hover:text-[#2DD4BF] transition">What's it for</a>
            <a href="#demo" className="hover:text-[#2DD4BF] transition">Skill in Action</a>
            <a href="#connected-sources" className="hover:text-[#2DD4BF] transition">Connected Sources</a>
            <a href="#install" className="hover:text-[#2DD4BF] transition">Install</a>
            <a href="#faq" className="hover:text-[#2DD4BF] transition">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Animation Lite / Full / Off Selector */}
            <div className="flex items-center border-[2px] border-white bg-[#161616] text-[10px] font-mono font-bold uppercase p-0.5 shadow-[2px_2px_0px_#2DD4BF]">
              <span className="px-2 text-zinc-400">FX:</span>
              <button
                onClick={() => setAnimationMode('lite')}
                className={`px-2 py-1 transition ${animationMode === 'lite' ? 'bg-[#2DD4BF] text-black font-black' : 'text-zinc-300 hover:text-white'}`}
                title="Lite mode (efficient 30fps)"
              >
                LITE
              </button>
              <button
                onClick={() => setAnimationMode('full')}
                className={`px-2 py-1 transition ${animationMode === 'full' ? 'bg-[#2DD4BF] text-black font-black' : 'text-zinc-300 hover:text-white'}`}
                title="Full 60fps animations"
              >
                ON
              </button>
              <button
                onClick={() => setAnimationMode('off')}
                className={`px-2 py-1 transition ${animationMode === 'off' ? 'bg-red-500 text-white font-black' : 'text-zinc-300 hover:text-white'}`}
                title="Pause all animations"
              >
                OFF
              </button>
            </div>

            {/* GitHub Star Button */}
            <a
              href="https://github.com/rselva1202/zeuralabz"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-white text-black text-xs font-heading font-black border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF] hover:bg-zinc-200 transition flex items-center gap-1.5"
            >
              <span>GITHUB</span>
              <span className="text-amber-500">★</span>
              <span>{starCount}</span>
            </a>

            {/* Install Skill CTA */}
            <a
              href="#install"
              className="px-3.5 py-1.5 bg-[#2DD4BF] text-black text-xs font-heading font-black border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#14B8A6] transition uppercase"
            >
              INSTALL SKILL →
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href="https://github.com/rselva1202/zeuralabz"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-white text-black text-[11px] font-heading font-black border border-white"
            >
              ★ {starCount}
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-[#161616] text-white border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF] text-xs font-heading font-black"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#111111] border-b-[2px] border-white p-4 space-y-3 font-heading font-black text-sm uppercase">
            <a href="#what-is-it" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#2DD4BF]">What is it?</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#2DD4BF]">How it works</a>
            <a href="#whats-it-for" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#2DD4BF]">What's it for</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#2DD4BF]">Skill in Action</a>
            <a href="#connected-sources" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#2DD4BF]">Connected Sources</a>
            <a href="#install" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-[#2DD4BF]">Install Skill</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#2DD4BF]">FAQ</a>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">ANIMATIONS:</span>
              <div className="flex gap-1">
                <button onClick={() => setAnimationMode('lite')} className={`px-2 py-0.5 border ${animationMode === 'lite' ? 'bg-[#2DD4BF] text-black font-bold' : 'text-white'}`}>LITE</button>
                <button onClick={() => setAnimationMode('full')} className={`px-2 py-0.5 border ${animationMode === 'full' ? 'bg-[#2DD4BF] text-black font-bold' : 'text-white'}`}>ON</button>
                <button onClick={() => setAnimationMode('off')} className={`px-2 py-0.5 border ${animationMode === 'off' ? 'bg-red-500 text-white font-bold' : 'text-white'}`}>OFF</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================== */}
      {/* 2. HERO SECTION */}
      {/* ============================================================== */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white neo-dots overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto w-full max-w-full space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-full">
            {/* Left Headline Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 w-full max-w-full min-w-0">
              {/* Badge */}
              <div className="inline-block bg-[#161616] border-[2px] border-white px-3 py-1 text-xs font-mono font-bold tracking-wider uppercase text-zinc-300 shadow-[2px_2px_0px_#2DD4BF]">
                <span className="text-[#2DD4BF] mr-2">●</span>
                NEW • ZEURALABZ SKILL v1.2 — 1M+ STYLES
              </div>

              {/* Big Headline in Archivo Black uppercase */}
              <h1 className="font-heading text-[clamp(2.1rem,5.5vw,3.9rem)] leading-[1.06] font-black tracking-tight text-white uppercase break-words">
                GIVE YOUR AI AGENT{' '}
                <span className="inline-block bg-[#2DD4BF] text-black px-3 py-1 border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] mt-2">
                  1 MILLION UI STYLES.
                </span>
              </h1>

              {/* Subtext in plain words */}
              <p className="text-sm sm:text-base text-[#CCCCCC] font-normal max-w-2xl leading-relaxed">
                ZEURALABZ is a Skill for Claude Code, Antigravity, Cursor and Windsurf. Install it once, then ask your AI to build your website — it scans your project and installs the best animated UI for every section.
              </p>

              {/* Hero Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <a
                  href="#install"
                  className="bg-[#2DD4BF] text-black border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] hover:bg-[#14B8A6] px-6 py-3.5 text-xs sm:text-sm font-heading font-black tracking-wider text-center uppercase"
                >
                  INSTALL THE SKILL →
                </a>
                <a
                  href="#how-it-works"
                  className="bg-white text-black border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] hover:bg-zinc-200 px-6 py-3.5 text-xs sm:text-sm font-heading font-black tracking-wider text-center uppercase"
                >
                  SEE HOW IT WORKS ↓
                </a>
              </div>
            </div>

            {/* Right LiveCanvas Column (5 cols) */}
            <div className="lg:col-span-5 w-full max-w-full">
              <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] overflow-hidden flex flex-col w-full max-w-full">
                {/* Canvas Top Bar */}
                <div className="bg-[#111111] border-b-[2px] border-white px-4 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-zinc-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <span className="ml-2 uppercase text-white font-heading font-black">
                      ENGINE: <span className="text-[#2DD4BF]">{activeEngine.toUpperCase()}</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">
                    LIVE CANVAS
                  </span>
                </div>

                {/* Live Canvas Viewport (Guaranteed Switch + Cleanup) */}
                <div className="h-56 sm:h-64 bg-[#0E0E0E] relative border-b-[2px] border-white overflow-hidden">
                  <LiveCanvas
                    key={activeEngine}
                    engine={activeEngine}
                    lite={animationMode === 'lite'}
                  />
                  <div className="absolute top-2.5 right-2.5 pointer-events-none">
                    <span className="text-[10px] font-mono font-bold bg-black/80 text-[#2DD4BF] px-2 py-0.5 border border-[#2DD4BF]/40">
                      ACTIVE • 60 FPS
                    </span>
                  </div>
                </div>

                {/* Engine Switcher Controls */}
                <div className="p-4 bg-[#141414] space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                      TRY ENGINE:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(['aurora', 'galaxy', 'particles', 'gradient'] as const).map((eng) => (
                        <button
                          key={eng}
                          onClick={() => setActiveEngine(eng)}
                          className={`px-2.5 py-1 text-[11px] font-heading font-black uppercase transition border-[2px] border-white ${
                            activeEngine === eng
                              ? 'bg-[#2DD4BF] text-black shadow-[2px_2px_0px_#FFFFFF] -translate-x-0.5 -translate-y-0.5'
                              : 'bg-[#1C1C1C] text-zinc-300 hover:text-white shadow-[2px_2px_0px_#2DD4BF]'
                          }`}
                        >
                          {eng}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#CCCCCC] font-normal leading-snug">
                    {engineDescriptions[activeEngine]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats in ONE Plain Row (No nested boxes) */}
          <div className="pt-6 border-t-[2px] border-white/20 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-center sm:text-left font-mono text-xs sm:text-sm font-bold text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="text-[#2DD4BF] text-base">✦</span>
              <span><strong className="text-white font-heading font-black text-base sm:text-lg">10,134</strong> Base Components</span>
            </div>
            <div className="hidden sm:inline-block text-zinc-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-[#2DD4BF] text-base">✦</span>
              <span><strong className="text-white font-heading font-black text-base sm:text-lg">6</strong> Open Sources</span>
            </div>
            <div className="hidden sm:inline-block text-zinc-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-[#2DD4BF] text-base">✦</span>
              <span><strong className="text-white font-heading font-black text-base sm:text-lg">20</strong> Themes</span>
            </div>
            <div className="hidden sm:inline-block text-zinc-600">•</div>
            <div className="flex items-center gap-2">
              <span className="text-[#2DD4BF] text-base">✦</span>
              <span><strong className="text-[#2DD4BF] font-heading font-black text-base sm:text-lg">1,000,000+</strong> Combinations</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. WHAT IS THE ZEURALABZ SKILL? (3 Cards, 1 Layer Each) */}
      {/* ============================================================== */}
      <section id="what-is-it" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // ARCHITECTURE
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              WHAT IS THE ZEURALABZ SKILL?
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              Three clean, interconnected pieces designed for modern AI pair programming — zero clutter, maximum leverage.
            </p>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: SKILL.md */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#2DD4BF] text-black border border-white font-heading font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#FFFFFF]">
                  📄
                </div>
                <h3 className="font-heading text-lg font-black text-white uppercase">
                  SKILL.md
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                  A file your AI reads. It tells Claude, Antigravity, and Cursor what ZEURALABZ can do, its reasoning guidelines, and how to pick the 1 best component per section.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between gap-2">
                <code className="text-[11px] font-mono text-[#2DD4BF] truncate">
                  SKILL.md (Drop into skills/)
                </code>
                <button
                  onClick={() => copyToClipboard('https://raw.githubusercontent.com/rselva1202/zeuralabz/main/SKILL.md')}
                  className="px-2 py-1 bg-white text-black font-heading font-black text-[10px] hover:bg-zinc-200 shrink-0"
                >
                  {copiedText === 'https://raw.githubusercontent.com/rselva1202/zeuralabz/main/SKILL.md' ? '✔ COPIED' : 'COPY URL'}
                </button>
              </div>
            </div>

            {/* Card 2: MCP Server */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#2DD4BF] text-black border border-white font-heading font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#FFFFFF]">
                  ⚡
                </div>
                <h3 className="font-heading text-lg font-black text-white uppercase">
                  MCP Server
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                  Native Model Context Protocol tools your AI can call directly: <span className="text-white font-mono">search_components</span>, <span className="text-white font-mono">suggest_ui_for_project</span>, <span className="text-white font-mono">install_component</span>, and <span className="text-white font-mono">list_themes</span>.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between gap-2">
                <code className="text-[11px] font-mono text-[#2DD4BF] truncate">
                  node mcp-server/index.js
                </code>
                <button
                  onClick={() => copyToClipboard('node mcp-server/index.js')}
                  className="px-2 py-1 bg-white text-black font-heading font-black text-[10px] hover:bg-zinc-200 shrink-0"
                >
                  {copiedText === 'node mcp-server/index.js' ? '✔ COPIED' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Card 3: CLI */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#2DD4BF] text-black border border-white font-heading font-black text-sm flex items-center justify-center shadow-[2px_2px_0px_#FFFFFF]">
                  ⌨️
                </div>
                <h3 className="font-heading text-lg font-black text-white uppercase">
                  Terminal CLI
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                  Single-command execution for your terminal without needing AI: <span className="text-white font-mono">npx zeuralabz suggest / add / search / preview / list / themes</span>.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between gap-2">
                <code className="text-[11px] font-mono text-[#2DD4BF] truncate">
                  npx zeuralabz suggest
                </code>
                <button
                  onClick={() => copyToClipboard('npx zeuralabz suggest')}
                  className="px-2 py-1 bg-white text-black font-heading font-black text-[10px] hover:bg-zinc-200 shrink-0"
                >
                  {copiedText === 'npx zeuralabz suggest' ? '✔ COPIED' : 'COPY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. HOW IT WORKS (3 Steps + Terminal Demo & Hero Code) */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#111111]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // 3-STEP PIPELINE
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              HOW IT WORKS
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              No hunting through 500 documentation pages. Your AI scans your code and installs the exact right component.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 space-y-3">
              <span className="font-heading text-3xl font-black text-[#2DD4BF]">01</span>
              <h3 className="font-heading text-base font-black text-white uppercase">Install the Skill</h3>
              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                Drop <span className="text-white font-mono">SKILL.md</span> into your AI workspace or run <span className="text-white font-mono">npx zeuralabz init</span>. Takes under 1 minute.
              </p>
            </div>

            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 space-y-3">
              <span className="font-heading text-3xl font-black text-[#2DD4BF]">02</span>
              <h3 className="font-heading text-base font-black text-white uppercase">Ask Your Agent</h3>
              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                Prompt naturally: <span className="text-white italic">"Build my landing page"</span> or <span className="text-white italic">"Make my hero section look animated and pretty"</span>.
              </p>
            </div>

            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 space-y-3">
              <span className="font-heading text-3xl font-black text-[#2DD4BF]">03</span>
              <h3 className="font-heading text-base font-black text-white uppercase">Get The Best Pick</h3>
              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                ZEURALABZ scans your <span className="text-white font-mono">package.json</span> and <span className="text-white font-mono">src/</span>, identifies your project type, and installs 1 best pick per section with full preview and zero lag.
              </p>
            </div>
          </div>

          {/* Side-by-Side Live Terminal & Code Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
            {/* Terminal Window (6 cols) */}
            <div className="lg:col-span-6 bg-[#0E0E0E] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] overflow-hidden flex flex-col">
              <div className="bg-[#161616] border-b-[2px] border-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-mono text-xs font-bold text-zinc-300">bash — terminal</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF]">ANALYZER</span>
              </div>
              <div className="p-4 sm:p-5 font-mono text-xs space-y-2 text-zinc-300 leading-relaxed overflow-x-auto">
                <div className="text-zinc-500">$ npx zeuralabz suggest</div>
                <div className="text-[#2DD4BF]">✔ Project Analysis Complete!</div>
                <div className="text-zinc-400 pt-1">
                  • Framework: <span className="text-white font-bold">React (Next.js 14)</span><br />
                  • Persona: <span className="text-white font-bold">SAAS LANDING</span> (high confidence)<br />
                  • Styling: <span className="text-white font-bold">Tailwind CSS</span>
                </div>
                <div className="text-white font-bold pt-2 border-t border-zinc-800">
                  Recommended UI Design Plan:
                </div>
                <div className="p-2.5 bg-black border border-white/20 text-[11px] space-y-1">
                  <div>[1] BACKGROUND: <span className="text-[#2DD4BF] font-bold">Aurora Background</span> [Mint Accent]</div>
                  <div>[2] HERO TEXT:  <span className="text-[#2DD4BF] font-bold">Split Text Kinetic</span></div>
                  <div>[3] BUTTON:     <span className="text-[#2DD4BF] font-bold">Shimmer Button</span></div>
                </div>
                <div className="text-emerald-400 font-bold pt-1">
                  ✔ Installed 3 components to src/components/zeuralabz/
                </div>
              </div>
            </div>

            {/* Code Output Window (6 cols) */}
            <div className="lg:col-span-6 bg-[#0E0E0E] border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] overflow-hidden flex flex-col">
              <div className="bg-[#161616] border-b-[2px] border-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span className="font-mono text-xs font-bold text-white">Hero.jsx</span>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(`import { AuroraBackground } from '@/components/zeuralabz/aurora';
import { SplitText } from '@/components/zeuralabz/split-text';
import { ShimmerButton } from '@/components/zeuralabz/shimmer';

export default function Hero() {
  return (
    <AuroraBackground className="min-h-screen flex flex-col items-center justify-center p-8">
      <SplitText text="Websites that feel alive." className="text-5xl font-black text-white" />
      <p className="mt-4 text-[#CCCCCC]">AI-curated components ready in 1 click.</p>
      <ShimmerButton text="Start Exploring ➔" className="mt-8 font-black uppercase" />
    </AuroraBackground>
  );
}`)
                  }
                  className="px-2 py-0.5 bg-[#2DD4BF] text-black font-heading font-black text-[10px] hover:bg-[#14B8A6]"
                >
                  {copiedText?.includes('AuroraBackground') ? '✔ COPIED' : 'COPY CODE'}
                </button>
              </div>
              <pre className="p-4 sm:p-5 font-mono text-[11px] text-zinc-300 leading-relaxed overflow-x-auto">
                <code className="text-[#2DD4BF]">{`import { AuroraBackground } from '@/components/zeuralabz/aurora';\nimport { SplitText } from '@/components/zeuralabz/split-text';\nimport { ShimmerButton } from '@/components/zeuralabz/shimmer';\n\n`}</code>
                <code>{`export default function Hero() {\n  return (\n    `}</code>
                <code className="text-amber-300">{`<AuroraBackground className="min-h-screen flex flex-col items-center justify-center p-8">`}</code>
                <code>{`\n      `}</code>
                <code className="text-[#2DD4BF]">{`<SplitText text="Websites that feel alive." className="text-5xl font-black text-white" />`}</code>
                <code>{`\n      <p className="mt-4 text-[#CCCCCC]">AI-curated components ready in 1 click.</p>\n      `}</code>
                <code className="text-emerald-300">{`<ShimmerButton text="Start Exploring ➔" className="mt-8 font-black uppercase" />`}</code>
                <code>{`\n    `}</code>
                <code className="text-amber-300">{`</AuroraBackground>`}</code>
                <code>{`\n  );\n}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. WHAT'S IT FOR? (Use Cases, 6 Small Cards, No Images) */}
      {/* ============================================================== */}
      <section id="whats-it-for" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // PROJECT PROFILES
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              WHAT'S IT FOR?
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              Your AI knows the exact visual vocabulary for every industry and page type.
            </p>
          </div>

          {/* 6 Use Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Landing Page */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-black text-white uppercase">Landing Page</span>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">HIGH CONVERSION</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                Aurora Background + Split Text + Shimmer Button
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                Harmonic multi-color cosmic mesh paired with kinetic hero typography and high-conversion light sheen actions.
              </p>
            </div>

            {/* 2. Portfolio */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-black text-white uppercase">Developer Portfolio</span>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">CREATIVE</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                Spiral Galaxy + Glitch Text + 3D Tilt Card
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                Logarithmic star cluster canvas with responsive cursor gyroscope tilt cards to display featured engineering work.
              </p>
            </div>

            {/* 3. Dashboard */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-black text-white uppercase">Analytics Dashboard</span>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">DATA HEAVY</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                Cyber Grid + Counter Roll + Bento Grid
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                High-density metric cockpit with live numeric rolling animations and structured modular Bento container layouts.
              </p>
            </div>

            {/* 4. SaaS */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-black text-white uppercase">SaaS Platform</span>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">B2B ENTERPRISE</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                Warp Starfield + Smooth Typewriter + Border Beam
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                Deep tech product narrative with acceleration field effects and precision perimeter light-beam interaction.
              </p>
            </div>

            {/* 5. Restaurant */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-black text-white uppercase">Restaurant & Hospitality</span>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">CULINARY</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                Warm Gradient + Blur In Text + Spotlight Card
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                Organic fluid warmth with atmospheric typography reveals and cursor radial lumen highlighting signature dishes.
              </p>
            </div>

            {/* 6. Blog / E-commerce */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-black text-white uppercase">Blog & E-Commerce</span>
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-2 py-0.5 border border-white/20">EDITORIAL</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#2DD4BF]">
                Minimal Dots + Flip Text + Cyberpunk Neon
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                Sleek dot matrix structure with dynamic word swap headers and high-contrast vibrant checkout triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. SEE THE SKILL IN ACTION (Minimal Callout — Zero Component Cards) */}
      {/* ============================================================== */}
      <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#111111]">
        <div className="max-w-4xl mx-auto space-y-8 text-center sm:text-left">
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // ZERO-BLOAT WORKFLOW
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              SEE THE SKILL IN ACTION
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              The Skill holds 10,134 base components across 6 open sources. See how it picks the best one for your project — no grid to scroll, no fake previews.
            </p>
          </div>

          <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-heading text-base font-black text-white uppercase">
                Ready to transform your UI?
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Run the analyzer in your project terminal or trigger it from your AI agent.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => copyToClipboard('npx zeuralabz suggest')}
                className="px-5 py-3 bg-[#2DD4BF] text-black font-heading font-black text-xs uppercase border-[2px] border-white shadow-[2px_2px_0px_#FFFFFF] hover:bg-[#14B8A6] transition tracking-wider text-center"
              >
                {copiedText === 'npx zeuralabz suggest' ? '✔ COPIED COMMAND' : 'TRY npx zeuralabz suggest →'}
              </button>
              <a
                href="https://github.com/rselva1202/zeuralabz"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-white text-black font-heading font-black text-xs uppercase border-[2px] border-white shadow-[2px_2px_0px_#2DD4BF] hover:bg-zinc-200 transition tracking-wider text-center"
              >
                VIEW ON GITHUB →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CONNECTED SOURCES & 1M+ COMBINATIONS (Honest Math) */}
      {/* ============================================================== */}
      <section id="connected-sources" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // ECOSYSTEM & COMBINATORICS
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              HOW MANY OPEN SOURCE ANIMATIONS ARE CONNECTED?
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              Full transparency on our ecosystem foundation, licensed registry links, and on-demand style generation math.
            </p>
          </div>

          {/* 6 Connected Source Cards (10,134 Base Total) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* React Bits */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-black text-white">React Bits</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 border border-white/10">LINKED</span>
              </div>
              <div className="font-heading text-3xl font-black text-[#2DD4BF]">218</div>
              <div className="text-xs font-mono text-zinc-300">Components</div>
              <p className="text-[11px] text-[#CCCCCC] pt-2 border-t border-[#2A2A2A]">
                Author: David Haz • License: MIT + Commons Clause. Linked via official shadcn registry.
              </p>
            </div>

            {/* Magic UI */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-black text-white">Magic UI</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 border border-white/10">LINKED</span>
              </div>
              <div className="font-heading text-3xl font-black text-[#2DD4BF]">79</div>
              <div className="text-xs font-mono text-zinc-300">Components</div>
              <p className="text-[11px] text-[#CCCCCC] pt-2 border-t border-[#2A2A2A]">
                Author: Dillion Verma • License: MIT. Linked via official shadcn registry.
              </p>
            </div>

            {/* Aceternity UI */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-black text-white">Aceternity UI</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 border border-white/10">LINKED</span>
              </div>
              <div className="font-heading text-3xl font-black text-[#2DD4BF]">114</div>
              <div className="text-xs font-mono text-zinc-300">Components</div>
              <p className="text-[11px] text-[#CCCCCC] pt-2 border-t border-[#2A2A2A]">
                Author: Manu Arora • License: MIT. Linked via official documentation & registry.
              </p>
            </div>

            {/* Lightswind */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-black text-white">Lightswind</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 border border-white/10">LINKED</span>
              </div>
              <div className="font-heading text-3xl font-black text-[#2DD4BF]">224</div>
              <div className="text-xs font-mono text-zinc-300">Components (Free)</div>
              <p className="text-[11px] text-[#CCCCCC] pt-2 border-t border-[#2A2A2A]">
                Author: Muhilan • License: MIT. Linked via official documentation & CLI (free catalog only).
              </p>
            </div>

            {/* 21st.dev */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-black text-white">21st.dev</span>
                <span className="text-[10px] font-mono text-zinc-400 bg-black px-1.5 py-0.5 border border-white/10">LINKED</span>
              </div>
              <div className="font-heading text-3xl font-black text-[#2DD4BF]">9,379</div>
              <div className="text-xs font-mono text-zinc-300">Components</div>
              <p className="text-[11px] text-[#CCCCCC] pt-2 border-t border-[#2A2A2A]">
                1,045 Authors (e.g. @designali-in) • Per-author license. Linked via official shadcn registry.
              </p>
            </div>

            {/* ZEURALABZ Originals */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-black text-white">ZEURALABZ</span>
                <span className="text-[10px] font-mono text-[#2DD4BF] bg-black px-1.5 py-0.5 border border-[#2DD4BF]/40 font-bold">BUILT-IN</span>
              </div>
              <div className="font-heading text-3xl font-black text-white">120</div>
              <div className="text-xs font-mono text-zinc-300">Originals</div>
              <p className="text-[11px] text-[#CCCCCC] pt-2 border-t border-[#2A2A2A]">
                Author: R. Selva • License: MIT. Built directly into this repository with zero external dependencies.
              </p>
            </div>
          </div>

          {/* Honest 1M+ Math Callout Box */}
          <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-[#2DD4BF] text-black font-heading font-black text-xs uppercase border border-white">
                THE 1M+ MATH
              </span>
              <span className="font-heading text-base sm:text-lg font-black text-white uppercase">
                Combinations, Not Static Files
              </span>
            </div>
            <div className="font-mono text-sm sm:text-base text-zinc-200 bg-black p-4 border border-white/20">
              <span className="text-[#2DD4BF] font-bold">10,134 base components</span> × <span className="text-white font-bold">20 themes</span> × <span className="text-white font-bold">20 animations</span> × <span className="text-white font-bold">15 layouts</span> = <strong className="text-[#2DD4BF] font-black">60,804,000 styles (1M+)</strong>
            </div>
            <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
              We never claim to distribute 1 million hand-written files. Instead, the generator in the ZEURALABZ Skill combines atomic primitives (component + theme tokens + animation speed + border radius + typography) on the fly. You get <strong>1 million styles on demand</strong> without downloading heavy bloat.
            </p>
          </div>

          {/* Interactive Generator Demo Box */}
          <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#FFFFFF] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg font-black text-white uppercase">
                  Interactive Generator Sandbox
                </h3>
                <p className="text-xs text-zinc-400">
                  Pick a component, theme palette, and animation motion to produce a unique styled variant.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#2DD4BF] bg-black px-2.5 py-1 border border-white/20 self-start sm:self-auto">
                ON-DEMAND COMPILER
              </span>
            </div>

            {/* Selectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              {/* Component Picker */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase font-bold text-[10px]">1. Component Primitive</label>
                <select
                  value={genComponent}
                  onChange={(e) => setGenComponent(e.target.value)}
                  className="w-full bg-black text-white border-[2px] border-white p-2.5 font-bold focus:outline-none focus:border-[#2DD4BF]"
                >
                  <option value="aurora">Aurora Background</option>
                  <option value="galaxy">Spiral Galaxy</option>
                  <option value="particles">Neural Particles</option>
                  <option value="split-text">Split Text</option>
                  <option value="shimmer">Shimmer Button</option>
                  <option value="tilt">3D Gyro Tilt</option>
                  <option value="neon">Neon Button</option>
                </select>
              </div>

              {/* Theme Picker */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase font-bold text-[10px]">2. Theme Palette</label>
                <select
                  value={genTheme}
                  onChange={(e) => setGenTheme(e.target.value)}
                  className="w-full bg-black text-white border-[2px] border-white p-2.5 font-bold focus:outline-none focus:border-[#2DD4BF]"
                >
                  <option value="ocean">Ocean Deep (#2DD4BF)</option>
                  <option value="dark-neon">Dark Neon (#A855F7)</option>
                  <option value="dune">Dune Gold (#F59E0B)</option>
                  <option value="cyberpunk">Cyberpunk (#EC4899)</option>
                  <option value="emerald">Emerald Forest (#10B981)</option>
                  <option value="midnight">Midnight Mono (#FFFFFF)</option>
                </select>
              </div>

              {/* Animation Motion Picker */}
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase font-bold text-[10px]">3. Animation Velocity</label>
                <select
                  value={genAnimation}
                  onChange={(e) => setGenAnimation(e.target.value)}
                  className="w-full bg-black text-white border-[2px] border-white p-2.5 font-bold focus:outline-none focus:border-[#2DD4BF]"
                >
                  <option value="float">Float (Smooth 30s orbit)</option>
                  <option value="pulse">Pulse (Rhythmic breath)</option>
                  <option value="glow">Glow (Radiant specular sweep)</option>
                  <option value="drift">Drift (Subtle atmospheric sway)</option>
                  <option value="kinetic">Kinetic (High energy spring)</option>
                </select>
              </div>
            </div>

            {/* Generated Result Callout */}
            <div className="bg-black border-[2px] border-white p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Generated Variant:</div>
                <div className="font-mono text-sm font-bold text-[#2DD4BF] truncate">
                  {generatedStyleName}
                </div>
                <div className="text-xs font-mono text-white truncate">
                  $ {generatedCommand}
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(generatedCommand)}
                className="px-4 py-2.5 bg-[#2DD4BF] text-black font-heading font-black text-xs hover:bg-[#14B8A6] border border-white shrink-0"
              >
                {copiedText === generatedCommand ? '✔ COPIED' : 'COPY COMMAND'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. INSTALL IN YOUR AI WORKSPACE (3 Cards with Copyable Configs) */}
      {/* ============================================================== */}
      <section id="install" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#111111]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // WORKSPACE SETUP
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              INSTALL IN YOUR AI WORKSPACE
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              Integrate in less than 60 seconds with Claude Code, Antigravity, Cursor, or Windsurf.
            </p>
          </div>

          {/* 3 Installation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Claude Code & Desktop */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-black text-white uppercase">Claude Code / Desktop</h3>
                  <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-1.5 py-0.5 border border-white/20">MCP CONFIG</span>
                </div>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Add ZEURALABZ to your <span className="text-white font-mono">claude_desktop_config.json</span>:
                </p>
                <div className="bg-black p-3 border border-white/20 font-mono text-[10px] text-zinc-300 overflow-x-auto leading-relaxed">
                  <pre>{`{
  "mcpServers": {
    "zeuralabz": {
      "command": "npx",
      "args": ["-y", "zeuralabz-mcp"]
    }
  }
}`}</pre>
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`{
  "mcpServers": {
    "zeuralabz": {
      "command": "npx",
      "args": ["-y", "zeuralabz-mcp"]
    }
  }
}`)
                }
                className="w-full py-2 bg-white text-black font-heading font-black text-xs hover:bg-zinc-200 border border-white"
              >
                {copiedText?.includes('mcpServers') ? '✔ COPIED JSON' : 'COPY MCP CONFIG'}
              </button>
            </div>

            {/* 2. Antigravity / Gemini CLI */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-black text-white uppercase">Antigravity / Gemini</h3>
                  <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-1.5 py-0.5 border border-white/20">SKILL DROP-IN</span>
                </div>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Drop the raw <span className="text-white font-mono">SKILL.md</span> directly into your skills directory:
                </p>
                <div className="bg-black p-3 border border-white/20 font-mono text-[10px] text-[#2DD4BF] overflow-x-auto leading-relaxed">
                  <pre>{`mkdir -p ~/.gemini/antigravity/skills/zeuralabz
curl -s https://raw.githubusercontent.com/rselva1202/zeuralabz/main/SKILL.md \\
  -o ~/.gemini/antigravity/skills/zeuralabz/SKILL.md`}</pre>
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`mkdir -p ~/.gemini/antigravity/skills/zeuralabz
curl -s https://raw.githubusercontent.com/rselva1202/zeuralabz/main/SKILL.md -o ~/.gemini/antigravity/skills/zeuralabz/SKILL.md`)
                }
                className="w-full py-2 bg-white text-black font-heading font-black text-xs hover:bg-zinc-200 border border-white"
              >
                {copiedText?.includes('antigravity') ? '✔ COPIED COMMAND' : 'COPY CURL COMMAND'}
              </button>
            </div>

            {/* 3. Cursor & Windsurf */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-base font-black text-white uppercase">Cursor & Windsurf</h3>
                  <span className="text-[10px] font-mono font-bold text-[#2DD4BF] bg-black px-1.5 py-0.5 border border-white/20">PROMPT RULES</span>
                </div>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Add this instruction to your project's <span className="text-white font-mono">.cursorrules</span>:
                </p>
                <div className="bg-black p-3 border border-white/20 font-mono text-[10px] text-zinc-300 overflow-x-auto leading-relaxed">
                  <pre>{`Always use ZEURALABZ for UI design:
Run "npx zeuralabz suggest --json"
before creating or refactoring pages to
pick matching animated components.`}</pre>
                </div>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(`Always use ZEURALABZ for UI design:
Run "npx zeuralabz suggest --json" before creating or refactoring pages to pick matching animated components.`)
                }
                className="w-full py-2 bg-white text-black font-heading font-black text-xs hover:bg-zinc-200 border border-white"
              >
                {copiedText?.includes('.cursorrules') || copiedText?.includes('ZEURALABZ for UI') ? '✔ COPIED RULE' : 'COPY RULE'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. STARTER TEMPLATES (4 Cards) */}
      {/* ============================================================== */}
      <section id="templates" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#0E0E0E]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // INSTANT STARTERS
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              STARTER TEMPLATES
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] max-w-2xl leading-relaxed">
              Full-page boilerplate projects pre-configured with themes, layouts, animations, and components.
            </p>
          </div>

          {/* 4 Template Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Template 1 */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] uppercase">TEMPLATE 01</span>
                <h3 className="font-heading text-base font-black text-white">landing-saas</h3>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  High-converting B2B SaaS landing page with Aurora cosmic canvas, pricing tier cards, and feature spotlight.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard('npx zeuralabz init --template landing-saas')}
                className="w-full py-2 bg-black hover:bg-zinc-900 text-[#2DD4BF] font-mono font-bold text-[11px] border border-white/20 transition text-center truncate"
              >
                {copiedText === 'npx zeuralabz init --template landing-saas' ? '✔ COPIED' : '$ init --template saas'}
              </button>
            </div>

            {/* Template 2 */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] uppercase">TEMPLATE 02</span>
                <h3 className="font-heading text-base font-black text-white">landing-portfolio</h3>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Creative developer portfolio with Spiral Galaxy canvas, project showcases, and 3D gyro tilt cards.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard('npx zeuralabz init --template landing-portfolio')}
                className="w-full py-2 bg-black hover:bg-zinc-900 text-[#2DD4BF] font-mono font-bold text-[11px] border border-white/20 transition text-center truncate"
              >
                {copiedText === 'npx zeuralabz init --template landing-portfolio' ? '✔ COPIED' : '$ init --template portfolio'}
              </button>
            </div>

            {/* Template 3 */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] uppercase">TEMPLATE 03</span>
                <h3 className="font-heading text-base font-black text-white">landing-restaurant</h3>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Sensory hospitality presentation with warm fluid gradients, dish spotlights, and reservations form.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard('npx zeuralabz init --template landing-restaurant')}
                className="w-full py-2 bg-black hover:bg-zinc-900 text-[#2DD4BF] font-mono font-bold text-[11px] border border-white/20 transition text-center truncate"
              >
                {copiedText === 'npx zeuralabz init --template landing-restaurant' ? '✔ COPIED' : '$ init --template restaurant'}
              </button>
            </div>

            {/* Template 4 */}
            <div className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#2DD4BF] uppercase">TEMPLATE 04</span>
                <h3 className="font-heading text-base font-black text-white">dashboard-starter</h3>
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Modular data cockpit with Bento grid layout, live rolling metrics, and responsive navigation drawer.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard('npx zeuralabz init --template dashboard-starter')}
                className="w-full py-2 bg-black hover:bg-zinc-900 text-[#2DD4BF] font-mono font-bold text-[11px] border border-white/20 transition text-center truncate"
              >
                {copiedText === 'npx zeuralabz init --template dashboard-starter' ? '✔ COPIED' : '$ init --template dashboard'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. FAQ (4 Plain Questions & Answers) */}
      {/* ============================================================== */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-[2px] border-white bg-[#111111]">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Section Header */}
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-[#2DD4BF] font-mono text-xs uppercase tracking-widest font-bold">
              // CLARIFICATIONS
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          {/* 4 FAQ Cards */}
          <div className="space-y-4">
            {[
              {
                q: 'Is ZEURALABZ completely free?',
                a: 'Yes, 100% free and open-source under the MIT license. You can use ZEURALABZ in both personal side projects and commercial client work without paying licensing fees.',
              },
              {
                q: 'Do I need to copy or download 1M files?',
                a: 'No. You never download 1 million files. You only install the 1 exact component you need when you ask your AI for it. The 1M+ styles are combinations synthesized on demand by combining component templates with theme tokens.',
              },
              {
                q: 'Can I use React Bits or Magic UI code safely?',
                a: 'Yes. ZEURALABZ links directly to official registries with full attribution to original authors (David Haz, Dillion Verma, Manu Arora). External components are installed through official shadcn commands and are never falsely claimed as ZEURALABZ Originals.',
              },
              {
                q: 'What if my AI tool is not Claude Code?',
                a: 'ZEURALABZ is completely model-agnostic. It works seamlessly with Antigravity, Gemini CLI, Cursor, Windsurf, GitHub Copilot, OpenAI Codex, or even purely as a terminal command line tool via npx zeuralabz suggest.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#161616] border-[2px] border-white shadow-[3px_3px_0px_#2DD4BF] p-5 sm:p-6 space-y-2 cursor-pointer transition hover:bg-[#1A1A1A]"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading text-sm sm:text-base font-black text-white uppercase">
                    {item.q}
                  </h3>
                  <span className="font-mono text-base font-black text-[#2DD4BF]">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {(openFaq === idx || true) && (
                  <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed pt-2 border-t border-[#2A2A2A]">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. FOOTER (Black bg, Mint Z logo + ZEURALABZ, MIT license) */}
      {/* ============================================================== */}
      <footer className="border-t-[2px] border-[#2DD4BF] bg-black text-white py-12 px-4 sm:px-6 lg:px-8 text-xs w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left w-full max-w-full">
          {/* Left Branding */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <span className="w-6 h-6 bg-[#2DD4BF] border border-white flex items-center justify-center font-heading text-xs font-black text-black">
                Z
              </span>
              <span className="font-heading font-black text-white text-base tracking-tight">
                ZEURALABZ
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono text-zinc-400">
                AI Skill & Showcase Landing
              </span>
            </div>
            <div className="text-[#CCCCCC] font-normal max-w-md">
              Give your AI agent 1M+ UI styles. Built with ZEURALABZ Originals. Distributed under MIT License.
            </div>
            <div className="text-[11px] text-zinc-500">
              Crafted with care by{' '}
              <a
                href="https://github.com/rselva1202"
                target="_blank"
                rel="noreferrer"
                className="text-[#2DD4BF] font-bold hover:underline"
              >
                R. Selva
              </a>
              . Sources credited to original authors David Haz, Dillion Verma & Manu Arora.
            </div>
          </div>

          {/* Right Navigation Links */}
          <div className="flex flex-wrap gap-4 font-heading font-black uppercase text-xs justify-center sm:justify-end">
            <a href="https://github.com/rselva1202/zeuralabz" target="_blank" rel="noreferrer" className="text-white hover:text-[#2DD4BF] transition">GitHub</a>
            <a href="https://www.npmjs.com/package/zeuralabz" target="_blank" rel="noreferrer" className="text-white hover:text-[#2DD4BF] transition">npm</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/SKILL.md" target="_blank" rel="noreferrer" className="text-white hover:text-[#2DD4BF] transition">Skill</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/docs/INSTALL.md" target="_blank" rel="noreferrer" className="text-white hover:text-[#2DD4BF] transition">Docs</a>
            <a href="https://github.com/rselva1202/zeuralabz/blob/main/ATTRIBUTION.md" target="_blank" rel="noreferrer" className="text-white hover:text-[#2DD4BF] transition">Attribution</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
