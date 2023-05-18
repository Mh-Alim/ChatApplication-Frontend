import './App.css';
import { Route, Routes } from "react-router-dom"
import Join from "./component/Join/Join.js"
import Chat from "./component/Chat/Chat.js"
import Group from './component/Group/Group';
import GroupChat from './component/Group/GroupChat';
// import socketIo from "socket.io-client"


// const ENDPOINT = "http://localhost:4500/";

// const socket = socketIo(ENDPOINT,{ transports:['websocket']});


function App() {


  // socket.on("connection",()=>{
  //   console.log("new connection is working in app");
  // })


  return (
    <div className="App">
        <Routes>
          <Route exact path='/' element = {<Join />} />
          <Route exact path='/chat' element = {<Chat/>}/>
          <Route exact path='/group' element = {<Group/>}/>
          <Route exact path='/chats/:RoomId/:roomName' element = {<GroupChat/>}/>
        </Routes>
    </div>
  );
}

export default App;
