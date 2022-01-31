import React from 'react';
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);
library.add(faEdit);
library.add(faCommentDots);
library.add(faBell);

function Navbar(params) {
    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <span className="logo">Socio</span>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <FontAwesomeIcon icon="edit" />
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
              <FontAwesomeIcon icon="user" />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <FontAwesomeIcon icon="comment-dots" />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <FontAwesomeIcon icon="bell" />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Navbar;