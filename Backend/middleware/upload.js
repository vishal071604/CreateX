const multer = require("multer");

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

// Create upload middleware
const upload = multer({
  storage,
});

module.exports = upload;

