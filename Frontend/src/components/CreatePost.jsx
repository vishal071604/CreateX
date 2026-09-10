import { useRef, useState } from "react";
import { createPost } from "../services/postService";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const imageInputRef = useRef(null);

  // Handle post creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check whether post has text or image
    if (!content.trim() && !image) {
      setError("Write something or select an image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create FormData
      const formData = new FormData();

      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      // Send post to backend
      const data = await createPost(formData);

      // Clear form
      setContent("");
      setImage(null);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      // Send new post to Home
      onPostCreated(data.post);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        {/* Post Content */}
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Image */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        {/* Selected Image Name */}
        {image && <p>{image.name}</p>}

        {/* Error */}
        {error && <p>{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;