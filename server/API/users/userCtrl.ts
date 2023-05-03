import express from "express";
import UserModel, { UserValidation } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import socket from "./../../../client/src/sockets/socket";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { email, userName, password, repeatPassword } = req.body;
    if (!email || !userName || !password || !repeatPassword)
      throw new Error("Couldn't get all fields from req.body");

    const { error } = UserValidation.validate({
      email,
      userName,
      password,
      repeatPassword,
    });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userDB = new UserModel({ email, userName, password: hash });
    await userDB.save();

    //sending cookie
    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const JWTCookie = jwt.encode(cookie, secret);

    if (userDB) {
      res.cookie("userID", JWTCookie);
      res.send({ register: true, userDB });
    } else {
      res.send({ register: false });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Couldn't get all fields from req.body");

    const userDB = await UserModel.findOne({ email });
    if (!userDB) throw new Error("User with that email can't be found");
    if (!userDB.password) throw new Error("No password in DB");

    const isMatch = await bcrypt.compare(password, userDB.password);
    if (!isMatch) throw new Error("Email or password do not match");

    //sending cookie
    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const JWTCookie = jwt.encode(cookie, secret);

    res.cookie("userID", JWTCookie);
    res.send({ login: true, userDB });
  } catch (error) {
    res.send({ error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("userID");
    res.send({ logout: true });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    const userDB = await UserModel.findById(userId);
    if (!userDB)
      throw new Error(`Couldn't find user id with the id: ${userId}`);

    userDB.password = undefined;
    res.send({ userDB });
  } catch (error) {
    res.send({ error: error.message });
  }
}

export async function getAllUsers(req, res) {
  try {
    const usersDB = await UserModel.find();
    res.send({ usersDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
export async function getUserByCookie(req, res) {
  try {
    res.send({ test: "test" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateConnectionStatus(req, res) {
  try {
    const { connected, socketID } = req.body;
    const userDB = await UserModel.findByIdAndUpdate(
      req.params.id,
      { connected, socketID },
      { new: true, runValidators: true }
    );
    res.send({ connected: true, userDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getUserById(req, res) {
  try {
    const userDB = await UserModel.findById(req.params.id);
    res.send({ userDB });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
