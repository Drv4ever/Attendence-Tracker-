import Attendance from "../models/attendance.js";
import User from "../models/User.js";

// --------------------------
// Mark Attendance 
// --------------------------

export const markAttendance = async (req, res) => {
  try {
    const { studentId, classId, date, status } = req.body;

    if (!studentId || !classId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if attendance already exists
    const existing = await Attendance.findOne({ student: studentId, class: classId, date });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked" });
    }

    const attendance = new Attendance({
      student: studentId,
      class: classId,
      date,
      status, // "present" or "absent"
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// GET ATTENDANCE FOR A CLASS
// =========================
export const getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.params;

    const attendanceList = await Attendance.find({ class: classId })
      .populate("student", "name email")
      .sort({ date: 1 });

    res.status(200).json(attendanceList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// GET ATTENDANCE FOR A STUDENT
// =========================
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendanceList = await Attendance.find({ student: studentId })
      .populate("class", "name") // assuming Attendance has a class reference
      .sort({ date: 1 });

    res.status(200).json(attendanceList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};