import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import insertUser from "./util/insertUser.js";

import userRoutes from "./routes/userRoutes.js";
import auth from "./routes/auth.js";

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", auth);
app.use("/api/util", insertUser);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
