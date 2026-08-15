const Like = require("../models/Like");
const Post = require("../models/Post");

// =========================
// LIKE POST
// =========================

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check whether this user already liked
    const existingLike = await Like.findOne({
      user: req.userId,
      post: postId,
    });

    if (existingLike) {
      return res.status(400).json({
        message: "Post already liked",
      });
    }

    // Create like
    await Like.create({
      user: req.userId,
      post: postId,
    });

    // Count ALL likes
    const likesCount = await Like.countDocuments({
      post: postId,
    });

    res.status(201).json({
      message: "Post liked",
      liked: true,
      likesCount,
    });
  } catch (error) {
    console.error("Like error:", error);

    res.status(500).json({
      message: "Failed to like post",
      error: error.message,
    });
  }
};


// =========================
// UNLIKE POST
// =========================

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedLike =
      await Like.findOneAndDelete({
        user: req.userId,
        post: postId,
      });

    if (!deletedLike) {
      return res.status(400).json({
        message: "Post is not liked",
      });
    }

    // Count ALL remaining likes
    const likesCount = await Like.countDocuments({
      post: postId,
    });

    res.status(200).json({
      message: "Post unliked",
      liked: false,
      likesCount,
    });
  } catch (error) {
    console.error("Unlike error:", error);

    res.status(500).json({
      message: "Failed to unlike post",
      error: error.message,
    });
  }
};


// =========================
// GET LIKE COUNT
// =========================

const getLikeCount = async (req, res) => {
  try {
    const { postId } = req.params;

    const likesCount =
      await Like.countDocuments({
        post: postId,
      });

    res.status(200).json({
      likesCount,
    });
  } catch (error) {
    console.error(
      "Get likes error:",
      error
    );

    res.status(500).json({
      message: "Failed to get likes",
      error: error.message,
    });
  }
};


// =========================
// CHECK CURRENT USER LIKE
// =========================

const checkLike = async (req, res) => {
  try {
    const { postId } = req.params;

    const like = await Like.findOne({
      user: req.userId,
      post: postId,
    });

    res.status(200).json({
      liked: !!like,
    });
  } catch (error) {
    console.error(
      "Check like error:",
      error
    );

    res.status(500).json({
      message: "Failed to check like",
      error: error.message,
    });
  }
};


module.exports = {
  likePost,
  unlikePost,
  getLikeCount,
  checkLike,
};