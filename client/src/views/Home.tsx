import React, { useEffect, useState, useRef } from "react";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlise";
import { getUserByCookie } from "../features/user/userApi";
import socket from "../sockets/socket";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [roomId, setRoomId] = useState("");
  const [userSocketId, setUserSocetId] = useState("");
  const [fooEvents, setFooEvents] = useState([]);

  async function handleConnectionStatus() {
    try {
      const userId = user?._id
      const socketID = socket.id;
      const name = user?.userName;
      const { data } = await axios.patch(`/api/users/login/${userId}`, {
        connected: true,
        socketID,
      });
      if (data.connected) {
        const { userDB } = data;
        socket.emit("welcome", {
          userId,
          userName: name,
          socketId: socketID,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch(getUserByCookie());
    handleConnectionStatus();
  }, []);

  return (
    <div className="home__container home__grid">
      <NavBar />
      <Main />
    </div>
  );
};

export default Home;
