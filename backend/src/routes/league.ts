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

/**
 * @swagger
 * tags:
 *   name: Leagues
 *   description: League management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     League:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         ownerId:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/leagues:
 *   get:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Get all leagues for current user
 *     responses:
 *       200:
 *         description: List of leagues retrieved successfully
 *   post:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new league
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: League created successfully
 *
 * /api/leagues/{id}:
 *   get:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Get league by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: League details retrieved successfully
 *   put:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Update league
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: League updated successfully
 *   delete:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Delete league
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: League deleted successfully
 *
 * /api/leagues/{id}/join:
 *   post:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Join a league
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - inviteCode
 *             properties:
 *               inviteCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully joined league
 *
 * /api/leagues/{id}/invite:
 *   post:
 *     tags: [Leagues]
 *     security:
 *       - BearerAuth: []
 *     summary: Generate invite code for league
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invite code generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inviteCode:
 *                   type: string
 */
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
