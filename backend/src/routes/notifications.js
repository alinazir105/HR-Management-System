import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { id, role } = req.session.data;

  let targetCondition = "";
  let params = [];

  if (role === "hr") {
    targetCondition = `user_id = $1`;
    params = ["hr"];
  } else {
    targetCondition = `(user_id = 'employees' OR user_id = $1)`;
    params = [id];
  }

  try {
    const results = await pool.query(
      `
      SELECT * FROM notifications
      WHERE ${targetCondition}
        AND NOT read_by @> $2::jsonb
      ORDER BY created_at DESC
      `,
      [...params, JSON.stringify([id])]
    );
    res.json({ notifications: results.rows });
  } catch {
    console.error("Error fetching notifications");
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

router.put("/mark-as-read", async (req, res) => {
  const { notification_id } = req.body;
  const { id, role } = req.session.data;
  const readerId = role === "hr" ? "hr" : id;
  try {
    await pool.query(
      `
      UPDATE notifications
      SET read_by = 
        CASE 
          WHEN NOT read_by @> $2::jsonb 
          THEN read_by || $2::jsonb
          ELSE read_by
        END
      WHERE id = $1
      `,
      [notification_id, JSON.stringify([readerId])]
    );
    res.json({ message: "Notification marked as read" });
  } catch {
    console.error("Error updating notification");
    res.status(500).json({ message: "Error updating notification" });
  }
});

router.put("/clear-all", async (req, res) => {
  const { notificationIds } = req.body;
  const { id, role } = req.session.data;

  const readerId = role === "hr" ? "hr" : id;
  try {
    await pool.query(
      `
      UPDATE notifications
      SET read_by = 
        CASE 
          WHEN NOT read_by @> $2::jsonb 
          THEN read_by || $2::jsonb
          ELSE read_by
        END
      WHERE id = ANY($1)
      `,
      [notificationIds, JSON.stringify([readerId])]
    );
    res.json({ message: "Notifications marked as read" });
  } catch {
    console.error("Error updating notifications");
    res.status(500).json({ message: "Error updating notifications" });
  }
});

export default router;
