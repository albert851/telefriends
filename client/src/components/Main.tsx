import React, { useEffect } from "react";
import Room from "./Room";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getRoomByCookie } from "../features/room/roomApi";
import { roomSelector } from "../features/room/roomSlise";
import { roomSlice } from "./../features/room/roomSlise";
import { friendSelector } from "../features/friend/selectedFriend";

const Main = () => {
  const room = useAppSelector(roomSelector);
  const friend = useAppSelector(friendSelector)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomByCookie());
  }, [friend]);

  if (room == null) {
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
