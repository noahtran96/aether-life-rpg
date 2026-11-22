import React, { useState } from "react";
import type { Quest, QuestCategory, QuestDifficulty } from "../types/quest";

interface DeployQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuest: (newQuest: Quest) => void;
}

const DIFFICULTY_XP_MAP: Record<QuestDifficulty, number> = {
  E: 20,
  D: 35,
  C: 50,
  B: 75,
  A: 100,
  S: 150,
};

export default function DeployQuestModal({
  isOpen,
  onClose,
  onAddQuest,
}: DeployQuestModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<QuestCategory>("DAILY");
  const [difficulty, setDifficulty] = useState<QuestDifficulty>("D");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQuest: Quest = {
      id: `quest-${Date.now()}`,
      title: title.trim(),
      description:
        description.trim() || "Custom orbital directive deployed by traveler.",
      category,
      difficulty,
      xpReward: DIFFICULTY_XP_MAP[difficulty],
      completed: false,
      dueLabel: "Custom Directive",
    };

    onAddQuest(newQuest);
    setTitle("");
    setDescription("");
    setCategory("DAILY");
    setDifficulty("D");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="cosmic-card w-full max-w-lg rounded-2xl p-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] space-y-5">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              DEPLOY NEW DIRECTIVE
            </h3>
            <p className="text-xs font-mono text-cyan-400/80">
              Configure mission parameters
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-mono text-sm px-2.5 py-1 rounded-lg bg-void-900 border border-white/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Directive Title <span className="text-pink-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Read 1 chapter of system architecture"
              className="w-full bg-void-950/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Mission Brief / Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional details or sub-steps..."
              className="w-full bg-void-950/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono resize-none"
            />
          </div>

          {/* Category & Difficulty grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Sector / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestCategory)}
                className="w-full bg-void-950/90 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 transition-all"
              >
                <option value="DAILY">DAILY (Routine)</option>
                <option value="MAIN">MAIN (Core Objective)</option>
                <option value="SIDE">SIDE (Optional)</option>
              </select>
            </div>

            {/* Difficulty rank */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Difficulty Rank
              </label>
              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value as QuestDifficulty)
                }
                className="w-full bg-void-950/90 border border-white/15 rounded-xl px-3 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 transition-all"
              >
                <option value="E">RANK E (+20 XP)</option>
                <option value="D">RANK D (+35 XP)</option>
                <option value="C">RANK C (+50 XP)</option>
                <option value="B">RANK B (+75 XP)</option>
                <option value="A">RANK A (+100 XP)</option>
                <option value="S">RANK S (+150 XP)</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-void-900 border border-white/10 transition-colors cursor-pointer"
            >
              Abort
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-void-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
            >
              Initialize Directive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
