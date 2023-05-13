import { createSlice } from '@reduxjs/toolkit';

export const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: false,
  reducers: {
    login: (state) => true,
    logout: (state) => false,
  },
});

export const { login, logout } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
