import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Room } from "./roomModel";

export const getRoomByCookie = createAsyncThunk(
  "getRoomByCookie",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/api/rooms/get-room-by-cookie");
      if (!data) throw new Error("no data from get_room_by_cookie");
      const { roomDB } = data;
      return(roomDB);
    } catch (error: any) {
      console.error(error);
    }
  }
);
