import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: false,
  reducers: {
    login: () => true,
    logout: () => false,
  },
});

export const { login, logout } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
