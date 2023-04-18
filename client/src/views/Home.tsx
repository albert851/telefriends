import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlise";
import { getUserByCookie } from "../features/user/userApi";
import socket from "../sockets/socket";

const Home = () => {
  const [newRooom, setNewRoom]= useState();
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [roomId, setRoomId] = useState("");
  const [userSocketId, setUserSocetId] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    dispatch(getUserByCookie());

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents((previous): any => [...previous, value]);
    }

    function onSendMessage(message: any) {
      console.log(message);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.on("send_message", onSendMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
      socket.off("send_message");
    };
  }, []);

  return (
    <div className="home__container home__grid">
      <NavBar setRoom={setNewRoom} />
      <Main newRoom={newRooom} />
    </div>
  );
};

export default Home;
