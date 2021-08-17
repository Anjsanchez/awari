// import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "createReservation",
  initialState: {
    reservation: {
      type: {
        name: "",
        remark: "",
      },
      date: {
        fromDate: new Date(),
        toDate: new Date(),
      },
    },
    isVisible: false,
  },
  reducers: {
    toggleVisible: (resx, action) => {
      resx.isVisible = true;
    },
    toggleHidden: (resx, action) => {
      resx.isVisible = false;
    },
    refreshValues: (resx, action) => {
      console.log("refresh");
      resx.reservation.type.name = "";
      resx.reservation.type.remark = "";
      resx.reservation.date.fromDate = new Date();
      resx.reservation.date.toDate = new Date();
    },
    reservationTypeAdded: (resx, action) => {
      const { remark, name } = action.payload;
      resx.reservation.type.name = name;
      resx.reservation.type.remark = remark;
    },
  },
});

export const getVisibleState = createSelector(
  (state) => state.entities.createReservation,
  (isVisible) => isVisible
);

export const {
  toggleVisible,
  toggleHidden,
  reservationTypeAdded,
  refreshValues,
} = slice.actions;
export default slice.reducer;
