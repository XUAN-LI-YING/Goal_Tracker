import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGoalTag: [],
  originDisplayTag: []
};
const selectTagSlice = createSlice({
  name: "selectTagSlice",
  initialState,
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
      state.selectedGoalTag = [
        ...new Set([...state.selectedGoalTag, ...action.payload])
      ];
    },
    setOriginDisplayTag: (state, action) => {
      state.originDisplayTag = action.payload;
    },

    initialState: (state) => {
      return { ...initialState };
    }
  }
});

export const selectTagAction = selectTagSlice.actions;
export const selectTagReducer = selectTagSlice.reducer;
