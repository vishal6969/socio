import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Rightbar({ user }) {
  const { user: curUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendList = await axios.get("/user/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
    setFollowed(curUser.following.includes(user?._id));
  }, [user, curUser.following]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/user/" + user._id + "/unfollow", {
          userId: curUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/user/" + user._id + "/follow", {
          userId: curUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const messageHandler = async () => {
    try {
      const res = await axios.get(
        "/conversation/find/" + user._id + "/" + curUser._id
      );
      if (!res.data) {
        const newConversastion = {
          sender: curUser._id,
          receiver: user._id,
        };
        await axios.post("/conversation/", newConversastion);
      }
      window.location.pathname = "/messenger";
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "/gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={PF + "/ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== curUser.username && (
          <div className="rightbarButtons">
            <button
              className="rightbarMessage"
              onClick={messageHandler}
              disabled={!followed}
            >
              Message
            </button>
            <button className="rightbarFollowButton" onClick={followHandler}>
              {followed ? "Unfollow" : "Follow"}
              <FontAwesomeIcon icon={followed ? faMinus : faPlus} />
            </button>
          </div>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "---"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div key={friend.id} className="rightbarFollowing">
                <img
                  src={
                    friend.profilePhoto
                      ? PF + "/"+friend.profilePhoto
                      : "/assets/person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbarWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
    </div>
  );
}
