import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Messenger() {

  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {

    const fetchFriends = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFriends();
  }, [user._id]);
  
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => {
              return <Conversation key={c._id} convo={c} curUser={user}/>
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              <div className="chatBoxTop">
                <Message own={true} />
                <Message own={false} />
                <Message own={true} />
                <Message own={false} />
                <Message own={true} />
                <Message own={true} />
                <Message own={true} />
                <Message own={false} />
                <Message own={true} />
                <Message own={true} />
                <Message own={false} />
                <Message own={true} />
                <Message own={true} />
                <Message own={false} />
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                ></textarea>
                <button className="chatSubmitButton">Send</button>
              </div>
            </>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
