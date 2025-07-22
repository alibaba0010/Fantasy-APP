import { Router } from "express";
import {
  getTeams,
  getTeam,
  updateTeam,
  getRoster,
  setLineup,
} from "../controllers/teamController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/:leagueId", authenticateJWT, getTeams);
router.get("/team/:id", authenticateJWT, getTeam);
router.put("/team/:id", authenticateJWT, updateTeam);
router.get("/team/:id/roster", authenticateJWT, getRoster);
router.post("/team/:id/lineup", authenticateJWT, setLineup);

export default router;
