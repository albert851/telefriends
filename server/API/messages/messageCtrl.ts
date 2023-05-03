import express from "express";
import RoomModel from "./messageModel";
import jwt from "jwt-simple";
import MessageModel from "./messageModel";

export async function createMessage(req: express.Request, res: express.Response) {
    try {
      const { senderId, roomId, message } = req.body;
      if (!senderId || !roomId || !message)
        throw new Error("Couldn't get message or roomId or senderId from req.body");
  
      const messageDB = new RoomModel({ senderId, roomId, message });
      await messageDB.save();

      const cookie = { messageId: messageDB._id };
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("Couldn't load secret from .env");

      const JWTCookie = jwt.encode(cookie, secret);

      if (messageDB) {
        res.cookie("messageID", JWTCookie);
        res.send({ create: true, messageDB });
      } else {
        res.send({ register: false });
      }

    } catch (error) {
      res.send({ error: error.message });
    }
  }

  export async function getMessagerByRoomId(req, res) {
    try {
        const messagesDB = await MessageModel.find({
            room: req.params.room_id
          });
      res.send({ messagesDB });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }