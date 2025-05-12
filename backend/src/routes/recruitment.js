import express from "express";
import pool from "./../db.js";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

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

router.post("/hire-candidate", async (req, res) => {
  const { id } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      "UPDATE job_applications SET status = 'Hired' WHERE id = $1 RETURNING job_id",
      [id]
    );

    if (result.rowCount === 0) {
      await client.query("ROLLBACK");
      res.status(404).json({ message: "Error while hiring candidate!" });
      return;
    }

    const job_id = result.rows[0].job_id;

    await client.query(
      `UPDATE jobs 
      SET openings = CASE WHEN openings > 0 THEN openings - 1 ELSE 0 END
      WHERE id = $1`,
      [job_id]
    );

    await client.query("COMMIT");
    res.json({ message: "Candidate Hired Successfully!" });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error(e);
    res.status(500).json({ message: "Error while hiring candidate!" });
  } finally {
    client.release();
  }
});

router.post("/apply-for-job", upload.single("resume"), async (req, res) => {
  const { name, email, phone } = req.body;

  const job = JSON.parse(req.body.job);
  const job_description =
    job.title +
    " " +
    job.job_type +
    " " +
    job.description +
    " Skills Required: " +
    job.skills_required;

  if (!req.file) {
    return res.status(400).json({ message: "Resume file is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const candidateResult = await client.query(
      "SELECT id FROM candidates WHERE email = $1",
      [email]
    );

    let candidateId;

    if (candidateResult.rows.length > 0) {
      candidateId = candidateResult.rows[0].id;
    } else {
      const insertCandidate = await client.query(
        `INSERT INTO candidates (name, email, phone) 
         VALUES ($1, $2, $3) RETURNING id`,
        [name, email, phone]
      );
      candidateId = insertCandidate.rows[0].id;
    }

    const existingApplication = await client.query(
      `SELECT id FROM job_applications WHERE candidate_id = $1 AND job_id = $2`,
      [candidateId, job.id]
    );

    if (existingApplication.rows.length > 0) {
      await client.query("ROLLBACK");
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    //AI ML Part Starts here
    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    form.append("job", job_description);

    const mlResponse = await axios.post("http://127.0.0.1:5000/upload", form, {
      headers: form.getHeaders(),
    });

    const { match_score, resume } = mlResponse.data;

    const match_score_percentage = Math.round(match_score * 100);

    await client.query(
      `INSERT INTO job_applications (job_id, candidate_id, resume_text,match_score_percentage)
           VALUES ($1, $2, $3,$4)`,
      [job.id, candidateId, resume, match_score_percentage]
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
