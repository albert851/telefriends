import React, { FC, useEffect, useState } from "react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlise";

interface NotificationProps {
  disp: string;
}

const Notification: FC<NotificationProps> = ({ disp }) => {
  const user = useAppSelector(userSelector);

  useEffect(()=>{

  },[disp])
  return (
    <div className="header__notification">
      <FontAwesomeIcon
        className="notification__icon"
        style={{ display: disp }}
        icon={faBell}
      />
    </div>
  );
};

export default Notification;
