import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

dotenv.config();

const mongo_uri = process.env.MONGO_URI;
const PORT = process.env.PORT;
const httpServer = createServer(app);

mongoose.set("strictQuery", true);

mongoose
  .connect(mongo_uri)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("At mongoose.connect");
    console.log(err.message);
  });

app.use(express.json());
app.use(cookieParser());

import useRoutes from "./API/users/userRoutes";
app.use("/api/users", useRoutes);

import roomRoutes from "./API/rooms/roomRoutes";
app.use("/api/rooms", roomRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`user cnnected: {socket.id}`);
  socket.emit("welcome", { message: "Welcome!" });
  socket.on('ROOM:JOIN', (data) => {
    socket.join(data.roomId);
  })
  socket.on("send_message", (message) => {
    console.log(message);
    io.sockets.emit("send_message", message);
  });
});

httpServer.listen(PORT);

// server.listen(PORT, () => {
//   console.log(`server connected to port: ${PORT}`);
// });
