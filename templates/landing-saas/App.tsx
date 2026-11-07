import React from 'react';
import { AuroraBackground } from '../../components/backgrounds/aurora/AuroraBackground';
import { CenterHero } from '../../components/heroes/center-hero/CenterHero';
import { ShimmerButton } from '../../components/buttons/shimmer/ShimmerButton';
import { GlassCard } from '../../components/cards/glass/GlassCard';
import { FloatingPillNav } from '../../components/layouts/floating-pill-nav/FloatingPillNav';
import { InfiniteMarquee } from '../../components/animations/marquee/InfiniteMarquee';

export default function SaasLandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white">
      {/* 1. Floating Navigation */}
      <div className="fixed top-6 inset-x-0 z-50 flex justify-center">
        <FloatingPillNav />
      </div>

      {/* 2. Hero with Aurora Background */}
      <AuroraBackground className="min-h-[85vh] flex flex-col items-center justify-center pt-24 px-4 text-center">
        <CenterHero />
        <div className="mt-8 flex gap-4 items-center justify-center">
          <ShimmerButton text="Start Building Free ➔" />
          <button className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800 transition">
            Book Demo
          </button>
        </div>
      </AuroraBackground>

      {/* 3. Partner Marquee */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/80">
        <div className="text-center text-xs uppercase tracking-widest text-zinc-500 mb-6">
          Trusted by high-growth engineering teams worldwide
        </div>
        <InfiniteMarquee />
      </section>

      {/* 4. Bento Grid Features */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Engineered for Velocity.</h2>
          <p className="text-zinc-400 mt-4 text-lg">Every element crafted to convert visitors into die-hard users.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard
            title="AI Architecture Analysis"
            description="Scans project structure to match the ideal UI layout and animations automatically."
            badge="Intelligent"
          />
          <GlassCard
            title="1M+ Combinations"
            description="Parametric design matrix across 120 components, 20 themes, and 20 animations."
            badge="Infinite"
          />
          <GlassCard
            title="Single Command Install"
            description="Copy-paste ready TypeScript and Tailwind components right into your src folder."
            badge="Zero Lock-in"
          />
        </div>
      </section>

      {/* 5. Minimalist Footer */}
      <footer className="py-12 border-t border-zinc-900 text-center text-xs text-zinc-600">
        <p>© 2026 ZEURALABZ. Built with craft by R. Selva. Distributed under MIT License.</p>
      </footer>
    </div>
  );
}

