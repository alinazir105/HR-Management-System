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

router.get("/all-jobs", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        j.*, 
        COUNT(ja.id) AS application_count
      FROM 
        jobs j
      LEFT JOIN 
        job_applications ja ON j.id = ja.job_id
      GROUP BY 
        j.id
      ORDER BY 
        j.created_at DESC
    `);

    if (result.rowCount === 0) {
      res.json({ allJobs: [], message: "No Jobs found!" });
    } else {
      res.json({
        allJobs: result.rows,
        message: "Jobs found successfully!",
      });
    }
  } catch (error) {
    console.error("Error fetching jobs with application counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
