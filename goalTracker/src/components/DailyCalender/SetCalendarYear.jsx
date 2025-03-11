// css、Animation
import classes from "./SetCalendar.module.css";
import { motion } from "framer-motion";
// Redux
import { dateAction } from "../../Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";

export default function SetCalenderYear({ key }) {
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
    <motion.div
      className={classes.yearSelector}
      key={key}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
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
    </motion.div>
  );
}
