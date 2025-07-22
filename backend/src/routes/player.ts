import { Router } from "express";
import {
  getPlayers,
  getPlayer,
  getPlayerStats,
  syncPlayers,
} from "../controllers/playerController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/", authenticateJWT, getPlayers);
router.get("/:id", authenticateJWT, getPlayer);
router.get("/:id/stats", authenticateJWT, getPlayerStats);
router.post("/sync", authenticateJWT, syncPlayers);

export default router;
