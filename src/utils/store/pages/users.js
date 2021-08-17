import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
    isLoggedIn: false,
  },
  reducers: {
    userAdded: (userx, action) => {
      const { singleRecord, token } = action.payload.data;
      userx.user = { ...singleRecord };
      userx.token = token;
      userx.isLoggedIn = true;
    },
    userRemove: (userx, action) => {
      userx.user = {};
      userx.token = "";
      userx.isLoggedIn = false;
    },
    writeToken: (userx, action) => {
      const { token } = action.payload;
      userx.token = token;
    },
  },
});

export const getCurrentUserR = createSelector(
  (state) => state.entities.user,
  (user) => user
);

export const { userAdded, writeToken, userRemove } = slice.actions;
export default slice.reducer;
