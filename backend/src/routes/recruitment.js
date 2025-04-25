import express from "express";
import pool from "./../db.js";

const router = express.Router();

router.post("/add-job", async (req, res) => {
  const {
    title,
    description,
    location,
    skillsRequired,
    experienceRequired,
    openings,
    jobType,
    deadline,
  } = req.body;

  try {
    await pool.query(
      `Insert into jobs (title,
    description,
    location,
    skills_required,
    experience_required,
    openings,
    job_type,
    deadline) values ($1,$2,$3,$4,$5,$6,$7,$8);`,
      [
        title,
        description,
        location,
        skillsRequired,
        experienceRequired,
        openings,
        jobType,
        deadline,
      ]
    );
    res.json({ message: "Job added successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while adding job post!" });
  }
});

export default router;
