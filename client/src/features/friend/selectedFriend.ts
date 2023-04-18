import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import socket from './../../sockets/socket';

export interface SelectefFrienddState {
  id: string;
  socketID: string;
  name: string;
}

const initialState: SelectefFrienddState = {
  id: "",
  socketID: "",
  name: ""
};

export const selectedFriendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    changeFriend: (state, action) => {
      state.id = action.payload.id;
      state.socketID = action.payload.socketID;
      state.name = action.payload.name;
    },
    resetFriend: (state) => {
      state = initialState;
    },
  },
});

export const { changeFriend, resetFriend } = selectedFriendSlice.actions;

export const friendSelector = (state: RootState) => state.friend;

export default selectedFriendSlice.reducer;