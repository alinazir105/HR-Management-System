import bcrypt from "bcrypt";
import pool from "../db.js";
import express from "express";

const router = express.Router();

router.post("/insertUser", async (req, res) => {
  const { email, role, password, username } = req.body;

  if (!email || !role || !password || !username) {
    return res.status(400).json({ message: "Incomplete data" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password, role,username) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, role, username]
    );
    res.json({ message: `Inserted user` });
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(400).json({ message: "Error inserting user" });
  }
});

export default router;
