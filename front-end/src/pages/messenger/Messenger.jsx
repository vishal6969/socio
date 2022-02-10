import "./messenger.css";
import Navbar from "../../components/navbar/Navbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [curChat, setCurChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const scroll = useRef();

  useEffect(() => {
    setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    socket?.on("lomda", (message) => {
      console.log(message);
    });
  }, [socket]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [user._id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/message/" + curChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [curChat]);

  const handleClick = async () => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: curChat._id,
    };
    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => {
              return (
                <div onClick={() => setCurChat(c)} key={c._id}>
                  <Conversation convo={c} curUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {curChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scroll}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleClick}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="noConversationText">
                Click on a conversation to chat with...
              </div>
            )}
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
