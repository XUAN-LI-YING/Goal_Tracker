import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
const addGoalModalSlice = createSlice({
  name: "addGoalModalSlice",
  initialState: {
    isOpen: false
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    }
  }
});

export const addGoalModalAction = addGoalModalSlice.actions;
export const addGoalModalStore = configureStore({
  reducer: {
    addGoalModal: addGoalModalSlice.reducer
  }
});
