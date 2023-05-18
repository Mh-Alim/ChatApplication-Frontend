import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;


const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}


const Join = (props) => {

    const [name, setname] = useState("");

    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>Hey There</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id='joinInput' className="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Let's Chat</button></Link>
                <br />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/group">  <button onClick={sendUser} className="joinbtn">Make Table</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }
