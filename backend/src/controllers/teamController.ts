import { Request, Response, NextFunction } from "express";
import Team from "../models/Team";
import League from "../models/League";
import Player from "../models/Player";

export const createTeam = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { leagueId, teamName } = req.body;
    if (!leagueId || !teamName)
      return res
        .status(400)
        .json({ message: "leagueId and teamName are required" });
    const league = await League.findById(leagueId);
    if (!league) return res.status(404).json({ message: "League not found" });
    const team = new Team({
      leagueId,
      userId: req.user.id,
      teamName,
      roster: [],
      totalScore: 0,
      weeklyScores: [],
    });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

export const getTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const teams = await Team.find({ leagueId: req.params.leagueId });
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

export const getTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

export const updateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted" });
  } catch (err) {
    next(err);
  }
};

export const getRoster = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const team = await Team.findById(req.params.id).populate("roster.playerId");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team.roster);
  } catch (err) {
    next(err);
  }
};

export const setLineup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { starters } = req.body; // Array of playerIds
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    team.roster.forEach((slot) => {
      slot.isStarter = starters.includes(slot.playerId.toString());
    });
    await team.save();
    res.json(team);
  } catch (err) {
    next(err);
  }
};
