import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userApi";
import { userSelector } from "../features/user/user.Slise";
import Search from './Search';
import FriendsList from './FriendsList';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userSelector);
    const [username, setUsername] = useState<string>();
    const [searchValue, setSearchValue] = useState("");
  
    useEffect(() => {
      dispatch(getUserByCookie());
      setUsername(user?.userName);
    }, [user]);
  return (
    <div className="navBar navBar__grid">
        <h4 className="navBar__username">{`Hello ${username}`}</h4>
        <Search setSearchValue={setSearchValue} />
        <FriendsList searchValue={searchValue} />
    </div>
  )
}

export default NavBar