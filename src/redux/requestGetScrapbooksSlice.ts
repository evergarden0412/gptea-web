import axios from "axios";

import { ERROR_GET_DATA } from "../utils/errorMessage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GPTEA_ACCESS_TOKEN } from "../utils/loginGpteaFunc";
import { IScrapbook } from "../pages/Scrapbooks";

interface IrequestGetScrapbooks {
  data: IScrapbook[];
  status: string;
}

export const requestGetScrapbooks = createAsyncThunk<IScrapbook[]>("requestGetScrapbooks", async () => {
  try {
    const {
      data: { scrapbooks },
    } = await axios("/me/scrapbooks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    });
    return scrapbooks;
  } catch (err) {
    alert(`${ERROR_GET_DATA}, ${err} `);
  }
});

const requestGetScrapbooksSlice = createSlice({
  name: "requestGetScrapbooks",
  initialState: { data: [], status: "none" } as IrequestGetScrapbooks,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestGetScrapbooks.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(requestGetScrapbooks.fulfilled, (state, action: PayloadAction<IScrapbook[]>) => {
        state.data = action.payload;
        state.status = "success";
      }),
      builder.addCase(requestGetScrapbooks.rejected, (state, action) => {
        state.status = "failure";
      });
  },
});

export default requestGetScrapbooksSlice.reducer;
