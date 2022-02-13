import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({convo, curUser}) {
  
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friend = convo.members.find((u) => {
      return u !== curUser._id;
    })
    const getUser = async () => {
    try {
      const res = await axios.get("/user?userId=" + friend);
      setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  },[convo, curUser._id]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePhoto ? PF +"/"+ user?.profilePhoto : "/assets/person/noAvatar.png"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
