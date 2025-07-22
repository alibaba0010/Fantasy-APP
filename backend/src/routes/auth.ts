import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authenticateJWT, getProfile);
router.put("/profile", authenticateJWT, updateProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
