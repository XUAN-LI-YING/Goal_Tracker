// css
import "./MultiYearCalendar.css";

// redux
import { dateAction } from "./Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SetCalenderYear() {
  // redux
  const year = useSelector((state) => {
    console.log("yearSlice");
    return state.date.year;
  });
  const dispatch = useDispatch();
  //

  const handleYearChange = (year) => {
    dispatch(dateAction.switchYear(year));
  };

  return (
    <div className="year-selector">
      <p>{year}</p>
      {Array.from({ length: 30 }, (_, i) => 2025 + i).map((year) => (
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
