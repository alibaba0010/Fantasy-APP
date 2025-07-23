import { Router } from "express";
import {
  getDraftRoom,
  startDraft,
  pauseDraft,
  makePick,
  getAvailablePlayers,
} from "../controllers/draftController";
import { authenticateJWT } from "../middleware/auth";

/**
 * @swagger
 * tags:
 *   name: Draft
 *   description: Draft management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DraftRoom:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         leagueId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, active, paused, completed]
 *         currentPick:
 *           type: number
 *         draftOrder:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/draft/{leagueId}:
 *   get:
 *     tags: [Draft]
 *     security:
 *       - BearerAuth: []
 *     summary: Get draft room details
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Draft room details retrieved successfully
 *
 * /api/draft/{leagueId}/start:
 *   post:
 *     tags: [Draft]
 *     security:
 *       - BearerAuth: []
 *     summary: Start draft
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Draft started successfully
 *
 * /api/draft/{leagueId}/pause:
 *   post:
 *     tags: [Draft]
 *     security:
 *       - BearerAuth: []
 *     summary: Pause draft
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Draft paused successfully
 *
 * /api/draft/{leagueId}/pick:
 *   post:
 *     tags: [Draft]
 *     security:
 *       - BearerAuth: []
 *     summary: Make draft pick
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playerId
 *             properties:
 *               playerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pick made successfully
 *
 * /api/draft/{leagueId}/available:
 *   get:
 *     tags: [Draft]
 *     security:
 *       - BearerAuth: []
 *     summary: Get available players for draft
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Available players list retrieved successfully
 */

const router = Router();

router.get("/:leagueId", authenticateJWT, getDraftRoom);
router.post("/:leagueId/start", authenticateJWT, startDraft);
router.post("/:leagueId/pause", authenticateJWT, pauseDraft);
router.post("/:leagueId/pick", authenticateJWT, makePick);
router.get("/:leagueId/available", authenticateJWT, getAvailablePlayers);

export default router;
