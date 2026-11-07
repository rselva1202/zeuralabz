import React, { useState, useMemo } from 'react';
import componentsData from './data/components.json';
import themesData from './data/themes.json';

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
  const [activeTheme, setActiveTheme] = useState<string>('dark-neon');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);

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

  const copyCommand = (slug: string) => {
    navigator.clipboard.writeText(`npx vibe-ui add ${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const copyGeneralCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedSlug(cmd);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-sm shadow-lg shadow-indigo-500/20">
                ✨
              </span>
              Vibe<span className="text-indigo-400">UI</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
              v1.0.0 • Open Source
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyGeneralCommand('npx vibe-ui suggest')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 transition"
              title="Click to copy CLI suggest command"
            >
              <span className="text-indigo-400">$</span> npx vibe-ui suggest
              <span className="text-[10px] text-zinc-500 uppercase font-sans">
                {copiedSlug === 'npx vibe-ui suggest' ? 'Copied!' : 'Copy'}
              </span>
            </button>
            <a
              href="https://github.com/rselva1202/ZEURALABZ"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition"
            >
              GitHub ★
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Autonomous UI Design Matrix for AI Workspaces
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Make any website look <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">pretty</span>.
        </h1>
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto font-light">
          Install once, let AI suggest the best UI for your project.
          120 base components × 20 themes × 20 animations = <strong>1,000,000+</strong> aesthetic combinations.
        </p>

        {/* Combinations Math Explainer Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 inline-block text-xs text-zinc-400">
          <span className="text-indigo-300 font-bold">The 1M+ Formula:</span> 120 Base Components × 20 Themes × 20 Animations × 15 Layouts = <strong>720,000+</strong> permutations + on-demand variants = <strong>1M+</strong> styles.
        </div>
      </section>

      {/* Search & Category Filter Controls */}
      <section className="sticky top-16 z-30 bg-black/90 backdrop-blur-md py-4 border-b border-zinc-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search components (e.g. aurora, bento, tilt, button)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-zinc-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Theme preview selector */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="shrink-0 font-medium">Theme Preview:</span>
            <select
              value={activeTheme}
              onChange={(e) => setActiveTheme(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {(themesData as any[]).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.mood})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto mt-4 pb-1 text-xs no-scrollbar">
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
          <span className="text-zinc-600 ml-auto shrink-0 text-[11px]">
            Showing {filteredComponents.length} components
          </span>
        </div>
      </section>

      {/* Grid of Components */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {filteredComponents.length === 0 ? (
          <div className="text-center py-24 text-zinc-500">
            <p className="text-lg">No components matched "{searchQuery}" in this category.</p>
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
                  className="group rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  {/* Preview Banner */}
                  <div className="h-44 bg-zinc-900 relative flex items-center justify-center overflow-hidden border-b border-zinc-800/50">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10 opacity-70 group-hover:scale-105 transition duration-500" />
                    
                    {/* Simulated Component Graphic */}
                    <div className="relative text-center p-4">
                      <span className="text-3xl mb-2 block transform group-hover:scale-110 transition duration-300">
                        {comp.category === 'backgrounds' ? '🌌' :
                         comp.category === 'text-animations' ? '✍️' :
                         comp.category === 'buttons' ? '🔘' :
                         comp.category === 'cards' ? '🃏' :
                         comp.category === 'heroes' ? '🚀' :
                         comp.category === 'layouts' ? '📐' :
                         comp.category === 'forms' ? '📝' :
                         comp.category === 'loaders' ? '⏳' : '⚡'}
                      </span>
                      <div className="font-bold text-sm text-zinc-200">{comp.name}</div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{comp.slug}</div>
                    </div>

                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide uppercase bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 backdrop-blur-sm">
                      {comp.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {comp.description}
                      </p>

                      {/* Best for tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {comp.bestFor?.map((b) => (
                          <span
                            key={b}
                            className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-900 text-zinc-400 border border-zinc-800"
                          >
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between gap-2">
                      <button
                        onClick={() => copyCommand(comp.slug)}
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
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs transition"
                        title="View details & code"
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
      </main>

      {/* Code / Details Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
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

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 font-semibold block mb-1">Description</span>
                <p className="text-zinc-300">{selectedComponent.description}</p>
              </div>

              <div>
                <span className="text-zinc-500 font-semibold block mb-1">Install via CLI</span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black border border-zinc-800 font-mono text-indigo-400">
                  <span>npx vibe-ui add {selectedComponent.slug}</span>
                  <button
                    onClick={() => copyCommand(selectedComponent.slug)}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white text-[11px]"
                  >
                    {copiedSlug === selectedComponent.slug ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {selectedComponent.deps?.length > 0 && (
                <div>
                  <span className="text-zinc-500 font-semibold block mb-1">Required Dependencies</span>
                  <code className="text-yellow-400 font-mono">
                    npm install {selectedComponent.deps.join(' ')}
                  </code>
                </div>
              )}

              <div>
                <span className="text-zinc-500 font-semibold block mb-1">Files Generated</span>
                <ul className="list-disc pl-4 space-y-1 text-zinc-400 font-mono">
                  {selectedComponent.files.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-zinc-500 font-semibold block mb-1">React Import Example</span>
                <pre className="p-3 rounded-xl bg-black border border-zinc-800 text-zinc-300 font-mono overflow-x-auto">
{`import { ${selectedComponent.componentName} } from './components/vibe-ui/${selectedComponent.slug}/${selectedComponent.componentName}';

export default function MyPage() {
  return <${selectedComponent.componentName} />;
}`}
                </pre>
              </div>
            </div>

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

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 mt-auto text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-bold text-zinc-300">VibeUI</span> — Open source aesthetic component matrix.
            <div className="mt-1">Crafted with care by <a href="https://github.com/rselva1202" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">R. Selva</a>. MIT License.</div>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/rselva1202/ZEURALABZ" className="hover:text-zinc-300">GitHub</a>
            <a href="https://github.com/rselva1202/ZEURALABZ/blob/main/docs/INSTALL.md" className="hover:text-zinc-300">Docs</a>
            <a href="https://github.com/rselva1202/ZEURALABZ/blob/main/SKILL.md" className="hover:text-zinc-300">AI Skill</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

