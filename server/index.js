import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
http.Server(app);
app.use(cors());

const PORT = 8080;

app.use(cors());

const server = app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
})

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`New Socket connection: ${socket.id}`);

    socket.on("chat", (payload) => {
        console.log("What is payload? ", payload);
        io.emit("chat", payload)
    })
    
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    })

    socket.on("event:message", (data) => {
        console.log("New message: ", data);
        socket.emit("event:receive", data);
    })
})




