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

  const handleLike = async () => {
    setLoading(true);

    try {
      let data;

      if (liked) {
        data = await unlikePost(post._id);
      } else {
        data = await likePost(post._id);
      }

      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="post-card">

      {/* Author */}
      <div className="post-author">
        <strong>
          {post.author?.name || "Unknown User"}
        </strong>

        <small>
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : ""}
        </small>
      </div>

      {/* Content */}
      {post.content && (
        <p className="post-content">
          {post.content}
        </p>
      )}

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="post-image"
        />
      )}

      {/* Like */}
      <div className="post-actions">
        <button
          type="button"
          className="like-button"
          onClick={handleLike}
          disabled={loading}
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

