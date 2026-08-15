const Post = require("../models/Post");
const Like = require("../models/Like");
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
    if (
      !content?.trim() &&
      !imageUrl
    ) {
      return res.status(400).json({
        message:
          "Post must contain text or an image",
      });
    }

    // Create post
    const post = await Post.create({
      content: content || "",
      image: imageUrl,

      // IMPORTANT
      author: req.userId,
    });

    // Get author information
    await post.populate(
      "author",
      "name email"
    );

    res.status(201).json({
      message:
        "Post created successfully",

      post: {
        ...post.toObject(),
        likesCount: 0,
        liked: false,
      },
    });
  } catch (error) {
    console.error(
      "Create post error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to create post",

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
      .populate(
        "author",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    // Add like count to every post
    const postsWithLikes =
      await Promise.all(
        posts.map(async (post) => {
          const likesCount =
            await Like.countDocuments({
              post: post._id,
            });

          return {
            ...post.toObject(),

            likesCount,

            liked: false,
          };
        })
      );

    res.status(200).json({
      posts: postsWithLikes,
    });
  } catch (error) {
    console.error(
      "Get posts error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch posts",

      error: error.message,
    });
  }
};


module.exports = {
  createPost,
  getPosts,
};