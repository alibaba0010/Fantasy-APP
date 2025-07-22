import { Request, Response } from "express";
import Matchup from "../models/Matchup";

export const getMatchups = async (req: Request, res: Response) => {
  try {
    const matchups = await Matchup.find({ leagueId: req.params.leagueId });
    res.json(matchups);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getWeeklyMatchups = async (req: Request, res: Response) => {
  try {
    const matchups = await Matchup.find({
      leagueId: req.params.leagueId,
      week: req.params.week,
    });
    res.json(matchups);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getStandings = async (req: Request, res: Response) => {
  // Placeholder logic
  res.json({ message: "Standings not implemented" });
};
