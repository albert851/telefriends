import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LogoutProps{
  user: any;
}

const Logout: FC <LogoutProps> = ({user}) => {
  const navigate = useNavigate();
  const [dispLogout, setDispLogout] = useState("");

  async function handleConnectionStatus(userData: any) {
    try {
      const connected = false;
      const userId = user?._id;
      const { data } = await axios.patch(`/api/users/login/${userId}`, {
        connected,
      });
      if (data.connected) {
        setDispLogout("none")
        handleLogout();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      console.log("trying to logout");
      const { data } = await axios.get("/api/users/logout");
      const { logout } = data;
      if (logout) {
        handleCloseRoom();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCloseRoom() {
    try {
      console.log("close room");
      const { data } = await axios.get("/api/rooms/closeRoom");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    {user ? setDispLogout("block") : setDispLogout("none")}
  }, [user]);

  return (
    <FontAwesomeIcon
      className="header__logOutIcon"
      style={{ display: dispLogout }}
      icon={faArrowRightFromBracket}
      onClick={handleConnectionStatus}
    />
  );
};

export default Logout;
