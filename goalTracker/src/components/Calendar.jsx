import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday
} from "date-fns";
import "./Calendar.css"; // 引入自定義樣式

const Calendar = ({ year, month }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // 生成整個月的日曆數據
  const generateCalendar = (year, month) => {
    const start = startOfWeek(startOfMonth(new Date(year, month - 1)));
    const end = endOfWeek(endOfMonth(new Date(year, month - 1)));

    console.log("start end", start, end);
    console.log(startOfMonth(new Date(2025, 9 - 1)));
    console.log(
      startOfWeek(startOfMonth(new Date(2025, 9 - 1)), {
        weekStartsOn: 1
      })
    );
    console.log(new Date(2025, 9 - 1));

    return eachDayOfInterval({ start, end });
  };

  console.log(isToday(new Date(2025, 0, 18, 1)));
  const days = generateCalendar(year, month);
  console.log(selectedDate);
  return (
    <div className="calendar-container">
      <h1>{format(new Date(year, month - 1), "yyyy 年 MM 月")}</h1>
      <div className="calendar-grid">
        {/* 星期標題 */}
        {["日", "一", "二", "三", "四", "五", "六"].map((week) => (
          <div className="calendar-header" key={week}>
            {week}
          </div>
        ))}
        {/* 日期 */}
        {days.map((day) => (
          <div
            key={day}
            className={`calendar-day ${
              isSameMonth(day, new Date(year, month - 1)) ? "" : "outside-month"
            } ${isToday(day) ? "today" : ""} ${
              selectedDate === format(day, "yyyy-MM-dd") ? "selected" : ""
            }`}
            onClick={() => setSelectedDate(format(day, "yyyy-MM-dd"))}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
      {/* 顯示選中的日期 */}
      {selectedDate && (
        <div className="selected-date">選擇的日期: {selectedDate}</div>
      )}
    </div>
  );
};

export default Calendar;
