const Like = require("../models/Like");
const Post = require("../models/Post");

// =========================
// LIKE POST
// =========================

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check whether post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check whether user already liked
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
      liked: true,
    });

    // Increase likes count
    post.likesCount = post.likesCount + 1;

    await post.save();

    res.status(201).json({
      message: "Post liked",
      liked: true,
      likesCount: post.likesCount,
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

    // Find and delete user's like
    const deletedLike = await Like.findOneAndDelete({
      user: req.userId,
      post: postId,
    });

    if (!deletedLike) {
      return res.status(400).json({
        message: "Post is not liked",
      });
    }

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Decrease likes count
    post.likesCount = post.likesCount - 1;

    await post.save();

    res.status(200).json({
      message: "Post unliked",
      liked: false,
      likesCount: post.likesCount,
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
// GET LIKE INFORMATION
// =========================

const getLikeInfo = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check whether current user liked
    const like = await Like.findOne({
      user: req.userId,
      post: postId,
    });

    res.status(200).json({
      likesCount: post.likesCount,
      liked: !!like,
    });

  } catch (error) {
    console.error("Get like info error:", error);

    res.status(500).json({
      message: "Failed to get like information",
      error: error.message,
    });
  }
};


module.exports = {
  likePost,
  unlikePost,
  getLikeInfo,
};