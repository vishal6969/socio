import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCommentDots, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function Navbar(params) {
    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="logo">Socio</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
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
              <FontAwesomeIcon icon={faCommentDots} />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <FontAwesomeIcon icon={faBell} />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
        </div>
      </div>
    );
}

export default Navbar;