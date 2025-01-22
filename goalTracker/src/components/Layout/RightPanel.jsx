//Component and Css
import classes from "./RightPanel.module.css";
import MultiYearCalendar from "../Calender/MultiYearCalendar";
import SetCalenderMonth from "../Calender/SetCalendarMonth";
import SetCalenderYear from "../Calender/SetCalendarYear";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { changeComponentAction } from "../Calender/Store/DateSlice";

export default function RightPanel() {
  // REDUX Date
  const year = useSelector((state) => state.date.year);

  const month = useSelector((state) => state.date.month);

  // REDUX Change component
  const componentPage = useSelector(
    (state) => state.changeComponent.componentPage
  );

  const dispatch = useDispatch();

  function selectMonth() {
    dispatch(changeComponentAction.changeComponentPage("selectMonth"));
  }

  function selectYear() {
    dispatch(changeComponentAction.changeComponentPage("selectYear"));
  }

  return (
    <div className={classes.rightSidebar}>
      <p>Select Date</p>
      <p>{componentPage}</p>
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
