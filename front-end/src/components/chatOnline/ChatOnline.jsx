import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ online, curUser, setCurChat }) {
  
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {

    const fetchOnlineFriends = async () => {
      try {
        const res = await axios.get("/user/friends/" + curUser);
        setOnlineFriends(res.data.filter((f) => online.includes(f._id)));
      } catch (err) {
        console.log(err);
      }
    };  

    fetchOnlineFriends();
  },[curUser, online]);

  const handleClick = async (otherUser) => {
    try {
      const res = await axios.get("/conversation/find/" + curUser + "/" + otherUser._id);
      setCurChat(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <div  className="chatOnline">
      {onlineFriends.map((o) => {
          return <div key={o._id} className="chatOnlineFriend" onClick={()=>handleClick(o)} >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  o.profilePhoto
                    ? PF + o.profilePhoto
                    : "/assets/person/noAvatar.png"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
          </div>
      })}
      </div>
  );
}
