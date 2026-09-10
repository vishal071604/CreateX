import { useState } from "react";

import {
  likePost,
  unlikePost,
} from "../services/likeService";

function PostCard({ post }) {
  const [likesCount, setLikesCount] = useState(
    post.likesCount || 0
  );

  const [liked, setLiked] = useState(
    post.liked || false
  );

  const [loading, setLoading] = useState(false);

  // =========================
  // LIKE / UNLIKE
  // =========================
  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to like posts");
      return;
    }

    try {
      setLoading(true);

      let data;

      if (liked) {
        data = await unlikePost(post._id);
      } else {
        data = await likePost(post._id);
      }

      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (error) {
      console.error("Like error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-card">

      {/* AUTHOR */}
      <div className="post-author">
        <strong>
          {post.author?.name || "Unknown User"}
        </strong>

        <small>
          {post.createdAt
            ? new Date(
                post.createdAt
              ).toLocaleString()
            : ""}
        </small>
      </div>

      {/* CONTENT */}
      {post.content && (
        <p className="post-content">
          {post.content}
        </p>
      )}

      {/* IMAGE */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="post-image"
        />
      )}

      {/* ACTIONS */}
      <div className="post-actions">
        <button
          type="button"
          className="like-button"
          onClick={handleLike}
          disabled={loading}
          aria-label={
            liked
              ? "Unlike post"
              : "Like post"
          }
        >
          <span className="heart-icon">
            {liked ? "❤️" : "♡"}
          </span>
        </button>

        <span className="like-count">
          {likesCount}{" "}
          {likesCount === 1
            ? "like"
            : "likes"}
        </span>
      </div>
    </div>
  );
}

export default PostCard;