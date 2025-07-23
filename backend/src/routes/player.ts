import { Router } from "express";
import {
  getPlayers,
  getPlayer,
  getPlayerStats,
  syncPlayers,
} from "../controllers/playerController";
import { authenticateJWT } from "../middleware/auth";

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Player management and statistics endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         team:
 *           type: string
 *         stats:
 *           type: object
 */

/**
 * @swagger
 * /api/players:
 *   get:
 *     tags: [Players]
 *     security:
 *       - BearerAuth: []
 *     summary: Get all players
 *     parameters:
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by player position
 *     responses:
 *       200:
 *         description: List of players retrieved successfully
 *
 * /api/players/sync:
 *   post:
 *     tags: [Players]
 *     security:
 *       - BearerAuth: []
 *     summary: Sync players data from external source
 *     responses:
 *       200:
 *         description: Players data synchronized successfully
 *
 * /api/players/{id}:
 *   get:
 *     tags: [Players]
 *     security:
 *       - BearerAuth: []
 *     summary: Get player by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player details retrieved successfully
 *
 * /api/players/{id}/stats:
 *   get:
 *     tags: [Players]
 *     security:
 *       - BearerAuth: []
 *     summary: Get player statistics
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player statistics retrieved successfully
 */

const router = Router();

router.get("/", authenticateJWT, getPlayers);
router.get("/:id", authenticateJWT, getPlayer);
router.get("/:id/stats", authenticateJWT, getPlayerStats);
router.post("/sync", authenticateJWT, syncPlayers);

export default router;
