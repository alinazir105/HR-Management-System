import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/check-in", async (req, res) => {
  const { id } = req.session.data;
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const checkInTime = now.toTimeString().split(" ")[0];
  try {
    await pool.query(
      "INSERT INTO attendance (userid, date, checkin) VALUES ($1, $2, $3)",
      [id, date, now]
    );
    res
      .status(200)
      .json({ message: "Check-in successful!", date, checkInTime });
  } catch (e) {
    console.error("Error inserting in attendance table" + e);
    res.status(500).json({ message: "Couldn't check-in. Please try again!" });
  }
});

router.post("/check-out", async (req, res) => {
  const { id } = req.session.data;
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const checkOutTime = now.toTimeString().split(" ")[0];

  try {
    const { rows } = await pool.query(
      "SELECT checkin FROM ATTENDANCE WHERE userid = $1 AND date = $2 AND checkout IS NULL",
      [id, date]
    );

    if (rows.length === 0) {
      return res.status(400).json({
        message: "You haven't checked in or already checked out today!",
      });
    }

    const checkInTime = rows[0].checkin;

    const checkInDate = new Date(checkInTime);
    const checkOutDate = new Date();

    const timeDifference = checkOutDate - checkInDate;

    let hoursWorked = timeDifference / (1000 * 60 * 60);

    hoursWorked = Math.floor(hoursWorked);

    let status = "Absent";

    if (hoursWorked >= 7) {
      status = "Present";
    } else if (hoursWorked >= 4) {
      status = "Half-day";
    } else if (hoursWorked < 4) {
      status = "Absent";
    }

    await pool.query(
      "UPDATE ATTENDANCE SET checkout = $1, status = $2,workhours=$3 WHERE userid = $4 AND date = $5 AND checkout IS NULL",
      [now, status, hoursWorked, id, date]
    );

    res.status(200).json({
      message: "Check-out successful!",
      date,
      checkOutTime,
      status,
    });
  } catch (error) {
    console.error("Error updating check-out time:", error);
    res.status(500).json({ message: "Couldn't check-out. Please try again!" });
  }
});

router.get("/my-today", async (req, res) => {
  const { id } = req.session.data;

  const now = new Date();
  const date = now.toISOString().split("T")[0];

  try {
    const result = await pool.query(
      "SELECT checkin, checkout FROM ATTENDANCE WHERE userid = $1 AND date = $2",
      [id, date]
    );

    if (result.rowCount === 0) {
      return res
        .status(200)
        .json({ message: "No attendance record for today" });
    }

    const { checkin, checkout } = result.rows[0];
    res.status(200).json({ checkin, checkout });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ message: "Error fetching attendance data" });
  }
});

router.get("/my-all", async (req, res) => {
  const { id } = req.session.data;

  try {
    const result = await pool.query(
      "SELECT date,checkin,checkout,workhours,status FROM ATTENDANCE WHERE userid = $1 order by date desc",
      [id]
    );

    if (result.rowCount === 0) {
      return res
        .status(200)
        .json({ attendance: [], message: "No attendance found" });
    }

    res.status(200).json({ attendance: result.rows });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ message: "Error fetching attendance data" });
  }
});

router.get("/all-employees", async (req, res) => {
  let result;
  try {
    result =
      await pool.query(`SELECT e.name, a.date::TEXT, a.checkin::TIME, a.checkout::TIME,a.status, a.workhours, e.userid
      FROM attendance a JOIN employees e ON a.userid = e.userid;
`);
    if (result.rowCount === 0) {
      res.json({ attendance: [], message: "No attendance found!" });
    } else {
      res.json({
        attendance: result.rows,
        message: "Attendance found successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching attendance" });
  }
});

router.get("/attendance-today", async (req, res) => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  try {
    // Get total employees
    const totalEmployeesResult = await pool.query(
      `SELECT COUNT(*) FROM employees`
    );
    const totalEmployees = parseInt(totalEmployeesResult.rows[0].count, 10);

    // Get employees who have checked in today
    const checkedInResult = await pool.query(
      `SELECT DISTINCT userid FROM attendance WHERE date = $1 AND checkin IS NOT NULL`,
      [today]
    );
    const checkedInCount = checkedInResult.rowCount;

    // No check-in employees
    const noCheckinCount = totalEmployees - checkedInCount;

    res.json({
      checkins: checkedInCount,
      noCheckins: noCheckinCount,
      totalEmployees,
    });
  } catch (error) {
    console.error("Error fetching today's attendance summary:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
