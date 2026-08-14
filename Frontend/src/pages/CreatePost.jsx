import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);// Append the image file to the form data
      formData.append("caption", caption);// Append the caption to the form data

      await axios.post("http://localhost:3000/create-post", formData)
        .then((response) => {
            navigate("/feed");
        });
    } catch (error) {
      console.log(error);
      alert("Error creating post");
    }
  };

  return (
    <section className="create-post-section">
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="text"
          name="caption"
          placeholder="Enter caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default CreatePost;