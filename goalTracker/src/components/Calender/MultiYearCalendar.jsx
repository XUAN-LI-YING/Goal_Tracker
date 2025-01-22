import React, { useState } from "react";
import { format, isToday } from "date-fns";
import "./MultiYearCalendar.css";
import { generateMultiYearCalendar } from "./CalendarGenerate";

// redux
import { useSelector } from "react-redux";

const MultiYearCalendar = () => {
  // 生成 2024 到 2074 的所有月份數據
  const startYear = 2024;
  const endYear = 2074;
  const calendarData = generateMultiYearCalendar(startYear, endYear);

  console.log("calendarData", calendarData);

  // 獲取狀態，需顯示哪年哪月的日曆
  const year = useSelector((state) => state.date.year);
  const month = useSelector((state) => state.date.month);

  // 獲取該年該月的日曆
  const currentMonthData =
    calendarData[year]?.find((m) => m.month === month) || {};

  return (
    <div className="calendar-container">
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
