import { Router } from "express";
import {
  getMatchups,
  getWeeklyMatchups,
  getStandings,
} from "../controllers/matchupController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/:leagueId", authenticateJWT, getMatchups);
router.get("/:leagueId/week/:week", authenticateJWT, getWeeklyMatchups);
router.get("/:leagueId/standings", authenticateJWT, getStandings);

export default router;
