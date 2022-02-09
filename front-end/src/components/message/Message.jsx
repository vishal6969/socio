import "./message.css";

export default function Message({own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">I am a message please do not take me in a jokes, ok?</p>
      </div>
      <div className="messageBottom">69 seconds ago</div>
    </div>
  );
}
