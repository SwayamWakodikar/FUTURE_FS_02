import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "./config/passport.js";

import connectDB from "./config/db.js";
import leadRoutes from "./routes/user.route.js";
import errorHandler from "./middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Only for dev. Docker works on same port naturally.
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true if HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 Week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/leads", leadRoutes);

// Real OAuth Routes using Passport
app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

// Get current user details for the frontend
app.get("/api/auth/current_user", (req, res) => {
  res.send(req.user);
});

// Logout route
app.get("/api/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Static files for frontend
const clientPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);