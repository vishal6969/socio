import React, { useContext, useRef } from "react";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCommentDots,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  console.log(user);

  const search = useRef();
  const searchUser = async (e) => {
    if (e.keyCode === 13)
      window.location.pathname = "/profile/" + search.current.value;
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Socio</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <input
            placeholder="Search for your friends..."
            className="searchInput"
            onKeyUp={(e) => searchUser(e)}
            ref={search}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <FontAwesomeIcon icon={faUser} />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faCommentDots} />
            </Link>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <FontAwesomeIcon icon={faBell} />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePhoto
                ? PF + "/"+user.profilePhoto
                : "/assets/person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
