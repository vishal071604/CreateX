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

  // =========================
  // LOAD POSTS
  // =========================

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts();

      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Feed error:", error);
      setError(error.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // =========================
  // ADD NEW POST
  // =========================

  useEffect(() => {
    if (
      newPost &&
      typeof newPost === "object" &&
      newPost._id
    ) {
      setPosts((prevPosts) => {
        const alreadyExists = prevPosts.some(
          (post) => post._id === newPost._id
        );

        if (alreadyExists) {
          return prevPosts;
        }

        return [newPost, ...prevPosts];
      });
    }
  }, [newPost]);

  // =========================
  // LIKE / UNLIKE
  // =========================

  const handleLike = async (postId, liked) => {
    try {
      let data;

      if (liked) {
        data = await unlikePost(postId);
      } else {
        data = await likePost(postId);
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="feed-message">
        Loading posts...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="feed-message feed-error">
        {error}
      </div>
    );
  }

  // =========================
  // FEED
  // =========================

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

            {/* =========================
                AUTHOR
            ========================= */}

            <div className="post-author">

              <div className="author-info">
                <strong>
                  {post.author?.name ||
                    "Unknown User"}
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

            {/* =========================
                CONTENT
            ========================= */}

            {post.content && (
              <p className="post-content">
                {post.content}
              </p>
            )}

            {/* =========================
                IMAGE
            ========================= */}

            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="post-image"
              />
            )}

            {/* =========================
                ACTIONS
            ========================= */}

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
                aria-label={
                  post.liked
                    ? "Unlike post"
                    : "Like post"
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