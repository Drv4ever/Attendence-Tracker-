import express from "express";
import { markAttendance, getClassAttendance, getStudentAttendance } from "../controllers/attendance.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Only teachers can mark attendance
router.post("/mark", authMiddleware, roleMiddleware(["teacher"]), markAttendance);

// Teachers + students can view class attendance
router.get("/class/:classId", authMiddleware, roleMiddleware(["teacher","student"]), getClassAttendance);

// Students (or teachers) can view individual student attendance
router.get("/student/:studentId", authMiddleware, roleMiddleware(["teacher","student"]), getStudentAttendance);

export default router;
