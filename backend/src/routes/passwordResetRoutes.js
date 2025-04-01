import express from "express";
import crypto from "crypto";
import { sendResetEmail } from "../util/sendResetEmail.js";
import pool from "../db.js";
import { cleanupExpiredTokens } from "../middleware/passwordResetCleanup.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/request", cleanupExpiredTokens, async (req, res) => {
  const { email } = req.body;
  try {
    const resetCode = crypto.randomBytes(3).toString("hex");

    const expirationTime = Date.now() + 30 * 60 * 1000;

    await pool.query(
      "INSERT INTO password_resets(email, reset_code, expiration_time) VALUES($1, $2, $3) RETURNING *",
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
      console.log("No data found");

      return res.status(400).json({ message: "Invalid reset code" });
    }
    const resetEntry = result.rows[0];

    if (resetEntry.expiration_time < Date.now()) {
      console.log("Reset code expired");
      return res.status(400).json({ message: "Reset code has expired" });
    }

    res.status(200).json({ message: "Reset code verified successfully" });
  } catch {
    console.error("Error verifying reset code");
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/new-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userQuery = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (userQuery.rowCount === 0) {
      return res.status(404).json({ message: "Email not found." });
    }
    const userId = userQuery.rows[0].id;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      userId,
    ]);

    await pool.query("DELETE FROM password_resets WHERE email = $1", [email]);

    res.json({ message: "Password successfully updated!" });
  } catch {
    console.error("Error resetting password:");
    res.status(500).json({ message: "Internal server error!" });
  }
});

export default router;
