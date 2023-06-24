import { configureStore } from "@reduxjs/toolkit";

import isLoggedInReducer from "./isLoggedInSlice";
import isOpenChatItemModalReducer from "./isOpenChatItemModalSlice";
import requestGetChatsReducer from "./requestGetChatsSlice";
import requestGetMessagesReducer from "./requestGetMessagesSlice";
import isOpenScrapbookModalReducer from "./isOpenScrapbookModalSlice";
import requestGetScrapbooksReducer from "./requestGetScrapbooksSlice";
import isOpenScrapModalReducer from "./isOpenScrapModalSlice";
import isOpenWithdrawalModalReducer from "./isOpenWithdrawalModalSlice";

const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
    isOpenChatItemModal: isOpenChatItemModalReducer,
    isOpenScrapbookModal: isOpenScrapbookModalReducer,
    isOpenScrapModal: isOpenScrapModalReducer,
    requestGetChats: requestGetChatsReducer,
    requestGetMessages: requestGetMessagesReducer,
    requestGetScrapbooks: requestGetScrapbooksReducer,
    isOpenWithdrawalModal: isOpenWithdrawalModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
