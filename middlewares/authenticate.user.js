import jwt from "jsonwebtoken";
import User from "../src/user/user.model.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
