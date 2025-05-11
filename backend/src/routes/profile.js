import express from "express";
import pool from "./../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { id } = req.session.data;
  try {
    let result = await pool.query(
      "SELECT employeeid,name,e.email,department,job_title,start_date::TEXT,employment_type,salary,gender,u.password,u.password_last_changed from employees e join users u on e.userid=u.id where u.id=$1",
      [id]
    );
    if (result.rowCount === 0) {
      res.json({ employeeData: {}, message: "No data found!" });
    } else {
      res.json({
        employeeData: result.rows[0],
        message: "Employee data found successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching employee data!" });
  }
});

router.post("/update-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.session.data;
  try {
    let result = await pool.query("Select password from users where id=$1", [
      id,
    ]);
    if (result.rowCount == 0) {
      res.status(500).json({ message: "Current password not found!" });
    } else {
      const hash = result.rows[0].password;
      let hashCheck = await bcrypt.compare(currentPassword, hash);
      if (!hashCheck) {
        res.status(500).json({ message: "Incorrect current password!" });
      } else {
        const newHash = await bcrypt.hash(newPassword, 10);
        await pool.query(
          "Update users set password = $1, password_last_changed = NOW() where id=$2",
          [newHash, id]
        );
        res.json({ message: "Password updated successfully!" });
      }
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while updating password!" });
  }
});

router.post("/update-information", async (req, res) => {
  const { firstName, lastName, gender } = req.body;
  const name = firstName + " " + lastName;
  const { employeeid } = req.session.data;
  try {
    let result = await pool.query(
      "update employees set name=$1,gender=$2 where employeeid=$3",
      [name, gender, employeeid]
    );
    res.json({ message: "Profile updated successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while updating profile!" });
  }
});

export default router;
