
import { useState } from "react";

import { createPost } from "../services/postService";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // CREATE POST
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty post
    if (!content.trim() && !image) {
      setError("Please add some text or an image");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const formData = new FormData();

      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      const data = await createPost(formData);

      // Clear form
      setContent("");
      setImage(null);

      onPostCreated?.(data.post);

      // Reset file input
      e.target.reset();
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create post";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>

        {/* Content */}
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        {/* Selected image */}
        {image && (
          <p>{image.name}</p>
        )}

        {/* Error */}
        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Create Post"}
        </button>

      </form>
    </div>
  );
}

export default CreatePost;

