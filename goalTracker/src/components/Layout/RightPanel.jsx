//Component and Css
import classes from "./RightPanel.module.css";
import MultiYearCalendar from "../DailyCalender/MultiYearCalendar";
import SetCalenderMonth from "../DailyCalender/SetCalendarMonth";
import SetCalenderYear from "../DailyCalender/SetCalendarYear";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";

export default function RightPanel() {
  // REDUX Date
  const year = useSelector((state) => state.Date.year);

  const month = useSelector((state) => state.Date.month);

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
      {componentPage == "selectDay" ? (
        <MultiYearCalendar />
      ) : componentPage == "selectMonth" ? (
        <SetCalenderMonth />
      ) : componentPage == "selectYear" ? (
        <SetCalenderYear />
      ) : (
        <p>No matching Component</p>
      )}
    </div>
  );
}
