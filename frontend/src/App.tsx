import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="cosmic-card cosmic-card-hover max-w-md w-full rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            System Online
          </span>
          <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            LV. 01
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">
          Welcome to Aether
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          Cosmic noon theme calibrated. Ready to turn real-life habits into
          orbital XP.
        </p>

        <div className="pt-2">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
            <span>XP PROGRESS</span>
            <span className="text-cyan-300">40 / 100 XP</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-void-950/90 overflow-hidden border border-white/10">
            <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 neon-glow-cyan" />
          </div>
        </div>
      </div>
    </main>
  );
}
