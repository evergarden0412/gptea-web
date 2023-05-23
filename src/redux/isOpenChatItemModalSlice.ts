import { createSlice } from '@reduxjs/toolkit';

const isOpenChatItemModal = createSlice({
  name: 'isOpenChatItemModal',
  initialState: { status: false, chat: null },
  reducers: {
    open: (state, action) => {
      state.status = true;
      state.chat = action.payload;
    },
    close: (state) => {
      state.status = false;
    },
  },
});

const { open, close } = isOpenChatItemModal.actions;
export const isOpenChatItemModalAction = { open, close };

export default isOpenChatItemModal.reducer;
