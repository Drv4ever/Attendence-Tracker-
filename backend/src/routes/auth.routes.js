import express from "express";
import { signup, login, me } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { z } from "zod";

const router = express.Router();

// Signup schema
const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["teacher", "student"])
});

// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// POST /auth/signup
router.post("/signup", async (req, res) => {
  console.log("REQ BODY 👉", req.body);

  try {
    signupSchema.parse(req.body);
    await signup(req, res);
  } catch (err) {
    console.error("ZOD ERROR 👉", err.errors);

    return res.status(400).json({
      success: false,
      error: err.errors
    });
  }
});
// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    loginSchema.parse(req.body);
    await login(req, res);
  } catch {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema"
    });
  }
});

// GET /auth/me
router.get("/me", authMiddleware, me);

export default router;
