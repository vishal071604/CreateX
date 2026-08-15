const express = require("express");

const {
  createPost,
  getPosts,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// CREATE POST
router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);

// GET FEED
router.get(
  "/",
  getPosts
);

module.exports = router;