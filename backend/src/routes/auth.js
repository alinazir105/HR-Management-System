import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "./../middleware/authMiddleware.js";
import { server } from "../server.js";
import { initializeSocket } from "../util/notificationSocket.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const results = await pool.query(
    `SELECT u.id, u.role, u.email, u.password, e.employeeid
    FROM users u
    LEFT JOIN employees e ON u.id = e.userid
    WHERE u.email = $1`,
    [email]
  );
  if (results.rows.length == 0) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const userData = results.rows[0];
  const matched = await bcrypt.compare(password, userData.password);
  if (!matched) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  req.session.data = {
    id: userData.id,
    role: userData.role,
    username: userData.username,
    email: userData.email,
    employeeid: userData.employeeid,
  };
  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      return res.status(500).json({ message: "Session save failed" });
    }
    res.status(200).json({
      message: "Login Successful",
      id: userData.id,
      role: userData.role,
    });
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: req.session.data });
});

export default router;
