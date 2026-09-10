const Post = require("../models/Post");
const uploadFile = require("../utils/uploadFile");

const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const trimmedContent = content?.trim() || "";

    if (!trimmedContent && !req.file) {
      return res.status(400).json({
        message: "Post must contain text or an image",
      });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await uploadFile(
        req.file.buffer,
        req.file.originalname
      );

      imageUrl = result.url;
    }

    const post = await Post.create({
      content: trimmedContent,
      image: imageUrl,
      author: req.userId,
    });

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

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

module.exports = {
  createPost,
  getPosts,
};