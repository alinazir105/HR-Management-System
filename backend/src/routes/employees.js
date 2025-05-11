import express from "express";
import pool from "./../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", async (req, res) => {
  const {
    hashedPassword,
    firstname,
    lastname,
    email,
    department,
    jobtitle,
    employmenttype,
    salary,
    gender,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hashedPswd = await bcrypt.hash(hashedPassword, 10);

    const userResult = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, 'employee') RETURNING *",
      [email, hashedPswd]
    );

    const userID = userResult.rows[0].id;
    const fullname = `${firstname} ${lastname}`;

    const employeeData = await client.query(
      `INSERT INTO employees 
      (userid, name, email, department, job_title, employment_type, salary, gender) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        userID,
        fullname,
        email,
        department,
        jobtitle,
        employmenttype,
        salary,
        gender,
      ]
    );

    await client.query("Insert into leave_balances (employeeid) Values ($1)", [
      employeeData.rows[0].employeeid,
    ]);

    await client.query("COMMIT");

    res.json({ message: "Employee added successfully!" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding employee:", error);
    res.status(500).json({
      message: "Server ERROR! Employee not added!",
      error: error.message,
    });
  } finally {
    client.release();
  }
});

router.get("/all", async (req, res) => {
  try {
    let result = await pool.query(
      "SELECT userid,name,email,department,job_title,start_date::TEXT,employment_type,salary,gender from employees"
    );
    if (result.rowCount === 0) {
      res.json({ employees: [], message: "No employees found!" });
    } else {
      res.json({
        employees: result.rows,
        message: "Employees found successfully!",
      });
    }
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Server ERROR! Employee not found!" });
  }
});

router.delete("/delete/:userID", async (req, res) => {
  const userID = req.params.userID;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM users WHERE id = $1", [userID]);

    await client.query("COMMIT");

    res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting employee:", error);
    res.status(500).json({
      message: "Server ERROR! Employee not deleted!",
    });
  } finally {
    client.release();
  }
});

router.post("/update", async (req, res) => {
  const {
    id,
    firstname,
    lastname,
    department,
    jobtitle,
    employmenttype,
    salary,
    gender,
  } = req.body;

  const name = `${firstname} ${lastname}`;
  try {
    await pool.query(
      "update employees set name = $1, department = $2, job_title = $3, employment_type = $4, salary = $5, gender = $6 where userid = $7",
      [name, department, jobtitle, employmenttype, salary, gender, id]
    );
    res.json({ message: "Employee updated successfully!" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      message: "Server ERROR! Employee not updated!",
    });
  }
});

router.get("/home/me", async (req, res) => {
  const { employeeid } = req.session.data;
  const { id } = req.session.data;
  try {
    const [
      attendanceAllResult,
      attendanceTodayResult,
      performanceResult,
      leaveBalanceResult,
      leaveRequestResult,
    ] = await Promise.all([
      pool.query(
        `SELECT 
          CASE 
            WHEN COUNT(*) = 0 THEN 0
            ELSE COUNT(*) FILTER (WHERE status = 'Present')::FLOAT / COUNT(*) * 100 
          END AS attendance_percentage
        FROM attendance
        WHERE userid = $1`,
        [id]
      ),
      pool.query(
        "SELECT * FROM attendance WHERE userid = $1 AND date = CURRENT_DATE",
        [id]
      ),
      pool.query(
        `SELECT 
      AVG(rating)::numeric(3,2) AS overall_rating
      FROM 
      performance_reviews
        WHERE 
      employeeid = $1
        AND EXTRACT(YEAR FROM reviewed_at) = EXTRACT(YEAR FROM CURRENT_DATE);`,
        [employeeid]
      ),
      pool.query(
        `SELECT
      (sick_leave_total - sick_leave_used) AS sick_leave_remaining,
      (annual_leave_total - annual_leave_used) AS annual_leave_remaining,
      (casual_leave_total - casual_leave_used) AS casual_leave_remaining,
      (parental_leave_total - parental_leave_used) AS parental_leave_remaining,
      last_updated
      FROM leave_balances
      WHERE employeeid = $1`,
        [employeeid]
      ),
      pool.query(
        `SELECT * 
      FROM leave_requests 
      WHERE employeeid = $1 
      AND status = 'pending'`,
        [employeeid]
      ),
    ]);
    const attendancePercentage = parseFloat(
      (attendanceAllResult.rows[0]?.attendance_percentage ?? 0).toFixed(2)
    );
    const overallRating = performanceResult.rows[0].overall_rating || 0;
    const attendanceToday = attendanceTodayResult.rows[0];
    const remainingLeaves = leaveBalanceResult.rows[0] || null;
    const pendingLeaveRequests = leaveRequestResult.rowCount;

    const checkInStatus = attendanceToday
      ? {
          checkedIn: true,
          checkedOut: attendanceToday.checkout !== null,
          data: attendanceToday,
        }
      : { checkedIn: false };
    res.json({
      home: {
        attendancePercentage,
        pendingLeaveRequests,
        remainingLeaves,
        overallRating,
        checkInStatus,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server ERROR! Employee not found!" });
  }
});

export default router;
