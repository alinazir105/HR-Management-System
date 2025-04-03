import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { id, role } = req.session.data;
  try {
    const results = await pool.query(
      "Select * from notifications where user_id=$1 and status='unread' order by created_at desc",
      [role == "hr" ? "hr" : id]
    );
    res.json({ notifications: results.rows });
  } catch {
    console.error("Error fetching notifications");
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

router.put("/mark-as-read", async (req, res) => {
  const { notification_id } = req.body;
  try {
    await pool.query("Update notifications set status='read' where id=$1", [
      notification_id,
    ]);
    res.json({ message: "Notification marked as read" });
  } catch {
    console.error("Error updating notification");
    res.status(500).json({ message: "Error updating notification" });
  }
});

router.put("/clear-all", async (req, res) => {
  const { notificationIds } = req.body;
  try {
    await pool.query(
      "Update notifications set status='read' where id = ANY($1)",
      [notificationIds]
    );
    res.json({ message: "Notification marked as read" });
  } catch {
    console.error("Error updating notification");
    res.status(500).json({ message: "Error updating notification" });
  }
});

export default router;
