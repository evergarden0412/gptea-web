import { createSlice } from "@reduxjs/toolkit";

const isOpenScrapModal = createSlice({
  name: "isOpenScrapModal",
  initialState: { status: false, message: null, scrapId: "" },
  reducers: {
    open: (state, action) => {
      const { message, scrapId } = action.payload;

      state.status = true;
      state.message = message;
      if (scrapId) state.scrapId = scrapId;
    },
    close: (state) => {
      state.status = false;
      state.message = null;
      state.scrapId = "";
    },
  },
});

const { open, close } = isOpenScrapModal.actions;
export const isOpenScrapModalAction = { open, close };

export default isOpenScrapModal.reducer;
