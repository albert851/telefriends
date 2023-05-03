import { createSlice } from '@reduxjs/toolkit';
import { getRoomByCookie } from './roomApi';
import { RootState } from '../../app/store';
import { Room } from './roomModel';

export enum Status {
    LOADING = "loading",
    IDLE = "idle",
    FAILED = "failed"
}

export interface roomState {
    value: Room | null;
    status: Status;
}

const initialState: roomState = {
    value: null,
    status: Status.IDLE,
}

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getRoomByCookie.pending, (state) => {
            state.status = Status.LOADING
        }) 
        .addCase(getRoomByCookie.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.value = action.payload
        }) 
        .addCase(getRoomByCookie.rejected, (state) => {
            state.status = Status.FAILED
        }) 
    }
})

export const roomSelector = (state: RootState) => state.room.value;
export const roomStatusSelector = (state: RootState) => state.room.status;

export default roomSlice.reducer;
