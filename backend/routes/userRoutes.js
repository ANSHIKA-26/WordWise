import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  ForgotPassWordEmail,
  ResetPassword,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { userValidation } from "../validations/userValidation.js";
const router = express.Router();

// Public routes
router.post("/register", userValidation, registerUser);
router.post("/login", loginUser);

// Authenticated route to get user profile
router.get("/profile", authMiddleware, getUserProfile);

// Admin route to get all users
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

router.post("/forgotpassword", ForgotPassWordEmail);

router.post("/resetpassword", ResetPassword);

export default router;
