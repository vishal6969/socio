import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPost] = useState([]);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/post/profile/"+username)
        : await axios.get("/post/timeline/"+user._id);
      setPost(res.data);
    };

    fetchPost();
  }, [username, user._id]);
  
  return (
    <div className="feed">
      <Share />
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}
