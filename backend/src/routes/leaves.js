import express from "express";
import pool from "../db.js";
import { sendNotification } from "../util/notificationSocket.js";

const router = express.Router();

router.get("/my-all", async (req, res) => {
  const { employeeid } = req.session.data;
  try {
    const results = await pool.query(
      "Select id,leavetype,startdate::TEXT,enddate::TEXT,reason,status,hrremarks from leave_requests where employeeid = $1",
      [employeeid]
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

router.post("/submit-leave", async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  const { id } = req.session.data;
  try {
    let leaveRequestResponse = await pool.query(
      "Insert into leave_requests (userid, leavetype, startdate, enddate, reason) values ($1,$2,$3,$4,$5) RETURNING *",
      [id, leaveType, startDate, endDate, reason]
    );

    let title = `New ${leaveType} Request, ID:${leaveRequestResponse.rows[0].id} from Employee ${id}!`;
    let notificationResponse = await pool.query(
      "Insert into notifications (user_id,title,type) values ('hr',$1,'leave') RETURNING *",
      [title]
    );

    sendNotification(notificationResponse.rows[0]);
    res.json({ message: "Leave request submitted successfully!" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error while submitting leave request!" });
  }
});

router.delete("/remove-leave/:id", async (req, res) => {
  const leaveID = req.params.id;
  try {
    await pool.query("DELETE FROM leave_requests where id=$1", [leaveID]);
    res.json({ message: "Leave request cancelled successfully!" });
  } catch {
    res.status(500).json({ message: "Error while cancelling leave request!" });
  }
});

export default router;
