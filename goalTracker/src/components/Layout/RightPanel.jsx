import { useEffect } from "react";
//Component and Css
import classes from "./RightPanel.module.css";
import MultiYearCalendar from "../DailyCalender/MultiYearCalendar";
import SetCalenderMonth from "../DailyCalender/SetCalendarMonth";
import SetCalenderYear from "../DailyCalender/SetCalendarYear";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";
import { getDailyCompletionsThunk } from "../../Store/GetCompletionSlice";
//Animation
import { AnimatePresence, motion } from "framer-motion";

export default function RightPanel() {
  // REDUX Date
  const year = useSelector((state) => state.Date.year);

  const month = useSelector((state) => state.Date.month);

  const day = useSelector((state) => state.Date.day);

  //Redux completion
  const dailyCompletions = useSelector(
    (state) => state.CompletionsReducer.dailyCompletions
  );

  useEffect(() => {
    dispatch(getDailyCompletionsThunk({ year, month, day }));
  }, [year, month, day]);

  // REDUX Change component
  const componentPage = useSelector((state) => state.SetCalendar.componentPage);

  const dispatch = useDispatch();

  function selectMonth() {
    dispatch(setCalendarAction.changeComponentPage("selectMonth"));
  }

  function selectYear() {
    dispatch(setCalendarAction.changeComponentPage("selectYear"));
  }

  const paragraphs = {
    selectDay: <p>日曆</p>,
    selectMonth: <p>選擇月份</p>,
    selectYear: <p>選擇年份</p>
  };

  return (
    <div className={classes.rightSidebar}>
      {paragraphs[componentPage]}
      {componentPage == "selectDay" ? (
        <button onClick={selectMonth}>{`${year}年${month}月`}</button>
      ) : componentPage == "selectMonth" ? (
        <button onClick={selectYear}>{`${year}年`}</button>
      ) : componentPage == "selectYear" ? (
        <p>2024-2074</p>
      ) : (
        <p>No matching componentPage</p>
      )}

      <div className={classes.calendar}>
        <AnimatePresence mode="wait">
          {componentPage == "selectDay" ? (
            <MultiYearCalendar motionKey="selectDay" />
          ) : componentPage == "selectMonth" ? (
            <SetCalenderMonth motionKey="selectMonth" />
          ) : componentPage == "selectYear" ? (
            <SetCalenderYear motionKey="selectYear" />
          ) : (
            <p>No matching Component</p>
          )}
        </AnimatePresence>
      </div>
      <div className={classes.completionNum}>
        <label>
          {year}/{month}/{day}已達成
          <p>
            <AnimatePresence mode="wait">
              <motion.span
                key={`${year}/${month}/${day}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
              >
                {dailyCompletions}
              </motion.span>
            </AnimatePresence>
            個目標
          </p>
        </label>
      </div>
    </div>
  );
}
