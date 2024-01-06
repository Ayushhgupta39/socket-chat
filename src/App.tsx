import  React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { socket } from "./services/socket";
import { nanoid } from "nanoid";

interface chatType {
  message: string,
  userName: string
}

// function App() {
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   useEffect(() => {
//     function onConnect() {
//       socket.connected;
//     }

//     function onDisconnect() {
//       socket.disconnected;
//     }

//     return () => {
//       socket.on("connect", onConnect);
//       socket.on("disconnect", onDisconnect);

//       socket.on("event:receive", (data: messageData) => {
//         console.log(data.message);
//         setMessageReceived(data.message);
//       });
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     socket.emit("event:message", { message });
//   };

//   return (
//     <div>
//       <h1>Welcome to Socket chat!</h1>
//       <h3>All Messages</h3>
//       <div>
//         {/* All messages */}
//         {messageReceived}
//       </div>
//       <input
//         type="text"
//         name="message"
//         id="message"
//         placeholder="Enter message..."
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

const userName = nanoid(4);
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<chatType[]>([]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([ ...chat, payload ])
    })
  })

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    socket.emit("chat", { message, userName })
    setMessage("");
  }

  return (
    <Fragment>
      <h1>Chat App</h1>
      <div>
        {chat.map((chat:chatType, i) => {
          return (
            <p key={i}>
              {chat.message} {" "}
              <span>
                id: {chat.userName}
              </span>
            </p>
          )
        })}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="chat"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </Fragment>
  );
}

export default App;
