import { clsx } from "clsx";
import { useState } from "react";

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  xpCost: number;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  icon: string;
}

const INITIAL_REWARDS: RewardItem[] = [
  {
    id: "reward-1",
    title: "1 Episode of Netflix / Anime",
    description:
      "Unwind and watch 1 episode of your favorite show without guilt.",
    xpCost: 100,
    rarity: "COMMON",
    icon: "🍿",
  },
  {
    id: "reward-2",
    title: "Bubble Tea / Specialty Coffee",
    description: "Treat yourself to a nice beverage during a deep work break.",
    xpCost: 180,
    rarity: "COMMON",
    icon: "🧋",
  },
  {
    id: "reward-3",
    title: "30 Minutes Gaming Session",
    description: "Enjoy 30 minutes of uninhibited video game time.",
    xpCost: 250,
    rarity: "RARE",
    icon: "🎮",
  },
  {
    id: "reward-4",
    title: "Good Quality Snack / Dessert",
    description: "Grab a delicious pastry, cake, or favorite snack.",
    xpCost: 200,
    rarity: "COMMON",
    icon: "🍰",
  },
  {
    id: "reward-5",
    title: "Half-Day Off / Chill Afternoon",
    description:
      "Take a half-day break from heavy tasks to recharge your energy.",
    xpCost: 800,
    rarity: "EPIC",
    icon: "🌌",
  },
  {
    id: "reward-6",
    title: "Full Day Off / Weekend Trip",
    description:
      "A full day dedicated entirely to leisure, nature, or hanging out.",
    xpCost: 1500,
    rarity: "LEGENDARY",
    icon: "🚀",
  },
];

const RARITY_STYLES: Record<RewardItem["rarity"], string> = {
  COMMON: "text-slate-300 bg-slate-500/15 border-slate-500/30",
  RARE: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30",
  EPIC: "text-purple-300 bg-purple-500/15 border-purple-500/30",
  LEGENDARY:
    "text-amber-300 bg-amber-500/20 border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.25)]",
};

interface AstralVaultProps {
  currentTotalXp: number;
  spentXp: number;
  onRedeemReward: (rewardCost: number) => void;
}

export function AstralVault({
  currentTotalXp,
  spentXp,
  onRedeemReward,
}: AstralVaultProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableXp = currentTotalXp - spentXp;

  const handleClaim = (reward: RewardItem) => {
    if (availableXp < reward.xpCost) return;

    onRedeemReward(reward.xpCost);
    setToastMessage(
      `Successfully claimed: ${reward.title}! (-${reward.xpCost} XP)`,
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-950/90 border border-cyan-400/50 text-cyan-200 px-4 py-3 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.3)] backdrop-blur-md flex items-center gap-3 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Vault stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cosmic-card rounded-2xl p-5 border border-purple-500/20">
        <div>
          <h3 className="text-lg font-bold tracking-wide text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            ASTRAL VAULT & REWARDS CATALOG
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Spend accumulated XP to redeem real-life milestones and leisure
            items.
          </p>
        </div>

        <div className="bg-void-950/80 px-4 py-2.5 rounded-xl border border-purple-500/30 text-right">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Available Balance
          </div>
          <div className="text-sm font-mono font-bold text-purple-300">
            {availableXp} XP
          </div>
        </div>
      </div>

      {/* Rewards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_REWARDS.map((reward) => {
          const canAfford = availableXp >= reward.xpCost;

          return (
            <div
              key={reward.id}
              className={clsx(
                "cosmic-card rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all relative overflow-hidden",
                !canAfford && "opacity-60",
              )}
            >
              {/* Top info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 rounded-xl bg-void-950/80 border border-white/10">
                    {reward.icon}
                  </span>
                  <span
                    className={clsx(
                      "text-[10px] font-mono px-2 py-0.5 rounded border",
                      RARITY_STYLES[reward.rarity],
                    )}
                  >
                    {reward.rarity}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-100">
                    {reward.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {reward.description}
                  </p>
                </div>
              </div>

              {/* Bottom: Cost & Redeem CTA */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {reward.xpCost} XP
                </span>

                <button
                  onClick={() => handleClaim(reward)}
                  disabled={!canAfford}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer",
                    canAfford
                      ? "bg-purple-500 hover:bg-purple-400 text-void-950 shadow-[0_0_15px_rgba(168,85,247,0.4]"
                      : "bg-void-900 text-slate-600 border border-white/5 cursor-not-allowed",
                  )}
                >
                  {canAfford ? "Redeem" : "Insufficient XP"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
