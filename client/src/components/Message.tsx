import React, { FC, useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlise";

interface MessageProps {
  message: any;
  ownMes: boolean;
  friendName: any;
}

const Message: FC<MessageProps> = ({ message, ownMes, friendName }) => {
  const [own, setOwn] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>();
  const [name, setName] = useState<string>();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    setOwn(ownMes);

    if (message) {
      setMsg(message.message);

      if (message.senderId == user?._id) setName(user?.userName);
      else setName(friendName);
    }
  }, []);
  return (
    <div className={own ? "message__own" : "message"}>
      <div className="message__top">
        <h5 className="message__sender">{name}</h5>
        <p className="message__text">{msg}</p>
      </div>
      <div className="message__botom">
        <TimeAgo datetime={message.createdAt}></TimeAgo>
      </div>
    </div>
  );
};

export default Message;
