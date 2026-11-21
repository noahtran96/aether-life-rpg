import React, { useState } from "react";

interface AuthScreenProps {
  onLoginSuccess: (callsign: string) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [callsign, setCallsign] = useState("Cosmic Traveler");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(callsign.trim() || "CosmicTraveler");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="cosmic-card w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header branding */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 items-center justify-center font-mono font-bold text-void-950 text-lg shadow-lg shadow-cyan-500/30 mb-1">
            <img
              src="/aether-logo.png"
              alt="Aether Logo"
              className="w-14 h-14 mx-auto rounded-2xl object-cover border border-cyan-400/40 shadow-lg shadow-cyan-500/30 mb-1"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            AETHER ORBITAL GATE
          </h1>
          <p className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
            {isRegister
              ? "Initialize New Traveler Profile"
              : "Access Command Network"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Traveler Callsign
              </label>
              <input
                type="text"
                value={callsign}
                onChange={(e) => setCallsign(e.target.value)}
                placeholder="e.g. StarLord"
                required
                className="w-full bg-void-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="traveler@aether.org"
              required
              className="w-full bg-void-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Security Key (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-void-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl font-mono text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-void-950 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {isRegister ? "Register & Initialize Orbit" : "Enter Orbit"}
          </button>
        </form>

        {/* Toggle mode & Credit footer */}
        <div className="text-center space-y-4 pt-2 border-t border-white/10 relative z-10">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-slate-400 hover:text-cyan-300 transition-colors font-mono"
          >
            {isRegister
              ? "Already have an orbit? Access Login"
              : "Need a traveler profile? Register"}
          </button>
          <div className="text-[10px] font-mono text-slate-500 tracking-wider">
            A product from{" "}
            <span className="text-purple-400">The Hardworking Sloth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
