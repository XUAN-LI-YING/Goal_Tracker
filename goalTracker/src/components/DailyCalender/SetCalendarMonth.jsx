// css
import "./MultiYearCalendar.css";

//REDUX
import { dateAction } from "../../Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";
export default function SetCalenderMonth() {
  // REDUX Date
  const month = useSelector((state) => {
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
    <div className="month-selector">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
        <button
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
