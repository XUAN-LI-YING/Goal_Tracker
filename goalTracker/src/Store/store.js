import { configureStore } from "@reduxjs/toolkit";
import { modalSliceReducer } from "./ModalSlice";
import { getTagsReducer } from "./GetTagsSlice";
import { dateReducer } from "./DateSlice";
import { setCalendarReducer } from "./DateSlice";
import { dailyGoalsReducer } from "./GetGoalSlice";
import { selectTagReducer } from "./SelectTagSlice";
import { goalDetailModalReducer } from "./GoalDetailModalSlice";

export const store = configureStore({
  reducer: {
    Modal: modalSliceReducer,
    GetTags: getTagsReducer,
    Date: dateReducer,
    SetCalendar: setCalendarReducer,
    DailyGoalsReducer: dailyGoalsReducer,
    SelectTagReducer: selectTagReducer,
    GoalDetailModalReducer: goalDetailModalReducer
  }
});
