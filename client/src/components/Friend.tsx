import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { getUserByCookie } from "../../src/features/user/userApi";
import { userSelector } from ".././features/user/user.Slise";


interface FriendProps {
  friend: any;
}

const Friend: FC<FriendProps> = ({ friend }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [friendName, setFriendName] = useState("");
  const [connected, setConnected] = useState<string>("red");

  useEffect(() => {
    dispatch(getUserByCookie());
    setFriendName(friend.userName);

    if(friend.connected == true){
      setConnected("green")
    }
  }, [friend]);

  return (
    <p className="friend">
      <div className="onLineSign" style={{ backgroundColor: connected }}></div>
      {friendName}
    </p>
  );
};

export default Friend;
