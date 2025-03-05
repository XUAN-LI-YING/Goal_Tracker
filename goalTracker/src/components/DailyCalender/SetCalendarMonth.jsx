// css
import classes from "./SetCalendar.module.css";
//REDUX
import { dateAction } from "../../Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";
export default function SetCalenderMonth() {
  // REDUX Date
  const currentMonth = useSelector((state) => {
    console.log("monthSlice");
    return state.Date.month;
  });
  const dispatch = useDispatch();

  // REDUX Change component & Date
  const handleMonthChange = (month) => {
    dispatch(dateAction.switchMonth(month));
    dispatch(setCalendarAction.changeComponentPage("selectDay"));
  };

  return (
    <div className={classes.monthSelector}>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
        <button
          className={month === currentMonth ? classes.currentMonth : undefined}
          key={month}
          onClick={() => handleMonthChange(month)}
          //   className={selectedMonth === month ? "active" : ""}
        >
          {month} 月
        </button>
      ))}
    </div>
  );
}
