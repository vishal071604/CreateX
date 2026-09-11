const Post = require("../models/Post");
const Like = require("../models/Like");
const uploadFile = require("../utils/uploadFile");

// =========================
// CREATE POST
// =========================

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    // Remove extra spaces
    const trimmedContent = content?.trim() || "";

    // Post must have text or image
    if (!trimmedContent && !req.file) {
      return res.status(400).json({
        message: "Post must contain text or an image",
      });
    }

    // Image URL
    let imageUrl = null;

    // Upload image if provided
    if (req.file) {
      const result = await uploadFile(
        req.file.buffer,
        req.file.originalname
      );

      imageUrl = result.url;
    }

    // Create post
    const post = await Post.create({
      content: trimmedContent,
      image: imageUrl,
      author: req.userId,
    });

    // Get author details
    await post.populate("author", "name email");

    return res.status(201).json({
      message: "Post created successfully",
      post: post.toObject(),
    });
  } catch (error) {
    console.error("Create post error:", error);

    return res.status(500).json({
      message: "Failed to create post",
    });
  }
};

// =========================
// GET POSTS
// =========================

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      });

    const likes = await Like.find({ user: req.userId }).select("post");
    const likedPostIds = new Set(
      likes.map((like) => like.post.toString())
    );

    return res.status(200).json({
      posts: posts.map((post) => ({
        ...post.toObject(),
        liked: likedPostIds.has(post._id.toString()),
      })),
    });
  } catch (error) {
    console.error("Get posts error:", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

// =========================
// EXPORT
// =========================

module.exports = {
  createPost,
  getPosts,
};
