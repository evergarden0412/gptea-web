import { configureStore } from '@reduxjs/toolkit';
import isLoggedInSlice from './isLoggedInSlice';
import isOpenNewChatModalSlice from './isOpenNewChatModalSlice';

const store = configureStore({ reducer: { isLoggedIn: isLoggedInSlice, isOpenNewChatModal: isOpenNewChatModalSlice } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
