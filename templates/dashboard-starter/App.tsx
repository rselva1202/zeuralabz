import React from 'react';
import { SidebarLayout } from '../../components/layouts/sidebar/SidebarLayout';
import { SearchInput } from '../../components/forms/search/SearchInput';
import { SkeletonLoader } from '../../components/loaders/skeleton/SkeletonLoader';

export default function DashboardStarterPage() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      {/* 1. Sidebar */}
      <SidebarLayout />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-900/40 backdrop-blur-md">
          <div className="w-72">
            <SearchInput />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-400">Org: <strong className="text-white">Zeura Technologies</strong></span>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
              RS
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-8 space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Metrics Overview</h1>
            <p className="text-sm text-zinc-400">Real-time telemetry and component utilization across production clusters.</p>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Total Installations</span>
              <div className="text-3xl font-black mt-2 text-white">1,248,390</div>
              <div className="text-xs text-emerald-400 mt-2 font-medium">↑ +18.4% this month</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Avg Render Latency</span>
              <div className="text-3xl font-black mt-2 text-emerald-400">4.2 ms</div>
              <div className="text-xs text-zinc-400 mt-2">Zero frame drops recorded</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Combinations Active</span>
              <div className="text-3xl font-black mt-2 text-indigo-400">920,000+</div>
              <div className="text-xs text-zinc-400 mt-2">Across 20 design themes</div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Uptime SLA</span>
              <div className="text-3xl font-black mt-2 text-white">99.99%</div>
              <div className="text-xs text-emerald-400 mt-2">Global edge CDN healthy</div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <h3 className="text-base font-bold mb-4">Realtime Streaming Events</h3>
            <div className="space-y-3">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

