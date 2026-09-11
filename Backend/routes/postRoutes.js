const express = require("express");

const {
  createPost,
  getPosts,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Create post
router.post("/", protect, upload.single("image"), createPost);

// Get all posts
router.get("/", protect, getPosts);

module.exports = router;
