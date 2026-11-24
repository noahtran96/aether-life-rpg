import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to Aether Core API Server!",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      users: "/api/users",
      quests: "/api/quests",
      rewards: "/api/rewards",
    },
  });
});

// Health check
app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const userCount = await prisma.user.count();
    res.json({
      status: "ONLINE",
      system: "Aether Core API",
      database: "CONNECTED",
      activeHunters: userCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
      error: String(error),
    });
  }
});

// Users API
// Get user list
app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Create new user
app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    const newUser = await prisma.user.create({
      data: { username, email },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      error: "Cannot create user. Username or email might already exist.",
    });
  }
});

// Quests API
// Get quest list
app.get("/api/quests", async (_req: Request, res: Response) => {
  try {
    const quests = await prisma.quest.findMany();
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Create new quest
app.post("/api/quests", async (req: Request, res: Response) => {
  try {
    const { title, description, rewardXp } = req.body;
    const newQuest = await prisma.quest.create({
      data: { title, description, rewardXp },
    });
    res.status(201).json(newQuest);
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});

// Rewards API
// Get reward list
app.get("/api/rewards", async (_req: Request, res: Response) => {
  try {
    const rewards = await prisma.reward.findMany();
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Create new reward
app.post("/api/rewards", async (req: Request, res: Response) => {
  try {
    const { name, cost } = req.body;
    const newReward = await prisma.reward.create({
      data: { name, cost },
    });
    res.status(201).json(newReward);
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Aether Backend Server running on http://localhost:${PORT}`);
});
