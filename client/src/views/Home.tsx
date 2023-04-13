import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userApi";
import { userSelector } from "../features/user/user.Slise";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import socket from "../sockets/socket";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [userSocketId, setUserSocetId] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  console.log("albert")

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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (user) {
    return (
      <div className="home__container home__grid">
        <NavBar />
        <Main />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Home;
