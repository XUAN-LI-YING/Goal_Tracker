// css
import classes from "./SetCalendar.module.css";

// Redux
import { dateAction } from "../../Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";

export default function SetCalenderYear() {
  // Redux
  const currentYear = useSelector((state) => {
    console.log("yearSlice");
    return state.Date.year;
  });
  const dispatch = useDispatch();

  const handleYearChange = (year) => {
    dispatch(dateAction.switchYear(year));
    dispatch(setCalendarAction.changeComponentPage("selectMonth"));
  };

  return (
    <div className={classes.yearSelector}>
      {Array.from({ length: 50 }, (_, i) => 2025 + i).map((year) => (
        <button
          className={year === currentYear ? classes.currentYear : undefined}
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
