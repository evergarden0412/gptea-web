import { configureStore } from '@reduxjs/toolkit';

import isLoggedInReducer from './isLoggedInSlice';
import isOpenNewChatModalReducer from './isOpenNewChatModalSlice';
import requestGetChatsReducer from './requestGetChatsSlice';

const store = configureStore({
  reducer: { isLoggedIn: isLoggedInReducer, isOpenNewChatModal: isOpenNewChatModalReducer, requestGetChats: requestGetChatsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
