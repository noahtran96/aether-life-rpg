import { useState } from "react";
import type { Quest, QuestCategory, QuestDifficulty } from "../types/quest";
import { clsx } from "clsx";

interface CommandDeckProps {
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
}

const DIFFICULTY_STYLES: Record<QuestDifficulty, string> = {
  E: "text-slate-300 bg-slate-500/15 border-slate-500/30",
  D: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
  C: "text-cyan-300 bg-cyan-500/15 border-cyan-500/30",
  B: "text-purple-300 bg-purple-500/15 border-purple-500/30",
  A: "text-pink-300 bg-pink-500/15 border-pink-500/30",
  S: "text-amber-300 bg-amber-500/20 border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.25)]",
};

const CATEGORY_STYLES: Record<QuestCategory, string> = {
  DAILY: "text-cyan-400",
  MAIN: "text-purple-400",
  SIDE: "text-pink-400",
};

export default function CommandDeck({
  quests,
  onToggleQuest,
}: CommandDeckProps) {
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "COMPLETED"
  >("ALL");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | QuestCategory>(
    "ALL",
  );

  const filteredQuests = quests.filter((quest) => {
    if (statusFilter === "ACTIVE" && quest.completed) return false;
    if (statusFilter === "COMPLETED" && !quest.completed) return false;
    if (categoryFilter !== "ALL" && quest.category !== categoryFilter)
      return false;
    return true;
  });

  const activeCount = quests.filter((quest) => !quest.completed).length;
  const completedCount = quests.filter((quest) => quest.completed).length;

  return (
    <div className="space-y-5">
      {/* Header & Stats summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold tracking-wide text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            COMMAND DECK
          </h3>
          <p className="text-xs font-mono text-slate-400">
            {activeCount} Active Directives • {completedCount} Logged
          </p>
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-1 bg-void-950/70 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          {(["ALL", "ACTIVE", "COMPLETED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer ${statusFilter === status ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400 hover:text-slate-200"}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {(["ALL", "DAILY", "MAIN", "SIDE"] as const).map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-3 py-1 rounded-full text-[11px] font-mono border transition-all cursor-pointer ${categoryFilter === category ? "bg-purple-500/20 text-purple-200 border-purple-400/50 neon-glow-purple" : "bg-void-900/50 text-slate-400 border-white/10 hover:border-white/25"}`}
          >
            {" "}
            {category === "ALL" ? "All Sectors" : `${category} Quests`}
          </button>
        ))}
      </div>

      {/* Quest cards list */}
      {filteredQuests.length === 0 ? (
        <div className="cosmic-card rounded-2xl p-10 text-center space-y-2 border-dashed border-white/15">
          <p className="text-sm font-mono text-cyan-300">
            No directives in this sector.
          </p>
          <p className="text-xs text-slate-400">
            Adjust your orbital filters or deploy a new mission in the next
            update.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredQuests.map((quest) => (
            <div
              key={quest.id}
              onClick={() => onToggleQuest(quest.id)}
              className={`cosmic-card cosmic-card-hover rounded-2xl p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none ${quest.completed ? "opacity-60 border-white/5" : ""}`}
            >
              {/* Left: Custom checkbox + Quest info */}
              <div className="flex items-start gap-3.5">
                <button
                  aria-label={`Toggle ${quest.title}`}
                  className={clsx(
                    "mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all",
                    quest.completed
                      ? "bg-cyan-500 border-cyan-400 text-void-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                      : "bg-void-950/80 border-white/20 hover:border-cyan-400",
                  )}
                >
                  {quest.completed && "✓"}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${CATEGORY_STYLES[quest.category]}`}
                    >
                      [{quest.category}]
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${DIFFICULTY_STYLES[quest.difficulty]}`}
                    >
                      RANK {quest.difficulty}
                    </span>
                    {quest.dueLabel && (
                      <span className="text-[10px] font-mono text-slate-500">
                        • {quest.dueLabel}
                      </span>
                    )}
                  </div>

                  <h4
                    className={`text-sm sm:text-base font-semibold transition-colors ${
                      quest.completed
                        ? "line-through text-slate-400"
                        : "text-slate-100"
                    }`}
                  >
                    {quest.title}
                  </h4>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {quest.description}
                  </p>
                </div>
              </div>

              {/* Right: XP reward pill */}
              <div className="shrink-0 text-right">
                <div
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                    quest.completed
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                  }`}
                >
                  +{quest.xpReward} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
