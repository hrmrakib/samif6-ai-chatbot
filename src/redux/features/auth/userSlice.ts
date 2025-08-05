import { logout } from "@/service/authService";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },

    handleLogout: (state) => {
      localStorage.removeItem("samif6_user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      logout();
      state.user = null;
    },
  },
});

export const { setCurrentUser, handleLogout } = userSlice.actions;
export default userSlice.reducer;
