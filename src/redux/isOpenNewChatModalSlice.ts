import { createSlice } from '@reduxjs/toolkit';

const isOpenNewChatModalSlice = createSlice({
  name: 'isOpenNewChatModal',
  initialState: false,
  reducers: {
    open: (state) => true,
    close: (state) => false,
  },
});

const { open, close } = isOpenNewChatModalSlice.actions;
export const isOpenNewChatModalAction = { open, close };

export default isOpenNewChatModalSlice.reducer;
