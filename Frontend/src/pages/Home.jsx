import { useState } from "react";

import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";

function Home() {
  const [newPost, setNewPost] = useState(null);

  return (
    <div className="home-container">
      <CreatePost onPostCreated={setNewPost} />

      <Feed newPost={newPost} />
    </div>
  );
}

export default Home;