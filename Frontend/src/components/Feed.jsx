import { useEffect, useState } from "react";

import { getPosts } from "../services/postService";

import {
  likePost,
  unlikePost,
} from "../services/likeService";

function Feed({ newPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setError("");

      const posts = await getPosts();

      setPosts(posts);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (newPost) {
      setPosts((currentPosts) => [newPost, ...currentPosts]);
    }
  }, [newPost]);

  const handleLike = async (postId, liked) => {
    try {
      let data;

      if (liked) {
        data = await unlikePost(postId);
      } else {
        data = await likePost(postId);
      }

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likesCount: data.likesCount,
                liked: data.liked,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  if (loading) {
    return (
      <div className="feed-message">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-message feed-error">
        {error}
      </div>
    );
  }

  return (
    <div className="feed">
      {posts.length === 0 ? (
        <p className="feed-message">
          No posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <div
            className="post-card"
            key={post._id}
          >
            <div className="post-author">
              <div className="author-info">
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
            </div>

            {post.content && (
              <p className="post-content">
                {post.content}
              </p>
            )}

            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="post-image"
              />
            )}

            <div className="post-actions">
              <button
                type="button"
                className="like-button"
                onClick={() =>
                  handleLike(
                    post._id,
                    post.liked
                  )
                }
              >
                <span className="heart-icon">
                  {post.liked ? "❤️" : "♡"}
                </span>
              </button>

              <span className="like-count">
                {post.likesCount || 0}{" "}
                {post.likesCount === 1
                  ? "like"
                  : "likes"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;

