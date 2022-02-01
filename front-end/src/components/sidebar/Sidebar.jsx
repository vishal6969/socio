import "./sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faRss,
  faEnvelope,
  faComments,
  faBookmark,
  faQuestionCircle,
  faCalendarCheck,
  faList,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { Users } from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faRss} className="sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faEnvelope} className="sidebarIcon"/>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faPlayCircle} className="sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faComments} className="sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faBookmark} className="sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faQuestionCircle} className="sidebarIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faHandshake} className="sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faCalendarCheck} className="sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <FontAwesomeIcon icon={faList} className="sidebarIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriends key={u.id} user={ u}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
