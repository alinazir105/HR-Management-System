import express from "express";
import crypto from "crypto";
import { sendResetEmail } from "../util/sendResetEmail.js";
import pool from "../db.js";

const router = express.Router();

router.post("/request", async (req, res) => {
  const { email } = req.body;
  try {
    const resetCode = crypto.randomBytes(3).toString("hex");

    const expirationTime = Date.now() + 30 * 60 * 1000;

    await pool.query(
      "INSERT INTO password_resets(email, reset_code, expiration_time) VALUES($1, $2, $3)",
      [email, resetCode, expirationTime]
    );

    await sendResetEmail(email, resetCode);

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/verify", async (req, res) => {
  const { email, otpCode } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM password_resets WHERE email = $1 AND reset_code = $2",
      [email, otpCode]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid reset code" });
    }
    const resetEntry = result.rows[0];

    if (resetEntry.expiration_time < Date.now()) {
      return res.status(400).json({ message: "Reset code has expired" });
    }

    res.status(200).json({ message: "Reset code verified successfully" });
  } catch {
    console.error("Error verifying reset code");
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
