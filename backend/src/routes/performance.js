import express from "express";
import pool from "./../db.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { id } = req.session.data;
  try {
    const result = await pool.query(
      "Select p.id,p.period,p.reviewer,p.rating,p.feedback,p.status,p.reviewed_at,p.goals_set,p.goals_achieved,p.areas_to_improve,e.name,e.department,e.job_title,e.start_date from performance_reviews p join employees e on e.employeeid=p.employeeid where e.userid=$1 order by p.created_at desc",
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

export default router;
