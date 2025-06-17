import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not found",
        success: false,
      });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden: Invalid or expired token",
          success: false,
        });
      }

      // Optional: populate user from DB
      const user = await User.findById(decoded._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({
      message: "Server error during token verification",
      success: false,
    });
  }
};

export default protectRoute;
