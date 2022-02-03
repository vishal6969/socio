import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/post/profile/"+username)
        : await axios.get("/post/timeline/61fb6d4aee80830bd339844d");
      setPost(res.data);
    };

    fetchPost();
  }, [username]);
  return (
    <div className="feed">
      <Share />
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}
