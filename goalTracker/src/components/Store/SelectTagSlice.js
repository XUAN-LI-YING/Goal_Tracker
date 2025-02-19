import { createSlice } from "@reduxjs/toolkit";

const selectTagSlice = createSlice({
  name: "selectTagSlice",
  initialState: { selectedGoalTag: [], originDiplayTag: [] },
  reducers: {
    addSelectedGoalTag: (state, action) => {
      state.selectedGoalTag.push(action.payload);
    },
    deleteSelectedGoalTag: (state, action) => {
      state.selectedGoalTag = state.selectedGoalTag.filter(
        (tag) => tag !== action.payload
      );
    },
    deleteSelectedGoalTags: (state, action) => {
      state.selectedGoalTag = state.selectedGoalTag.filter(
        (tag) => !action.payload.includes(tag)
      );
    },
    addSelectedGoalTags: (state, action) => {
      state.selectedGoalTag = [...state.selectedGoalTag, ...action.payload];
    },
    setOriginDiplayTag: (state, action) => {
      state.originDiplayTag = action.payload;
    }
  }
});

export const selectTagAction = selectTagSlice.actions;
export const selectTagReducer = selectTagSlice.reducer;
