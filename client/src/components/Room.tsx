import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { roomSelector } from "../features/room/roomSlise";
import { getRoomByCookie } from "../features/room/roomApi";
import Friend from "./Friend";
import { userSelector } from "../features/user/userSlise";
import { changeFriend } from "../features/friend/selectedFriend";
import socket from "../sockets/socket";

const Room = () => {
  const room = useAppSelector(roomSelector);
  const user = useAppSelector(userSelector);
  const currentRoom = useAppSelector(changeFriend);
  const [friendId, setFriendId] = useState();
  const [friendSocketId, setFriendSocketId] = useState();
  const [friendName, setFriendName] = useState();
  const [msg, setMsg] = useState();

  const dataSet = () => {
    const friend = currentRoom.payload.friend;
    setFriendId(friend.id);
    setFriendSocketId(friend.socketID);
    setFriendName(friend.name);
  };

  

  useEffect(() => {
    dataSet();
    socket.emit("ROOM:JOIN", (room?._id, friendSocketId));
    socket.on('ROOM:JOINED', (friendSocketId)=>{
      console.log('new friend', friendName)
    })

  }, [room]);

  return (
    <div className="room">
      <div className="room__inBox">
        <h4>{friendName}</h4>
      </div>
      <input
        className="room__input"
        onInput={(ev: any) => {
          setMsg(ev.target.value);
        }}
      />
      <button className="room__send__btn">s e n d 📨</button>
    </div>
  );
};

export default Room;
