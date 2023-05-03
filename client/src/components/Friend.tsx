import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { getUserByCookie } from "../../src/features/user/userApi";
import { userSelector } from "../features/user/userSlise";
import socket from "../sockets/socket";
import { changeFriend } from "../features/friend/selectedFriend";
import { User } from "../features/user/userModel";
interface FriendProps {
  friend: User;
}

const Friend: FC<FriendProps> = ({ friend }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [friendName, setFriendName] = useState("");
  const [connected, setConnected] = useState<string>("red");

  useEffect(() => {
    setFriendName(friend.userName);
    if (friend.connected == true) {
      setConnected("green");
      
    }
  }, [friend]);

  async function handleRoom(ev: any) {
    try {
      ev.preventDefault();

      await handleGetRoom();

      dispatch(
        changeFriend({
          id: friend._id,
          socketID: friend.socketID,
          name: friend.userName,
        })
      );

    } catch (error) {
      console.error(error);
    }
  }

  async function handleGetRoom() {
    if (user) {
      try {
        const { data } = await axios.post("/api/rooms/room-by-users", {
          userA: user._id,
          userB: friend._id,
        });

        const { roomDB } = data;
        if (!roomDB) {
          handlenewRoom();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handlenewRoom() {
    if (user) {
      try {
        const { data } = await axios.post("/api/rooms/newRoom", {
          userA: user._id,
          userB: friend._id,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <p className="friend" onClick={handleRoom}>
      <div className="onLineSign" style={{ backgroundColor: connected }}></div>
      {friendName}
    </p>
  );
};

export default Friend;
