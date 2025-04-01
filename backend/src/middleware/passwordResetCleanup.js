import pool from "../db.js";

let lastCleanup = Date.now();

export const cleanupExpiredTokens = async (req, res, next) => {
  if (Date.now() - lastCleanup > 10 * 60 * 1000) {
    try {
      const nowMillis = Date.now();

      await pool.query(
        "DELETE FROM password_resets WHERE expiration_time < $1",
        [nowMillis]
      );

      console.log("Expired tokens cleaned up.");
      lastCleanup = Date.now();
    } catch (error) {
      console.error("Error cleaning up expired tokens:", error);
    }
  }
  next();
};
