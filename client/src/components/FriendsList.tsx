import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlise";
import { getUserByCookie } from "../features/user/userApi";
import Friend from "./Friend";

interface FriendsListProps {
  searchValue: any;
  setRoom: any;
}

const FriendsList: FC<FriendsListProps> = ({ searchValue, setRoom }) => {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [friendsArray, setFriendsArray] = useState<any>([""]);
  const [friendsDisplayArray, setFriendsDisplayArray] = useState<any>([""]);
  const search = `^${searchValue}`;
  const [loading, setLoading] = useState(true);

  async function getFriendList() {
    try {
      const { data } = await axios.get("/api/users");

      const friendsData = data.usersDB.filter(function (friend: any) {
        return friend._id !== user?._id;
      });

      setFriendsArray(data.usersDB);

      if (search === `^`) {
        setFriendsArray(friendsData);
      } else {
        searchFunc(friendsData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function filterArray(arrayOfUsers: string[]) {
    const friendsData = arrayOfUsers.filter(function (friend: any) {
      return friend._id !== user?._id;
    });
    return friendsData;
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
      setFriendsArray(
        friendsArray.filter(function (friend: any) {
          return friend.userName == name;
        })
      );
    });
  };

  useEffect(() => {
    getFriendList();
    setFriendsDisplayArray(friendsArray);
  }, [search]);

  useEffect(() => {
    getFriendList();
  }, []);

  useEffect(() => {
    const friendsData = filterArray(friendsArray);
    setFriendsDisplayArray(friendsData);
  }, [user]);

  return (
    <div className="friendsList">
      {friendsDisplayArray.map(
        (friend: any, index: React.Key | null | undefined) => {
          return <Friend key={index} friend={friend} setRoom={setRoom} />;
        }
      )}
    </div>
  );
};

export default FriendsList;
