export type QuestCategory = "DAILY" | "MAIN" | "SIDE";
export type QuestDifficulty = "E" | "D" | "C" | "B" | "A" | "S";

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xpReward: number;
  completed: boolean;
  dueLabel?: string;
}

export const INITIAL_QUESTS: Quest[] = [
  {
    id: "q-1",
    title: "Morning Hydration & Orbit Stretch",
    description:
      "Drink 500ml of water and stretch for 10 minutes after waking up.",
    category: "DAILY",
    difficulty: "E",
    xpReward: 20,
    completed: false,
    dueLabel: "Resets in 14h",
  },
  {
    id: "q-2",
    title: "Deep Work: Ship Aether Command Deck",
    description:
      "Complete 90 minutes of uninterrupted coding on core frontend architecture.",
    category: "MAIN",
    difficulty: "B",
    xpReward: 75,
    completed: false,
    dueLabel: "Priority Objective",
  },
  {
    id: "q-3",
    title: "Zero-Gravity Inbox Cleanup",
    description: "Archive old notifications and organize workspace tasks.",
    category: "SIDE",
    difficulty: "D",
    xpReward: 35,
    completed: false,
    dueLabel: "Optional",
  },
  {
    id: "q-4",
    title: "Evening Nebula Walk",
    description: "Step away from screens and walk 5,000 steps outdoors.",
    category: "DAILY",
    difficulty: "C",
    xpReward: 40,
    completed: true,
    dueLabel: "Completed",
  },
];
