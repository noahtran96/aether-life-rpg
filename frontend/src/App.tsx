import { useEffect, useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import AuthScreen from "./components/AuthScreen";
import CommandDeck from "./components/CommandDeck";
import { INITIAL_QUESTS, type Quest } from "./types/quest";
import DeployQuestModal from "./components/DeployQuestModal";
import { AstralVault } from "./components/AstralVault";
import { soundFX } from "./utils/audio";

const STORAGE_KEYS = {
  AUTH: "aether_is_authenticated",
  CALLSIGN: "aether_callsign",
  QUESTS: "aether_quests",
  SPENT_XP: "aether_spent_xp",
  STREAK_DATA: "aether_streak_data",
};

interface StreakData {
  lastCompletedDate: string;
  streakCount: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === "true";
  });
  const [callsign, setCallsign] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CALLSIGN) || "Cosmic Traveler";
  });
  const [activeTab, setActiveTab] = useState("deck");
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_QUESTS;
      }
    }
    return INITIAL_QUESTS;
  });

  const [spentXp, setSpentXp] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SPENT_XP);
    return saved ? Number(saved) : 0;
  });

  const [streakData, setStreakData] = useState<StreakData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error("Failed to retrieve streak data");
      }
    }
    return { lastCompletedDate: "", streakCount: 0 };
  });

  const [levelUpPopup, setLevelUpPopup] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SPENT_XP, String(spentXp));
  }, [spentXp]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(streakData));
  }, [streakData]);

  const earnedXp = quests
    .filter((quest) => quest.completed)
    .reduce((sum, quest) => sum + quest.xpReward, 0);
  const totalXp = 40 + earnedXp;

  const currentLevel = Math.floor(totalXp / 100) + 1;
  const xpInCurrentLevel = totalXp % 100;

  const handleToggleQuest = (questId: string) => {
    const targetQuest = quests.find((quest) => quest.id === questId);
    const willBeCompleted = targetQuest ? !targetQuest.completed : false;

    const futureEarnedXp = quests
      .map((quest) =>
        quest.id === questId ? { ...quest, completed: willBeCompleted } : quest,
      )
      .filter((quest) => quest.completed)
      .reduce((sum, quest) => sum + quest.xpReward, 0);

    const futureTotalXp = 40 + futureEarnedXp;
    const futureLevel = Math.floor(futureTotalXp / 100) + 1;

    if (willBeCompleted && futureLevel > currentLevel) {
      setLevelUpPopup(futureLevel);
      soundFX.playLevelUp();
      localStorage.setItem("aether_last_seen_level", String(futureLevel));
    }

    if (willBeCompleted) {
      soundFX.playQuestComplete();

      if (targetQuest?.category === "DAILY") {
        const todayStr = new Date().toISOString().split("T")[0];
        const yesterdayStr = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];

        if (streakData.lastCompletedDate !== todayStr) {
          if (streakData.lastCompletedDate === yesterdayStr) {
            setStreakData({
              lastCompletedDate: todayStr,
              streakCount: streakData.streakCount + 1,
            });
          } else {
            setStreakData({ lastCompletedDate: todayStr, streakCount: 1 });
          }
        }
      }
    }
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? { ...quest, completed: !quest.completed }
          : quest,
      ),
    );
  };

  const handleAddQuest = (newQuest: Quest) => {
    setQuests((prev) => [newQuest, ...prev]);
  };

  const handleRedeemReward = (rewardCost: number) => {
    setSpentXp((prev) => prev + rewardCost);
  };

  const toggleAudioMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundFX.isMuted = nextMute;
  };

  const handleLoginSuccess = (userCallsign: string) => {
    setCallsign(userCallsign);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEYS.AUTH, "true");
    localStorage.setItem(STORAGE_KEYS.CALLSIGN, userCallsign);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.CALLSIGN);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Level-up celebration banner overlay */}
      {levelUpPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-950/85 backdrop-blur-md animate-fadeIn">
          <div className="cosmic-card text-center p-8 rounded-3xl border border-amber-400/50 shadow-[0_0_50px_rgba(251,191,36,0.3)] space-y-4 max-w-md w-full animate-bounce">
            <span className="text-xs font-mono tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40">
              ORBITAL UPGRADE REACHED
            </span>
            <h2 className="text-3xl font-black text-white">LEVEL UP!</h2>
            <p className="text-sm font-mono text-cyan-300">
              Traveler {callsign} has ascended to{" "}
              <span className="text-amber-300 font-bold">
                Level {String(levelUpPopup).padStart(2, "0")}
              </span>
              !
            </p>
            <button
              onClick={() => setLevelUpPopup(null)}
              className="mt-4 px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-void-950 bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all cursor-pointer"
            >
              Continue Trajectory
            </button>
          </div>
        </div>
      )}

      {/* Top HUD navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        callsign={callsign}
        onLogout={handleLogout}
      />

      {/* Main content area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* XP & Streak status banner */}
        <section className="cosmic-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                Orbital Sync Active
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                LVL {String(currentLevel).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                🔥 {streakData.streakCount} Day Streak
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-100">
              Welcome back, {callsign}
            </h2>
            <p className="text-xs text-slate-400">
              Complete daily life quests to sustain your trajectory.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            {/* Audio mute toggle button */}
            <button
              onClick={toggleAudioMute}
              className="text-[10px] font-mono px-3 py-1 rounded-lg bg-void-950/80 border border-white/10 text-slate-300 hover:text-white transition-colors self-end cursor-pointer"
            >
              {isMuted ? "🔇 SFX Muted" : "🔊 SFX Active"}
            </button>
          </div>

          <div className="w-full sm:w-64 space-y-2 bg-void-950/60 p-3 rounded-xl border border-white/5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">
                LVL {String(currentLevel).padStart(2, "0")} PROGRESS
              </span>
              <span className="text-cyan-300">{xpInCurrentLevel} / 100 XP</span>
            </div>
            <div className="h-2 w-full rounded-full bg-void-900 overflow-hidden border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 neon-glow-cyan transition-all duration-500"
                style={{ width: `${xpInCurrentLevel}%` }}
              />
            </div>
          </div>
        </section>

        {/* Dynamic tab view content */}
        {activeTab === "deck" ? (
          <CommandDeck
            quests={quests}
            onToggleQuest={handleToggleQuest}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
          />
        ) : (
          <AstralVault
            currentTotalXp={totalXp}
            spentXp={spentXp}
            onRedeemReward={handleRedeemReward}
          />
        )}
      </main>

      {/* Deploy new directive modal */}
      <DeployQuestModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onAddQuest={handleAddQuest}
      />
    </div>
  );
}
