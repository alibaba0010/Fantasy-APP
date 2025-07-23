import { Router } from "express";
import {
  getMatchups,
  getWeeklyMatchups,
  getStandings,
} from "../controllers/matchupController";
import { authenticateJWT } from "../middleware/auth";

/**
 * @swagger
 * tags:
 *   name: Matchups
 *   description: Matchup and standings management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Matchup:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         week:
 *           type: number
 *         homeTeamId:
 *           type: string
 *         awayTeamId:
 *           type: string
 *         homeScore:
 *           type: number
 *         awayScore:
 *           type: number
 *         status:
 *           type: string
 *           enum: [scheduled, in_progress, completed]
 */

/**
 * @swagger
 * /api/matchups:
 *   get:
 *     tags: [Matchups]
 *     security:
 *       - BearerAuth: []
 *     summary: Get all matchups for the league
 *     parameters:
 *       - in: query
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matchups retrieved successfully
 *
 * /api/matchups/week/{weekNumber}:
 *   get:
 *     tags: [Matchups]
 *     security:
 *       - BearerAuth: []
 *     summary: Get matchups for a specific week
 *     parameters:
 *       - in: path
 *         name: weekNumber
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weekly matchups retrieved successfully
 *
 * /api/matchups/standings:
 *   get:
 *     tags: [Matchups]
 *     security:
 *       - BearerAuth: []
 *     summary: Get league standings
 *     parameters:
 *       - in: query
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: League standings retrieved successfully
 */

const router = Router();

router.get("/:leagueId", authenticateJWT, getMatchups);
router.get("/:leagueId/week/:week", authenticateJWT, getWeeklyMatchups);
router.get("/:leagueId/standings", authenticateJWT, getStandings);

export default router;
