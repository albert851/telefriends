
import express from "express";
import {
    createMessage,
    getMessagerByRoomId,
} from "./messageCtrl";

const router = express.Router();

router
    .post("/newMessage", createMessage)
    .post("/get-By-RoomId", getMessagerByRoomId)


export default router;