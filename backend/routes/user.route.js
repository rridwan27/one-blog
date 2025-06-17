import express from "express";
import {
  register,
  login,
  logout,
  googleAuth,
  googleLogin,
  me,
  updateProfile,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/google-auth", googleAuth);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/logout", logout);
router.get("/me", protectRoute, me);
router.put("/update", protectRoute, updateProfile);

export default router;
