import React, { useEffect, useState } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data.posts);
    } catch (err) {
      console.log(err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <h1>Loading posts...</h1>;
  if (error) return <h1>{error}</h1>; // why {} - because error is a string, we can directly render it without using curly braces. However, if we want to include it within JSX, we need to use curly braces to evaluate the expression and render the string value of error. So, in this case, we should use {error} to display the error message properly within the JSX structure.
  //example without curly braces: <h1>error</h1> - this will literally render the word "error" instead of the value of the error variable. With curly braces: <h1>{error}</h1> - this will evaluate the error variable and render its value, which is the actual error message we want to display.

  return (
    <section className="feed-section">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption} />
            <p>{post.caption}</p>
          </div>
        ))
      ) : (
        <h1>No posts available</h1>
      )}
    </section>
  );
};

export default Feed;