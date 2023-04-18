import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import {
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Room from "./Room";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getRoomByCookie } from "../features/room/roomApi";
import { roomSelector } from "../features/room/roomSlise";
import { roomSlice } from "./../features/room/roomSlise";
import { current } from "@reduxjs/toolkit";
interface MainProps {
  newRoom: any;
}

const Main: FC<MainProps> = ({ newRoom }) => {
  const room = useAppSelector(roomSelector);
  const [currentRoomId, setCurrentRoomId] = useState<string>();
  const [newRoomId, setNewRoomId] = useState<string>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomByCookie());
  }, [newRoom]);

  if (!room) {
    return <div className="main main__grid"></div>;
  } else {
    return (
      <div className="main main__grid">
        <Room />
      </div>
    );
  }
};

export default Main;
