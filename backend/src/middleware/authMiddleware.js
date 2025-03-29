export const authMiddleware = (req, res, next) => {
  if (!req.session.data) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
