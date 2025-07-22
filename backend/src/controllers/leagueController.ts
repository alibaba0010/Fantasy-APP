import { Request, Response } from "express";
import League from "../models/League";
import { nanoid } from "nanoid";

export const getLeagues = async (req: any, res: Response) => {
  try {
    const leagues = await League.find({ commissioner: req.user.id });
    res.json(leagues);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createLeague = async (req: any, res: Response) => {
  try {
    const {
      name,
      sport,
      draftType,
      scoringType,
      rosterSettings,
      draftDate,
      maxTeams,
    } = req.body;
    const inviteCode = nanoid(8);
    const league = new League({
      name,
      commissioner: req.user.id,
      sport,
      draftType,
      scoringType,
      rosterSettings,
      draftDate,
      maxTeams,
      inviteCode,
    });
    await league.save();
    res.status(201).json(league);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getLeague = async (req: Request, res: Response) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });
    res.json(league);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateLeague = async (req: Request, res: Response) => {
  try {
    const league = await League.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!league) return res.status(404).json({ message: "League not found" });
    res.json(league);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteLeague = async (req: Request, res: Response) => {
  try {
    const league = await League.findByIdAndDelete(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });
    res.json({ message: "League deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const joinLeague = async (req: any, res: Response) => {
  try {
    const { inviteCode } = req.body;
    const league = await League.findOne({ inviteCode });
    if (!league)
      return res.status(404).json({ message: "Invalid invite code" });
    // TODO: Add user to league's teams
    res.json({ message: "Joined league", league });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const generateInvite = async (req: Request, res: Response) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });
    // Optionally regenerate invite code
    res.json({ inviteCode: league.inviteCode });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
