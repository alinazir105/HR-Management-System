import express from "express";
import pool from "../db.js";
import { sendNotification } from "../util/notificationSocket.js";

const router = express.Router();

router.get("/my-all", async (req, res) => {
  const { employeeid } = req.session.data;
  try {
    const results = await pool.query(
      "Select r.id,r.leavetype,r.startdate::TEXT,r.enddate::TEXT,r.reason,r.status,r.hrremarks,b.sick_leave_total,b.sick_leave_used,b.annual_leave_total,b.annual_leave_used,b.casual_leave_total,b.casual_leave_used,b.parental_leave_total,b.parental_leave_used from leave_balances b LEFT JOIN leave_requests r on b.employeeid=r.employeeid where b.employeeid = $1",
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
  const { employeeid } = req.session.data;
  try {
    const balanceRes = await pool.query(
      "SELECT * FROM leave_balances WHERE employeeid = $1",
      [employeeid]
    );

    if (balanceRes.rowCount === 0) {
      return res.status(400).json({ message: "Leave balance not found!" });
    }

    const balance = balanceRes.rows[0];

    const days = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
    );

    let totalKey = `${leaveType.split(" ")[0].toLowerCase()}_leave_total`;
    let usedKey = `${leaveType.split(" ")[0].toLowerCase()}_leave_used`;

    if (balance[totalKey] === undefined || balance[usedKey] === undefined) {
      return res.status(400).json({ message: "Invalid leave type!" });
    }

    const remaining = balance[totalKey] - balance[usedKey];
    if (days > remaining) {
      return res.status(400).json({
        message: `Not enough ${leaveType} days left. You have ${remaining} remaining.`,
      });
    }

    const leaveRequestResponse = await pool.query(
      "INSERT INTO leave_requests (employeeid, leavetype, startdate, enddate, reason) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [employeeid, leaveType, startDate, endDate, reason]
    );

    let title = `New ${leaveType} Request, ID:${leaveRequestResponse.rows[0].id} from Employee ${employeeid}!`;
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
