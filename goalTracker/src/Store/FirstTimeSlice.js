import { createSlice } from "@reduxjs/toolkit";

const firstTimeSlice = createSlice({
  name: "firstTimeSlice",
  initialState: { shouldShowFilterAlert: false },
  reducers: {
    showFilterAlert: (state) => {
      state.shouldShowFilterAlert = true;
    },
    stopShowFilterAlert: (state) => {
      state.shouldShowFilterAlert = false;
    }
  }
});

export const firstTimeAction = firstTimeSlice.actions;
export const firstTimeReducer = firstTimeSlice.reducer;
