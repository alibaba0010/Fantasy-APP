import { Router } from "express";
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  getRoster,
  setLineup,
} from "../controllers/teamController";
import { authenticateJWT } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { body } from "express-validator";

const router = Router();

router.post(
  "/",
  authenticateJWT,
  validate([
    body("leagueId").notEmpty().withMessage("leagueId is required"),
    body("teamName").notEmpty().withMessage("teamName is required"),
  ]),
  createTeam
);
router.get("/:leagueId", authenticateJWT, getTeams);
router.get("/team/:id", authenticateJWT, getTeam);
router.put(
  "/team/:id",
  authenticateJWT,
  validate([body("teamName").optional().isString()]),
  updateTeam
);
router.delete("/team/:id", authenticateJWT, deleteTeam);
router.get("/team/:id/roster", authenticateJWT, getRoster);
router.post("/team/:id/lineup", authenticateJWT, setLineup);

export default router;
