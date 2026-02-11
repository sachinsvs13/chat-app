const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const connectDB = require("./connection/Connection");

const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(process.env.MONGO_URL);
});
