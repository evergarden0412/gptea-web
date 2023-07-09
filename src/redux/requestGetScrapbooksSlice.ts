import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getScrapbooks } from "../api/gptea";
import { toastFailToRequest } from "../utils/toasts";
import { IScrapbook } from "../pages/Scrapbooks";

interface IrequestGetScrapbooks {
  data: IScrapbook[];
  status: string;
}

export const requestGetScrapbooks = createAsyncThunk<IScrapbook[]>("requestGetScrapbooks", getScrapbooks);

const requestGetScrapbooksSlice = createSlice({
  name: "requestGetScrapbooks",
  initialState: { data: [], status: "none" } as IrequestGetScrapbooks,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestGetScrapbooks.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(requestGetScrapbooks.fulfilled, (state, action: PayloadAction<IScrapbook[]>) => {
        state.data = action.payload;
        state.status = "success";
      }),
      builder.addCase(requestGetScrapbooks.rejected, (state) => {
        state.status = "failure";
        toastFailToRequest();
      });
  },
});

export default requestGetScrapbooksSlice.reducer;
