import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";

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

  req.session.user = {
    id: userData.id,
    role: userData.role,
  };
  res.status(200).json({ message: "Login Successful" });
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

export default router;
