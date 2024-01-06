import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./services/socket";

interface messageData {
  message: string;
}

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    function onConnect() {
      socket.connected;
    }

    function onDisconnect() {
      socket.disconnected;
    }

    return () => {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.on("event:receive", (data: messageData) => {
        console.log(data.message);
        setMessageReceived(data.message);
      });
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("event:message", { message });
  };

  return (
    <div>
      <h1>Welcome to Socket chat!</h1>
      <h3>All Messages</h3>
      <div>
        {/* All messages */}
        {messageReceived}
      </div>
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Enter message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
