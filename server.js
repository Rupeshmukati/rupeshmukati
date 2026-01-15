require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// ================= DB =================
require("./config/dbConfig");

// ================= Middleware =================
app.use(express.json());

// ================= API Routes =================
const portfolioRoute = require("./routes/portfolioRoute");
app.use("/api/portfolio", portfolioRoute);

// Production: Serve React build
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "client", "build");
  app.use(express.static(buildPath));

  // ✅ SAFEST FIX: Wildcard string ki jagah direct Regex use karein
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
}

// ================= Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
