const express = require("express");

const {
  likePost,
  unlikePost,
  getLikeInfo,
} = require("../controllers/likeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// LIKE POST
// =========================

router.post(
  "/:postId",
  protect,
  likePost
);

// =========================
// UNLIKE POST
// =========================

router.delete(
  "/:postId",
  protect,
  unlikePost
);

// =========================
// GET LIKE INFORMATION
// =========================

router.get(
  "/:postId",
  protect,
  getLikeInfo
);

module.exports = router;