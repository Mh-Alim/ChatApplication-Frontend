import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import sendLogo from "../../images/send.png";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message.js";
import ReactScroll from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;
// const ENDPOINT = "https://heythere-chat-app.herokuapp.com/"
const ENDPOINT = "http://localhost:4500";
const Chat = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  console.log(message);

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
      console.log("connected", socket.id);
    });

    socket.emit("joined", { user });

    socket.on("Welcome", (data) => {
      setMessage((prevMessage) => [...prevMessage, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
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
      <div className="chatContainer">
        <div className="header">
          <h2>hey there</h2>
          <a href="/">
            <img src={closeIcon} alt="" />
          </a>
        </div>
        <ReactScroll className="chatBox">
          {message.map((item, i) => (
            <Message
              key={item.id}
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

export default Chat;
