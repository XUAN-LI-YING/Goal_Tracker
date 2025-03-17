import { configureStore } from "@reduxjs/toolkit";
import { modalSliceReducer } from "./ModalSlice";
import { getTagsReducer } from "./GetTagsSlice";
import { dateReducer } from "./DateSlice";
import { setCalendarReducer } from "./DateSlice";
import { dailyGoalsReducer } from "./GetGoalSlice";
import { selectTagReducer } from "./SelectTagSlice";
import { goalDetailModalReducer } from "./GoalDetailModalSlice";
import { completionsReducer } from "./GetCompletionSlice";
import { sideBarModalReducer } from "./SideBarModalSlice";
import { rwdStateSliceReducer } from "./RwdStateSlice";
import { rightPanelModalReducer } from "./RightPanelModalSlice";
import { loginReducer } from "./LoginSlice";

export const store = configureStore({
  reducer: {
    Modal: modalSliceReducer,
    GetTags: getTagsReducer,
    Date: dateReducer,
    SetCalendar: setCalendarReducer,
    DailyGoalsReducer: dailyGoalsReducer,
    SelectTagReducer: selectTagReducer,
    GoalDetailModalReducer: goalDetailModalReducer,
    CompletionsReducer: completionsReducer,
    SideBarModalReducer: sideBarModalReducer,
    RwdStateSliceReducer: rwdStateSliceReducer,
    RightPanelModalReducer: rightPanelModalReducer,
    LoginReducer: loginReducer
  }
});
