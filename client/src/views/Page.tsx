import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookie } from "../features/user/userApi";
import { userSelector } from "../features/user/userSlise";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";
import { Outlet } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);


  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    {!user ? navigate("/login") : navigate("/home")}
    if (!user) {
      navigate("/login");
    }
  }, [user])
 
  return (
    <div className="page page__container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Page;
