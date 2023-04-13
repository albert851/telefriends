import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userApi";
import { userSelector } from "../features/user/user.Slise";
import { Link } from "react-router-dom";
import Logout from "../views/logInOut/Logout";
import {
  faComments,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);


  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  return (
    <div className="header header__grid">
      <nav>
        <div className="header__logo">
          <FontAwesomeIcon className="logo__icon" icon={faComments} />
          <h1 className="logo__name">TeleFriends</h1>
        </div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
        <Logout user={user}/>
      </nav>
    </div>
  );
};

export default Header;
