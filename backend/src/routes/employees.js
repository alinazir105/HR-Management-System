import express from "express";
import pool from "./../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", async (req, res) => {
  const {
    username,
    password,
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
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      "INSERT INTO your_table_name (username, password, firstname, lastname, email, department, jobtitle, employmenttype, salary, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
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
      ]
    );
    res.json({ message: "Employee added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server ERROR! Employee not added!" });
  }
});

export default router;
