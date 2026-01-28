const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads/others";

    // URL ke basis par folder decide karein
    if (req.originalUrl.includes("update-intro")) {
      dest = "uploads/profile";
    } else if (req.originalUrl.includes("add-course") || req.originalUrl.includes("update-course")) {
      dest = "uploads/courses";
    } else if (req.originalUrl.includes("add-project") || req.originalUrl.includes("update-project")) {
      dest = "uploads/projects";
    }

    // Folder auto-create karne ke liye
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;