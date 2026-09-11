const Like = require("../models/Like");
const Post = require("../models/Post");

// =========================
// LIKE POST
// =========================

const likePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if user already liked the post
    const existingLike = await Like.findOne({
      user: req.userId,
      post: postId,
    });

    if (existingLike) {
      return res.status(400).json({
        message: "Post already liked",
        liked: true,
        likesCount: post.likesCount,
      });
    }

    // Create like
    await Like.create({
      user: req.userId,
      post: postId,
    });

    // Increase likes count
    post.likesCount += 1;

    await post.save();

    return res.status(201).json({
      message: "Post liked",
      liked: true,
      likesCount: post.likesCount,
    });
  } catch (error) {
    console.error("Like error:", error);

    return res.status(500).json({
      message: "Failed to like post",
    });
  }
};

// =========================
// UNLIKE POST
// =========================

const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Delete user's like
    const deletedLike = await Like.findOneAndDelete({
      user: req.userId,
      post: postId,
    });

    if (!deletedLike) {
      return res.status(400).json({
        message: "Post is not liked",
        liked: false,
        likesCount: post.likesCount,
      });
    }

    // Decrease likes count
    post.likesCount -= 1;

    if (post.likesCount < 0) {
      post.likesCount = 0;
    }

    await post.save();

    return res.status(200).json({
      message: "Post unliked",
      liked: false,
      likesCount: post.likesCount,
    });
  } catch (error) {
    console.error("Unlike error:", error);

    return res.status(500).json({
      message: "Failed to unlike post",
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

    // Check if current user liked the post
    const like = await Like.findOne({
      user: req.userId,
      post: postId,
    });

    return res.status(200).json({
      likesCount: post.likesCount,
      liked: !!like,
    });
  } catch (error) {
    console.error("Get like info error:", error);

    return res.status(500).json({
      message: "Failed to get like information",
    });
  }
};

// =========================
// EXPORT
// =========================

module.exports = {
  likePost,
  unlikePost,
  getLikeInfo,
};