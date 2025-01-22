import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth
} from "date-fns";

const generateMultiYearCalendar = (startYear, endYear) => {
  const calendarData = {};
  for (let year = startYear; year <= endYear; year++) {
    calendarData[year] = [];
    for (let month = 1; month <= 12; month++) {
      const start = startOfWeek(startOfMonth(new Date(year, month - 1)));
      const end = endOfWeek(endOfMonth(new Date(year, month - 1)));
      const days = eachDayOfInterval({ start, end }).map((date) => ({
        date,
        formatted: format(date, "yyyy-MM-dd"),
        isCurrentMonth: isSameMonth(date, new Date(year, month - 1))
      }));
      calendarData[year].push({ month, days });
    }
  }
  return calendarData;
};

export { generateMultiYearCalendar };
