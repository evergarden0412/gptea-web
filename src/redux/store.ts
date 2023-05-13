import { configureStore } from '@reduxjs/toolkit';
import isLoggedInSlice from './isLoggedInSlice';

const store = configureStore({ reducer: { isLoggedIn: isLoggedInSlice } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
