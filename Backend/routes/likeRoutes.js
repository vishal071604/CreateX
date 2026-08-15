const express = require("express");

const {
  likePost,
  unlikePost,
  getLikeCount,
  checkLike,
} = require("../controllers/likeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// LIKE
router.post(
  "/:postId",
  protect,
  likePost
);

// UNLIKE
router.delete(
  "/:postId",
  protect,
  unlikePost
);

// GET TOTAL LIKE COUNT
router.get(
  "/:postId/count",
  getLikeCount
);

// CHECK CURRENT USER LIKE
router.get(
  "/:postId/check",
  protect,
  checkLike
);

module.exports = router;