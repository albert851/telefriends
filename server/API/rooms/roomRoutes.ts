import express from "express";
import {
    getAllRooms,
    createRoom,
    closeRoom,
    getRoomByCookie,
    getRoomByuserId,
} from "./roomCtrl";

const router = express.Router();

router
.get("", getAllRooms)
.get("/get-room-by-cookie", getRoomByCookie)
.get("/close", closeRoom)
.post("/room-by-users", getRoomByuserId)
.post("/newRoom", createRoom)


export default router;
