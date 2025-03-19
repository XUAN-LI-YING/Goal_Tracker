import { createSlice } from "@reduxjs/toolkit";

const now = new Date();

const initialYear = now.getFullYear();
const initialMonth = now.getMonth() + 1;
const initialDay = now.getDate();

const initialState = {
  year: initialYear,
  month: initialMonth,
  day: initialDay
};
const date = createSlice({
  name: "date",
  initialState,
  reducers: {
    switchYear(state, action) {
      state.year = action.payload;
    },
    switchMonth(state, action) {
      state.month = action.payload;
    },
    switchDay(state, action) {
      state.day = action.payload;
    },
    initialState(state) {
      return { ...initialState };
    }
  }
});
//changeComponent
const initialStateComponent = { componentPage: "selectDay" };

const setCalendarComponent = createSlice({
  name: "setCalendarComponent",
  initialState: initialStateComponent,
  reducers: {
    changeComponentPage(state, action) {
      state.componentPage = action.payload;
    },
    initialState(state) {
      return { ...initialStateComponent };
    }
  }
});

export const dateAction = date.actions;
//changeComponentAction
export const setCalendarAction = setCalendarComponent.actions;
export const dateReducer = date.reducer;
export const setCalendarReducer = setCalendarComponent.reducer;
