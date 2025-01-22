import Calendar from "../components/Calendar";
import MultiYearCalendar from "../components/Calender/MultiYearCalendar";
import { startOfMonth } from "date-fns";
import SetCalenderYear from "../components/Calender/SetCalendarYear";
import SetCalenderMonth from "../components/Calender/SetCalendarMonth";
import { dateStore } from "../components/Calender/Store/DateSlice";
import { Provider } from "react-redux";
export default function Home() {
  // return <Calendar year={2025} month={1} />;
  // const result = startOfMonth(new Date(2024, 11, 0, 0, 0, 0));
  // console.log(result);
  // return <MultiYearCalendar />;

  return (
    <Provider store={dateStore}>
      <SetCalenderYear />
      <SetCalenderMonth />
    </Provider>
  );
}
