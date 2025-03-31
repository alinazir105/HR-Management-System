import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import pg from "pg";
import pgSession from "connect-pg-simple";
import insertUser from "./util/insertUser.js";
import userRoutes from "./routes/userRoutes.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();
const PgStore = pgSession(session);

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS),
  port: Number(process.env.DB_PORT),
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    store: new PgStore({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
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
