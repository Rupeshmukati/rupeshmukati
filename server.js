const express = require("express");
const app = express();
require("dotenv").config();

// DB connection
require("./config/dbConfig");

// Routes
const portfolioRoute = require("./routes/portfolioRoute");

// Middleware
app.use(express.json());

// API Routes
app.use("/api/portfolio", portfolioRoute);

// Default test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT || 5000;
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
