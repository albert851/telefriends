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

import messgeRoutes from "./API/messages/messageRoutes";
app.use("/api/message", messgeRoutes);

import socket from "./../client/src/sockets/socket";

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => userId.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`user cnnected: {socket.id}`);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("welcome", (data) => {
    console.log(data)
    const {userId, userName, socketId} = data;
    io.emit("connectedUser", {userId, userName, socketId});
  });

  socket.on("disconnected", () => {
    console.log("user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("send_message", (data) => {
    //const receiver = getUser(data.friendId)
    const {senderId, message, roomId} = data;

    io.to(data.friendSocket).emit("get_message", {
      senderId,
      roomId,
      message
    });
  });
});

httpServer.listen(PORT);

