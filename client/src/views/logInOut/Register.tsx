import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const navigate = useNavigate();

  async function handleSubmit(ev: any) {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/api/users/register", {
        email,
        userName,
        password,
        repeatPassword,
      });
      console.log(data);
      if (data.register) {
        navigate("/logIn");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="register logInOut__grid">
      <form className="register__form" onSubmit={handleSubmit}>
      <legend>Register</legend>
        <input
          className="register__input"
          value={email}
          type="email"
          placeholder="email"
          required
          onInput={(ev: any) => {
            setEmail(ev.target.value);
          }}
        />
        <input
          className="register__input"
          value={userName}
          type="trxt"
          placeholder="user name"
          required
          onInput={(ev: any) => {
            setUserName(ev.target.value);
          }}
        />
        <input
          className="register__input"
          value={password}
          type="password"
          placeholder="password"
          required
          onInput={(ev: any) => {
            setPassword(ev.target.value);
          }}
        />
        <input
          className="register__input"
          value={repeatPassword}
          type="password"
          placeholder="repeat password"
          required
          onInput={(ev: any) => {
            setRepeatPassword(ev.target.value);
          }}
        />
        <button className="register__submit" type="submit">Register</button>
        <Link className="register__loginLink"
          style={{ textDecoration: "none" }}
          to={`/login`} >
          <p>To log-in click here</p>
        </Link>
      </form>
    </div>
  );
};

export default Register;