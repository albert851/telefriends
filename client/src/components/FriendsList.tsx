import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { getUserByCookie } from "../../src/features/user/userApi";
import { userSelector } from ".././features/user/user.Slise";
import Friend from "./Friend";

interface FriendsListProps {
  searchValue: any;
}

const FriendsList: FC<FriendsListProps> = ({ searchValue }) => {
  const [friendsArray, setFriendsArray] = useState<any>([""]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const search = `^${searchValue}`;

  async function getFriendList() {
    try {
      const { data } = await axios.get("/api/users");

      const friendsData = data.usersDB.filter(function (friend: any) {
        return friend.userName != user?.userName;
      });

      if (search === `^`) {
        setFriendsArray(friendsData);
      } else {
        searchFunc(friendsData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const searchFunc = (friendsData: any) => {
    const regex = new RegExp(`${search}`);
    const re = regex.exec.bind(regex);

    const namesArr: any = Array.prototype.map.call(
      friendsData,
      (friend) => friend.userName
    );

    const searchName = namesArr.filter(re);
    setFriendsArray(friendsData);

    searchName.map((name: any) => {
      setFriendsArray(friendsArray.filter(function(friend:any){
        return friend.userName == name;
      }))
    });
  };

  useEffect(() => {
    dispatch(getUserByCookie());
    getFriendList();
  }, [search || user]);

  return (
    <div className="friendsList">
      {friendsArray.map((friend: any, index: React.Key | null | undefined) => {
        return <Friend key={index} friend={friend} />;
      })}
    </div>
  );
};

export default FriendsList;
