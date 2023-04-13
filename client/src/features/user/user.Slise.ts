import { createSlice } from '@reduxjs/toolkit';
import { getUserByCookie } from './userApi';
import { RootState } from '../../app/store';
import { User } from './userModel';

export enum Status {
    LOADING = "loading",
    IDLE = "idle",
    FAILED = "failed"
}

export interface userState {
    value: User | null;
    status: Status;
}

const initialState: userState = {
    value: null,
    status: Status.IDLE,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUserByCookie.pending, (state) => {
            state.status = Status.LOADING
        }) 
        .addCase(getUserByCookie.fulfilled, (state, action) => {
            state.status = Status.IDLE
            state.value = action.payload
        }) 
        .addCase(getUserByCookie.rejected, (state) => {
            state.status = Status.FAILED
        }) 
    }
})

export const userSelector = (state: RootState) => state.user.value;
export const userStatusSelector = (state: RootState) => state.user.status;

export default userSlice.reducer;
