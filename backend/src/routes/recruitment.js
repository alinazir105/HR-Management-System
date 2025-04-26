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

router.post("/edit-job", async (req, res) => {
  const {
    id,
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
      `Update jobs set title=$1,
    description=$2,
    location=$3,
    skills_required=$4,
    experience_required=$5,
    openings=$6,
    job_type=$7,
    deadline=$8 where id=$9;`,
      [
        title,
        description,
        location,
        skillsRequired,
        experienceRequired,
        openings,
        jobType,
        deadline,
        id,
      ]
    );
    res.json({ message: "Job updated successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while updating job post!" });
  }
});

router.delete("/delete-job/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("Delete from jobs where id=$1", [id]);
    res.json({ message: "Job deleted successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while deleting job!" });
  }
});

router.get("/job-view/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(
      "select ja.*,c.name,c.email from job_applications ja join candidates c on c.id=ja.candidate_id where ja.job_id=$1 order by ja.match_score_percentage desc",
      [id]
    );
    if (results.rowCount == 0) {
      res.json({ jobView: [], message: "No Candidates Found!" });
    } else {
      res.json({
        jobView: results.rows,
        message: "Candidates Found Successfully",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while fetching applicants!" });
  }
});

export default router;
