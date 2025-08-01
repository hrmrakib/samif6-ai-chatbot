import { createSlice } from "@reduxjs/toolkit";

const authTokenSlice = createSlice({
  name: "authToken",
  initialState: {
    token: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthToken: (state) => {
      state.token = null;
    },
  },
});

export const { setAuthToken, clearAuthToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;
