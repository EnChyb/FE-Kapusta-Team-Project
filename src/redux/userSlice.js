import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  avatar: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
    },
    logout(state) {
      state.email = null;
      state.avatar = null;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
