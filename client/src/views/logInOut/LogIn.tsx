import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../sockets/socket";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const connected = true;
  const navigate = useNavigate();

  async function handleConnectionStatus(userData: any) {
    try {
      const userId = userData.userDB._id;
      const socketID = socket.id;
      const { data } = await axios.patch(`/api/users/login/${userId}`, {
        connected,
        socketID,
      });
      if (data.connected) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      if (data.login) {
        handleConnectionStatus(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="login logInOut__grid">
      <form className="login__form " onSubmit={handleSubmit}>
        <legend>Log In</legend>
        <input
          className="login__input"
          value={email}
          type="email"
          placeholder="email"
          required
          onInput={(ev: any) => {
            setEmail(ev.target.value);
          }}
        />
        <input
          className="login__input"
          value={password}
          type="password"
          placeholder="password"
          required
          onInput={(ev: any) => {
            setPassword(ev.target.value);
          }}
        />
        <button className="login__submit" type="submit">
          Login
        </button>
        <Link
          className="login__registrationLink"
          style={{ textDecoration: "none" }}
          to={`/registration`}
        >
          <p>To register click here</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
