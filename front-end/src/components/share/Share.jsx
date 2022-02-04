import "./share.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faShareSquare,
  faCompass,
  faLaughBeam,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePhoto
                ? user.profilePhoto
                : "/assets/person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind?..." + user.username}
            ref={desc}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <FontAwesomeIcon className="shareIcon" icon={faImage} />
              <span className="shareOptionText">Photo or Video</span>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="shareOption">
              <FontAwesomeIcon className="shareIcon" icon={faShareSquare} />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <FontAwesomeIcon className="shareIcon" icon={faCompass} />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <FontAwesomeIcon className="shareIcon" icon={faLaughBeam} />
              <span className="shareOptionText">Feelings</span>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
