import express from "express";
import pool from "./../db.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { id } = req.session.data;
  try {
    const result = await pool.query(
      `SELECT 
  p.id,
  p.period,
  p.reviewer,
  p.rating,
  p.feedback,
  p.status,
  p.reviewed_at,
  p.goals_set,
  p.goals_achieved,
  p.areas_to_improve,
  e.name,
  e.department,
  e.job_title,
  e.start_date
FROM employees e
LEFT JOIN performance_reviews p ON e.employeeid = p.employeeid
WHERE e.userid = $1
ORDER BY p.created_at DESC;
`,
      [id]
    );
    if (result.rowCount == 0) {
      res.json({ reviews: [], message: "No reviews found!" });
    } else {
      res.json({
        reviews: result.rows,
        message: "Performance Reviews Found Successfully!",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while fetching reviews" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
  p.id,
  p.period,
  p.reviewer,
  p.rating,
  p.feedback,
  p.status,
  p.reviewed_at,
  p.goals_set,
  p.goals_achieved,
  p.areas_to_improve,
  e.employeeid,
  e.name
FROM employees e
LEFT JOIN performance_reviews p ON e.employeeid = p.employeeid
ORDER BY 
  e.name ASC,
  p.reviewed_at DESC; 
`
    );
    if (result.rowCount == 0) {
      res.status(400).json({ reviews: [], message: "No reviews found!" });
    } else {
      res.json({
        reviews: result.rows,
        message: "Performance Reviews Found Successfully!",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while fetching reviews" });
  }
});

const formatArrayForPostgres = (arr) => {
  return `{${arr.filter((g) => g.trim() !== "").join(",")}}`;
};

router.post("/add", async (req, res) => {
  const {
    employeeid,
    period,
    reviewer,
    rating,
    feedback,
    status,
    reviewed_at,
  } = req.body;

  let goals_set = formatArrayForPostgres(req.body.goals_set);
  let goals_achieved = formatArrayForPostgres(req.body.goals_achieved);
  let areas_to_improve = formatArrayForPostgres(
    req.body.areas_to_improve.split(",")
  );

  try {
    await pool.query(
      `Insert into performance_reviews (employeeid,period,reviewer,rating,feedback,status,reviewed_at,goals_set,goals_achieved,areas_to_improve) Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
      [
        employeeid,
        period,
        reviewer,
        rating,
        feedback,
        status,
        reviewed_at,
        goals_set,
        goals_achieved,
        areas_to_improve,
      ]
    );
    res.json({ message: "Review added successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while adding review" });
  }
});

router.post("/edit", async (req, res) => {
  const {
    id,
    employeeid,
    period,
    reviewer,
    rating,
    feedback,
    status,
    reviewed_at,
  } = req.body;

  let goals_set = formatArrayForPostgres(req.body.goals_set);
  let goals_achieved = formatArrayForPostgres(req.body.goals_achieved);
  let areas_to_improve = formatArrayForPostgres(
    req.body.areas_to_improve.split(",")
  );

  try {
    await pool.query(
      `Update performance_reviews set period=$1,reviewer=$2,rating=$3,feedback=$4,status=$5,reviewed_at=$6,goals_set=$7,goals_achieved=$8,areas_to_improve=$9 where id=$10;`,
      [
        period,
        reviewer,
        rating,
        feedback,
        status,
        reviewed_at,
        goals_set,
        goals_achieved,
        areas_to_improve,
        id,
      ]
    );
    res.json({ message: "Review updated successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while updating review" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("Delete from performance_reviews where id=$1", [id]);
    res.json({ message: "Review deleted successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while deleting review" });
  }
});

export default router;
