import { createSlice } from "@reduxjs/toolkit";

export const MODAL_CONTENT_ELEMENT = {
  ADD_GOAL: "addGoal",
  EDIT_TAG: "editTag"
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    isOpen: false,
    displayElement: ""
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    displayElement: (state, action) => {
      state.displayElement = action.payload;
    }
  }
});

export const modalAction = modalSlice.actions;
export const modalSliceReducer = modalSlice.reducer;
