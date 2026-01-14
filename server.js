require("dotenv").config();
const express = require("express");
const path = require("path"); // Ye zaroori hai files dhoondne ke liye

const app = express();

// ================= DB =================
require("./config/dbConfig");

// ================= Middleware =================
app.use(express.json());

// ================= API Routes =================
const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

// ================= React Frontend Connection (Zaroori) =================
if (process.env.NODE_ENV === "production") {
  // 1. Static folder ka path setup
  const buildPath = path.join(__dirname, "client", "build");
  app.use(express.static(buildPath));

  // 2. Sari requests ko index.html par bhejein (Named parameter fix)
  app.get("/:path*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // Local development ke liye
  app.get("/", (req, res) => {
    res.send("Backend API running 🚀");
  });
}

// ================= Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
