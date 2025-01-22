// css
import "./MultiYearCalendar.css";

//redux
import { dateAction } from "./Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SetCalenderMonth() {
  // redux
  const month = useSelector((state) => {
    console.log("monthSlice");
    return state.date.month;
  });
  const dispatch = useDispatch();
  //

  const handleMonthChange = (month) => {
    dispatch(dateAction.switchMonth(month));
  };

  return (
    <div className="month-selector">
      <p>{month}</p>
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
