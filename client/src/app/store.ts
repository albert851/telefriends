import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlise';
import roomSlice from '../features/room/roomSlise';
import selectedFriendSlice from '../features/friend/selectedFriend';

export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
    friend: selectedFriendSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;