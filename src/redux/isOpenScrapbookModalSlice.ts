import { createSlice } from "@reduxjs/toolkit";

const isOpenScrapbookModal = createSlice({
  name: "isOpenScrapbookModal",
  initialState: { status: false, scrapbook: null },
  reducers: {
    open: (state, action) => {
      state.status = true;
      state.scrapbook = action.payload;
    },
    close: (state) => {
      state.status = false;
    },
  },
});

const { open, close } = isOpenScrapbookModal.actions;
export const isOpenScrapbookModalAction = { open, close };

export default isOpenScrapbookModal.reducer;
