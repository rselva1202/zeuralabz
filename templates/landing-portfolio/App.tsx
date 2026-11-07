import React from 'react';
import { GalaxyBackground } from '../../components/backgrounds/galaxy/GalaxyBackground';
import { SplitHero } from '../../components/heroes/split-hero/SplitHero';
import { TiltCard } from '../../components/cards/tilt/TiltCard';
import { MagneticButton } from '../../components/buttons/magnetic/MagneticButton';
import { MinimalFooter } from '../../components/layouts/minimal-footer/MinimalFooter';

export default function PortfolioLandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Galaxy Cosmic Hero */}
      <GalaxyBackground>
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SplitHero />
          <div className="mt-8 flex gap-4">
            <MagneticButton text="View Open Source Projects" />
            <button className="px-6 py-3 rounded-full border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-medium transition">
              Read Technical Articles
            </button>
          </div>
        </div>
      </GalaxyBackground>

      {/* 2. Featured Projects Grid with 3D Tilt */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Engineering Work</h2>
        <p className="text-zinc-400 mb-12">Production systems, micro-interactions, and open-source infrastructure.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TiltCard
            title="VibeUI Design Engine"
            category="Open Source CLI"
            description="Autonomous UI recommendation tool and 120-component design matrix with MCP protocol support."
          />
          <TiltCard
            title="Distributed Workflow Orchestrator"
            category="Backend Architecture"
            description="Fault-tolerant stream processing pipeline processing 40M+ events/day."
          />
          <TiltCard
            title="Reactive Shader Canvas"
            category="WebGL & Graphics"
            description="GPU-accelerated procedural noise patterns running at steady 60fps."
          />
          <TiltCard
            title="Neural Voice Agent Interface"
            category="AI / Front-end"
            description="Sub-200ms latency voice interface with live audio waveform visualization."
          />
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="py-8 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <MinimalFooter />
        </div>
      </footer>
    </div>
  );
}
