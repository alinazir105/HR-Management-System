export const authMiddleware = (req, res, next) => {
  console.log("Session Data:", req.session);
  console.log(req.session.data);
  if (!req.session.data) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
