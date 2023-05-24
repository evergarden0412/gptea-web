import axios from 'axios';

import { ERROR_GET_DATA } from '../utils/errorMessage';
import { IChat } from '../pages/Chats';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GPTEA_ACCESS_TOKEN } from '../utils/loginGpteaFunc';

interface IrequestGetChats {
  data: IChat[];
  status: string;
}

export const requestGetChats = createAsyncThunk<IChat[]>('requestGetChats', async () => {
  try {
    const {
      data: { chats },
    } = await axios('/me/chats', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      },
    });
    return chats;
  } catch (err) {
    alert(`${ERROR_GET_DATA}, ${err} `);
  }
});

const requestGetChatsSlice = createSlice({
  name: 'requestGetChats',
  initialState: { data: [], status: 'none' } as IrequestGetChats,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestGetChats.pending, (state, action) => {
      state.status = 'loading';
    }),
      builder.addCase(requestGetChats.fulfilled, (state, action: PayloadAction<IChat[]>) => {
        state.data = action.payload;
        state.status = 'success';
      }),
      builder.addCase(requestGetChats.rejected, (state, action) => {
        state.status = 'failure';
      });
  },
});

export default requestGetChatsSlice.reducer;
