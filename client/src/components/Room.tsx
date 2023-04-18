import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { roomSelector } from "../features/room/roomSlise";
import { getRoomByCookie } from "../features/room/roomApi";
import Friend from "./Friend";
import { userSelector } from "../features/user/userSlise";
import { changeFriend } from "../features/friend/selectedFriend";

const Room = () => {
  const room = useAppSelector(roomSelector);
  const user = useAppSelector(userSelector);
  const currentRoom = useAppSelector(changeFriend);
  const [FriendName, setFriendName] = useState();

  useEffect(() => {
    setFriendName(currentRoom.payload.friend.name)
  }, [room]);

  return (
    <div className="room">
      <div className="room__inBox">
        <h4>{FriendName}</h4>
      </div>
      <input className="room__input" />
      <button className="room__send__btn">s e n d 📨</button>
    </div>
  );
};

export default Room;
