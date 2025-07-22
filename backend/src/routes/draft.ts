import { Router } from "express";
import {
  getDraftRoom,
  startDraft,
  pauseDraft,
  makePick,
  getAvailablePlayers,
} from "../controllers/draftController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/:leagueId", authenticateJWT, getDraftRoom);
router.post("/:leagueId/start", authenticateJWT, startDraft);
router.post("/:leagueId/pause", authenticateJWT, pauseDraft);
router.post("/:leagueId/pick", authenticateJWT, makePick);
router.get("/:leagueId/available", authenticateJWT, getAvailablePlayers);

export default router;
