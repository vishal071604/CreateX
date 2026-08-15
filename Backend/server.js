const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const likeRoutes = require("./routes/likeRoutes");

const app = express();

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "CreateX backend is running",
  });
});

// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});