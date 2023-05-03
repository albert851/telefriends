import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlise";

interface LogOutProps {
  setDisp: CallableFunction;
  disp: string;
}

const Logout: FC<LogOutProps> = ({ disp, setDisp }) => {
  const user = useAppSelector(userSelector);
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
        setDisp("none");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCloseRoom() {
    try {
      console.log("close room");
      const { data } = await axios.get("/api/rooms/close");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    {user ? setDisp("block") : setDisp("none")};
  }, [user]);

  return (
    <FontAwesomeIcon
      className="header__logOutIcon"
      style={{ display: disp }}
      icon={faArrowRightFromBracket}
      onClick={handleConnectionStatus}
    />
  );
};

export default Logout;
