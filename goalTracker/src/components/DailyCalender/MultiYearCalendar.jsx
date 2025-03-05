import React, { useState } from "react";
import { format, isToday, isSameDay } from "date-fns";

// Component & Css
// import classes from "./MultiYearCalendar.module.css";
import classes from "./MultiYearCalendar.module.css";
import { generateMultiYearCalendar } from "./CalendarGenerate";

// Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dateAction } from "../../Store/DateSlice";

const MultiYearCalendar = () => {
  // Generate calendar from 2025 to 2075
  const startYear = 2025;
  const endYear = 2075;
  const calendarData = generateMultiYearCalendar(startYear, endYear);

  console.log("calendarData", calendarData);

  // Get select day
  const { year, month, day } = useSelector((state) => state.Date);
  const selectDay = new Date(year, month - 1, day);

  //Get the calendar from some yaer and some month
  const currentMonthData =
    calendarData[year]?.find((m) => m.month === month) || {};

  //select day to change goal page
  const dispatch = useDispatch();
  function navigateToDate(e) {
    const newDay = new Date(e.target.value);
    // When you click on the year 2024, the calendar for 2024 will not be selected because there is no calendar for 2024 yet.
    if (newDay.getFullYear() != "2024") {
      dispatch(dateAction.switchYear(newDay.getFullYear()));
      dispatch(dateAction.switchMonth(newDay.getMonth() + 1));
      dispatch(dateAction.switchDay(newDay.getDate()));
    }
  }

  return (
    <div className={classes.calendarContainer}>
      {/* 日曆顯示 */}
      <div className={classes.calendarGrid}>
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div key={day} className={classes.calendarHeader}>
            {day}
          </div>
        ))}
        {currentMonthData.days?.map(({ date, formatted, isCurrentMonth }) => (
          <button
            key={formatted}
            className={`${classes.calendarDay} ${
              isCurrentMonth ? "" : classes.outsideMonth
            } ${isToday(formatted) ? classes.today : ""} ${
              isSameDay(selectDay, date) ? classes.selectDay : ""
            } `}
            value={date}
            onClick={navigateToDate}
          >
            {format(date, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiYearCalendar;
