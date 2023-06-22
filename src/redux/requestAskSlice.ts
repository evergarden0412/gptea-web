import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";

export const requestAsk = createAsyncThunk(
  "requestAsk",
  async ({ chatId, question }: { chatId: string | undefined; question: string }) => {
    try {
      const {
        data: { message },
      } = await axios(`/me/chats/${chatId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
        },
        data: { content: question },
      });
      return message;
    } catch (err) {
      alert(err);
    }
  }
);

const requestAskSlice = createSlice({
  name: "requestAsk",
  initialState: { status: "none" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestAsk.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(requestAsk.fulfilled, (state) => {
        state.status = "success";
      }),
      builder.addCase(requestAsk.rejected, (state) => {
        state.status = "failure";
      });
  },
});

export default requestAskSlice.reducer;
