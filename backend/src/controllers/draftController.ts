import { Request, Response } from "express";
import DraftRoom from "../models/DraftRoom";

export const getDraftRoom = async (req: Request, res: Response) => {
  try {
    const draftRoom = await DraftRoom.findOne({
      leagueId: req.params.leagueId,
    });
    if (!draftRoom)
      return res.status(404).json({ message: "Draft room not found" });
    res.json(draftRoom);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const startDraft = async (req: Request, res: Response) => {
  // Placeholder logic
  res.json({ message: "Draft started (not implemented)" });
};

export const pauseDraft = async (req: Request, res: Response) => {
  // Placeholder logic
  res.json({ message: "Draft paused (not implemented)" });
};

export const makePick = async (req: Request, res: Response) => {
  // Placeholder logic
  res.json({ message: "Pick made (not implemented)" });
};

export const getAvailablePlayers = async (req: Request, res: Response) => {
  // Placeholder logic
  res.json({ message: "Available players (not implemented)" });
};
