// css、Animation
import classes from "./SetCalendar.module.css";
import { motion } from "framer-motion";
//REDUX
import { dateAction } from "../../Store/DateSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCalendarAction } from "../../Store/DateSlice";
export default function SetCalenderMonth({ key }) {
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
    <motion.div
      className={classes.monthSelector}
      key={key}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
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
    </motion.div>
  );
}
