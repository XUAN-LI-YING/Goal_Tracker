import { createSlice } from "@reduxjs/toolkit";

const now = new Date();
console.log("now", now);
const initialYear = now.getFullYear();
const initialMonth = now.getMonth() + 1;
const initialDay = now.getDate();

const date = createSlice({
  name: "date",
  initialState: { year: initialYear, month: initialMonth, day: initialDay },
  reducers: {
    switchYear(state, action) {
      state.year = action.payload;
    },
    switchMonth(state, action) {
      state.month = action.payload;
    },
    switchDay(state, action) {
      state.day = action.payload;
    }
  }
});
//changeComponent
const setCalendarComponent = createSlice({
  name: "setCalendarComponent",
  initialState: { componentPage: "selectDay" },
  reducers: {
    changeComponentPage(state, action) {
      state.componentPage = action.payload;
    }
  }
});

export const dateAction = date.actions;
//changeComponentAction
export const setCalendarAction = setCalendarComponent.actions;
export const dateReducer = date.reducer;
export const setCalendarReducer = setCalendarComponent.reducer;
