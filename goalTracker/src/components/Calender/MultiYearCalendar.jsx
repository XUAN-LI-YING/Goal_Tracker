import React, { useState } from "react";
import { format, isToday } from "date-fns";
import "./MultiYearCalendar.css";
import { generateMultiYearCalendar } from "./CalendarGenerate";

const MultiYearCalendar = () => {
  const startYear = 2024;
  const endYear = 2074;

  // 生成 2024 到 2034 的所有月份數據
  const calendarData = generateMultiYearCalendar(startYear, endYear);

  // const [selectedYear, setSelectedYear] = useState(startYear);
  // const [selectedMonth, setSelectedMonth] = useState(1);

  // const handleYearChange = (year) => setSelectedYear(year);
  // const handleMonthChange = (month) => setSelectedMonth(month);
  console.log("calendarData", calendarData);
  const currentMonthData =
    calendarData[selectedYear]?.find((m) => m.month === selectedMonth) || {};

  return (
    <div className="calendar-container">
      {/* <h1>
        {selectedYear} 年 {selectedMonth} 月
      </h1> */}

      {/* 日曆顯示 */}
      <div className="calendar-grid">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}
        {currentMonthData.days?.map(({ date, formatted, isCurrentMonth }) => (
          <div
            key={formatted}
            className={`calendar-day ${isCurrentMonth ? "" : "outside-month"} ${
              isToday(formatted) ? "today" : ""
            } `}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiYearCalendar;
