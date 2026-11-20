interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  callsign: string;
  onLogout: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  callsign,
  onLogout,
}: NavbarProps) {
  const initials = callsign.slice(0, 2).toUpperCase() || "AE";
  return (
    <header className="sticky top-0 z-50 cosmic-card border-b border-white/10 px-4 py-3 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-mono font-bold text-void-950 shadow-lg shadow-cyan-500/20">
              <img
                src="/aether-logo.png"
                alt="Aether Logo"
                className="w-9 h-9 rounded-xl object-cover border border-cyan-400/40 shadow-lg shadow-cyan-500/20"
              />
            </div>
            <div>
              <h1 className="font-bold tracking-wider text-lg bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                AETHER
              </h1>
              <p className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
                Life RPG System
              </p>
            </div>
          </div>

          {/* Mobile status + Logout */}
          <div className="sm:hidden flex items-center gap-2">
            <span className="text-xs font-mono text-purple-300 bg-void-900/80 px-2.5 py-1 rounded-full border border-purple-500/30">
              LV. 01
            </span>
            <button
              onClick={onLogout}
              title="Exit Orbit"
              className="text-xs font-mono text-slate-400 hover:text-pink-400 bg-void-900/80 px-2.5 py-1 rounded-full border border-white/10 transition-colors cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 bg-void-950/60 p-1 rounded-xl border border-white/10 w-full sm:w-auto justify-center">
          <button
            onClick={() => setActiveTab("deck")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${activeTab === "deck" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 neon-glow-cyan" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}
          >
            Command Deck
          </button>
          <button
            onClick={() => setActiveTab("vault")}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${activeTab === "vault" ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 neon-glow-purple" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}
          >
            Astral Vault
          </button>
        </nav>

        {/* User HUD profile + Logout (Desktop) */}
        <div className="hidden sm:flex items-center gap-3 bg-void-900/60 px-3.5 py-1.5 rounded-xl border border-white/10">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-200">{callsign}</div>
            <div className="text-[10px] font-mono text-purple-400">
              LV. 01 • Novice
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-mono text-xs text-purple-300">
            {initials}
          </div>
          <button
            onClick={onLogout}
            title="Exit Orbit"
            className="ml-1 pl-2.5 border-l border-white/10 text-[11px] font-mono text-slate-400 hover:text-pink-400 transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>
    </header>
  );
}
