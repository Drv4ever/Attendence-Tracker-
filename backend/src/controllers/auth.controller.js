import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// POST /auth/signup
export const signup = async (req, res) => {

  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("SIGNUP ERROR 👉", err);
    res.status(500).json({
      success: false,
      error: "Server error during signup"
    });
  }
};

// POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return token at top-level so frontend code that checks `data.token` works
    res.json({
      success: true,
      token,
      data: { token }
    });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({
      success: false,
      error: "server error during login"
    });
  }
};

// GET /auth/me
export const me = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");

  res.json({
    success: true,
    data: user
  });
};
