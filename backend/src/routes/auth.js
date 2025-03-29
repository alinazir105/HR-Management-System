import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import { authMiddleware } from "./../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { password } = req.body;
  const email = req.body.Email;

  const results = await pool.query("Select * from users where email=$1", [
    email,
  ]);
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
  };
  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      return res.status(500).json({ message: "Session save failed" });
    }
    res.status(200).json({ message: "Login Successful" });
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
