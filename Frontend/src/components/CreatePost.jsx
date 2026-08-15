import { useState } from "react";
import { createPost } from "../services/postService";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      setError("Write something or select an image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      const data = await createPost(formData);

      setContent("");
      setImage(null);

      document.getElementById("imageInput").value = "";

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
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image && <p>{image.name}</p>}

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;