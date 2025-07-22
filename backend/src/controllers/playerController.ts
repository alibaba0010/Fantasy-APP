import { Request, Response } from "express";
import Player from "../models/Player";

export const getPlayers = async (req: Request, res: Response) => {
  try {
    // Add filtering/search logic as needed
    const players = await Player.find(req.query);
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getPlayerStats = async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player.stats);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const syncPlayers = async (req: Request, res: Response) => {
  // Placeholder: Only allow admin
  res.json({ message: "Player sync not implemented" });
};
