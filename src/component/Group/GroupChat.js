import React,{useState,useEffect} from "react";
import { user } from "../Join/Join";
import { groupName } from "./Group";
import sendLogo from "../../images/send.png";
import socketIo from "socket.io-client";
import "../Chat/Chat.css";
import Message from "../Message/Message.js";
import ReactScroll from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { useParams } from "react-router-dom";

let socket;
// const ENDPOINT = "https://heythere-chat-app.herokuapp.com/"
const ENDPOINT = "http://localhost:4500";
const GroupChat = () => {
  let { RoomId, roomName } = useParams();
  let roomId = RoomId + roomName;

  console.log("roomid and name ",RoomId,roomName,roomId);
  const [id, setId] = useState();
  const [message, setMessage] = useState([]);
  const [totUsers, setTotUsers] = useState(0);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id,roomId });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
      console.log("connected", socket.id);
    });


    socket.emit("joined", { user,roomId });

    socket.on("Welcome", (data) => {
      setMessage((prevMessage) => [...prevMessage, data]);
      console.log(data.user, data.message);
    });

    socket.on("total-user", (data) => {
      setTotUsers(data);
    })

    socket.on("userJoined", (data) => {
      console.log("getiing user joined");
      setMessage((prevMessage) => [...prevMessage, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessage((prevMessage) => [...prevMessage, data]);
      console.log(data.user, data.message);
    });
    socket.on("sendMessage", (data) => {
      setMessage((prevMessage) => [...prevMessage, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);
  return (
    <div className="chatPage">
      <div className="show_total_user">{ totUsers } User's</div>
      <div className="chatContainer">
        <div className="header">
          <h2>{roomName}</h2>
          <a href="/">
            <img src={closeIcon} alt="" />
          </a>
        </div>
        <ReactScroll className="chatBox">
          {message.map((item, i) => (
            <Message
              key={i}
              user={id === item.id ? "" : item.user}
              message={item.message}
              classs={id === item.id ? "right" : "left"}
            />
          ))}
        </ReactScroll>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} type="text" className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
