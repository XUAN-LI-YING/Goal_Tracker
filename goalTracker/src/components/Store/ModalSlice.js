import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const MODAL_CONTENT_ELEMENT = {
  ADD_GOAL: "addGoal",
  EDIT_TAG: "editTag"
};

const ModalSlice = createSlice({
  name: "ModalSlice",
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

export const ModalAction = ModalSlice.actions;
export const ModalStore = configureStore({
  reducer: {
    Modal: ModalSlice.reducer
  }
});
