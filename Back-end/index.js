const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();
const connectDB = require("./connection/Connection");
const NotFoundMiddleWare = require("./middleware/NotFound");
const errorHandlerMiddleware = require("./Middleware/ErrorHandler");
const userRoute = require("./Router/User");
const chatRoute = require("./Router/Chat");
const MessageRoute = require("./Router/Message");
const auth = require("./Middleware/UserAuth");
const chatAuth = require("./Middleware/ChatAuth");

const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

//Socket.io connection
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

//Middleware
app.use(express.json());

//Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/chats", auth, chatRoute);
// app.use("/api/v1/message", chatAuth, MessageRoute);


app.get("/", (req, res) => {
  res.send("Welcome to the chat app API");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(process.env.MONGO_URL);
});

app.use(NotFoundMiddleWare);
app.use(errorHandlerMiddleware);
