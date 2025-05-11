import express from "express";
import pool from "./../db.js";
const router = express.Router();

// GET summary
router.get("/summary", async (req, res) => {
  try {
    const totalEmployees = await pool.query("SELECT * FROM employees");
    const totalAmount = await pool.query("SELECT SUM(salary) FROM employees");

    const paid = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) FROM payroll WHERE status = 'paid'"
    );
    const unpaid = await pool.query(`
      SELECT COALESCE(SUM(e.salary), 0)
      FROM employees e
      LEFT JOIN payroll p ON e.employeeid = p.employeeid
      WHERE p.status IS NULL OR p.status != 'paid'
    `);

    res.json({
      totalEmployees: totalEmployees.rowCount,
      totalAmount: totalAmount.rows[0].sum,
      paid: paid.rows[0].coalesce,
      unpaid: unpaid.rows[0].coalesce,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// GET filtered employee payrolls
router.get("/employees", async (req, res) => {
  try {
    const { name, department, month } = req.query;
    const values = [];
    let query = `
      SELECT e.employeeid, e.name, e.department, e.salary,
             p.bonus, p.deductions, p.status,
             (e.salary + COALESCE(p.bonus, 0) - COALESCE(p.deductions, 0)) AS netpay
      FROM employees e
      LEFT JOIN payroll p ON e.employeeid = p.employeeid
    `;

    const filters = [];

    if (name) {
      filters.push(`e.name ILIKE $${values.length + 1}`);
      values.push(`%${name}%`);
    }

    if (department && department !== "all") {
      filters.push(`e.department = $${values.length + 1}`);
      values.push(department);
    }

    if (month) {
      filters.push(`TO_CHAR(p.month, 'YYYY-MM') = $${values.length + 1}`);
      values.push(month);
    }

    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST to pay employee
router.post("/pay", async (req, res) => {
  const { employeeid, bonus = 0, deductions = 0, month } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO payroll (employeeid, bonus, deductions, amount, status, month)
      VALUES ($1, $2, $3, (
        SELECT salary + $2 - $3 FROM employees WHERE employeeid = $1
      ), 'paid', $4)
      ON CONFLICT (employeeid, month)
      DO UPDATE SET bonus = $2, deductions = $3, status = 'paid'
      `,
      [employeeid, bonus, deductions, month]
    );
    res.json({ message: "Payment successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment failed");
  }
});

export default router;
