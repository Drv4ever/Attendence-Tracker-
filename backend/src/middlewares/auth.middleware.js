import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid"
    });
  }

    const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Invalid token format"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid"
    });
  }
};

export default authMiddleware;
