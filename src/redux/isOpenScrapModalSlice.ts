import { createSlice } from "@reduxjs/toolkit";

const isOpenScrapModal = createSlice({
  name: "isOpenScrapModal",
  initialState: { status: false, message: null },
  reducers: {
    open: (state, action) => {
      state.status = true;
      state.message = action.payload;
    },
    close: (state) => {
      state.status = false;
    },
  },
});

const { open, close } = isOpenScrapModal.actions;
export const isOpenScrapModalAction = { open, close };

export default isOpenScrapModal.reducer;
