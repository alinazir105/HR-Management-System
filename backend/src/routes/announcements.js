import express from "express";
import pool from "./../db.js";
import { sendNotification } from "../util/notificationSocket.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { title, description, type } = req.body;
  try {
    await pool.query(
      "INSERT INTO announcements (title,description,type) VALUES ($1, $2, $3)",
      [title, description, type]
    );

    let notifTitle = `New ${type} Announcement from HR!`;
    let notificationResponse = await pool.query(
      "Insert into notifications (user_id,title,type,description) values ('employees',$1,'announcement',$2) RETURNING *",
      [notifTitle, description]
    );

    sendNotification(notificationResponse.rows[0]);

    res.status(200).json({ message: "Announcement posted!" });
  } catch (e) {
    console.error("Error posting announcement" + e);
    res
      .status(500)
      .json({ message: "Couldn't post announcement. Please try again later!" });
  }
});

router.get("/all", async (req, res) => {
  try {
    let response = await pool.query(
      "Select * from announcements order by posted_at desc"
    );
    res.status(200).json({ announcements: response.rows });
  } catch (e) {
    console.error("Error fetching announcements" + e);
    res.status(500).json({
      message: "Couldn't fetch announcements. Please try again later!",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("Delete from announcements where id=$1", [id]);
    res.status(200).json({ message: "Announcement deleted successfully!" });
  } catch (e) {
    console.error("Error deleting announcement" + e);
    res.status(500).json({
      message: "Couldn't delete announcement. Please try again later!",
    });
  }
});

export default router;
