import { useEffect, useState } from "react";
import {
  likePost,
  unlikePost,
  getLikeCount,
  checkLike,
} from "../services/likeService";

function PostCard({ post }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const count = await getLikeCount(post._id);
        setLikesCount(count);

        if (token) {
          const userLiked = await checkLike(post._id);
          setLiked(userLiked);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadLikes();
  }, [post._id, token]);

  const handleLike = async () => {
    if (!token) {
      alert("Please login to like posts");
      return;
    }

    try {
      setLoading(true);

      if (liked) {
        const data = await unlikePost(post._id);

        setLiked(false);
        setLikesCount(data.likesCount);
      } else {
        const data = await likePost(post._id);

        setLiked(true);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-card">
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="post-image"
        />
      )}

      {post.content && <p>{post.content}</p>}

      <button
        onClick={handleLike}
        disabled={loading}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <span>
        {likesCount}{" "}
        {likesCount === 1 ? "Like" : "Likes"}
      </span>

      <small>
        {new Date(post.createdAt).toLocaleString()}
      </small>
    </div>
  );
}

export default PostCard;