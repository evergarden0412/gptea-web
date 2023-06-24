import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMessages } from "../api/gptea";
import { toastFailToRequest } from "../utils/toasts";

export const requestGetMessages = createAsyncThunk("requestGetMessages", getMessages);

const requestGetMessagesSlice = createSlice({
  name: "requestGetMessages",
  initialState: { data: [], status: "none" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestGetMessages.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(requestGetMessages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      }),
      builder.addCase(requestGetMessages.rejected, (state) => {
        state.status = "failure";
        toastFailToRequest();
      });
  },
});

export default requestGetMessagesSlice.reducer;
