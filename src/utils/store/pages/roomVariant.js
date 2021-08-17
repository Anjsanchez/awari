import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "roomVariant",
  initialState: {
    loading: false,
  },
  reducers: {
    requestStarted: (variant, action) => {
      variant.isLoading = true;
    },
    requestFinished: (variant, action) => {
      variant.isLoading = false;
    },
  },
});

export const getLoadingState = createSelector(
  (state) => state.entities.roomVariant,
  (loading) => loading
);

export const { requestStarted, requestFinished } = slice.actions;
export default slice.reducer;
