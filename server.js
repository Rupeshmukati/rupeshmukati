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

// Test API (optional)
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// Production: Serve React build
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "client", "build");
  app.use(express.static(buildPath));

  // ✅ FIX: Express 5+ ke liye wildcard ko aise likha jata hai
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"), (err) => {
      if (err) {
        // Agar file nahi milti toh server crash nahi hoga
        res.status(500).send("Build file not found. Check your build path.");
      }
    });
  });
}
// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
