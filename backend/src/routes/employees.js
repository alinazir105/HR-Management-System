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

    await client.query(
      `INSERT INTO employees 
      (userid, name, email, department, job_title, employment_type, salary, gender) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
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

router.get("/attendance", async (req, res) => {
  let result;
  try {
    result =
      await pool.query(`SELECT e.name, a.date::TEXT, a.checkin::TIME, a.checkout::TIME,a.status, a.workhours
      FROM attendance a JOIN employees e ON a.userid = e.userid;
`);
    if (result.rowCount === 0) {
      res.json({ attendance: [], message: "No attendance found!" });
    } else {
      res.json({
        attendance: result.rows,
        message: "Attendance found successfully!",
      });
      console.log("Fetched attendance:", response.data);
    }
  } catch (error) {}
});

export default router;
