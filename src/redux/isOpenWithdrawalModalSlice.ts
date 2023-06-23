import { createSlice } from "@reduxjs/toolkit";

const isOpenWithdrawalModal = createSlice({
  name: "isOpenWithdrawalModal",
  initialState: { status: false },
  reducers: {
    open: (state) => {
      state.status = true;
    },
    close: (state) => {
      state.status = false;
    },
  },
});

const { open, close } = isOpenWithdrawalModal.actions;
export const isOpenWithdrawalModalAction = { open, close };

export default isOpenWithdrawalModal.reducer;
