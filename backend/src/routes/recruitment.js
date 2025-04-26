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

router.post("/add", async (req, res) => {
  const { name, email, phone, job, resume_text } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Step 1: Check if candidate already exists
    const candidateResult = await client.query(
      "SELECT id FROM candidates WHERE email = $1",
      [email]
    );

    let candidateId;

    if (candidateResult.rows.length > 0) {
      candidateId = candidateResult.rows[0].id;
    } else {
      // Step 2: Insert candidate if not exists
      const insertCandidate = await client.query(
        `INSERT INTO candidates (name, email, phone) 
         VALUES ($1, $2, $3) RETURNING id`,
        [name, email, phone]
      );
      candidateId = insertCandidate.rows[0].id;
    }

    // Step 3: Insert into job_applications
    await client.query(
      `INSERT INTO job_applications (job_id, candidate_id, resume_text) 
       VALUES ($1, $2, $3)`,
      [job.id, candidateId, resume_text]
    );

    await client.query("COMMIT");
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error while submitting application:", error);
    res.status(500).json({ message: "Something went wrong." });
  } finally {
    client.release();
  }
});

export default router;
