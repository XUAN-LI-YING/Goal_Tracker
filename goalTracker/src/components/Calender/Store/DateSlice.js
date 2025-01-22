import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
const date = createSlice({
  name: "date",
  initialState: { year: 2025, month: 1 },
  reducers: {
    switchYear(state, action) {
      state.year = action.payload;
    },
    switchMonth(state, action) {
      state.month = action.payload;
    }
  }
});

export const dateAction = date.actions;
export const dateStore = configureStore({ reducer: { date: date.reducer } });
