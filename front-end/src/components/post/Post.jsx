import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState({});
  const { user: curUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLike(post.likes.includes(curUser._id));
  }, [post.likes, curUser._id]);

  const likeHandler = async () => {
    try {
      await axios.put("/post/" + post._id + "/like", { userId: curUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };

  const deletePost = async () => {
    try {
      await axios.post("/post/" + post._id, {
        userId:curUser._id
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePhoto
                    ? PF + "/" + user.profilePhoto
                    : "/assets/person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight" onClick={deletePost}>
            <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faBomb} />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + "/" + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              onClick={likeHandler}
              src={`${PF}/like.png`}
              alt=""
            />
            <img
              className="likeIcon"
              onClick={likeHandler}
              src={`${PF}/heart.png`}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
