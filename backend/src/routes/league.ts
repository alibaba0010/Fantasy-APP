import { Router } from "express";
import {
  getLeagues,
  createLeague,
  getLeague,
  updateLeague,
  deleteLeague,
  joinLeague,
  generateInvite,
} from "../controllers/leagueController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/", authenticateJWT, getLeagues);
router.post("/", authenticateJWT, createLeague);
router.get("/:id", authenticateJWT, getLeague);
router.put("/:id", authenticateJWT, updateLeague);
router.delete("/:id", authenticateJWT, deleteLeague);
router.post("/join", authenticateJWT, joinLeague);
router.post("/:id/invite", authenticateJWT, generateInvite);

export default router;
