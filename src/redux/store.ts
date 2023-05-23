import { configureStore } from '@reduxjs/toolkit';

import isLoggedInReducer from './isLoggedInSlice';
import isOpenChatItemModalReducer from './isOpenNewChatModalSlice';
import requestGetChatsReducer from './requestGetChatsSlice';

const store = configureStore({
  reducer: { isLoggedIn: isLoggedInReducer, isOpenChatItemModal: isOpenChatItemModalReducer, requestGetChats: requestGetChatsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
