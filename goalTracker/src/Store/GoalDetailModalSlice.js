import { createSlice } from "@reduxjs/toolkit";

export const Detail_MODAL_CONTENT_ELEMENT = {
  EDIT_GOAL: "editGoal",
  EDIT_TAG: "editTag"
};

const goalDetailModalSlice = createSlice({
  name: "goalDetailModalSlice",
  initialState: {
    isOpen: false,
    displayGoal: {},
    displayElement: "editGoal",
    disableEditGoal: true
  },
  reducers: {
    openDetailModal: (state, action) => {
      state.isOpen = true;

      state.displayGoal = action.payload;
    },
    closeDetailModal: (state) => {
      state.isOpen = false;
      state.displayGoal = {};
    },
    displayElement: (state, action) => {
      state.displayElement = action.payload;
    },
    disableEditGoal: (state, action) => {
      state.disableEditGoal = action.payload;
    }
  }
});

export const goalDetailModalAction = goalDetailModalSlice.actions;
export const goalDetailModalReducer = goalDetailModalSlice.reducer;
