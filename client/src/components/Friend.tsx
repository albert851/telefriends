import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { getUserByCookie } from "../../src/features/user/userApi";
import { userSelector } from "../features/user/userSlise";
import socket from "../sockets/socket";
import { changeFriend } from "../features/friend/selectedFriend";

interface FriendProps {
  friend: any;
  setRoom: any;
}

const Friend: FC<FriendProps> = ({ friend, setRoom }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [friendName, setFriendName] = useState("");
  const [connected, setConnected] = useState<string>("red");

  async function handleRoom(ev: any) {
    try {
      ev.preventDefault();
      const roomUsers: string[] = [user?._id, friend._id];
      const { data } = await axios.post("/api/rooms/newRoom", {
        roomUsers,
      });

      dispatch(
        changeFriend({
          id: friend._id,
          socketID: friend.socketID,
          name: friend.userName,
        })
      );

      setRoom(friend._id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setFriendName(friend.userName);

    if (friend.connected == true) {
      setConnected("green");
    }
  }, [friend]);

  return (
    <p className="friend" onClick={handleRoom}>
      <div className="onLineSign" style={{ backgroundColor: connected }}></div>
      {friendName}
    </p>
  );
};

export default Friend;
