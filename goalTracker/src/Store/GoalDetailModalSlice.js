import { createSlice } from "@reduxjs/toolkit";

const goalDetailModalSlice = createSlice({
  name: "goalDetailModalSlice",
  initialState: {
    isOpen: false,
    displayGoal: {}
  },
  reducers: {
    openDetailModal: (state, action) => {
      state.isOpen = true;

      state.displayGoal = action.payload;
    },
    closeDetailModal: (state) => {
      state.isOpen = false;
      state.displayGoal = {};
    }
  }
});

export const goalDetailModalAction = goalDetailModalSlice.actions;
export const goalDetailModalReducer = goalDetailModalSlice.reducer;
