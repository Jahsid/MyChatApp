import './App.css';
import {useState} from "react"
import io from "socket.io-client"
import Chat from './Chat';

const socket = io.connect("http://localhost:7000")

function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);
  const joinRoom = () =>{
    if (username !== "" && room !== "" ){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  };
  return (
    <div className="App">
    {!showChat ?(
    <div className='Container'>
      <h1>Chat App</h1>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="name..."
        onChange={(event)=>{
          setUsername(event.target.value)
        }}
      /><br/><br/>
      <input
        type="text"
        placeholder="room ID..."
        onChange={(event)=>{
          setRoom(event.target.value)
        }}
      /><br/><br/>
      <button onClick={joinRoom}>Join</button>
    </div>
    ):(
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
}

export default App;
