
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
const connectDB = require("./connection/Connection");
const errorHandlerMiddleware = require("./Middleware/ErrorHandler");
const notFoundMiddleware = require("./middleware/NotFound");
const userRoute = require("./Router/User");
const chatRoute = require("./Router/Chat");
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server);

require("dotenv").config();

// extra security packages
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: false,
}));

// Middleware
app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/chats", chatRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the To-Do App API");
});

//Connect to DB and start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(process.env.MONGO_URL);
});
