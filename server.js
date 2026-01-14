const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// DB connection
require("./config/dbConfig");

// Middleware
app.use(express.json());

// Routes
const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

// Test API
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// ✅ Serve React build in production
if (process.env.NODE_ENV === "production") {
  // IMPORTANT: go one level up from /src
  const buildPath = path.join(__dirname, "..", "client", "build");

  app.use(express.static(buildPath));

  // Handle React routing (exclude /api)
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
