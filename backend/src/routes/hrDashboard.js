import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  try {
    const client = await pool.connect();

    // Fetch total employees
    const employeesRes = await client.query(`SELECT COUNT(*) FROM employees`);
    const totalEmployees = parseInt(employeesRes.rows[0].count, 10);

    // Fetch today's checked-in employees
    const attendanceRes = await client.query(
      `SELECT COUNT(DISTINCT userid) AS checkins
         FROM attendance
         WHERE date = $1 AND checkin IS NOT NULL`,
      [today]
    );
    const checkins = parseInt(attendanceRes.rows[0].checkins, 10);
    const noCheckins = totalEmployees - checkins;

    // Fetch pending leaves
    const pendingLeavesRes = await client.query(
      `SELECT COUNT(*) FROM leave_requests WHERE status = 'pending'`
    );
    const pendingLeaves = parseInt(pendingLeavesRes.rows[0].count, 10);

    // Fetch pending payrolls (assuming a payrolls table exists)
    // const pendingPayrollsRes = await client.query(
    //   `SELECT COUNT(*) FROM payrolls WHERE status = 'Pending'`
    // );
    // const pendingPayrolls = parseInt(pendingPayrollsRes.rows[0].count, 10);

    // Fetch job applications (total or filtered by status if needed)
    const jobApplicationsRes = await client.query(
      `SELECT COUNT(*) FROM job_applications`
    );
    const jobApplications = parseInt(jobApplicationsRes.rows[0].count, 10);

    // Fetch pending performance reviews
    const pendingReviewsRes = await client.query(
      `SELECT COUNT(*) FROM performance_reviews WHERE status = 'Pending'`
    );
    const pendingReviews = parseInt(pendingReviewsRes.rows[0].count, 10);

    client.release();

    res.json({
      attendance: {
        totalEmployees,
        checkins,
        noCheckins,
      },
      pendingLeaves,
      // pendingPayrolls,
      jobApplications,
      pendingReviews,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Error fetching summary data" });
  }
});

router.get("/performance-chart", async (req, res) => {
  try {
    const client = await pool.connect();

    const performanceDataRes = await client.query(`
      SELECT 
        period,
        AVG(rating) AS average_rating
      FROM 
        performance_reviews
      WHERE
       (status = 'reviewed' OR status = 'in_progress')
    AND rating IS NOT NULL
      GROUP BY 
        period;
      
    `);

    const performanceData = performanceDataRes.rows.map((row) => ({
      quarter: row.period,
      average_rating: parseFloat(row.average_rating),
    }));

    client.release();
    res.json(performanceData);
  } catch (error) {
    console.error("Error fetching performance chart data:", error);
    res.status(500).json({ message: "Error fetching performance chart data" });
  }
});

export default router;
