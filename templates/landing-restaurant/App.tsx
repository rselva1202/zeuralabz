import React from 'react';
import { GradientBackground } from '../../components/backgrounds/gradient/GradientBackground';
import { GlassCard } from '../../components/cards/glass/GlassCard';
import { FloatingInput } from '../../components/forms/floating-input/FloatingInput';
import { SocialPillFooter } from '../../components/layouts/social-pill-footer/SocialPillFooter';

export default function RestaurantLandingPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-black">
      {/* 1. Atmosphere Hero */}
      <GradientBackground>
        <div className="max-w-4xl mx-auto px-6 py-28 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">Artisanal Culinary Experience</span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mt-4 mb-6 leading-tight">
            Sensory Flavors, Crafted with Precision.
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto mb-8 font-light">
            Locally sourced organic gastronomy served in an intimate architectural atmosphere.
          </p>
          <a
            href="#reserve"
            className="inline-block px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow-lg shadow-amber-500/20"
          >
            Reserve Table
          </a>
        </div>
      </GradientBackground>

      {/* 2. Tasting Menu Highlights */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-amber-200">The Tasting Flight</h2>
          <p className="text-stone-400 mt-2">Seven sensory courses paired with heritage vintages.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard
            title="Smoked Chanterelle"
            category="Course 01"
            description="Wild forest chanterelles infused with pine smoke, toasted hazelnut emulsion, and fermented leek oil."
          />
          <GlassCard
            title="Wagyu A5 Medallion"
            category="Course 04"
            description="Charcoal seared Miyazaki wagyu with black winter truffle jus and bone marrow glazed shallots."
          />
          <GlassCard
            title="Dark Cacao & Sea Salt"
            category="Course 07"
            description="Single-origin 74% Venezuelan chocolate crémeux, smoked sea salt crisp, and wild blackberry coulis."
          />
        </div>
      </section>

      {/* 3. Reservation Form */}
      <section id="reserve" className="py-20 bg-stone-900/60 border-y border-stone-800">
        <div className="max-w-md mx-auto px-6 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4">Book Your Evening</h3>
          <p className="text-stone-400 text-sm mb-6">Reservations release 30 days in advance at midnight.</p>
          <div className="space-y-4 text-left">
            <FloatingInput label="Full Name" placeholder="e.g. Eleanor Vance" />
            <FloatingInput label="Email Address" type="email" placeholder="eleanor@example.com" />
            <FloatingInput label="Guest Count" placeholder="2 Guests" />
            <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition mt-2">
              Confirm Reservation Request
            </button>
          </div>
        </div>
      </section>

      {/* 4. Social Pill Footer */}
      <footer className="py-12 flex justify-center">
        <SocialPillFooter />
      </footer>
    </div>
  );
}

