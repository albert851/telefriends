import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import FriendsList from "./FriendsList";
import { getUserByCookie } from "./../features/user/userApi";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlise";

const NavBar = () => {
  const [username, setUsername] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const user = useAppSelector(userSelector)
  
  return (
    <div className="navBar navBar__grid">
      <h4 className="navBar__username">{`Hello ${user?.userName}`}</h4>
      <Search setSearchValue={setSearchValue} />
      <FriendsList searchValue={searchValue} />
    </div>
  );
};

export default NavBar;
