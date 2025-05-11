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
      SELECT 
      e.employeeid, 
      e.name, 
      e.department, 
      e.salary,
      p.bonus, 
      p.deductions, 
      p.status,
      (e.salary + COALESCE(p.bonus, 0) - COALESCE(p.deductions, 0)) AS netpay
      FROM employees e
      LEFT JOIN payroll p ON e.employeeid = p.employeeid AND TO_CHAR(p.month, 'YYYY-MM') = $1
    `;

    values.push(month || new Date().toISOString().slice(0, 7)); // Default to current month if none

    const filters = [];

    if (name) {
      filters.push(`e.name ILIKE $${values.length + 1}`);
      values.push(`%${name}%`);
    }

    if (department && department !== "all") {
      filters.push(`e.department = $${values.length + 1}`);
      values.push(department);
    }

    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error in /employees endpoint:", err);
    res.status(500).send("Server Error");
  }
});
router.post("/generate", async (req, res) => {
  const { month } = req.body;
  if (!month) return res.status(400).send("Month is required");

  try {
    const employees = await pool.query("SELECT employeeid, salary FROM employees");

    for (const emp of employees.rows) {
      const { employeeid, salary } = emp;

      // Generate random bonus % between 5–20
      const bonusPercent = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      const bonus = Math.round(salary * (bonusPercent / 100));

      // Random deduction between $0 - $200
      const deductions = Math.floor(Math.random() * 201);

      const amount = salary + bonus - deductions;

      // Insert if not already exists
      await pool.query(
        `
        INSERT INTO payroll (employeeid, bonus, deductions, amount, status, month)
        VALUES ($1, $2, $3, $4, 'pending', $5)
        ON CONFLICT (employeeid, month) DO NOTHING
        `,
        [employeeid, bonus, deductions, amount, `${month}-01`] // convert to DATE
      );
    }

    res.status(200).json({ message: "Payrolls generated successfully" });
  } catch (err) {
    console.error("Error generating payrolls:", err);
    res.status(500).send("Server Error");
  }
});


// POST to pay employee
router.post("/pay", async (req, res) => {
  const { employeeid, bonus = 0, deductions = 0, month } = req.body;

  // Convert month (YYYY-MM) to the first day of the month (YYYY-MM-01)
  const monthStartDate = `${month}-01`;

  try {
    // Update the existing payroll record for the employee in the specified month
    const result = await pool.query(
      `
      UPDATE payroll
      SET 
        bonus = $2, 
        deductions = $3, 
        amount = (SELECT salary + $2 - $3 FROM employees WHERE employeeid = $1), 
        status = 'paid'
      WHERE employeeid = $1 AND month = $4
      RETURNING *  -- This will return the updated record
      `,
      [employeeid, bonus, deductions, monthStartDate]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Payroll not found or already paid.");
    }

    res.json({ message: "Payment successful", payroll: result.rows[0] });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).send("Payment failed");
  }
});


export default router;
