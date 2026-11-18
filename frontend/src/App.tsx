import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";

export default function App() {
  const [activeTab, setActiveTab] = useState("deck");
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top HUD navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* XP quick status banner */}
        <section className="cosmic-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              Orbital Sync Active
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              Welcome back, Traveler
            </h2>
            <p className="text-xs text-slate-400">
              Complete daily life quests to sustain your trajectory.
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-2 bg-void-950/60 p-3 rounded-xl border border-white/5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">LVL 01 PROGRESS</span>
              <span className="text-cyan-300">40 / 100 XP</span>
            </div>
            <div className="h-2 w-full rounded-full bg-void-900 overflow-hidden border border-white/10">
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 neon-glow-cyan" />
            </div>
          </div>
        </section>

        {/* Dynamic tab view content */}
        <section className="cosmic-card rounded-2xl p-6 min-h-[320px] flex items-center justify-center text-center">
          {activeTab === "deck" ? (
            <div className="space-y-2">
              <h3 className="text-base font-mono font-semibold text-cyan-300">
                Command Deck View
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                Quest list and daily life missions will be loaded here in ticket{" "}
                <span className="text-white font-mono">AETH-005-FE</span>
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-base font-mono font-semibold text-purple-300">
                Astral Vault View
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                Titles, achievements, and personal rewards catalog will be
                displayed here in ticket{" "}
                <span className="text-white font-mono">AETH-007-FE</span>
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
