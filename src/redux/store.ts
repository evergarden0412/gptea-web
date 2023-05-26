import { configureStore } from '@reduxjs/toolkit';

import isLoggedInReducer from './isLoggedInSlice';
import isOpenChatItemModalReducer from './isOpenChatItemModalSlice';
import requestGetChatsReducer from './requestGetChatsSlice';
import requestGetMessagesReducer from './requestGetMessagesSlice';

const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
    isOpenChatItemModal: isOpenChatItemModalReducer,
    requestGetChats: requestGetChatsReducer,
    requestGetMessages: requestGetMessagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
