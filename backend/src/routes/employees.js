import express from "express";
import pool from "./../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { formData } = req.body;
  console.log(req.body);
  const {
    username,
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
  try {
    const hashedPswd = await bcrypt.hash(hashedPassword, 10);
    pool.query(
      "INSERT INTO users (username, password, firstname, lastname, email, department, jobtitle, employmenttype, salary, gender,role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,'employee')",
      [
        username,
        hashedPswd,
        firstname,
        lastname,
        email,
        department,
        jobtitle,
        employmenttype,
        salary,
        gender,
      ]
    );
    res.json({ message: "Employee added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server ERROR! Employee not added!" });
  }
});

router.get("/all", async (req, res) => {
  try {
    let result = await pool.query(
      "SELECT id,firstname || ' ' || lastname AS fullname,email,department,jobtitle,startdate::TEXT,employmenttype,salary,gender from users where role='employee'"
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
    res.status(500).json({ message: "Server ERROR! Employee not found!" });
  }
});

export default router;
