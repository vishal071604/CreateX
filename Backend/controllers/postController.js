const Post = require("../models/Post");
const uploadFile = require("../utils/uploadFile");

// =========================
// CREATE POST
// =========================

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    let imageUrl = null;

    // Upload image
    if (req.file) {
      const result = await uploadFile(
        req.file.buffer,
        req.file.originalname
      );

      imageUrl = result.url;
    }

    // Validate post
    if (!content?.trim() && !imageUrl) {
      return res.status(400).json({
        message: "Post must contain text or an image",
      });
    }

    // Create post
    const post = await Post.create({
      content: content || "",
      image: imageUrl,
      author: req.userId,
    });

    // Get author information
    await post.populate("author", "name email");

    // Send response
    res.status(201).json({
      message: "Post created successfully",
      post: post.toObject(),
    });

  } catch (error) {
    console.error("Create post error:", error);

    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};


// =========================
// GET FEED
// =========================

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      posts,
    });

  } catch (error) {
    console.error("Get posts error:", error);

    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};


module.exports = {
  createPost,
  getPosts,
};