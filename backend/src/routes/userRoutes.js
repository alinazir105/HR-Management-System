import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`Select * from "Users"`);
    res.status(200).json({ message: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

router.post("/", (req, res) => {
  const { name } = req.body;
  res.json({ message: `User ${name} created successfully` });
});

export default router;
