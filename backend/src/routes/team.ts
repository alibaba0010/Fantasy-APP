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

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         ownerId:
 *           type: string
 *         leagueId:
 *           type: string
 *         roster:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/teams:
 *   get:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Get all teams for current user
 *     responses:
 *       200:
 *         description: List of teams retrieved successfully
 *   post:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - leagueId
 *             properties:
 *               name:
 *                 type: string
 *               leagueId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Team created successfully
 *
 * /api/teams/{id}:
 *   get:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Get team by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team details retrieved successfully
 *   put:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Update team
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
 *     responses:
 *       200:
 *         description: Team updated successfully
 *   delete:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Delete team
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *
 * /api/teams/{id}/roster:
 *   get:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Get team roster
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team roster retrieved successfully
 *
 * /api/teams/{id}/lineup:
 *   put:
 *     tags: [Teams]
 *     security:
 *       - BearerAuth: []
 *     summary: Set team lineup
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
 *               - lineup
 *             properties:
 *               lineup:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Team lineup set successfully
 */
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
