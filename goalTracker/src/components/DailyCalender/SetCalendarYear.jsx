// css
import "./MultiYearCalendar.css";

// Redux
import { dateAction } from "./Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";
import { changeComponentAction } from "../DailyCalender/Store/DateSlice";

export default function SetCalenderYear() {
  // Redux
  const year = useSelector((state) => {
    console.log("yearSlice");
    return state.date.year;
  });
  const dispatch = useDispatch();

  const handleYearChange = (year) => {
    dispatch(dateAction.switchYear(year));
    dispatch(changeComponentAction.changeComponentPage("selectMonth"));
  };

  return (
    <div className="year-selector">
      {Array.from({ length: 50 }, (_, i) => 2025 + i).map((year) => (
        <button
          key={year}
          onClick={() => handleYearChange(Number(year))}
          //   className={selectedYear === Number(year) ? "active" : ""}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
