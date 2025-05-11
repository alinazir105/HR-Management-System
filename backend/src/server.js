import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import pgSession from "connect-pg-simple";

import insertUser from "./util/insertUser.js";
import userRoutes from "./routes/userRoutes.js";
import auth from "./routes/auth.js";
import pool from "./db.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js";
import notifications from "./routes/notifications.js";
import attendance from "./routes/attendance.js";
import { initializeSocket } from "./util/notificationSocket.js";
import employees from "./routes/employees.js";
import leaves from "./routes/leaves.js";
import announcements from "./routes/announcements.js";
import profile from "./routes/profile.js";
import performance from "./routes/performance.js";
import recruitment from "./routes/recruitment.js";
import payroll from "./routes/payroll.js";

dotenv.config();

const app = express();
const PgStore = pgSession(session);
export const server = createServer(app);

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
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/auth", auth);
app.use("/api/util", insertUser);
app.use("/api/notifications", notifications);
app.use("/api/attendance", attendance);
app.use("/api/employees", employees);
app.use("/api/leaves", leaves);
app.use("/api/announcements", announcements);
app.use("/api/profile", profile);
app.use("/api/performance", performance);
app.use("/api/recruitment", recruitment);
app.use("/api/payroll", payroll);

const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

initializeSocket(server);
