import { createSlice } from "@reduxjs/toolkit";

const sideBarModalSlice = createSlice({
  name: "sideBarModalSlice",
  initialState: {
    sideBarOpen: false
  },
  reducers: {
    controlModal: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
    },
    initialModal: (state) => {
      state.sideBarOpen = false;
    }
  }
});

export const sideBarModalAction = sideBarModalSlice.actions;
export const sideBarModalReducer = sideBarModalSlice.reducer;
