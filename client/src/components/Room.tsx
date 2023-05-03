import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { roomSelector } from "../features/room/roomSlise";
import { getRoomByCookie } from "../features/room/roomApi";
import Friend from "./Friend";
import { userSelector } from "../features/user/userSlise";
import {
  changeFriend,
  friendSelector,
} from "../features/friend/selectedFriend";
import socket from "../sockets/socket";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Message from "./Message";

const Room = () => {
  const room = useAppSelector(roomSelector);
  const user = useAppSelector(userSelector);
  const friend = useAppSelector(friendSelector);
  const [friendId, setFriendId] = useState<string>();
  const [friendName, setFriendName] = useState<string>();
  const [friendSocket, setFriendSocket] = useState<string>();
  const [lastMsgs, setLastMsgs] = useState<any[]>([]);
  const [msg, setMsg] = useState();
  const dispatch = useAppDispatch();
  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("addUser", user?._id);
  }, [user]);

  useEffect(() => {
    getMessages();

    socket.on("connectedUser", (data) => {
      if (data) {
        dispatch(getRoomByCookie());
        updateFriend(data);
      }
    });

    socket.on("get_message", (data) => {
      setLastMsgs((prev): any => [
        ...prev,
        {
          senderId: data.senderId,
          message: data.message,
          roomId: data.roomId,
          createdAt: Date.now(),
        },
      ]);
    });

    if (friend.id) {
      handleFriendData();
    } else {
      let findUser;

      if (user?._id == room?.userA) {
        findUser = room?.userB;
      } else {
        findUser = room?.userA;
      }

      if (findUser) getFriend(findUser);
    }

    return () => {
      socket.off("get_message");
    };
  }, []);

  async function handleCloseRoom() {
    try {
      const { data } = await axios.get("/api/rooms/close");
      dispatch(getRoomByCookie());
    } catch (error) {
      console.error(error);
    }
  }

  const updateFriend = (data: any) => {
    const socketId = data.socketId;
    const friendId = data.userId;

    if (room?.userA == friendId && friendId != user?._id) {
      setFriendId(friendId);
      setFriendName(data.userName);
      setFriendSocket(socketId);
    }
  };

  async function getFriend(findUser: string) {
    try {
      const { data } = await axios.get(`/api/users/${findUser}`);
      if (!data) throw new Error("no data from get_user_by_id");
      const { userDB } = data;
      setFriendId(userDB._id);
      setFriendName(userDB.userName);
      setFriendSocket(userDB.socketID);
    } catch (error: any) {
      console.error(error);
    }
  }

  async function getMessages() {
    try {
      if (room) {
        const { data } = await axios.post("/api/message/get-By-RoomId", {
          roomId: room?._id,
        });
        const message = data.messagesDB;
        setLastMsgs(message);

        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFriendData = () => {
    setFriendId(friend.id);
    setFriendName(friend.name);
    setFriendSocket(friend.socketID);
  };

  async function handleSend(ev: any) {
    try {
      ev.preventDefault();

      const senderId = user?._id;
      const roomId = room?._id;
      const message = msg;

      socket.emit("send_message", {
        senderId,
        friendSocket: friendSocket,
        message,
        roomId,
      });

      if (roomId && senderId) {
        const { data } = await axios.post("/api/message/newMessage", {
          senderId,
          roomId,
          message,
        });

        const messageDB = data.messageDB;
        setLastMsgs([...lastMsgs, messageDB]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="room">
      <div className="room__inBox">
        <div className="room__inBox__header">
          <h4>{friendName}</h4>
          <FontAwesomeIcon
            className="room__close__icon"
            icon={faXmark}
            onClick={handleCloseRoom}
          />
        </div>
        <div className="room__messages">
          {lastMsgs.map((m: any, index: React.Key | null | undefined) => {
            return (
              <Message
                key={index}
                message={m}
                ownMes={m.senderId != user?._id}
                friendName={friendName}
              />
            );
          })}
          <div ref={messageEndRef} />
        </div>
      </div>
      <div className="room__bottom">
        <textarea
          className="room__input"
          onInput={(ev: any) => {
            setMsg(ev.target.value);
          }}
        />
        <button className="room__send__btn" onClick={handleSend}>
          s e n d 📨
        </button>
      </div>
    </div>
  );
};

export default Room;
