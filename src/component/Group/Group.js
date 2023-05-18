import React, { useState } from "react";
import "../Join/Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let groupName;
let groupId;
const sendUser = () => {
  groupName = document.getElementById("group-name").value;
  groupId = document.getElementById("group-id").value;
  groupName = groupName.trim();
  groupId = groupId.trim();
  document.getElementById("group-name").value = "";
  document.getElementById("group-id").value = "";
};

const Group = () => {
  const [gpName, setGpName] = useState("");
  const [gpId, setGpId] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Set Group Name and Group Id</h1>
        <input
          onChange={(e) => setGpName(e.target.value)}
          placeholder="Enter Group Name"
          type="text"
          id="group-name"
          className="joinInput"
        />
        <input
          onChange={(e) => setGpId(e.target.value)}
          placeholder="Enter Group Id"
          type="text"
          id="group-id"
          className="joinInput"
        />

        <Link
          onClick={(event) =>
            (!gpId) ? event.preventDefault() : null
          }
          to= {`/chats/${gpId}/${gpName}`}
        >
         
          <button onClick={sendUser} className="joinbtn">
            Let's Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Group;
export { groupName };
