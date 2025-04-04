import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/my-all", async (req, res) => {
  const { id } = req.session.data;
  try {
    const results = await pool.query(
      "Select * from leave_requests where userid = $1",
      [id]
    );
    if (results.rowCount == 0) {
      res.status(200).json({ leaves: [], message: "No leave records found" });
    } else {
      res.json({ leaves: results.rows });
    }
  } catch {
    res.status(500).json({ message: "Error while fetching leave_requests" });
  }
});

export default router;
