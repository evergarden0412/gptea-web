import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";
import { ERROR_GET_DATA } from "../utils/errorMessage";

export const requestGetMessages = createAsyncThunk("requestGetMessages", async (chatId: string | undefined) => {
  try {
    const {
      data: { messages },
    } = await axios(`/me/chats/${chatId}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    });
    return messages;
  } catch (err) {
    alert(`${ERROR_GET_DATA} ${err}`);
  }
});

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
      });
  },
});

export default requestGetMessagesSlice.reducer;
