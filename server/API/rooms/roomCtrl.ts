import express from "express";
import RoomModel from "./room.Model";
import jwt from "jwt-simple";
const saltRounds = 10;

export async function createRoom(req: express.Request, res: express.Response) {
    try {
      const { roomUsers } = req.body;
      console.log(roomUsers)
      if (!roomUsers)
        throw new Error("Couldn't get room users from req.body");
  
      const roomDB = new RoomModel({ roomUsers });
      await roomDB.save();

      const cookie = { roomId: roomDB._id };
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("Couldn't load secret from .env");

      const JWTCookie = jwt.encode(cookie, secret);

      if (roomDB) {
        res.cookie("roomID", JWTCookie);
        res.send({ create: true, roomDB });
      } else {
        res.send({ register: false });
      }

    } catch (error) {
      res.send({ error: error.message });
    }
  }

  export async function closeRoom(req, res) {
    try {
      res.clearCookie("roomID");
      res.send({ closed_Room: true });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  export async function getAllRooms(req, res) {
    try {
      const roomsDB = await RoomModel.find();
      res.send({ roomsDB });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  export async function getRoomByCookie(req, res) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("Couldn't load secret from .env");
  
      const { roomID } = req.cookies;
      if (!roomID) throw new Error("Couldn't find room from cookies");
  
      const decodedRoomId = jwt.decode(roomID, secret);
      const { roomId } = decodedRoomId;
  
      const roomDB = await RoomModel.findById(roomId);
      if (!roomDB)
        throw new Error(`Couldn't find user id with the id: ${roomId}`);
  
      res.send({ roomDB });
    } catch (error) {
      res.send({ error: error.message });
    }
  }