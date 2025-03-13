import { createSlice } from "@reduxjs/toolkit";

const rightPanelModalSlice = createSlice({
  name: "rightPanelModalSlice",
  initialState: {
    rightPanelOpen: false
  },
  reducers: {
    controlModal: (state) => {
      state.rightPanelOpen = !state.rightPanelOpen;
    },
    initialModal: (state) => {
      state.rightPanelOpen = false;
    }
  }
});

export const rightPanelModalAction = rightPanelModalSlice.actions;
export const rightPanelModalReducer = rightPanelModalSlice.reducer;
