import "./share.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faShareSquare,
  faCompass,
  faLaughBeam,
} from "@fortawesome/free-solid-svg-icons";

export default function Share() {

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/7.jpeg" alt="" />
          <input placeholder="What's in your mind..." className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareOptions">
          <label className="shareOption">
            <FontAwesomeIcon className = "shareIcon" icon={faImage} />
            <span className="shareOptionText">Photo or Video</span>
          </label>
          <div className="shareOption">
            <FontAwesomeIcon className = "shareIcon" icon={faShareSquare} />
            <span className="shareOptionText">Tag</span>
          </div>
          <div className="shareOption">
            <FontAwesomeIcon className = "shareIcon" icon={faCompass} />
            <span className="shareOptionText">Location</span>
          </div>
          <div className="shareOption">
            <FontAwesomeIcon className = "shareIcon" icon={faLaughBeam} />
            <span className="shareOptionText">Feelings</span>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
