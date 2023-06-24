import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IChat } from "../pages/Chats";
import { getChats } from "../api/gptea";
import { toastFailToRequest } from "../utils/toasts";

interface IrequestGetChats {
  data: IChat[];
  status: string;
}

export const requestGetChats = createAsyncThunk<IChat[]>("requestGetChats", getChats);

const requestGetChatsSlice = createSlice({
  name: "requestGetChats",
  initialState: { data: [], status: "none" } as IrequestGetChats,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestGetChats.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(requestGetChats.fulfilled, (state, action: PayloadAction<IChat[]>) => {
        state.data = action.payload;
        state.status = "success";
      }),
      builder.addCase(requestGetChats.rejected, (state) => {
        state.status = "failure";
        toastFailToRequest();
      });
  },
});

export default requestGetChatsSlice.reducer;
