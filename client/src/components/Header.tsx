import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userApi";
import { userSelector } from "../features/user/userSlise";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import Logout from "../views/logInOut/Logout";
import {
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [disp, setDisp] = useState("")


  useEffect(() => {
    dispatch(getUserByCookie());
    {user ? setDisp("block") : setDisp("none")};
  }, []);

  useEffect(()=> {
    {user ? setDisp("block") : setDisp("none")};
  }, [user])


  return (
    <div className="header header__grid">
      <nav>
        <div className="header__logo">
          <FontAwesomeIcon className="logo__icon" icon={faComments} />
          <h1 className="logo__name">TeleFriends</h1>
        </div>
        <Notification disp={disp} />
        <Logout disp={disp} setDisp={setDisp} />
      </nav>
    </div>
  );
};

export default Header;
