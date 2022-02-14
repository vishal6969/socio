import "./profile.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const { user: curUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user?username=${username}`);
      setUser(res.data);
    };

    fetchUser();
  }, [username]);

  const handleAvatar = (e) => {
    if (user.username !== curUser.username) return;
    const input = e.target.parentElement.childNodes[3];
    input.click();
  };

  const handleCover = (e) => {
    if (user.username !== curUser.username) return;
    const input = e.target.parentElement.childNodes[1];
    input.click();
  };

  useEffect(() => {
    const updateAvatar = async () => {
      const data = new FormData();
      const fileName = Date.now() + avatar?.name;
      data.append("name", fileName);
      data.append("file", avatar);

      const updatedUser = {
        profilePhoto: fileName,
        userId:curUser._id
      };

      if (avatar) {
        try {
          await axios.post("/upload", data);
        } catch (err) {}
        try {
          await axios.put("/user/" + curUser._id, updatedUser);
          dispatch({ type: "AVATAR", payload: fileName });
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    };

    updateAvatar();
  }, [avatar, curUser._id, dispatch]);

  useEffect(() => {
    const updateCover = async () => {
      const data = new FormData();
      const fileName = Date.now() + cover?.name;
      data.append("name", fileName);
      data.append("file", cover);

      const updatedUser = {
        coverPhoto: fileName,
        userId:curUser._id
      };

      if (cover) {
        try {
          await axios.post("/upload", data);
        } catch (err) {}
        try {
          await axios.put("/user/" + curUser._id, updatedUser);
          dispatch({ type: "COVER", payload: fileName });
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    };

    updateCover();
  }, [cover, curUser._id, dispatch]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                htmlFor="avatar"
                onClick={(e) => handleCover(e)}
                src={
                  user.coverPhoto
                    ? PF + "/"+user.coverPhoto
                    : "/assets/person/noCover.png"
                }
                alt=""
              />
              <input
                style={{ display: "none" }}
                type="file"
                name="cover"
                id="file1"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setCover(e.target.files[0])}
              />
              <img
                className="profileUserImg"
                onClick={(e) => handleAvatar(e)}
                src={
                  user.profilePhoto
                    ? PF + "/"+user.profilePhoto
                    : "/assets/person/noAvatar.png"
                }
                alt=""
              />
              <input
                style={{ display: "none" }}
                type="file"
                name="avatar"
                id="file2"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            {user?._id ? (
              <>
                <Feed username={username} />
                <Rightbar user={user} />
              </>
            ) : (
              <div className="userNotFound">
                <h1>User not Found:(</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
